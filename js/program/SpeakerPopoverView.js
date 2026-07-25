import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export class SpeakerPopoverView {
	constructor() {
		this.photoBaseUrl =
			"https://garda.ai/upload/save-all/2027/photo/participants/";
		this.container = document.createElement("div");
		document.body.appendChild(this.container);
	}

	open(speaker) {
		const popoverId = `popover-${speaker.id}`;

		const template = html`
			<article
				id="${popoverId}"
				popover="auto"
				class="person slot gradient-border width-x">
				<div class="img-box person__photo">
					${speaker.photo
						? html`<img
								src="${this.photoBaseUrl}${speaker.photo}"
								alt="${speaker.firstName} ${speaker.lastName}" />`
						: ""}
				</div>

				<header class="person__header">
					<h1 class="fnt-lg">
						<span>${speaker.firstName}</span><br /><span
							>${speaker.lastName}</span
						>
					</h1>
					${speaker.job ? html`<p class="fnt-rg">${speaker.job}</p>` : ""}
				</header>

				<div class="person__bio fnt-xs">${unsafeHTML(speaker.bio)}</div>

				<button
					type="button"
					class="gradient-border gradient-text"
					popovertarget="${popoverId}"
					popovertargetaction="hide"
					aria-label="Закрыть">
					&times;
				</button>
			</article>
		`;

		render(template, this.container);

		const element = this.container.querySelector(`[popover]`);
		if (element) {
			element.showPopover();
		}
	}

	destroy() {
		if (this.container && this.container.parentNode) {
			this.container.parentNode.removeChild(this.container);
		}
	}
}
