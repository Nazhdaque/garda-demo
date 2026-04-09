import {
	toggleClass,
	swapClasses,
	resetSlider,
	getInputs,
	handleSwitches,
} from "./handlers.js";

const settings = document.querySelector(".demo-cards").classList;

const idArticleHeader = document.querySelector("#option-article-header");
const idArticleSubtitle = document.querySelector("#option-article-subtitle");
const idArticleTitleSm = document.querySelector("#option-article-title-sm");
const idArticleTitleMd = document.querySelector("#option-article-title-md");
const idArticleTitleLg = document.querySelector("#option-article-title-lg");

const idBg = document.querySelector("#option-вackground");
const idSubgrid = document.querySelector("#option-subgrid");
const idScroll = document.querySelector("#option-scroll");
const idList = document.querySelector("#option-list");

const idCol2 = document.querySelector("#option-col-2");
const idCol3 = document.querySelector("#option-col-3");
const idCol4 = document.querySelector("#option-col-4");
const idCol5 = document.querySelector("#option-col-5");

const idImageSm = document.querySelector("#option-img-sm");
const idImageMd = document.querySelector("#option-img-md");
const idImageLg = document.querySelector("#option-img-lg");

const idImageTop = document.querySelector("#option-img-top");
const idImageLeft = document.querySelector("#option-img-left");
const idImageCover = document.querySelector("#option-img-cover");
const idImageNone = document.querySelector("#option-img-none");

const idTitle = document.querySelector("#option-title");
const idSubtitle = document.querySelector("#option-subtitle");
const idText = document.querySelector("#option-txt");

const idTitleSm = document.querySelector("#option-title-sm");
const idTitleMd = document.querySelector("#option-title-md");
const idTitleLg = document.querySelector("#option-title-lg");

const header = [idArticleHeader, idArticleSubtitle];
const articleTitleSizes = [
	idArticleTitleSm,
	idArticleTitleMd,
	idArticleTitleLg,
];
const general = [idBg, idSubgrid, idScroll, idList];
const columns = [idCol2, idCol3, idCol4, idCol5];
const imageSizes = [idImageSm, idImageMd, idImageLg];
const imagePositions = [idImageTop, idImageLeft, idImageCover, idImageNone];
const content = [idTitle, idSubtitle, idText];
const titleSizes = [idTitleSm, idTitleMd, idTitleLg];
const radios = [
	...articleTitleSizes,
	...columns,
	...imageSizes,
	...imagePositions,
	...titleSizes,
];
const checkboxes = [...header, ...general, ...content];

const preventEnableAll = [
	[idCol4, idImageLg],
	[idCol5, idImageLg],

	[idCol4, idImageLeft],
	[idCol5, idImageLeft],

	[idCol4, idTitleLg],
	[idCol5, idTitleLg],

	[idTitleSm, idSubtitle],
	[idArticleTitleMd, idTitleLg],
];
const preventDisableAll = [...content];

const config = {
	radios,
	checkboxes,
	preventEnableAll,
	preventDisableAll,
};

document.addEventListener("DOMContentLoaded", () => handleSwitches(config));

getInputs(radios, checkboxes).forEach(el =>
	el.addEventListener("change", () => {
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
		if (el === idImageSm) swapClasses(settings, "img-size-", "img-size-sm");
		if (el === idImageMd) swapClasses(settings, "img-size-", "img-size-md");
		if (el === idImageLg) swapClasses(settings, "img-size-", "img-size-lg");
		if (el === idImageTop) swapClasses(settings, "img-pos-", "img-pos-top");
		if (el === idImageLeft) swapClasses(settings, "img-pos-", "img-pos-left");
		if (el === idImageCover)
			swapClasses(settings, "img-pos-", "img-pos-top img-pos-cover");
		if (el === idImageNone) swapClasses(settings, "img-pos-");
		if (el === idTitle) toggleClass(settings, "title");
		if (el === idSubtitle) toggleClass(settings, "subtitle");
		if (el === idText) toggleClass(settings, "text");
		if (el === idTitleSm) swapClasses(settings, "title-", "title-sm");
		if (el === idTitleMd) swapClasses(settings, "title-", "title-md");
		if (el === idTitleLg) swapClasses(settings, "title-", "title-lg");
		handleSwitches(config);
	}),
);
