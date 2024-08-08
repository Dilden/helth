import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import '/src/app.css';

afterEach(cleanup);
