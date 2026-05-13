import { FetchWrapper } from "./helpers.js";
import { render } from "lit-html";
import { card, navPoint } from "./demo-cards/html.js";
import "./demo-cards/config.js";
import { getSliderNav } from "./demo-cards/slider.js";

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
	getSliderNav();
};

getCards();
