import { html } from "lit-html";

export const card = (url, ttl, sub, txt) => {
	const getImg = () => html`
		<picture class="img-box demo-card__img">
			<img src=${url} alt="demo img" />
		</picture>
	`;
	const getTtl = () => html`<h3 class="demo-card__ttl fnt-lg">${ttl}</h3>`;
	const getSub = () => html`<p class="demo-card__sub fnt-md">${sub}</p>`;
	const getTxt = () => {
		const text = document.createElement("div");
		text.classList.add("demo-card__txt");
		text.innerHTML = txt;
		return text;
	};
	const getCard = () => html`
		<section class="demo-card">
			${url && getImg(url)} ${ttl && getTtl(ttl)} ${sub && getSub(sub)}
			${txt && getTxt(txt)}
		</section>
	`;
	return getCard();
};
