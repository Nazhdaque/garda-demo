import { html, render } from "lit-html";
import Papa from "papaparse";
import { programItemTemplate } from "./programItemTemplate.js";
import { SpeakerPopoverView } from "./SpeakerPopoverView.js";

class ProgramDataService {
	constructor() {}

	async fetchAndClean(url) {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		const tsvText = await response.text();
		return this._parse(tsvText);
	}

	_sanitizeText(text) {
		if (!text) return "";
		return text.replace(/<\/?[^>]+(>|$)/g, "").trim();
	}

	_parse(tsvData) {
		const parsed = Papa.parse(tsvData, { header: true, skipEmptyLines: true });
		const sessionsMap = new Map();
		const hallsMap = new Map();
		const speakersMap = new Map(); // Карта для моментального поиска спикеров при клике

		parsed.data.forEach(row => {
			const sessionId = this._sanitizeText(row.sessionId);
			if (!sessionId) return;

			const currentPlaceId = Number(row.placeId) || 0;
			const placeName = this._sanitizeText(row.place);

			if (currentPlaceId > 0 && placeName) {
				hallsMap.set(currentPlaceId, placeName);
			}

			if (!sessionsMap.has(sessionId)) {
				sessionsMap.set(sessionId, {
					id: sessionId,
					title: this._sanitizeText(row.title),
					subtitle: this._sanitizeText(row.subtitle),
					format: this._sanitizeText(row.format),
					placeId: currentPlaceId,
					start: this._sanitizeText(row.start),
					video: this._sanitizeText(row.video) || null,
					speakers: [],
				});
			}

			const memberId = this._sanitizeText(row.memberId);
			if (memberId) {
				const photo = this._sanitizeText(row.photo);
				const speakerData = {
					id: memberId,
					firstName: this._sanitizeText(row.name),
					lastName: this._sanitizeText(row.surname),
					role: this._sanitizeText(row.role),
					job: this._sanitizeText(row.job),
					photo: photo || null,
					bio: row.bio?.trim() || "",
				};

				sessionsMap.get(sessionId).speakers.push(speakerData);
				// Сохраняем уникальный ключ "сессия-спикер" для O(1) поиска
				speakersMap.set(`${sessionId}-${memberId}`, speakerData);
			}
		});

		const halls = Array.from(hallsMap.entries())
			.map(([id, name]) => ({ id, name }))
			.sort((a, b) => a.id - b.id);

		const sessions = Array.from(sessionsMap.values());

		return { halls, sessions, speakersMap };
	}
}

class EventProgramView {
	constructor(targetSelector, popoverView) {
		this.targetContainer = document.querySelector(targetSelector);
		this.sessions = [];
		this.halls = [];
		this.speakersMap = new Map();
		this.popoverView = popoverView;

		this._handleSpeakerClick = this._handleSpeakerClick.bind(this);
	}

	render(halls, sessions, speakersMap) {
		if (!this.targetContainer) return;
		this.halls = halls;
		this.sessions = sessions;
		this.speakersMap = speakersMap;
		this.updateUI();
		this.initEvents();
	}

	updateUI() {
		// Безопасная числовая сортировка времени (например, "9:00" встанет раньше "10:00")
		const timeSlots = [...new Set(this.sessions.map(s => s.start))].sort(
			(a, b) => a.localeCompare(b, undefined, { numeric: true }),
		);

		const hallsMap = new Map(this.halls.map(h => [h.id, h.name]));

		const sessionsByTimeMap = new Map();
		this.sessions.forEach(session => {
			if (!sessionsByTimeMap.has(session.start)) {
				sessionsByTimeMap.set(session.start, []);
			}
			sessionsByTimeMap.get(session.start).push(session);
		});

		const mainTemplate = html`
			<table class="program" aria-label="Программа мероприятия">
				<thead>
					<tr>
						${this.halls.map(
							hall => html`
								<th
									role="columnheader"
									class="track slot gradient-border"
									data-hall="${hall.id}">
									${hall.name}
								</th>
							`,
						)}
					</tr>
				</thead>
				<tbody class="fnt-xs">
					${timeSlots.map(time => {
						const slotsInTime = sessionsByTimeMap.get(time) || [];
						return html`
							<tr>
								${slotsInTime.map(session =>
									programItemTemplate(session, hallsMap),
								)}
							</tr>
						`;
					})}
				</tbody>
			</table>
		`;

		render(mainTemplate, this.targetContainer);
	}

	initEvents() {
		const tbody = this.targetContainer.querySelector("tbody");
		if (!tbody) return;

		tbody.removeEventListener("click", this._handleSpeakerClick);
		tbody.addEventListener("click", this._handleSpeakerClick);
	}

	_handleSpeakerClick(e) {
		const btn = e.target.closest(".slot__speaker-btn");
		if (!btn) return;

		const speakerId = btn.dataset.speakerId;
		const sessionId = btn.dataset.sessionId;

		// Мгновенный поиск O(1) вместо вложенных .find()
		const speaker = this.speakersMap.get(`${sessionId}-${speakerId}`);

		if (speaker) {
			this.popoverView.open(speaker);
		}
	}

	destroy() {
		if (this.targetContainer) {
			const tbody = this.targetContainer.querySelector("tbody");
			if (tbody) tbody.removeEventListener("click", this._handleSpeakerClick);
			render(html``, this.targetContainer);
		}
		if (this.popoverView) {
			this.popoverView.destroy();
		}
		this.sessions = [];
		this.halls = [];
		this.speakersMap.clear();
	}
}

const instances = new Map();

export const renderProgram = targetSelector => {
	if (instances.has(targetSelector)) {
		instances.get(targetSelector).destroy();
	}

	const popoverView = new SpeakerPopoverView();
	const view = new EventProgramView(targetSelector, popoverView);
	instances.set(targetSelector, view);

	const dataService = new ProgramDataService();
	dataService
		.fetchAndClean("data/program-data.tsv")
		.then(({ halls, sessions, speakersMap }) =>
			view.render(halls, sessions, speakersMap),
		)
		.catch(err => console.error(err.message));
};

renderProgram("#program");
