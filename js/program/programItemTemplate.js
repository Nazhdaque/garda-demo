import { html } from "lit-html";
import { repeat } from "lit-html/directives/repeat.js";

export const programItemTemplate = (
	session,
	hallsMap,
	isSorted = false,
	isMobile = false,
	isActive = false,
) => {
	const isPause = session.placeId === 0 || session.isPause === true;

	if (isPause) {
		return html`
			<td role="cell" class="slot gradient-border" data-hall="all">
				<header class="slot__header">
					<time class="slot__time" datetime="${session.start}:00+03:00"
						>${session.start}</time
					>
					${session.format
						? html`<span class="slot__type">${session.format}</span>`
						: ""}
				</header>
			</td>
		`;
	}

	const moderators =
		session.speakers?.filter(s => s.role === "Модератор") || [];
	const participants =
		session.speakers?.filter(s => s.role === "Участник") || [];
	const hasSpeakers = moderators.length > 0 || participants.length > 0;

	const hallName = hallsMap?.get(session.placeId) || "";

	const renderSpeakerName = speaker => {
		const isInteractive = speaker.photo && speaker.bio;
		if (isInteractive) {
			return html`<button
				type="button"
				class="slot__speaker-btn"
				data-speaker-id="${speaker.id}"
				data-session-id="${session.id}">
				${speaker.firstName} ${speaker.lastName}
			</button>`;
		}
		return `${speaker.firstName} ${speaker.lastName}`;
	};

	return html`
		<td
			role="cell"
			class="slot gradient-border ${isActive ? "active-slot" : ""}"
			data-time="${session.start ? session.start.replace(":", "-") : ""}"
			data-hall="${session.placeId ?? ""}"
			aria-labelledby="talk-title-${session.id}">
			<header class="slot__header">
				${isMobile && isSorted
					? html`<button
							type="button"
							class="slot__time active-tag"
							datetime="${session.start}:00+03:00">
							${session.start}
						</button>`
					: html`<time class="slot__time" datetime="${session.start}:00+03:00"
							>${session.start}</time
						>`}
				${hallName
					? isMobile && !isSorted
						? html`<button type="button" class="slot__hall active-tag">
								${hallName}
							</button>`
						: html`<span class="slot__hall">${hallName}</span>`
					: ""}
				${session.format
					? html`<span class="slot__type">${session.format}</span>`
					: ""}
				${session.video
					? html`<a
							href="${session.video}"
							target="_blank"
							rel="noopener noreferrer"
							class="slot__link gradient-text gradient-border"
							>Видео</a
						>`
					: ""}
			</header>

			<div class="slot__body">
				<h3 id="talk-title-${session.id}" class="slot__title fnt-md">
					${session.title}
				</h3>
				${session.subtitle
					? html`<p class="slot__subtitle fnt-xs">${session.subtitle}</p>`
					: ""}
			</div>

			${hasSpeakers
				? html`
						<footer class="slot__footer">
							<dl class="slot__speakers">
								${moderators.length > 0
									? html`
											<dt class="slot__role">Модератор</dt>
											<dd class="slot__names">
												<ul class="slot__members-list">
													${repeat(
														moderators,
														m => m.id,
														m => html`<li>${renderSpeakerName(m)}</li>`,
													)}
												</ul>
											</dd>
										`
									: ""}
								${participants.length > 0
									? html`
											<dt class="slot__role">Участники</dt>
											<dd class="slot__names">
												<ul class="slot__members-list">
													${repeat(
														participants,
														p => p.id,
														p => html`<li>${renderSpeakerName(p)}</li>`,
													)}
												</ul>
											</dd>
										`
									: ""}
							</dl>
						</footer>
					`
				: ""}
		</td>
	`;
};
