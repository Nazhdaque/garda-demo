const scrollContainer = document.querySelector(".demo-cards-wrapper");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const navButtons = [btnPrev, btnNext];

export const resetSlider = () => {
	const navLinks = document.querySelectorAll(".demo-cards-nav a");
	navLinks.forEach(item => item.classList.remove("active"));
	navLinks[0].classList.add("active");
	btnPrev.disabled = true;
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
			activeLink === navLinks[navLinks.length - 1]
				? (btnNext.disabled = true)
				: (btnNext.disabled = false);
			activeLink === navLinks[0]
				? (btnPrev.disabled = true)
				: (btnPrev.disabled = false);
		});
	});
};

navButtons.forEach(button =>
	button.addEventListener("click", e => {
		e.preventDefault();

		const getNextActiveLink = (sibling, n) => {
			for (let i = 0; i < n; i++) {
				switch (button) {
					case btnNext:
						if (!sibling) return navLinks[navLinks.length - 1];
						sibling = sibling.nextElementSibling;
						break;
					case btnPrev:
						if (!sibling) return navLinks[0];
						sibling = sibling.previousElementSibling;
						break;
				}
			}
			return sibling;
		};

		const navLinks = document.querySelectorAll(".demo-cards-nav a");
		const activeLink = document.querySelector(".demo-cards-nav a.active");
		const index = Number(
			getComputedStyle(document.querySelector(".demo-cards")).getPropertyValue(
				"--col",
			),
		);
		const nextActiveLink = getNextActiveLink(activeLink, index);
		const targetId = nextActiveLink.getAttribute("href");
		const targetElement = document.querySelector(targetId);
		const rect = targetElement.getBoundingClientRect();
		const containerRect = scrollContainer.getBoundingClientRect();
		const scrollLeft = scrollContainer.scrollLeft;
		const targetX = rect.left - containerRect.left + scrollLeft;

		activeLink.classList.remove("active");
		scrollContainer.scrollTo({ left: targetX });
		nextActiveLink.classList.add("active");

		nextActiveLink === navLinks[navLinks.length - 1]
			? (btnNext.disabled = true)
			: (btnNext.disabled = false);
		nextActiveLink === navLinks[0]
			? (btnPrev.disabled = true)
			: (btnPrev.disabled = false);
	}),
);
