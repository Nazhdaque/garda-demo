import { throttle } from "./helpers";

const registeredSelectors = new Map();
let isListening = false;

const globalPointerMoveHandler = e => {
	if (!e.target || typeof e.target.closest !== "function") return;

	for (const [parentClass, childClass] of registeredSelectors.entries()) {
		const parentEl = e.target.closest(`.${parentClass}`);
		if (!parentEl) continue;

		const targetEl = parentEl.classList.contains(childClass)
			? parentEl
			: parentEl.querySelector(`.` + childClass);

		if (!targetEl) continue;

		try {
			const rect = targetEl.getBoundingClientRect();
			targetEl.style.setProperty("--x", e.clientX - rect.left);
			targetEl.style.setProperty("--y", e.clientY - rect.top);
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
