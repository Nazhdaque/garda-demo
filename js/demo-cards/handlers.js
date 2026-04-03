// const getPrefix = string => string.slice(0, string.lastIndexOf("-") + 1);

const removeClasses = (classes, prefix) =>
	Array.from(classes).filter(item => item.startsWith(prefix));

export const toggleClass = (classes, className) => classes.toggle(className);

export const swapClasses = (classes, del, add) => {
	del
		.trim()
		.split(/\s+/)
		.forEach(item => {
			if (item) classes.remove(...removeClasses(classes, item));
		});

	if (add) {
		add
			.trim()
			.split(/\s+/)
			.forEach(item => {
				if (item) classes.add(item);
			});
	}
};

export const resetSlider = () => {
	const scrollContainer = document.querySelector(".demo-cards-wrapper");
	const navLinks = document.querySelectorAll(".demo-cards-nav a");
	navLinks.forEach(item => item.classList.remove("active"));
	navLinks[0].classList.add("active");
	scrollContainer.scrollTo({ left: 0 });
};

export const getInputs = (radios, checkboxes) => {
	const set = new Set();
	[...radios, ...checkboxes].forEach(el => {
		if (el && (el.type === "checkbox" || el.type === "radio")) {
			set.add(el);
		}
	});
	return [...set];
};

export const handleSwitches = ({
	radios,
	checkboxes,
	preventEnableAll,
	preventDisableAll,
}) => {
	const allInputs = getInputs(radios, checkboxes);

	// 1. Сначала разблокируем все элементы
	allInputs.forEach(el => {
		el.disabled = false;
	});

	// 2. Применяем preventEnableAll только через disabled
	preventEnableAll.forEach(combo => {
		const comboElements = combo
			.map(el =>
				el &&
				el.nodeType === 1 &&
				(el.type === "checkbox" || el.type === "radio")
					? { el, checked: el.checked }
					: null,
			)
			.filter(Boolean);

		if (comboElements.length < 2) return;

		const checked = comboElements.filter(e => e.checked);
		const unchecked = comboElements.filter(e => !e.checked);

		// Если все включены → блокируем последний в массиве
		if (checked.length === comboElements.length) {
			const last = comboElements[comboElements.length - 1];
			last && (last.el.disabled = true);
			return;
		}

		// Если все, кроме одного — включены → блокируем единственный выключенный
		if (checked.length === comboElements.length - 1 && unchecked.length === 1) {
			unchecked[0].el.disabled = true;
		}
	});

	// 3. В preventDisableAll всегда хотя бы один элемент включён

	// Фильтруем preventDisableAll по реально включённым/выключенным
	const activeGroupEls = preventDisableAll.filter(
		el => el && (el.type === "checkbox" || el.type === "radio"),
	);

	if (activeGroupEls.length === 0) return;

	const checked = activeGroupEls.filter(el => el.checked);
	const enabled = activeGroupEls.filter(el => !el.disabled);

	// 3.1 Если все включённые элементы preventDisableAll выключены
	if (checked.length === 0) {
		// но среди них есть хотя бы один не‑disabled
		if (enabled.length > 0) {
			const first = enabled.find(el => el);
			if (first) {
				first.checked = true;
			}
		}
		// если все вообще disabled — разблокируем один
		else if (activeGroupEls.length > 0) {
			const any = activeGroupEls.find(el => el);
			if (any) {
				any.disabled = false;
				any.checked = true;
			}
		}
		return;
	}

	// 3.2 Если включён только один и он не заблокирован → блокируем его
	if (checked.length === 1 && !checked[0].disabled) {
		checked[0].disabled = true;
	}

	// 3.3 Если все элементы preventDisableAll заблокированы
	if (enabled.length === 0 && activeGroupEls.length > 0) {
		const any = activeGroupEls.find(el => el);
		if (any) {
			any.disabled = false;
		}
	}
};
