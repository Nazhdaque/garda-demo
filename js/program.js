import { html, render } from "lit-html";
import Papa from "papaparse";
import { FetchWrapper } from "./helpers.js";
import { programItemTemplate } from "./programItemTemplate.js";

// Глобальная переменная для быстрого изменения пути к фотографиям
const PHOTO_BASE_URL =
	"https://garda.ai/upload/save-all/2027/photo/participants/";

// Вспомогательная функция: бьет текст биографии по \n на массив HTML-абзацев <p>
function formatBio(bioText) {
	if (!bioText) return [];
	return bioText
		.split("\n")
		.map(paragraph => paragraph.trim())
		.filter(paragraph => paragraph.length > 0);
}

function initProgram(tsvData, targetSelector) {
	const parsed = Papa.parse(tsvData, { header: true, skipEmptyLines: true });

	const sessionsMap = new Map();
	const hallsMap = new Map();

	parsed.data.forEach(row => {
		if (!row.sessionId) return;

		const currentPlaceId = Number(row.placeId);

		if (currentPlaceId > 0 && row.place) {
			hallsMap.set(currentPlaceId, row.place);
		}

		if (!sessionsMap.has(row.sessionId)) {
			sessionsMap.set(row.sessionId, {
				id: row.sessionId,
				title: row.title,
				subtitle: row.subtitle,
				format: row.format,
				place: row.place,
				placeId: currentPlaceId,
				start: row.start,
				video: row.video || null,
				speakers: [],
			});
		}

		if (row.memberId) {
			// Собираем полный URL фотографии, если эндпоинт указан в таблице
			const fullPhotoUrl = row.photo
				? `${PHOTO_BASE_URL}${row.photo.trim()}`
				: null;

			sessionsMap.get(row.sessionId).speakers.push({
				id: row.memberId,
				name: `${row.name} ${row.surname}`.trim(),
				role: row.role,
				job: row.job || "",
				photo: fullPhotoUrl,
				// Сохраняем биографию уже в виде готового массива абзацев
				bioParagraphs: formatBio(row.bio),
			});
		}
	});

	const finalSessions = Array.from(sessionsMap.values());

	const finalHalls = Array.from(hallsMap.entries())
		.map(([id, name]) => ({ id, name }))
		.sort((a, b) => a.id - b.id);

	const programSectionTemplate = html`
		<section class="program" aria-labelledby="program-title">
			<h2 id="program-title" class="program__title visually-hidden">
				Программа мероприятия
			</h2>

			<div class="program__header">
				${finalHalls.map(
					hall => html`
						<div class="program__hall-title" data-hall-id="${hall.id}">
							${hall.name}
						</div>
					`,
				)}
			</div>

			<div class="program__grid">
				${finalSessions.map(session => programItemTemplate(session))}
			</div>
		</section>
	`;

	const targetContainer = document.querySelector(targetSelector);
	if (targetContainer) {
		render(programSectionTemplate, targetContainer);
	}
}

export function renderProgram(targetSelector) {
	const API = new FetchWrapper("");
	API.getTxt("data/program-data.tsv")
		.then(tsvText => {
			initProgram(tsvText, targetSelector);
		})
		.catch(err => console.error(err.message));
}

renderProgram(".full-bleed.garda-bg");
