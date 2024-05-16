import { describe, it, expect, vi, afterEach } from 'vitest';
import { dragStart } from './dnd';

afterEach(() => {
	vi.restoreAllMocks();
});
describe('dnd', () => {
	it('dragStart sets dataTransfer to custom component', () => {
		const fakeEvent = {
			dataTransfer: {
				setData: vi.fn()
			}
		};
		dragStart(fakeEvent as unknown as DragEvent);
		expect(fakeEvent.dataTransfer.setData).toHaveBeenCalledOnce();
	});
});
