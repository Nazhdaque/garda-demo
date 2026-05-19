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
