import { html, render } from "lit-html";
import { programItemTemplate } from "./programItemTemplate.js";
import { SpeakerPopoverView } from "./SpeakerPopoverView.js";
import { ProgramDataService } from "./ProgramDataService.js";

class EventProgramView {
	constructor(targetSelector, popoverView, desktopBreakpoint = "768px") {
		this.targetContainer = document.querySelector(targetSelector);
		this.sessions = [];
		this.halls = [];
		this.speakersMap = new Map();
		this.popoverView = popoverView;
		this.desktopBreakpoint = desktopBreakpoint;

		this.selectedHallId = null;
		this.activeSessionId = null;

		this._handleSpeakerClick = this._handleSpeakerClick.bind(this);
		this._handleTableClick = this._handleTableClick.bind(this);
		this._handleMediaQueryChange = this._handleMediaQueryChange.bind(this);
	}

	render(halls, sessions, speakersMap) {
		if (!this.targetContainer) return;
		this.halls = halls;
		this.sessions = sessions;
		this.speakersMap = speakersMap;
		this.updateUI();
		this.initEvents();
	}

	_maintainScrollPosition(sessionId, hallId, oldTop) {
		if (!sessionId || !this.targetContainer || oldTop === undefined) return;

		const cleanSessionId = sessionId.split("-virtual-")[0];
		const targetEl = this.targetContainer.querySelector(
			`[aria-labelledby^="talk-title-${cleanSessionId}"][data-hall="${hallId}"]`,
		);

		if (targetEl) {
			const newTop = targetEl.getBoundingClientRect().top;
			window.scrollBy(0, newTop - oldTop);
		}
	}

	_getHallBoundaries() {
		const boundaries = new Map();
		this.sessions.forEach(session => {
			if (session.placeId === 0) return;
			if (!boundaries.has(session.placeId)) {
				boundaries.set(session.placeId, {
					min: session.start,
					max: session.start,
				});
			} else {
				const bounds = boundaries.get(session.placeId);
				if (
					session.start.localeCompare(bounds.min, undefined, {
						numeric: true,
					}) < 0
				)
					bounds.min = session.start;
				if (
					session.start.localeCompare(bounds.max, undefined, {
						numeric: true,
					}) > 0
				)
					bounds.max = session.start;
			}
		});
		return boundaries;
	}

	_getTransformedSessions(boundaries) {
		return this.sessions.flatMap(session => {
			if (session.placeId === 0) {
				return this.halls.flatMap(hall => {
					const bounds = boundaries.get(hall.id);
					if (!bounds) return [];
					if (
						session.start.localeCompare(bounds.min, undefined, {
							numeric: true,
						}) < 0
					)
						return [];
					if (
						session.start.localeCompare(bounds.max, undefined, {
							numeric: true,
						}) > 0
					)
						return [];

					return [
						{
							...session,
							id: `${session.id}-virtual-${hall.id}`,
							sortHallId: hall.id,
							isPause: true,
						},
					];
				});
			}
			return [{ ...session, sortHallId: session.placeId }];
		});
	}

	updateUI() {
		const hallsMap = new Map(this.halls.map(h => [h.id, h.name]));
		let tbodyTemplate;
		const isSorted = this.selectedHallId !== null;
		const isMobile = !window.matchMedia(
			`(min-width: ${this.desktopBreakpoint})`,
		).matches;

		if (isSorted) {
			const transformedSessions = this._getTransformedSessions(
				this._getHallBoundaries(),
			);

			transformedSessions.sort((a, b) => {
				const aIsSelected = a.sortHallId === this.selectedHallId;
				const bIsSelected = b.sortHallId === this.selectedHallId;

				if (aIsSelected && !bIsSelected) return -1;
				if (!aIsSelected && bIsSelected) return 1;
				if (a.sortHallId !== b.sortHallId) return a.sortHallId - b.sortHallId;

				return a.start.localeCompare(b.start, undefined, { numeric: true });
			});

			tbodyTemplate = html`
				${transformedSessions.map(session => {
					const cleanId = session.id.split("-virtual-")[0];
					const isActive = this.activeSessionId === cleanId;
					return html`
						<tr>
							${programItemTemplate(
								session,
								hallsMap,
								isSorted,
								isMobile,
								isActive,
							)}
						</tr>
					`;
				})}
			`;
		} else {
			const timeSlots = [...new Set(this.sessions.map(s => s.start))].sort(
				(a, b) => a.localeCompare(b, undefined, { numeric: true }),
			);

			const sessionsByTimeMap = new Map();
			this.sessions.forEach(session => {
				if (!sessionsByTimeMap.has(session.start)) {
					sessionsByTimeMap.set(session.start, []);
				}
				sessionsByTimeMap.get(session.start).push(session);
			});

			tbodyTemplate = html`
				${timeSlots.map(
					time => html`
						<tr>
							${(sessionsByTimeMap.get(time) || []).map(session => {
								const isActive = this.activeSessionId === session.id;
								return programItemTemplate(
									session,
									hallsMap,
									isSorted,
									isMobile,
									isActive,
								);
							})}
						</tr>
					`,
				)}
			`;
		}

		const mainTemplate = html`
			<table
				class="program"
				style="--halls-count: ${this.halls.length};"
				aria-label="Программа мероприятия"
				data-sorted="${isSorted ? this.selectedHallId : "false"}">
				<thead>
					<tr>
						${this.halls.map(
							hall => html`
								<th
									role="columnheader"
									class="track cursor-glow slot gradient-border"
									data-hall="${hall.id}">
									${hall.name}
								</th>
							`,
						)}
					</tr>
				</thead>
				<tbody class="fnt-xs">
					${tbodyTemplate}
				</tbody>
			</table>
		`;

		render(mainTemplate, this.targetContainer);
	}

	initEvents() {
		this.targetContainer.removeEventListener("click", this._handleTableClick);
		this.targetContainer.addEventListener("click", this._handleTableClick);

		if (!this.mediaQuery) {
			this.mediaQuery = window.matchMedia(
				`(min-width: ${this.desktopBreakpoint})`,
			);
			this.mediaQuery.addEventListener("change", this._handleMediaQueryChange);
		}
	}

	_handleMediaQueryChange(e) {
		if (e.matches && this.selectedHallId !== null) {
			this.selectedHallId = null;
			this.activeSessionId = null;
		}
		this.updateUI();
	}

	_handleTableClick(e) {
		const td = e.target.closest(".slot");
		if (!td) return;

		const ariaLabel = td.getAttribute("aria-labelledby") || "";
		const sessionId = ariaLabel.replace("talk-title-", "");
		let hallId = Number(td.dataset.hall);

		if (sessionId) {
			this.activeSessionId = sessionId.split("-virtual-")[0];
		}

		const speakerBtn = e.target.closest(".slot__speaker-btn");
		if (speakerBtn) {
			this._handleSpeakerClick(speakerBtn);
			return;
		}

		const timeBtn = e.target.closest("button.slot__time");
		if (timeBtn) {
			if (this.selectedHallId !== null) {
				const oldTop = td.getBoundingClientRect().top;
				this.selectedHallId = null;
				this.updateUI();

				if (sessionId) {
					this._maintainScrollPosition(sessionId, hallId, oldTop);
				}
			}
			return;
		}

		const hallBtn = e.target.closest("button.slot__hall");
		if (hallBtn) {
			if (hallBtn.offsetParent === null) return;
			if (!sessionId) return;

			if (hallId) {
				const oldTop = td.getBoundingClientRect().top;
				this.selectedHallId = hallId;
				this.updateUI();

				if (sessionId) {
					this._maintainScrollPosition(sessionId, hallId, oldTop);
				}
			}
			return;
		}

		if (sessionId) {
			this.updateUI();
		}
	}

	_handleSpeakerClick(btn) {
		const speakerId = btn.dataset.speakerId;
		const sessionId = btn.dataset.sessionId;
		const speaker = this.speakersMap.get(`${sessionId}-${speakerId}`);

		if (speaker) {
			this.popoverView.open(speaker);
		}
	}

	destroy() {
		if (this.mediaQuery) {
			this.mediaQuery.removeEventListener(
				"change",
				this._handleMediaQueryChange,
			);
			this.mediaQuery = null;
		}
		if (this.targetContainer) {
			this.targetContainer.removeEventListener("click", this._handleTableClick);
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

export const renderProgram = (targetSelector, desktopBreakpoint = "768px") => {
	if (instances.has(targetSelector)) {
		instances.get(targetSelector).destroy();
	}

	const popoverView = new SpeakerPopoverView();
	const view = new EventProgramView(
		targetSelector,
		popoverView,
		desktopBreakpoint,
	);
	instances.set(targetSelector, view);

	const dataService = new ProgramDataService();
	dataService
		.fetchAndClean("data/program-data.tsv")
		.then(({ halls, sessions, speakersMap }) =>
			view.render(halls, sessions, speakersMap),
		)
		.catch(err => console.error(err.message));
};

renderProgram("#program", "768px");
