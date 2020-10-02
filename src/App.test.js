import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


//TEST SUITE SPEC:
//TODO: Unit-Regresion: Update state to various points to make that program works for those inputs
// from the users