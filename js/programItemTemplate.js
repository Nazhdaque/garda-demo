import { html } from "lit-html";

export const programItemTemplate = session => {
	const isPause = session.placeId === 0;

	// Компактный перерыв: только время и формат (например, "Кофе-брейк")
	if (isPause) {
		return html`
			<article class="program-item program-item--pause" data-hall="all">
				<header class="program-item__header">
					<time class="program-item__time" datetime="${session.start}:00+03:00"
						>${session.start}</time
					>
					<span class="program-item__type">${session.format}</span>
				</header>
			</article>
		`;
	}

	// ---- ОБЫЧНАЯ КАРТОЧКА ----
	const moderators = session.speakers.filter(s => s.role === "Модератор");
	const participants = session.speakers.filter(s => s.role === "Участник");

	return html`
		<article
			class="program-item"
			data-time="${session.start.replace(":", "-")}"
			data-hall="${session.placeId}"
			aria-labelledby="talk-title-${session.id}">
			<header class="program-item__header">
				<time class="program-item__time" datetime="${session.start}:00+03:00"
					>${session.start}</time
				>
				<span class="program-item__hall">${session.place}</span>
				<span class="program-item__type">${session.format}</span>
				${session.video
					? html`<a
							href="${session.video}"
							target="_blank"
							rel="noopener noreferrer"
							class="program-item__link"
							>Видео</a
						>`
					: ""}
			</header>

			<div class="program-item__body">
				<h3 id="talk-title-${session.id}" class="program-item__title">
					${session.title}
				</h3>
				<p class="program-item__subtitle">${session.subtitle}</p>
			</div>

			${session.speakers.length > 0
				? html`
						<footer class="program-item__footer">
							<dl class="program-item__speakers">
								${moderators.length > 0
									? html`
											<dt class="program-item__role">Модератор:</dt>
											<dd class="program-item__name">
												${moderators.map(m => m.name).join(", ")}
											</dd>
										`
									: ""}
								${participants.length > 0
									? html`
											<dt class="program-item__role">Участники:</dt>
											<dd class="program-item__names">
												<ul class="program-item__members-list">
													${participants.map(p => html`<li>${p.name}</li>`)}
												</ul>
											</dd>
										`
									: ""}
							</dl>
						</footer>
					`
				: ""}
		</article>
	`;
};
