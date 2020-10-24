import React from 'react';
import { render } from '@testing-library/react';
import ErrorPage from './Components/ErrorPage';
import Header from "./Components/Header";
import App from "./App"
import { shallow } from 'enzyme';


test('Error page renders 404', () => {
  const { getByText } = render(<ErrorPage/>);
  const linkElement = getByText(/404 - Not Found!/i);
  expect(linkElement).toBeInTheDocument();
});

test('Header contains welcome and crewmeister', () => {
  const { getByText } = render(<Header/>);
  const linkElement = getByText(/Welcome To Crewmeister Absense Manager App/i);
  expect(linkElement).toBeInTheDocument();
});
