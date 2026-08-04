export class FetchWrapper {
	constructor(baseURL, actions) {
		this.baseURL = baseURL;
		this.actions = actions;
	}

	#send = (method, endpoint, body = null, isText = false) => {
		const options = { method };

		if (body && method !== "delete") {
			options.headers = { "Content-type": "application/json" };
			options.body = JSON.stringify(body);
		}

		return fetch(this.baseURL + endpoint, options)
			.then(response => {
				if (!response.ok) {
					if (this.actions?.onFail) this.actions.onFail();
					throw new Error("Соединение с сервером не установлено!");
				}
				if (this.actions?.onSuccess) this.actions.onSuccess();
				return isText ? response.text() : response.json();
			})
			.catch(error => {
				if (this.actions?.onFail) this.actions.onFail();
				throw error;
			});
	};

	get = endpoint => this.#send("get", endpoint);

	getTxt = endpoint => this.#send("get", endpoint, null, true);

	put = (endpoint, body) => this.#send("put", endpoint, body);

	post = (endpoint, body) => this.#send("post", endpoint, body);

	delete = endpoint => this.#send("delete", endpoint);
}

//---
export const getFormData = formData => {
	const object = {};

	formData.forEach((value, key) => {
		if (!Object.hasOwn(object, key)) {
			object[key] = value;
			return;
		}

		if (!Array.isArray(object[key])) {
			object[key] = [object[key]];
		}

		object[key].push(value);
	});

	return object;
};

//---
export class AttrSetter {
	initWith(attr, data) {
		if (!data) return;

		Object.entries(data).forEach(([selector, value]) => {
			document
				.querySelectorAll(selector)
				.forEach(el => el.setAttribute(attr, value));
		});
	}
}

//---
export class GetCustomPropsValues {
	constructor(element) {
		this.element = element ?? document.documentElement;
	}

	getValues(props) {
		const styles = getComputedStyle(this.element);
		return props.map(prop => styles.getPropertyValue(prop).trim());
	}
}

//---
export class MobileDesktopStatesManager {
	constructor(onMobile, onDesktop) {
		this.onMobile = onMobile;
		this.onDesktop = onDesktop;
		this.mediaQuery = null;
		this._listener = null;
	}

	setState(isMobileSize) {
		if (isMobileSize) {
			this.onMobile();
		} else {
			this.onDesktop();
		}
	}

	toggleStateOn(breakpoint) {
		this.destroy();
		this.mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
		this._listener = e => this.setState(e.matches);
		this.setState(this.mediaQuery.matches);
		this.mediaQuery.addEventListener("change", this._listener);
	}

	destroy() {
		if (this.mediaQuery && this._listener) {
			this.mediaQuery.removeEventListener("change", this._listener);
		}
		this.mediaQuery = null;
		this._listener = null;
	}
}

//---
export class SizeSetter {
	constructor(prop) {
		this.prop = prop;
		this.connections = new Map();
		this.resizeObserver = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const slaves = this.connections.get(entry.target);
				if (!slaves) return;

				if (this.prop === "w") {
					const width = entry.borderBoxSize[0].inlineSize;
					slaves.forEach(slave => (slave.style.maxWidth = `${width}px`));
				} else if (this.prop === "h") {
					const height = entry.borderBoxSize[0].blockSize;
					slaves.forEach(slave => (slave.style.minHeight = `${height}px`));
				}
			});
		});
	}

	initWith(relatedItems) {
		relatedItems.forEach(([m, s], i) => {
			const master = document.querySelector(`.${m}`);
			const slaves = document.querySelectorAll(`.${s}`);

			if (master && slaves.length > 0) {
				this.connections.set(master, slaves);
				this.resizeObserver.observe(master);
			} else {
				console.error(
					`SizeSetter: there is no master or slave for pair ${i + 1}`,
				);
			}
		});
	}

	destroy() {
		this.resizeObserver.disconnect();
		this.connections.clear();
	}
}

//---
export const getElements = array => {
	const elements = [];
	array.forEach(item => elements.push(document.querySelector(item)));
	return elements;
};

//---
export const throttle = fn => {
	let requestId = null;
	let lastArgs = null;

	return (...args) => {
		lastArgs = args;

		if (requestId) return;

		requestId = requestAnimationFrame(() => {
			fn(...lastArgs);
			requestId = null;
		});
	};
};
