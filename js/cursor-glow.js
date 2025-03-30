import { throttle } from "./helpers";

export const cursorGlow = (parentElement, childElement) => {
	document.querySelectorAll(parentElement).forEach(tile => {
		const child = tile.querySelector(childElement);
		const handler = e => {
			if (child) {
				const rect = child.getBoundingClientRect();
				child.style.setProperty("--x", e.clientX - rect.left);
				child.style.setProperty("--y", e.clientY - rect.top);
			}
		};
		tile.addEventListener("pointermove", throttle(handler));
	});
};
