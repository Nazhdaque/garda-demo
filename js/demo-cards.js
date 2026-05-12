import { FetchWrapper, GetCustomPropsValues } from "./helpers.js";
import { render } from "lit-html";
import { card, navPoint } from "./demo-cards/html.js";
import "./demo-cards/config.js";

const scrollContainer = document.querySelector(".demo-cards-wrapper");
const cardsNavPanel = document.querySelector(".demo-cards-nav");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");

const handleNavLinkClick = (e, navLinks) => {
	e.preventDefault();

	const activeLink = e.currentTarget;
	const targetId = activeLink.getAttribute("href");
	const targetElement = document.querySelector(targetId);
	const rect = targetElement.getBoundingClientRect();
	const containerRect = scrollContainer.getBoundingClientRect();
	const scrollLeft = scrollContainer.scrollLeft;
	const targetX = rect.left - containerRect.left + scrollLeft;

	navLinks.forEach(item => {
		if (item.classList.contains("active")) item.classList.remove("active");
	});
	scrollContainer.scrollTo({ left: targetX });
	activeLink.classList.add("active");
	activeLink === navLinks[navLinks.length - 1]
		? (btnNext.disabled = true)
		: (btnNext.disabled = false);
	activeLink === navLinks[0]
		? (btnPrev.disabled = true)
		: (btnPrev.disabled = false);
};

const getSliderNav = () => {
	const navLinks = document.querySelectorAll(".demo-cards-nav a");
	navLinks.forEach((point, i) => {
		if (i === 0) point.classList.add("active");
		point.addEventListener("click", e => handleNavLinkClick(e, navLinks));
	});
};

const navButtons = [btnPrev, btnNext];
navButtons.forEach(button =>
	button.addEventListener("click", e => {
		e.preventDefault();

		const getNextActiveLink = (sibling, n) => {
			for (let i = 0; i < n; i++) {
				switch (button) {
					case btnNext:
						if (!sibling) return navLinks[navLinks.length - 1];
						sibling = sibling.nextElementSibling;
						break;
					case btnPrev:
						if (!sibling) return navLinks[0];
						sibling = sibling.previousElementSibling;
						break;
				}
			}
			return sibling;
		};

		const navLinks = document.querySelectorAll(".demo-cards-nav a");
		const activeLink = document.querySelector(".demo-cards-nav a.active");
		const index = Number(
			getComputedStyle(document.querySelector(".demo-cards")).getPropertyValue(
				"--col",
			),
		);
		const nextActiveLink = getNextActiveLink(activeLink, index);
		const targetId = nextActiveLink.getAttribute("href");
		const targetElement = document.querySelector(targetId);
		const rect = targetElement.getBoundingClientRect();
		const containerRect = scrollContainer.getBoundingClientRect();
		const scrollLeft = scrollContainer.scrollLeft;
		const targetX = rect.left - containerRect.left + scrollLeft;

		activeLink.classList.remove("active");
		scrollContainer.scrollTo({ left: targetX });
		nextActiveLink.classList.add("active");

		nextActiveLink === navLinks[navLinks.length - 1]
			? (btnNext.disabled = true)
			: (btnNext.disabled = false);
		nextActiveLink === navLinks[0]
			? (btnPrev.disabled = true)
			: (btnPrev.disabled = false);
	}),
);

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
