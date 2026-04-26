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
			input.checked = state.checked;
			blockedState.delete(input);
		}
	});
	blockedInputs.clear();
};

export const handleSwitches = dependencyRules => {
	if (!dependencyRules?.length) return;

	const allInputs = new Set();
	dependencyRules.forEach(([triggers, dependents]) => {
		triggers.forEach(t => t && allInputs.add(t));
		(Array.isArray(dependents) ? dependents : [dependents])
			.filter(Boolean)
			.forEach(d => allInputs.add(d));
	});

	allInputs.forEach(input => (input.disabled = false));
	restoreBlockedInputs();

	dependencyRules.forEach(([triggers, dependents]) => {
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
