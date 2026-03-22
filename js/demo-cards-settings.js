const demoCards = document.querySelector(".demo-cards");
const idSubgrid = document.querySelector("#option-subgrid");
const idImgNone = document.querySelector("#option-no-img");
const idImgPosTop = document.querySelector("#option-img-top");
const idImgPosLeft = document.querySelector("#option-img-left");
const idImgPosCover = document.querySelector("#option-img-cover");
const idTitle = document.querySelector("#option-title");
const idSubtitle = document.querySelector("#option-subtitle");
const idText = document.querySelector("#option-txt");
const idCol2 = document.querySelector("#option-col-2");
const idCol3 = document.querySelector("#option-col-3");
const idCol4 = document.querySelector("#option-col-4");
const idScroll = document.querySelector("#option-scroll");
const idBg = document.querySelector("#option-вackground");
const idImgSizeSm = document.querySelector("#option-img-size-sm");
const idImgSizeMd = document.querySelector("#option-img-size-md");
const idImgSizeLg = document.querySelector("#option-img-size-lg");
const settings = demoCards.classList;

const toggleSetting = setting => settings.toggle(setting);
const getPrefix = string => string.slice(0, string.lastIndexOf("-") + 1);
const delClasses = (classes, prefix) =>
	Array.from(classes).filter(item => item.startsWith(prefix));

const swapTo = (string, mode = "add") => {
	const classes = string.split(" ");
	classes.forEach(item =>
		settings.remove(...delClasses(settings, getPrefix(item))),
	);
	mode === "add" && settings.add(...classes);
};

idTitle.addEventListener("change", () => toggleSetting("title"));
idSubtitle.addEventListener("change", () => toggleSetting("subtitle"));
idText.addEventListener("change", () => toggleSetting("text"));
idSubgrid.addEventListener("change", () => toggleSetting("subgrid"));
idImgSizeSm.addEventListener("change", () => swapTo("img-size-sm"));
idImgSizeMd.addEventListener("change", () => swapTo("img-size-md"));
idImgSizeLg.addEventListener("change", () => swapTo("img-size-lg"));
idImgNone.addEventListener("change", () => swapTo("img-pos-any", "del"));
idImgPosTop.addEventListener("change", () => swapTo("img-pos-top"));
idImgPosLeft.addEventListener("change", () => swapTo("img-pos-left"));
idImgPosCover.addEventListener("change", () =>
	swapTo("img-pos-top img-pos-cover"),
);
idCol2.addEventListener("change", () => swapTo("col-2"));
idCol3.addEventListener("change", () => swapTo("col-3"));
idCol4.addEventListener("change", () => swapTo("col-4"));
idScroll.addEventListener("change", () => toggleSetting("scroll"));
idBg.addEventListener("change", () => toggleSetting("section-bg"));
