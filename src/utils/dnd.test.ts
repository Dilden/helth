import { describe, it, expect, vi, afterEach } from 'vitest';
import { dragStart, dragOver, dragEnter, dragLeave } from './dnd';

afterEach(() => {
	vi.restoreAllMocks();
});

const dropZoneEvent = {
	dataTransfer: {
		setData: vi.fn(),
		dropEffect: 'none'
	},
	target: {
		id: 'counter_drop_zone',
		classList: {
			add: vi.fn(),
			remove: vi.fn()
		},
		isSameNode: vi.fn(() => true),
		children: [
			{
				classList: {
					add: vi.fn()
				}
			},
			{
				classList: {
					add: vi.fn()
				}
			}
		]
	},
	preventDefault: vi.fn()
};

const fakeEvent = {
	dataTransfer: {
		setData: vi.fn(),
		dropEffect: 'none'
	},
	target: {
		id: 'counter_100',
		classList: {
			add: vi.fn(),
			remove: vi.fn()
		},
		isSameNode: vi.fn(() => false)
	},
	preventDefault: vi.fn()
};

const fakeEvent2 = {
	dataTransfer: {
		setData: vi.fn(),
		dropEffect: 'none'
	},
	target: {
		id: 'something_else',
		parentNode: {
			closest: vi.fn(() => {
				return {
					classList: {
						add: vi.fn(),
						remove: vi.fn()
					}
				};
			}),
			isSameNode: vi.fn()
		}
	},
	preventDefault: vi.fn()
};

describe('dnd', () => {
	it('dragStart sets dataTransfer to custom component', () => {
		dragStart(fakeEvent as unknown as DragEvent);
		expect(fakeEvent.dataTransfer.setData).toHaveBeenCalledOnce();
	});

	it('sets dropEffect', () => {
		dragOver(fakeEvent as unknown as DragEvent);
		expect(fakeEvent.preventDefault).toHaveBeenCalledOnce();
		expect(fakeEvent.dataTransfer.dropEffect).toBe('move');
	});

	it('dragEnter adds class to elements with counter_ in ID', () => {
		dragEnter(fakeEvent as unknown as DragEvent);
		expect(fakeEvent.preventDefault).toHaveBeenCalledOnce();
		expect(fakeEvent.target.classList.add).toHaveBeenCalledOnce();
	});
	it("dragEnter adds class to parent of element that doesn't contain counter_", () => {
		dragEnter(fakeEvent2 as unknown as DragEvent);
		expect(fakeEvent2.target.parentNode.closest).toHaveBeenCalledOnce();
	});
	it('dragEnter adds class to first child of dropZone', () => {
		dragEnter(dropZoneEvent as unknown as DragEvent);
		expect(dropZoneEvent.target.children[0].classList.add).toHaveBeenCalledOnce();
	});

	it('dragLeave removes class from element with counter_ in ID', () => {
		dragLeave(fakeEvent as unknown as DragEvent);
		expect(fakeEvent.preventDefault).toHaveBeenCalledOnce();
		expect(fakeEvent.target.classList.remove).toHaveBeenCalledOnce();
	});
	it('dragLeave only removes class from elements that contain counter_', () => {
		dragLeave(fakeEvent2 as unknown as DragEvent);
		expect(fakeEvent2.preventDefault).toHaveBeenCalledOnce();
		expect(fakeEvent2.target.parentNode.closest).not.toHaveBeenCalledOnce();
	});

	// it('drop prepends element before nearest counter', () => {
	// 	drop(fakeEvent as unknown as DragEvent);
	// 	expect(fakeEvent.preventDefault).toHaveBeenCalledOnce();
	// });
});
