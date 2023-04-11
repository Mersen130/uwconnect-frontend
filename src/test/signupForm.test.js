import './matchMedia.mock';
import renderer from 'react-test-renderer'
import {render,screen,cleanup} from '@testing-library/react'
import GetSignupForm from '../route/signup/signupForm';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    redirect,
    Link
  } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from '../redux/store'

// This is to create ReduxProvider for mock
const ReduxProvider = ({ children, reduxStore }) => (
<Provider store={reduxStore}>{children}</Provider>
)

afterEach(() => {
    cleanup();
})


// This is due to Jest issue of current version
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
    });
})



test('should render GetSignupForm component', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetSignupForm/></Router></ReduxProvider>);
    const signupElement = screen.getByTestId('signup-1');
    expect(signupElement).toBeInTheDocument();
} )

test('should render GetSignupForm component', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetSignupForm/></Router></ReduxProvider>);
    const signupElement = screen.getByTestId('signup-2');
    expect(signupElement).toBeInTheDocument();
    expect(signupElement).toHaveTextContent("Already have an account?");
} )

test('should render GetSignupForm component', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetSignupForm/></Router></ReduxProvider>);
    const signupElement = screen.getByTestId('signup-3');
    expect(signupElement).toBeInTheDocument();
    expect(signupElement.href).toBe("http://localhost/login");
} )

test('matches snapshot', () => {

    const tree = renderer.create(<ReduxProvider reduxStore={store}><Router><GetSignupForm/></Router></ReduxProvider>).toJSON();
    expect(tree).toMatchSnapshot();

} )