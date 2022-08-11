import { render, screen } from '@testing-library/react';
import App from './App';

import Login from './components/Login/Login'
import {BrowserRouter as Router} from 'react-router-dom';

import ReactTestUtils from 'react-dom/test-utils'

test("render login component ", ()=>{
   const {getAllByText}= render(<Router>,<App><Login/></App>,</Router>);
    expect(getAllByText("Login")).toBeTruthy()
  })
  test("render login component - inputs ", ()=>{
    const {findAllByRole}= render(<Router>,<App><Login/></App>,</Router>);
     expect(findAllByRole("input")).toBeTruthy()
   })
   test("render login component - button ", ()=>{
    const {findByRole}= render(<Router>,<App><Login/></App>,</Router>);
     expect(findByRole("button")).toBeTruthy()
   })
   test('Test click event on sign in link',  () => {
    const {findByRole}=  render(<Router>,<App><Login/></App>,</Router>);
    const form = findByRole('form');
   ReactTestUtils.Simulate.click(form)
   
   
  //  expect(mockClickFn).toBeCalled();
  });
  

