import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export class SpeakerPopoverView {
	constructor() {
		const popoverId = "speaker-global-popover";
		let existingContainer = document.getElementById(popoverId);

		if (!existingContainer) {
			this.container = document.createElement("div");
			this.container.id = popoverId;
			this.container.setAttribute("popover", "auto");
			this.container.className = "speaker-popover width-x";
			document.body.appendChild(this.container);
		} else {
			this.container = existingContainer;
		}

		this.photoBaseUrl = "images/persons/";
	}

	open(speaker) {
		const template = html`
			<article class="person slot cursor-glow gradient-border">
				<div class="img-box person__photo">
					${speaker.photo
						? html`<img
								src="${this.photoBaseUrl}${speaker.photo}"
								alt="${speaker.firstName} ${speaker.lastName}" />`
						: ""}
				</div>

				<header class="person__header">
					<h1 class="fnt-lg">
						<span>${speaker.firstName}</span><br />
						<span>${speaker.lastName}</span>
					</h1>
					${speaker.job ? html`<p class="fnt-rg">${speaker.job}</p>` : ""}
				</header>

				<div class="person__bio fnt-xs">${unsafeHTML(speaker.bio)}</div>

				<button
					type="button"
					class="gradient-border gradient-text"
					@click="${() => this.container.hidePopover()}"
					aria-label="Закрыть">
					&times;
				</button>
			</article>
		`;

		render(template, this.container);
		this.container.showPopover();
	}

	destroy() {
		if (this.container && this.container.parentNode) {
			this.container.parentNode.removeChild(this.container);
			this.container = null;
		}
	}
}
