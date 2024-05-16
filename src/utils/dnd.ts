export const dragStart = (event: DragEvent) => {
	event?.dataTransfer?.setData('application/component', event?.target?.id);
};

export const dragOver = (event: DragEvent) => {
	event.preventDefault();
	event.dataTransfer!.dropEffect = 'move';
};

export const dragEnter = (event: DragEvent) => {
	event.preventDefault();
	if (event.target.id.startsWith('counter_')) {
		event.target.classList.add('bg-emerald-200');
	} else {
		event.target.parentNode.closest('p').classList.add('bg-emerald-200');
	}
};

export const dragLeave = (event: DragEvent) => {
	event.preventDefault();
	event.target!.classList.remove('bg-emerald-200');
};

export const drop = (event: DragEvent) => {
	event.preventDefault();

	const target = event.target;
	const dropZone = document.getElementById('counter_drop_zone');
	const possibleDrops = document.elementsFromPoint(event.x, event.y);

	const closestChild = possibleDrops
		.filter((el) => dropZone.contains(el))
		.filter((ele) => ele.id.startsWith('counter_'))[0];

	const elId = event.dataTransfer.getData('application/component');
	if (closestChild.isSameNode(dropZone)) {
		closestChild.prepend(document.getElementById(elId));

		closestChild.remove('bg-emerald-200');
	} else {
		closestChild.before(document.getElementById(elId));
		target.parentNode.closest('p').classList.remove('bg-emerald-200');
	}
};
