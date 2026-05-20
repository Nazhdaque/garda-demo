import { FetchWrapper } from "./helpers.js";
import { render } from "lit-html";
import { card, navPoint } from "./demo-cards/html.js";
import { ScrollSnapSlider } from "./demo-cards/slider.js";
import "./demo-cards/config.js";

const scrollContainer = document.querySelector(".demo-cards-wrapper");
const cardsNavPanel = document.querySelector(".demo-cards-nav");
const API = new FetchWrapper("data/");
const getCards = async () => {
	const json = await API.get("cards-data.json");
	const cards = [];
	const cardsNavPoints = [];

	json.forEach((dataset, index) => {
		const { url, img, ttl, sub, txt } = dataset;
		cards.push(card(index, url, img, ttl, sub, txt));
		cardsNavPoints.push(navPoint(index));
	});

	render(cards, scrollContainer);
	render(cardsNavPoints, cardsNavPanel);

	const setNumberOfColumns = () => {
		const num = document.querySelectorAll(".demo-card").length;
		scrollContainer.style.setProperty("--col", num);
	};

	setNumberOfColumns();

	const slider = new ScrollSnapSlider({
		scrollContainer: ".demo-cards-wrapper",
		btnPrev: "#btn-prev",
		btnNext: "#btn-next",
		navContainer: ".demo-cards-nav",
		navLinksSelector: ".demo-cards-nav a",
		activeLinkSelector: ".demo-cards-nav a.active",
		cardsSelector: ".demo-cards",
		autoplay: true,
		autoplayInterval: 3000,
		autoplayBreakpoint: 1024,
	});
};

getCards();
