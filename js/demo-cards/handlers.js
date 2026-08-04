const removeClasses = (classes, prefix) =>
	Array.from(classes).filter(item => item.startsWith(prefix));

export const toggleClass = (classes, className, el) =>
	classes.toggle(className, el?.checked);

export const swapClasses = (classes, del, add) => {
	del
		.trim()
		.split(/\s+/)
		.forEach(item => {
			if (item) {
				const toRemove = removeClasses(classes, item);
				if (toRemove.length > 0) classes.remove(...toRemove);
			}
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
