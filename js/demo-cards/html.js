import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export const card = (index, url, img, ttl, sub, txt) => {
	const arrow = html`
		<div class="img-box arrow">
			<img
				loading="lazy"
				decoding="async"
				src="images/icons/garda-icon-arrow-angled-white.svg"
				alt="gradient arrow on white background" />
			<img
				loading="lazy"
				decoding="async"
				src="images/icons/garda-icon-arrow-angled-purple.svg"
				alt="white arrow on purple background" />
			<img
				loading="lazy"
				decoding="async"
				src="images/icons/garda-icon-arrow-angled-black.svg"
				alt="white arrow on black background" />
		</div>
	`;
	const image = html`
		<picture class="img-box demo-card__img">
			<img src=${img} alt="demo image" />
		</picture>
	`;
	const title = html`<h3 class="demo-card__ttl">${unsafeHTML(ttl)}</h3>`;
	const subtitle = html`<p class="demo-card__sub fnt-md">
		${unsafeHTML(sub)}
	</p>`;
	const text = html`<div class="demo-card__txt">${unsafeHTML(txt)}</div>`;
	const body = html`
		${img ? image : url && arrow} ${ttl && title} ${sub && subtitle}
		${txt && text}
	`;
	const linkCard = html`
		<a
			class="demo-card link focus-outline"
			id="demo-card-${index + 1}"
			href="${url}"
			target="_blank"
			rel="noopener noreferrer">
			${body}
		</a>
	`;
	const plainCard = html`
		<section class="demo-card" id="demo-card-${index + 1}">${body}</section>
	`;

	return url ? linkCard : plainCard;
};

export const navPoint = index =>
	html`<a href="#demo-card-${index + 1}" class="focus-outline"></a>`;
