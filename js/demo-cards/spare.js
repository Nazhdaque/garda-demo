// ==============
// handleSwitches
// ==============

const blockedState = new Map();
const blockedInputs = new Set();

const saveStateBeforeBlock = input => {
	if (
		input &&
		input.type?.match(/^(checkbox|radio)$/) &&
		!blockedState.has(input)
	) {
		blockedState.set(input, {
			disabled: input.disabled,
			checked: input.checked,
		});
	}
};

const isTriggerActive = triggerGroup => triggerGroup.every(t => t?.checked);

const restoreBlockedInputs = () => {
	blockedInputs.forEach(input => {
		const state = blockedState.get(input);
		if (state) {
			input.disabled = state.disabled;
			// input.checked = state.checked;
			blockedState.delete(input);
		}
	});
	blockedInputs.clear();
};

export const handleSwitches = config => {
	if (!config?.length) return;

	const allInputs = new Set();
	config.forEach(([triggers, dependents]) => {
		triggers.forEach(t => t && allInputs.add(t));
		(Array.isArray(dependents) ? dependents : [dependents])
			.filter(Boolean)
			.forEach(d => allInputs.add(d));
	});

	allInputs.forEach(input => (input.disabled = false));
	restoreBlockedInputs();

	config.forEach(([triggers, dependents]) => {
		if (!isTriggerActive(triggers)) return;

		(Array.isArray(dependents) ? dependents : [dependents])
			.filter(Boolean)
			.forEach(dep => {
				saveStateBeforeBlock(dep);

				dep.disabled = true;

				if (dep.type === "radio") {
				} else {
					dep.checked = false;
				}

				blockedInputs.add(dep);
			});
	});
};

const config = {
	flexList: {
		trigger: [idFlexList],
		turnOff: [idScrollSnap, idSubgrid, idCardText],
	},
	imageLeft1: {
		trigger: [idImageLeft],
		turnOff: [idCol4, idCol5],
		turnOn: [idSubgrid, idSectionBackground],
	},
	imageLeft2: { trigger: [idCol4], turnOff: [idImageLeft] },
	imageLeft3: { trigger: [idCol5], turnOff: [idImageLeft] },
	titles1: { trigger: [idCardTitleLg], turnOff: [idSectionTitleMd] },
	titles2: { trigger: [idSectionTitleMd], turnOff: [idCardTitleLg] },
	subs1: { trigger: [idCardSubtitle], turnOff: [idCardTitleSm] },
	subs2: { trigger: [idCardTitleSm], turnOff: [idCardSubtitle] },
	// ruleName: { trigger: [], turnOff: [], turnOn: [] },
};

// === === === === === === === === === === old slider
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

	navButtons.forEach(button => {
		button.addEventListener("click", e => {
			e.preventDefault();

			const activeLink = document.querySelector(".demo-cards-nav a.active");
			const index = Number(
				getComputedStyle(
					document.querySelector(".demo-cards"),
				).getPropertyValue("--col"),
			);

			let nextActiveLink;
			let currentIndex = Array.from(navLinks).indexOf(activeLink);

			if (button === btnNext)
				nextActiveLink = navLinks[(currentIndex + index) % navLinks.length];

			if (button === btnPrev)
				nextActiveLink =
					navLinks[(currentIndex - index + navLinks.length) % navLinks.length];

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
};
