const scrollContainer = document.querySelector(".demo-cards-wrapper");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");

export const resetSlider = () => {
	const navLinks = document.querySelectorAll(".demo-cards-nav a");
	navLinks.forEach(item => item.classList.remove("active"));
	navLinks[0]?.classList.add("active");
	if (btnPrev) btnPrev.disabled = true;
	if (btnNext) btnNext.disabled = navLinks.length <= 1;
	scrollContainer?.scrollTo({ left: 0 });
};

export class ScrollSnapSlider {
	#isProgrammaticScroll = false;
	#scrollTimeout = null;
	#autoplayTimer = null;
	#debounceTimeout = null;
	#isPaused = false;

	#autoplayEnabled = false;
	#autoplayInterval = 3000;
	#mediaQueryList = null;
	#abortController = null;
	#resizeObserver = null;

	#cachedColCount = 1;
	#cachedContainerWidth = 0;
	#cachedMaxScrollLeft = 0;

	constructor(options) {
		this.scrollContainer = document.querySelector(options.scrollContainer);
		this.btnPrev = document.querySelector(options.btnPrev);
		this.btnNext = document.querySelector(options.btnNext);
		this.navContainer = document.querySelector(options.navContainer);

		this.navLinksSelector = options.navLinksSelector;
		this.activeLinkSelector = options.activeLinkSelector;
		this.cardsSelector = options.cardsSelector;

		this.#autoplayEnabled = !!options.autoplay;
		this.#autoplayInterval = options.autoplayInterval || 3000;

		if (options.autoplayBreakpoint) {
			const breakpoint =
				typeof options.autoplayBreakpoint === "number"
					? `(max-width: ${options.autoplayBreakpoint}px)`
					: options.autoplayBreakpoint;

			this.#mediaQueryList = window.matchMedia(breakpoint);
		}

		this.init();
	}

	init() {
		this.navLinks = document.querySelectorAll(this.navLinksSelector);
		this.cards = document.querySelector(this.cardsSelector);

		if (!this.navLinks.length || !this.cards || !this.scrollContainer) return;

		this.linksCount = this.navLinks.length;
		this.targetIds = Array.from(this.navLinks, link =>
			link.getAttribute("href"),
		);

		this.cardElements = this.targetIds.map(
			id =>
				this.scrollContainer.querySelector(id) || document.querySelector(id),
		);

		this.navLinks.forEach((link, idx) => (link.dataset.index = idx));
		this.#abortController = new AbortController();

		if (!this.scrollContainer.hasAttribute("tabindex")) {
			this.scrollContainer.setAttribute("tabindex", "0");
		}

		this.#cacheMetrics();
		this.reset();
		this.bindEvents();
		this.#initResizeObserver();
		this.#checkBreakpointAndAutoplay();
	}

	reset() {
		this.navLinks.forEach(item => item.classList.remove("active"));
		// ✅ ИСПРАВЛЕНО: Добавлено обращение к первому элементу коллекции по индексу [0]
		if (this.navLinks && this.navLinks[0]) {
			this.navLinks[0].classList.add("active");
		}

		if (this.btnPrev) this.btnPrev.disabled = true;
		if (this.btnNext) this.btnNext.disabled = this.linksCount <= 1;

		this.scrollContainer.scrollTo({ left: 0 });
	}

	update() {
		this.unbindEvents();
		this.init();
	}

	#cacheMetrics() {
		this.#cachedColCount =
			Number(getComputedStyle(this.cards).getPropertyValue("--col")) || 1;
		this.#cachedContainerWidth = this.scrollContainer.clientWidth;
		this.#cachedMaxScrollLeft =
			this.scrollContainer.scrollWidth - this.#cachedContainerWidth;
	}

	#getTargetScrollLeft(activeIndex) {
		const targetElement = this.cardElements[activeIndex];
		if (!targetElement) return 0;
		return targetElement.offsetLeft - this.scrollContainer.offsetLeft;
	}

	#updateUI(activeLink, activeIndex) {
		if (!activeLink) return;

		const currentActive = this.navContainer?.querySelector(
			this.activeLinkSelector,
		);
		if (currentActive === activeLink) return;

		currentActive?.classList.remove("active");
		activeLink.classList.add("active");

		const count = this.#cachedColCount;
		if (this.btnPrev) this.btnPrev.disabled = activeIndex < count;
		if (this.btnNext)
			this.btnNext.disabled = activeIndex >= this.linksCount - count;
	}

	#updateSliderState(activeLink, activeIndex) {
		if (!activeLink) return;
		this.#isProgrammaticScroll = true;
		this.#updateUI(activeLink, activeIndex);
		this.scrollContainer.scrollTo({
			left: this.#getTargetScrollLeft(activeIndex),
			behavior: "smooth",
		});
	}

	#moveByButtons(isNext) {
		const activeLink = this.navContainer?.querySelector(
			this.activeLinkSelector,
		);
		if (!activeLink) return;

		const currentIndex = Number(activeLink.dataset.index);
		const count = this.#cachedColCount;

		let nextIndex =
			isNext && currentIndex >= this.linksCount - count
				? 0
				: Math.max(
						0,
						Math.min(
							currentIndex + (isNext ? count : -count),
							this.linksCount - 1,
						),
					);
		this.#updateSliderState(this.navLinks[nextIndex], nextIndex);
	}

	#setProgrammaticMode() {
		this.#isProgrammaticScroll = true;
		this.#stopAutoplay();
		clearTimeout(this.#scrollTimeout);
		this.#scrollTimeout = setTimeout(() => {
			this.#isProgrammaticScroll = false;
			this.#checkBreakpointAndAutoplay();
		}, 500);
	}

	#handleManualScroll() {
		if (this.#isProgrammaticScroll) return;

		const scrollLeft = this.scrollContainer.scrollLeft;
		let closestIndex = -1;

		if (scrollLeft >= this.#cachedMaxScrollLeft - 10) {
			for (let i = this.linksCount - 1; i >= 0; i--) {
				if (getComputedStyle(this.navLinks[i]).display !== "none") {
					closestIndex = i;
					break;
				}
			}
		} else {
			const triggerBuffer =
				(this.#cachedContainerWidth / this.#cachedColCount) * 0.35;

			for (let i = 0; i < this.linksCount; i++) {
				const element = this.cardElements[i];
				if (element) {
					const relativeLeft =
						element.offsetLeft - this.scrollContainer.offsetLeft - scrollLeft;
					if (relativeLeft + triggerBuffer >= 0) {
						closestIndex = i;
						break;
					}
				}
			}
		}

		if (closestIndex !== -1)
			this.#updateUI(this.navLinks[closestIndex], closestIndex);
	}

	#initResizeObserver() {
		this.#resizeObserver = new ResizeObserver(() => {
			this.#cacheMetrics();
			this.#handleManualScroll();
		});
		this.#resizeObserver.observe(this.scrollContainer);
	}

	#checkBreakpointAndAutoplay() {
		this.#mediaQueryList?.matches
			? this.#stopAutoplay()
			: this.#startAutoplay();
	}

	#startAutoplay() {
		if (!this.#autoplayEnabled || this.#isPaused) return;
		this.#stopAutoplay();
		this.#autoplayTimer = setInterval(
			() => this.#moveByButtons(true),
			this.#autoplayInterval,
		);
	}

	#stopAutoplay() {
		if (this.#autoplayTimer) {
			clearInterval(this.#autoplayTimer);
			this.#autoplayTimer = null;
		}
	}

	bindEvents() {
		const signalOption = { signal: this.#abortController.signal };
		const passiveOption = {
			passive: true,
			signal: this.#abortController.signal,
		};

		this.scrollContainer.addEventListener(
			"scroll",
			() => {
				clearTimeout(this.#debounceTimeout);
				this.#debounceTimeout = setTimeout(
					() => this.#handleManualScroll(),
					30,
				);
			},
			passiveOption,
		);

		const handleInterrupt = () => {
			this.#isProgrammaticScroll = false;
			this.#stopAutoplay();
			clearTimeout(this.#scrollTimeout);
			this.#scrollTimeout = setTimeout(
				() => this.#checkBreakpointAndAutoplay(),
				1500,
			);
		};

		this.scrollContainer.addEventListener(
			"touchstart",
			handleInterrupt,
			passiveOption,
		);
		this.scrollContainer.addEventListener(
			"wheel",
			handleInterrupt,
			passiveOption,
		);

		this.scrollContainer.addEventListener(
			"mouseenter",
			() => {
				this.#isPaused = true;
				this.#stopAutoplay();
			},
			signalOption,
		);

		this.scrollContainer.addEventListener(
			"mouseleave",
			() => {
				this.#isPaused = false;
				this.#checkBreakpointAndAutoplay();
			},
			signalOption,
		);

		this.scrollContainer.addEventListener(
			"keydown",
			e => {
				if (e.key === "ArrowLeft") {
					e.preventDefault();
					this.#setProgrammaticMode();
					this.#moveByButtons(false);
				}
				if (e.key === "ArrowRight") {
					e.preventDefault();
					this.#setProgrammaticMode();
					this.#moveByButtons(true);
				}
			},
			signalOption,
		);

		const bindBtn = (btn, isNext) =>
			btn?.addEventListener(
				"click",
				e => {
					e.preventDefault();
					this.#setProgrammaticMode();
					this.#moveByButtons(isNext);
				},
				signalOption,
			);

		bindBtn(this.btnPrev, false);
		bindBtn(this.btnNext, true);

		this.navContainer?.addEventListener(
			"click",
			e => {
				const link = e.target.closest(this.navLinksSelector);
				if (!link) return;
				e.preventDefault();
				this.#setProgrammaticMode();
				this.#updateSliderState(link, Number(link.dataset.index));
			},
			signalOption,
		);

		this.#mediaQueryList?.addEventListener(
			"change",
			() => this.#checkBreakpointAndAutoplay(),
			signalOption,
		);
	}

	unbindEvents() {
		this.#abortController?.abort();
		this.#resizeObserver?.disconnect();
	}

	destroy() {
		this.#stopAutoplay();
		this.unbindEvents();
		clearTimeout(this.#scrollTimeout);
		clearTimeout(this.#debounceTimeout);

		this.scrollContainer =
			this.btnPrev =
			this.btnNext =
			this.navContainer =
			this.navLinks =
			this.cards =
			this.cardElements =
			this.#mediaQueryList =
			this.#abortController =
			this.#resizeObserver =
				null;
	}
}
