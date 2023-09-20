import { describe, it, expect } from 'vitest';
import { camelCase, snake_case } from './naming.js';

describe('camelCase', () => {{
  it('converts 2 words with spaces to one camelCase', () => {
    const word = camelCase('Hello World');
    expect(word).toEqual('helloWorld');
  })
  it('converts 3 words with spaces to one camelCase', () => {
    const word = camelCase('Hello World Go');
    expect(word).toEqual('helloWorldGo');
  })
}})

describe('snake_case', () => {
  it('turns 2 words into one_word', () => {
    const word = snake_case('Hello World');
    expect(word).toEqual('hello_world');
  })
  it('turns 3 words into one_word', () => {
    const word = snake_case('Hello World Go');
    expect(word).toEqual('hello_world_go');
  })
})

