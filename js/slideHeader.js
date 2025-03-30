import { throttle } from "./helpers";

export const slideHeader = (el, cls) => {
	const header = document.querySelector(el);
	let lastKnownScrollPosition = 0;
	let deltaY = 0;

	const getDeltaY = () => {
		deltaY = window.scrollY - lastKnownScrollPosition;
		lastKnownScrollPosition = window.scrollY;
		return deltaY;
	};

	const toggleHeaderState = deltaY =>
		deltaY < 0 ? header.classList.remove(cls) : header.classList.add(cls);

	const handler = () => toggleHeaderState(getDeltaY());

	document.addEventListener("scroll", throttle(handler));
};
