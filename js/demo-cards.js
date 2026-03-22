import { FetchWrapper } from "./helpers.js";
import { render } from "lit-html";
import { card } from "./demo-cards-html.js";

const container = document.querySelector(".demo-cards-wrapper");

const API = new FetchWrapper("data/");
const getCards = async () => {
	const json = await API.get("cards-data.json");
	const cards = [];

	json.forEach(dataset => {
		const { url, ttl, sub, txt } = dataset;
		cards.push(card(url, ttl, sub, txt));
	});

	render(cards, container);

	const setNumberOfColumns = () => {
		const num = document.querySelectorAll(".demo-card").length;
		container.style.setProperty("--col", num);
	};

	setNumberOfColumns();
};

getCards();
