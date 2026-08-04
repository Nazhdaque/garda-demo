export const createDelBtn = (el, cls) => {
	document.querySelectorAll(`.${el}`).forEach(item => {
		const btn = document.createElement("button");
		btn.classList.add(cls);

		btn.addEventListener("click", () => {
			const grid = item.nextElementSibling;

			if (grid?.classList.contains("garda-demo-grid")) {
				grid.remove();
			}
			item.remove();
		});

		item.appendChild(btn);
	});
};

const getGrid = item => {
	const grid = document.createElement("ol");
	grid.classList.add("demo", "grid-x", "garda-demo-grid");

	for (let i = 12; i > 0; i--) {
		const gridItem = document.createElement("li");
		if (i > 8) {
			gridItem.classList.add("md-d-none");
		} else if (i > 4) {
			gridItem.classList.add("sm-d-none");
		}
		grid.appendChild(gridItem);
	}
	item.insertAdjacentElement("afterend", grid);
};
