import React from 'react';
import { render } from '@testing-library/react';
import ErrorPage from './Components/ErrorPage';
import { BrowserRouter} from "react-router-dom";


test('renders learn react link', () => {
  const { getByText } = render(<ErrorPage/>);
  const linkElement = getByText(/404 - Not Found!/i);
  expect(linkElement).toBeInTheDocument();
});
