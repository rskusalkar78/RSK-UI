import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn — Basic strings', () => {
  it('concatenates plain string arguments', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles a single string', () => {
    expect(cn('single')).toBe('single');
  });

  it('handles empty string arguments', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar');
  });

  it('handles whitespace-only strings', () => {
    expect(cn('  foo  ', '  bar  ')).toBe('foo bar');
  });
});

describe('cn — Arrays', () => {
  it('flattens and joins array of class names', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles nested arrays', () => {
    expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz');
  });

  it('handles arrays combined with strings', () => {
    expect(cn('a', ['b', 'c'], 'd')).toBe('a b c d');
  });

  it('skips empty arrays', () => {
    expect(cn('foo', [], 'bar')).toBe('foo bar');
  });
});

describe('cn — Objects with true/false', () => {
  it('includes keys with truthy values', () => {
    expect(cn({ foo: true, bar: true })).toBe('foo bar');
  });

  it('excludes keys with falsy values', () => {
    expect(cn({ foo: false, bar: false })).toBe('');
  });

  it('mixes truthy and falsy keys', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('handles 0 and empty string as falsy', () => {
    expect(cn({ foo: 0, bar: '', baz: 1 })).toBe('baz');
  });
});

describe('cn — undefined and null skipped', () => {
  it('skips undefined arguments', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar');
  });

  it('skips null arguments', () => {
    expect(cn('foo', null, 'bar')).toBe('foo bar');
  });

  it('handles mixed undefined/null with objects/arrays', () => {
    expect(cn('base', undefined, null, ['a'], { b: true })).toBe('base a b');
  });
});

describe('cn — Tailwind-merge conflict resolution', () => {
  it('resolves px-2 px-4 conflict keeping px-4', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('resolves margin conflicts (m-2 m-4)', () => {
    expect(cn('m-2', 'm-4')).toBe('m-4');
  });

  it('resolves padding conflicts (p-2 p-4)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('resolves text-size conflicts', () => {
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('resolves bg-color conflicts', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('resolves width conflicts', () => {
    expect(cn('w-10', 'w-full')).toBe('w-full');
  });

  it('keeps non-conflicting classes alongside resolved ones', () => {
    expect(cn('px-2 py-2', 'px-4')).toBe('py-2 px-4');
  });

  it('resolves flex-direction conflicts', () => {
    expect(cn('flex-row', 'flex-col')).toBe('flex-col');
  });

  it('handles object with conditional tailwind classes', () => {
    const active = true;
    const disabled = false;
    expect(cn('p-2', { 'text-white': active, 'opacity-50': disabled }, 'p-4')).toBe(
      'text-white p-4'
    );
  });
});
