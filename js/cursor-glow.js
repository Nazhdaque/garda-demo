import { throttle } from "./helpers";

export const cursorGlow = (parentElement, childElement) => {
	document.querySelectorAll("." + parentElement).forEach(tile => {
		const child = tile.querySelector("." + childElement);
		const handler = e => {
			try {
				const rect = child.getBoundingClientRect();
				child.style.setProperty("--x", e.clientX - rect.left);
				child.style.setProperty("--y", e.clientY - rect.top);
			} catch (e) {
				console.error(e);
			}
		};
		tile.addEventListener("pointermove", throttle(handler));
	});
};
