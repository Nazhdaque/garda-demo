import Papa from "papaparse";

export class ProgramDataService {
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
		const speakersMap = new Map();

		const allowedTags = ["P", "B", "I", "STRONG", "EM", "UL", "OL", "LI", "BR"];
		const sanitizeHtml = htmlString => {
			if (!htmlString) return "";
			const template = document.createElement("template");
			template.innerHTML = htmlString;
			const clean = node => {
				Array.from(node.childNodes).forEach(child => {
					if (child.nodeType === Node.ELEMENT_NODE) {
						if (!allowedTags.includes(child.tagName)) {
							child.replaceWith(...child.childNodes);
						}
						clean(child);
					}
				});
			};
			clean(template.content);
			return template.innerHTML;
		};

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
					bio: sanitizeHtml(row.bio?.trim() || ""),
				};

				sessionsMap.get(sessionId).speakers.push(speakerData);
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
