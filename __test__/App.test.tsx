import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('react dom dummy test', () => {
  render(<div data-testid="custom-element" />);
  const element = screen.getByTestId('custom-element');
  expect(element).toBeInTheDocument();
});
it('function dummy test', () => {
  const result = 2;
  const expected = 2;
  expect(result).toEqual(expected);
});
