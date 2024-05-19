import { describe, it, expect, vi, afterEach } from 'vitest';
import { dragStart, dragOver } from './dnd';

afterEach(() => {
	vi.restoreAllMocks();
});

const fakeEvent = {
	dataTransfer: {
		setData: vi.fn(),
		dropEffect: 'none'
	},
	target: {
		id: 'counter_100'
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

	it('dragEnter', () => {});
	it('dragLeave', () => {});
	it('drop', () => {});

	// TODO figure out what this logic actually should be
	// it('sets logic on dragEnter', () => {
	// 	dragOver(fakeEvent as unknown as DragEvent);
	// 	expect(fakeEvent.preventDefault).toHaveBeenCalledOnce();
	// 	expect(fakeEvent.dataTransfer.dropEffect).toBe('move');
	// });
});
