import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export const card = (index, url, ttl, sub, txt) => {
	const getCard = () => html`
		<section class="demo-card" id="demo-card-${index + 1}">
			<picture class="img-box demo-card__img">
				<img src=${url} alt="demo img" />
			</picture>

			<div class="demo-card__header">
				<h3 class="demo-card__ttl">${unsafeHTML(ttl)}</h3>
				<p class="demo-card__sub fnt-md">${unsafeHTML(sub)}</p>
			</div>

			<div class="demo-card__txt">${unsafeHTML(txt)}</div>
		</section>
	`;
	return getCard();
};

export const navPoint = index =>
	html`<a href="#demo-card-${index + 1}" class="focus-outline"></a>`;
