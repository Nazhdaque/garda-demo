const scrollContainer = document.querySelector(".demo-cards-wrapper");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const navButtons = [btnPrev, btnNext];

export const resetSlider = () => {
	const navLinks = document.querySelectorAll(".demo-cards-nav a");

	navLinks.forEach(item => item.classList.remove("active"));
	navLinks[0]?.classList.add("active");
	btnPrev.disabled = true;
	btnNext.disabled = navLinks.length <= 1;
	scrollContainer.scrollTo({ left: 0 });
};

export const getSliderNav = () => {
	const navLinks = document.querySelectorAll(".demo-cards-nav a");
	const cards = document.querySelector(".demo-cards");

	if (!navLinks.length || !cards) return;

	const getColCount = () =>
		Number(getComputedStyle(cards).getPropertyValue("--col"));

	const getTargetX = link => {
		if (!link) return 0;

		const targetElement = document.querySelector(link.getAttribute("href"));
		const targetRect = targetElement.getBoundingClientRect();
		const containerRect = scrollContainer.getBoundingClientRect();

		return targetRect.left - containerRect.left + scrollContainer.scrollLeft;
	};

	const setActiveLink = activeLink => {
		navLinks.forEach(item =>
			item.classList.toggle("active", item === activeLink),
		);
	};

	const updateButtonsState = activeIndex => {
		const colCount = getColCount();
		btnPrev.disabled = activeIndex < colCount;
		btnNext.disabled = activeIndex >= navLinks.length - colCount;
	};

	const activateLink = (activeLink, activeIndex) => {
		if (!activeLink) return;

		scrollContainer.scrollTo({ left: getTargetX(activeLink) });
		setActiveLink(activeLink);
		updateButtonsState(activeIndex);
	};

	const moveByButtons = button => {
		const activeLink = document.querySelector(".demo-cards-nav a.active");
		if (!activeLink) return;

		const colCount = getColCount();
		const currentIndex = [...navLinks].findIndex(link => link === activeLink);
		if (currentIndex === -1) return;

		const direction = button === btnNext ? 1 : -1;
		const nextIndex =
			(currentIndex + direction * colCount + navLinks.length) % navLinks.length;

		activateLink(navLinks[nextIndex], nextIndex);
	};

	navLinks.forEach((point, index) => {
		if (index === 0) point.classList.add("active");

		point.addEventListener("click", e => {
			e.preventDefault();
			activateLink(e.currentTarget, index);
		});
	});

	navButtons.forEach(button => {
		button.addEventListener("click", e => {
			e.preventDefault();
			moveByButtons(button);
		});
	});
};
