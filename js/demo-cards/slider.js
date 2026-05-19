const scrollContainer = document.querySelector(".demo-cards-wrapper");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const navButtons = [btnPrev, btnNext];

const NAV_LINKS_SELECTOR = ".demo-cards-nav a";
const ACTIVE_LINK_SELECTOR = ".demo-cards-nav a.active";
const CARDS_SELECTOR = ".demo-cards";

export const resetSlider = () => {
	const navLinks = document.querySelectorAll(NAV_LINKS_SELECTOR);

	navLinks.forEach(item => item.classList.remove("active"));
	navLinks[0]?.classList.add("active");

	btnPrev.disabled = true;
	btnNext.disabled = navLinks.length <= 1;
	scrollContainer.scrollTo({ left: 0 });
};

export const getSliderNav = () => {
	const navLinks = Array.from(document.querySelectorAll(NAV_LINKS_SELECTOR));
	const cards = document.querySelector(CARDS_SELECTOR);
	const navContainer = document.querySelector(".demo-cards-nav");

	if (!navLinks.length || !cards) return;

	let isScrolling = false;
	let scrollEndTimeout = null;

	const getColCount = () =>
		Number(getComputedStyle(cards).getPropertyValue("--col")) || 1;

	const getCurrentIndex = () => {
		const active = document.querySelector(ACTIVE_LINK_SELECTOR);
		return navLinks.indexOf(active);
	};

	const getTargetScrollLeft = link => {
		if (!link) return 0;
		const target = document.querySelector(link.getAttribute("href"));
		if (!target) return 0;

		return (
			target.getBoundingClientRect().left -
			scrollContainer.getBoundingClientRect().left +
			scrollContainer.scrollLeft
		);
	};

	const updateSliderState = nextIndex => {
		const count = getColCount();
		const targetLink = navLinks[nextIndex];

		if (!targetLink) return;

		// Скролл и обновление классов
		scrollContainer.scrollTo({
			left: getTargetScrollLeft(targetLink),
			behavior: "smooth",
		});

		navLinks.forEach(item =>
			item.classList.toggle("active", item === targetLink),
		);

		// Обновление состояния кнопок
		btnPrev.disabled = nextIndex < count;
		btnNext.disabled = nextIndex >= navLinks.length - count;
	};

	const handleStep = stepMultiplier => {
		const currentIndex = getCurrentIndex();
		if (currentIndex === -1) return;

		const step = stepMultiplier * getColCount();
		// Ограничиваем индекс в пределах массива
		const nextIndex = Math.max(
			0,
			Math.min(currentIndex + step, navLinks.length - 1),
		);

		if (nextIndex !== currentIndex) {
			updateSliderState(nextIndex);
		}
	};

	// --- Слушатели событий ---

	// Кнопки влево / вправо
	navButtons.forEach(button => {
		button.addEventListener("click", event => {
			event.preventDefault();
			handleStep(button === btnNext ? 1 : -1);
		});
	});

	// Клик по точкам навигации (Делегирование событий)
	navContainer?.addEventListener("click", event => {
		const link = event.target.closest(NAV_LINKS_SELECTOR);
		const index = navLinks.indexOf(link);

		if (index !== -1) {
			event.preventDefault();
			updateSliderState(index);
		}
	});

	// Скролл колесом мыши
	scrollContainer.addEventListener(
		"wheel",
		event => {
			event.preventDefault();
			if (isScrolling) return;

			isScrolling = true;
			scrollContainer.classList.add("disable-snap");

			const direction = event.deltaY > 0 || event.deltaX > 0 ? 1 : -1;
			handleStep(direction);

			// Запасной таймаут на случай, если scrollend не поддерживается браузером
			clearTimeout(scrollEndTimeout);
			scrollEndTimeout = setTimeout(() => {
				if (isScrolling) {
					scrollContainer.classList.remove("disable-snap");
					isScrolling = false;
				}
			}, 400);
		},
		{ passive: false },
	);

	// Очистка флагов после завершения анимации скролла
	scrollContainer.addEventListener("scrollend", () => {
		clearTimeout(scrollEndTimeout);
		scrollContainer.classList.remove("disable-snap");
		isScrolling = false;
	});
};
