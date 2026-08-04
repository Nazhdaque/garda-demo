import { FetchWrapper } from "./helpers.js";
import { render } from "lit-html";
import { card, navPoint } from "./demo-cards/html.js";
import { ScrollSnapSlider } from "./demo-cards/slider.js";
import "./demo-cards/config.js";

const scrollContainer = document.querySelector(".demo-cards-wrapper");
const cardsNavPanel = document.querySelector(".demo-cards-nav");
const API = new FetchWrapper("data/");
const getCards = async () => {
	try {
		const json = await API.get("cards-data.json");
		if (!json || !Array.isArray(json)) return;

		const cards = json.map((dataset, index) => {
			const { url, img, ttl, sub, txt } = dataset;
			return card(index, url, img, ttl, sub, txt);
		});

		const cardsNavPoints = json.map((_, index) => navPoint(index));

		render(cards, scrollContainer);
		render(cardsNavPoints, cardsNavPanel);

		if (scrollContainer) {
			const actualCardsCount =
				scrollContainer.querySelectorAll(".demo-card").length;
			scrollContainer.style.setProperty("--col", actualCardsCount);
		}

		new ScrollSnapSlider({
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
	} catch (error) {
		console.error("Failed to load cards:", error.message);
	}
};

getCards();
