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

	if (el.id.includes('counter_')) {
		el.classList.add('bg-emerald-200');
	} else {
		const parent: Element = el.parentNode as Element;
		if (parent) {
			parent.closest('p')?.classList.add('bg-emerald-200');
		}
	}
};

export const dragLeave = (event: DragEvent) => {
	event.preventDefault();
	const el: Element = event.target as Element;

	if (el.id.includes('counter_')) {
		el.classList.remove('bg-emerald-200');
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
		toMove?.classList.remove('bg-emerald-200');
		if (closestChild.isSameNode(dropZone)) {
			closestChild.prepend(document.getElementById(elId) as Element);

			closestChild.classList.remove('bg-emerald-200');
		} else {
			closestChild.before(document.getElementById(elId) as Element);
			const parent: Element = target.parentNode as Element;
			parent.closest('p')?.classList.remove('bg-emerald-200');
		}
	}
};
