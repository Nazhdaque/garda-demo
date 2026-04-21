import {
	toggleClass,
	swapClasses,
	resetSlider,
	handleSwitches,
} from "./handlers.js";

const cards = document.querySelector(".demo-cards");
const resetBtn = document.querySelector("#demo-cards-reset");
const settings = cards.classList;
const defaultSettings = cards.className.trim();

const idArticleHeader = document.querySelector("#option-article-header");
const idArticleSubtitle = document.querySelector("#option-article-subtitle");
const idArticleTitleMd = document.querySelector("#option-article-title-md");
const idArticleTitleLg = document.querySelector("#option-article-title-lg");

const idBg = document.querySelector("#option-background");
const idSubgrid = document.querySelector("#option-subgrid");
const idScroll = document.querySelector("#option-scroll");
const idList = document.querySelector("#option-list");
const idFlexList = document.querySelector("#option-flex-list");

const idCol2 = document.querySelector("#option-col-2");
const idCol3 = document.querySelector("#option-col-3");
const idCol4 = document.querySelector("#option-col-4");
const idCol5 = document.querySelector("#option-col-5");

const idImageXs = document.querySelector("#option-img-xs");
const idImageSm = document.querySelector("#option-img-sm");
const idImageMd = document.querySelector("#option-img-md");
const idImageLg = document.querySelector("#option-img-lg");

const idImageTop = document.querySelector("#option-img-top");
const idImageLeft = document.querySelector("#option-img-left");
const idImageCover = document.querySelector("#option-img-cover");
const idImageLogo = document.querySelector("#option-img-logo");
const idImageNone = document.querySelector("#option-img-none");

const idCardHeader = document.querySelector("#option-card-header");
const idSubtitle = document.querySelector("#option-subtitle");
const idText = document.querySelector("#option-txt");
const idOneLineTitle = document.querySelector("#option-one-line-title");

const idTitleSm = document.querySelector("#option-title-sm");
const idTitleMd = document.querySelector("#option-title-md");
const idTitleLg = document.querySelector("#option-title-lg");

const header = [idArticleHeader, idArticleSubtitle];
const articleTitleSizes = [idArticleTitleMd, idArticleTitleLg];
const general = [idBg, idSubgrid, idScroll, idList, idFlexList];
const columns = [idCol2, idCol3, idCol4, idCol5];
const imageSizes = [idImageXs, idImageSm, idImageMd, idImageLg];
const imageTypes = [
	idImageTop,
	idImageLeft,
	idImageCover,
	idImageLogo,
	idImageNone,
];
const content = [idCardHeader, idSubtitle, idText, idOneLineTitle];
const titleSizes = [idTitleSm, idTitleMd, idTitleLg];

const switches = [
	...articleTitleSizes,
	...columns,
	...imageSizes,
	...imageTypes,
	...titleSizes,
	...header,
	...general,
	...content,
].filter(Boolean);

const preventEnableAll = [
	[idCol4, idImageLeft],
	[idCol5, idImageLeft],

	[idCol4, idTitleLg],
	[idCol5, idTitleLg],

	// [idList, idImageLogo],
	// [idFlexList, idScroll],
	// [idFlexList, idSubgrid],
];

const dependencyRules = [
	[[idImageLogo], content],
	[[idFlexList], [idSubtitle, idText]],
	[[idImageLeft], [idCol4, idCol5]],
	[[idCol4], [idImageLeft]],
	[[idCol5], [idImageLeft]],
	[[idFlexList, idImageCover], content],
];

const initialDisabled = new Map();
switches.forEach(input => initialDisabled.set(input, input.disabled));

document.addEventListener("DOMContentLoaded", () =>
	handleSwitches(dependencyRules),
);

switches.forEach(el =>
	el.addEventListener("change", () => {
		if (el === idFlexList) toggleClass(settings, "flex-list");
		if (el === idOneLineTitle) toggleClass(settings, "one-line-title");
		if (el === idArticleHeader) toggleClass(settings, "article-header");
		if (el === idArticleSubtitle) toggleClass(settings, "article-subtitle");
		if (el === idArticleTitleMd)
			swapClasses(settings, "article-title-", "article-title-md");
		if (el === idArticleTitleLg)
			swapClasses(settings, "article-title-", "article-title-lg");
		if (el === idBg) toggleClass(settings, "section-bg");
		if (el === idSubgrid) toggleClass(settings, "subgrid");
		if (el === idScroll) (toggleClass(settings, "scroll"), resetSlider());
		if (el === idList) toggleClass(settings, "list");
		if (el === idCol2) (swapClasses(settings, "col-", "col-2"), resetSlider());
		if (el === idCol3) (swapClasses(settings, "col-", "col-3"), resetSlider());
		if (el === idCol4) (swapClasses(settings, "col-", "col-4"), resetSlider());
		if (el === idCol5) (swapClasses(settings, "col-", "col-5"), resetSlider());
		if (el === idImageXs) swapClasses(settings, "img-size-", "img-size-xs");
		if (el === idImageSm) swapClasses(settings, "img-size-", "img-size-sm");
		if (el === idImageMd) swapClasses(settings, "img-size-", "img-size-md");
		if (el === idImageLg) swapClasses(settings, "img-size-", "img-size-lg");
		if (el === idImageTop) swapClasses(settings, "img-pos-", "img-pos-top");
		if (el === idImageLeft) swapClasses(settings, "img-pos-", "img-pos-left");
		if (el === idImageCover)
			swapClasses(settings, "img-pos-", "img-pos-top img-pos-cover");
		if (el === idImageLogo)
			swapClasses(settings, "img-pos-", "img-pos-top img-pos-logo");
		if (el === idImageNone) swapClasses(settings, "img-pos-");
		if (el === idCardHeader) toggleClass(settings, "card-header");
		if (el === idSubtitle) toggleClass(settings, "subtitle");
		if (el === idText) toggleClass(settings, "text");
		if (el === idTitleSm) swapClasses(settings, "title-", "title-sm");
		if (el === idTitleMd) swapClasses(settings, "title-", "title-md");
		if (el === idTitleLg) swapClasses(settings, "title-", "title-lg");
		handleSwitches(dependencyRules);
	}),
);

resetBtn.addEventListener("click", e => {
	e.preventDefault();
	cards.className = defaultSettings;
	switches.forEach(input => {
		input.checked = input.defaultChecked;
		input.disabled = initialDisabled.get(input);
	});
});
