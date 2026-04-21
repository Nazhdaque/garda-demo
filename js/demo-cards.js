import { FetchWrapper } from "./helpers.js";
import { render } from "lit-html";
import { card, navPoint } from "./demo-cards/html.js";
import "./demo-cards/config.js";

const scrollContainer = document.querySelector(".demo-cards-wrapper");
const cardsNavPanel = document.querySelector(".demo-cards-nav");

const getSliderNav = () => {
	const navLinks = document.querySelectorAll(".demo-cards-nav a");
	// let prevActivePoint = 0;

	navLinks.forEach((point, i) => {
		if (i === 0) point.classList.add("active");

		point.addEventListener("click", e => {
			e.preventDefault();

			const targetId = e.currentTarget.getAttribute("href");
			const targetElement = document.querySelector(targetId);
			const rect = targetElement.getBoundingClientRect();
			const containerRect = scrollContainer.getBoundingClientRect();
			const scrollLeft = scrollContainer.scrollLeft;
			const targetX = rect.left - containerRect.left + scrollLeft;

			navLinks.forEach(item => {
				if (item.classList.contains("active")) {
					item.classList.remove("active");
				}
			});
			// navLinks[prevActivePoint].classList.remove("active");
			scrollContainer.scrollTo({ left: targetX });
			point.classList.add("active");
			// prevActivePoint = i;
		});
	});
};

const API = new FetchWrapper("data/");
const getCards = async () => {
	const json = await API.get("cards-data.json");
	const cards = [];
	const cardsNavPoints = [];

	json.forEach((dataset, index) => {
		const { url, ttl, sub, txt } = dataset;
		cards.push(card(index, url, ttl, sub, txt));
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
