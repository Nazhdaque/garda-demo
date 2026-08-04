import { toggleClass, swapClasses } from "./handlers.js";
import { resetSlider } from "./slider.js";
import { SwitchesManager } from "./SwitchesManager.js";

const configurator = document.querySelector("#configurator");
if (configurator) configurator.reset();

const cards = document.querySelector(".demo-cards");
const resetBtn = document.querySelector("#demo-cards-reset");
const settings = cards.classList;
const defaultSettings = cards.className.trim();

const idSectionHeader = document.querySelector("#option-section-header");
const idSectionSubtitle = document.querySelector("#option-section-subtitle");
const idSectionTitleMd = document.querySelector("#option-section-title-md");
const idSectionTitleLg = document.querySelector("#option-section-title-lg");

const idSectionBackground = document.querySelector("#option-background");
const idSubgrid = document.querySelector("#option-subgrid");
const idScrollSnap = document.querySelector("#option-scroll-snap");
const idOrderedList = document.querySelector("#option-list");
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
const idImageNone = document.querySelector("#option-img-none");

const idCardTitle = document.querySelector("#option-card-title");
const idCardSubtitle = document.querySelector("#option-card-subtitle");
const idCardText = document.querySelector("#option-card-text");
const idOneLineTitle = document.querySelector("#option-one-line-title");

const idCardTitleSm = document.querySelector("#option-card-title-sm");
const idCardTitleMd = document.querySelector("#option-card-title-md");
const idCardTitleLg = document.querySelector("#option-card-title-lg");

const sectionHeader = [idSectionHeader, idSectionSubtitle];
const sectionTitleSizes = [idSectionTitleMd, idSectionTitleLg];
const general = [
	idSectionBackground,
	idSubgrid,
	idScrollSnap,
	idOrderedList,
	idFlexList,
];
const columns = [idCol2, idCol3, idCol4, idCol5];
const imageSizes = [idImageXs, idImageSm, idImageMd, idImageLg];
const imageTypes = [idImageTop, idImageLeft, idImageCover, idImageNone];
const cardContent = [idCardTitle, idCardSubtitle, idCardText, idOneLineTitle];
const cardTitleSizes = [idCardTitleSm, idCardTitleMd, idCardTitleLg];

const switches = [
	...sectionHeader,
	...sectionTitleSizes,
	...general,
	...columns,
	...imageTypes,
	...imageSizes,
	...cardTitleSizes,
	...cardContent,
].filter(Boolean);

const config = [
	{
		ifMediaQuery: "(max-width: 768px)",
		disable: [idScrollSnap],
	},
	{
		ifChecked: [idFlexList],
		disable: [idScrollSnap, idSubgrid, idCardText],
	},
	{ mutuallyDisable: [[idImageLeft], [idCol4, idCol5]] },
	{ mutuallyDisable: [[idCardTitleLg], [idSectionTitleMd]] },
	{ mutuallyDisable: [[idCardSubtitle], [idCardTitleSm]] },
];

const initialDisabled = new Map();
switches.forEach(input => initialDisabled.set(input, input.disabled));

const switchesManager = new SwitchesManager(config);
switchesManager.init(switches);

switches.forEach(el =>
	el.addEventListener("change", () => {
		if (el === idFlexList) {
			toggleClass(settings, "flex-list", el);
			swapClasses(settings, "subgrid scroll-snap card-text", "");
		}
		if (el === idOneLineTitle) toggleClass(settings, "one-line-title", el);
		if (el === idSectionHeader) toggleClass(settings, "section-header", el);
		if (el === idSectionSubtitle) toggleClass(settings, "section-subtitle", el);
		if (el === idSectionTitleMd)
			swapClasses(settings, "section-title-", "section-title-md");
		if (el === idSectionTitleLg)
			swapClasses(settings, "section-title-", "section-title-lg");
		if (el === idSectionBackground) toggleClass(settings, "section-bg", el);
		if (el === idSubgrid) toggleClass(settings, "subgrid", el);
		if (el === idScrollSnap)
			(toggleClass(settings, "scroll-snap", el), resetSlider());
		if (el === idOrderedList) toggleClass(settings, "ordered-list", el);
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
		if (el === idImageNone) swapClasses(settings, "img-pos-");
		if (el === idCardTitle) toggleClass(settings, "card-title", el);
		if (el === idCardSubtitle) toggleClass(settings, "card-subtitle", el);
		if (el === idCardText) toggleClass(settings, "card-text", el);
		if (el === idCardTitleSm)
			swapClasses(settings, "card-title-", "card-title-sm");
		if (el === idCardTitleMd)
			swapClasses(settings, "card-title-", "card-title-md");
		if (el === idCardTitleLg)
			swapClasses(settings, "card-title-", "card-title-lg");
	}),
);

resetBtn.addEventListener("click", e => {
	e.preventDefault();
	cards.className = defaultSettings;
	switches.forEach(input => {
		input.checked = input.defaultChecked;
		input.disabled = initialDisabled.get(input);
	});
	switchesManager.handle(switches);
});
