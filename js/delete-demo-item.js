export const createDelBtn = (el, cls) => {
	document.querySelectorAll("." + el).forEach(item => {
		// getGrid(item);
		getBtn(item, cls);
		delSection(cls);
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

const getBtn = (item, cls) => {
	const btn = document.createElement("button");
	btn.classList.add(cls);
	item.appendChild(btn);
};

const delSection = cls =>
	document.querySelectorAll("." + cls).forEach(item => {
		item.addEventListener("click", e => {
			const box = e.currentTarget.parentElement;
			const grid = box.nextElementSibling;
			const del = elements =>
				elements.forEach(item => item.classList.add("d-none"));
			grid && grid.classList.contains("garda-demo-grid")
				? del([box, grid])
				: del([box]);
		});
	});
