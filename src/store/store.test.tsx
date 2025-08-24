import { describe, beforeEach, it, expect } from 'vitest';
import { useStore } from './store';
import { act } from '@testing-library/react';

describe('FormStore actions', () => {
  beforeEach(() => {
    act(() => {
      useStore.setState({ data: [] });
    });
  });

  it('has initial countries', () => {
    const state = useStore.getState();
    expect(state.countries.length).toBeGreaterThan(0);
  });

  it('adds new data with addData', () => {
    const newData = {
      id: 1,
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      firstPassword: 'Aa1!aaaa',
      gender: 'male',
      tc: true,
      base64: 'somebase64string',
      country: 'Estonia',
    };

    act(() => {
      useStore.getState().addData(newData);
    });

    const state = useStore.getState();
    expect(state.data.length).toBe(1);
    expect(state.data[0]).toEqual(newData);
  });

  it('adds multiple data entries correctly', () => {
    const first = { id: 1, name: 'A', age: 20 };
    const second = { id: 2, name: 'B', age: 25 };

    act(() => {
      useStore.getState().addData(first);
      useStore.getState().addData(second);
    });

    const state = useStore.getState();
    expect(state.data.length).toBe(2);
    expect(state.data).toContainEqual(first);
    expect(state.data).toContainEqual(second);
  });
  it('store updates after form submission', () => {
    useStore.setState({ data: [] });

    const newData = { id: 1, name: 'John', age: 30 };
    useStore.getState().addData(newData);

    const state = useStore.getState();
    expect(state.data).toHaveLength(1);
    expect(state.data[0]).toEqual(newData);
  });
});
