const dropStyles = [
	'border-l-2',
	'border-emerald-200',
	'before:content-["+"]',
	'before:inline-block',
	'before:absolute',
	'before:top-1/4'
];

export const dragStart = (event: DragEvent) => {
	const el: Element = event.target as Element;
	if (el && event.dataTransfer) {
		event.dataTransfer.setData('application/component', el.id);
	}
};

export const dragOver = (event: DragEvent) => {
	event.preventDefault();
	event.dataTransfer!.dropEffect = 'move';
};

export const dragEnter = (event: DragEvent) => {
	event.preventDefault();
	const el: Element = event.target as Element;

	const dropZone: Element = document.getElementById('counter_drop_zone') as Element;
	const parent: Element = el.parentNode as Element;
	if (el.id.includes('counter_')) {
		if (!el.isSameNode(dropZone)) {
			el.classList.add(...dropStyles);
		} else {
			el.children[0].classList.add(...dropStyles);
		}
	} else {
		parent.closest('p')?.classList.add(...dropStyles);
	}
};

export const dragLeave = (event: DragEvent) => {
	event.preventDefault();
	const el: Element = event.target as Element;

	const dropZone: Element = document.getElementById('counter_drop_zone') as Element;
	if (el.id.includes('counter_')) {
		if (el.isSameNode(dropZone)) {
			dropZone.children[1].classList.remove(...dropStyles);
		} else {
			el.classList.remove(...dropStyles);
		}
	}
};

export const drop = (event: DragEvent) => {
	event.preventDefault();

	const target: Element = event.target as Element;
	const dropZone: Element = document.getElementById('counter_drop_zone') as Element;
	const possibleDrops: Array<Element> = document.elementsFromPoint(event.x, event.y);

	const closestChild: Element = possibleDrops
		.filter((el) => dropZone.contains(el))
		.filter((ele) => ele.id.startsWith('counter_'))[0];

	if (event.dataTransfer) {
		const elId = event.dataTransfer.getData('application/component') as string;

		const toMove = document.getElementById(elId);
		toMove?.classList.remove(...dropStyles);
		if (closestChild.isSameNode(dropZone)) {
			closestChild.prepend(document.getElementById(elId) as Element);

			closestChild.classList.remove(...dropStyles);
		} else {
			closestChild.before(document.getElementById(elId) as Element);
			const parent: Element = target.parentNode as Element;
			parent.closest('p')?.classList.remove(...dropStyles);
		}
		dropZone.children[0].classList.remove(...dropStyles);
		dropZone.children[1].classList.remove(...dropStyles);
	}
};
