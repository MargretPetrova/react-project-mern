import { render, screen } from '@testing-library/react';
import App from './App';

import Home from './components/Home/Home'
import {BrowserRouter as Router} from 'react-router-dom';



test('renders components', () => {

 render(
    <Router>
      <App />,
    </Router>,
  );
  const linkAbout = screen.getByText(/About/i);
  const linkHome = screen.getByText(/Home/i);
  const linkCatalog = screen.getByText(/Centers/i);
  const linkRegister = screen.getByText(/Register/i);
  const linkLogin = screen.getByText(/Login/i);
  expect(linkAbout).toBeInTheDocument();
  expect(linkHome).toBeInTheDocument();
  expect(linkCatalog).toBeInTheDocument();
  expect(linkRegister).toBeInTheDocument();
  expect(linkLogin).toBeInTheDocument();

});
test("render home component", ()=>{
  const component = render(<Router>,<App />,</Router>);
  const childElement = component.getByText('Help the people');
  expect(childElement).toBeInTheDocument()
})
test("render home component cards", ()=>{
  const {getAllByText} = render(<Router>,<App><Home/></App>,</Router>);
  expect(getAllByText("Details")).toBeTruthy()
})
test("render the footer", ()=>{
  const {getByText} = render(<Router>,<App />,</Router>)
  expect(getByText("@help")).toBeTruthy()

})
// test('should render a Link, checks for href attributes', () => {
//   render(<Router>,<App />,</Router>);
//   const linkLogin = screen.getByText(/Login/i);
//   expect(linkLogin).toHaveAttribute('href', '/login')
// })
// test('Test click event on login link', () => {
//   render(
//     <Router>
//       <App />,
//     </Router>,
//   );
//   const mockClickFn = jest.fn()
//    const linkLogin = screen.getByText(/Login/i);
//    linkLogin.addEventListener('click', mockClickFn)
//   linkLogin.click()
//   expect(mockClickFn).toBeCalled();
// });


