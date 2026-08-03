import { throttle } from "./helpers";

const registeredSelectors = new Map();
let isListening = false;

const globalPointerMoveHandler = e => {
	for (const [parentSelector, childClass] of registeredSelectors.entries()) {
		const parentEl = e.target.closest(`.${parentSelector}`);
		if (!parentEl) continue;

		const childEl = parentEl.classList.contains(childClass)
			? parentEl
			: parentEl.querySelector(`.` + childClass);

		if (!childEl) continue;

		try {
			const rect = childEl.getBoundingClientRect();
			childEl.style.setProperty("--x", e.clientX - rect.left);
			childEl.style.setProperty("--y", e.clientY - rect.top);
		} catch (err) {
			console.error(err);
		}
	}
};

export const cursorGlow = (parentClass, childClass) => {
	registeredSelectors.set(parentClass, childClass);

	if (!isListening) {
		document.addEventListener(
			"pointermove",
			throttle(globalPointerMoveHandler),
		);
		isListening = true;
	}
};
