import '@testing-library/jest-dom/vitest';
import { vi, afterEach, beforeEach } from 'vitest';

// required for svelte5 + jsdom as jsdom does not support matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// add more mocks here if you need them
const mocks = () => {
	const prevAnimate = Element.prototype.animate;
	const prevCanvas = HTMLCanvasElement.prototype.getContext;

	beforeEach(() => {
		Element.prototype.animate = vi.fn().mockImplementation(() => ({
			cancel: vi.fn(),
			finished: Promise.resolve()
		}));

		HTMLCanvasElement.prototype.getContext = vi.fn();
	});

	afterEach(() => {
		Element.prototype.animate = prevAnimate;
		HTMLCanvasElement.prototype.getContext = prevCanvas;
	});
};

mocks();
