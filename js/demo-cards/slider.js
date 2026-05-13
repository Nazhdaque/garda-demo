const scrollContainer = document.querySelector(".demo-cards-wrapper");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const navButtons = [btnPrev, btnNext];

export const resetSlider = () => {
	const navLinks = document.querySelectorAll(".demo-cards-nav a");
	navLinks.forEach(item => item.classList.remove("active"));
	navLinks[0].classList.add("active");
	btnPrev.disabled = true;
	btnNext.disabled = false;
	scrollContainer.scrollTo({ left: 0 });
};

export const getSliderNav = () => {
	const navLinks = document.querySelectorAll(".demo-cards-nav a");
	navLinks.forEach((point, i) => {
		if (i === 0) point.classList.add("active");
		point.addEventListener("click", e => {
			e.preventDefault();

			const activeLink = e.currentTarget;
			const targetId = activeLink.getAttribute("href");
			const targetElement = document.querySelector(targetId);
			const rect = targetElement.getBoundingClientRect();
			const containerRect = scrollContainer.getBoundingClientRect();
			const scrollLeft = scrollContainer.scrollLeft;
			const targetX = rect.left - containerRect.left + scrollLeft;

			navLinks.forEach(item => {
				if (item.classList.contains("active")) item.classList.remove("active");
			});
			scrollContainer.scrollTo({ left: targetX });
			activeLink.classList.add("active");

			const index = Number(
				getComputedStyle(
					document.querySelector(".demo-cards"),
				).getPropertyValue("--col"),
			);
			const activeLinkIndex = Array.from(navLinks).indexOf(activeLink);
			btnNext.disabled = activeLinkIndex >= navLinks.length - index;
			btnPrev.disabled = activeLinkIndex < index;
		});
	});
};

navButtons.forEach(button => {
	button.addEventListener("click", e => {
		e.preventDefault();

		const navLinks = document.querySelectorAll(".demo-cards-nav a");
		const activeLink = document.querySelector(".demo-cards-nav a.active");
		const index = Number(
			getComputedStyle(document.querySelector(".demo-cards")).getPropertyValue(
				"--col",
			),
		);

		let nextActiveLink;

		if (button === btnNext) {
			let currentIndex = Array.from(navLinks).indexOf(activeLink);
			nextActiveLink = navLinks[(currentIndex + index) % navLinks.length];
		} else if (button === btnPrev) {
			let currentIndex = Array.from(navLinks).indexOf(activeLink);
			nextActiveLink =
				navLinks[(currentIndex - index + navLinks.length) % navLinks.length];
		}

		const targetId = nextActiveLink.getAttribute("href");
		const targetElement = document.querySelector(targetId);
		const rect = targetElement.getBoundingClientRect();
		const containerRect = scrollContainer.getBoundingClientRect();
		const scrollLeft = scrollContainer.scrollLeft;
		const targetX = rect.left - containerRect.left + scrollLeft;

		activeLink.classList.remove("active");
		scrollContainer.scrollTo({ left: targetX });
		nextActiveLink.classList.add("active");

		const nextActiveLinkIndex = Array.from(navLinks).indexOf(nextActiveLink);
		btnNext.disabled = nextActiveLinkIndex >= navLinks.length - index;
		btnPrev.disabled = nextActiveLinkIndex < index;
	});
});
