export class SwitchesManager {
	constructor(config) {
		this.config = config;
		this.blockedState = new Map();
		this.blockedInputs = new Set();
		this._resizeListener = null;
		this._changeListeners = new Map();
	}

	init(switches) {
		this.destroy();

		this.handle(switches);

		switches.forEach(el => {
			if (!el) return;
			const listener = () => this.handle(switches, el);
			el.addEventListener("change", listener);
			this._changeListeners.set(el, listener);
		});

		this._resizeListener = () => this.handle(switches);
		window.addEventListener("resize", this._resizeListener);
	}

	handle(switches, targetInput = null) {
		if (!this.config?.length) return;

		const expandedConfig = [];
		this.config.forEach(rule => {
			if (rule.mutuallyDisable) {
				const [groupA, groupB] = rule.mutuallyDisable;
				expandedConfig.push({
					ifChecked: groupA,
					disable: groupB,
					isExclusive: true,
				});
				expandedConfig.push({
					ifChecked: groupB,
					disable: groupA,
					isExclusive: true,
				});
			} else if (rule.mutuallyEnable) {
				const [groupA, groupB] = rule.mutuallyEnable;
				expandedConfig.push({
					ifChecked: groupA,
					enable: groupB,
					isExclusive: true,
					isMutuallyEnable: true,
					sourceGroup: groupA,
				});
				expandedConfig.push({
					ifChecked: groupB,
					enable: groupA,
					isExclusive: true,
					isMutuallyEnable: true,
					sourceGroup: groupB,
				});
			} else {
				expandedConfig.push(rule);
			}
		});

		switches.forEach(input => {
			if (input) input.disabled = false;
		});

		this.restoreBlockedInputs();

		expandedConfig.forEach(
			({
				ifChecked,
				ifMediaQuery,
				disable,
				enable,
				isExclusive,
				isMutuallyEnable,
				sourceGroup,
			}) => {
				let isActive = false;

				if (ifMediaQuery) {
					isActive = window.matchMedia(ifMediaQuery).matches;
				} else if (ifChecked?.length) {
					isActive = isExclusive
						? ifChecked.some(t => t?.checked)
						: ifChecked.every(t => t?.checked);
				} else {
					return;
				}

				if (!isActive) return;

				if (disable) {
					disable.forEach(dep => {
						if (!dep) return;
						this.saveStateBeforeBlock(dep);
						dep.disabled = true;

						if (dep.type !== "radio" && dep.checked) {
							dep.checked = false;
							dep.dispatchEvent(new Event("change", { bubbles: true }));
						}
						this.blockedInputs.add(dep);
					});
				}

				if (enable) {
					enable.forEach(dep => {
						if (!dep) return;
						dep.disabled = false;

						const isTriggeredByUserMutually =
							isMutuallyEnable &&
							targetInput &&
							sourceGroup.includes(targetInput);
						const isTriggeredByUserNormal =
							!isMutuallyEnable &&
							targetInput &&
							ifChecked &&
							ifChecked.includes(targetInput);

						if (isTriggeredByUserMutually || isTriggeredByUserNormal) {
							if (!dep.checked) {
								dep.checked = true;
								dep.dispatchEvent(new Event("change", { bubbles: true }));
							}
						}
					});
				}
			},
		);
	}

	saveStateBeforeBlock(input) {
		if (
			input &&
			/^(checkbox|radio)$/.test(input.type) &&
			!this.blockedState.has(input)
		) {
			this.blockedState.set(input, {
				disabled: input.disabled,
				checked: input.checked,
			});
		}
	}

	restoreBlockedInputs() {
		this.blockedInputs.forEach(input => {
			const state = this.blockedState.get(input);
			if (state) {
				input.disabled = state.disabled;
				this.blockedState.delete(input);
			}
		});
		this.blockedInputs.clear();
	}

	destroy() {
		if (this._resizeListener) {
			window.removeEventListener("resize", this._resizeListener);
			this._resizeListener = null;
		}

		this._changeListeners.forEach((listener, el) => {
			el.removeEventListener("change", listener);
		});
		this._changeListeners.clear();

		this.restoreBlockedInputs();
		this.blockedState.clear();
	}
}
