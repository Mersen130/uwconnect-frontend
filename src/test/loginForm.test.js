import './matchMedia.mock';
import GetLoginForm from '../route/login/loginForm';
import {render,screen,cleanup} from '@testing-library/react'
import renderer from 'react-test-renderer'
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

test('should render GetLoginForm component', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetLoginForm/></Router></ReduxProvider>);
    const loginElement = screen.getByTestId('login-1');
    expect(loginElement).toBeInTheDocument();
} )

test('should render GetLoginForm UW Title', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetLoginForm/></Router></ReduxProvider>);
    const loginElement = screen.getByTestId('login-2');
    expect(loginElement).toBeInTheDocument();
    expect(loginElement).toHaveTextContent("UWConnect");
} )

test('should render GetLoginForm New User Text', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetLoginForm/></Router></ReduxProvider>);
    const loginElement = screen.getByTestId('login-3');
    expect(loginElement).toBeInTheDocument();
    expect(loginElement).toHaveTextContent("New User?");
} )

test('should render GetLoginForm Register link', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetLoginForm/></Router></ReduxProvider>);
    const loginElement = screen.getByTestId('login-4');
    expect(loginElement).toBeInTheDocument();
    expect(loginElement.href).toBe("http://localhost/register");
} )

test('matches snapshot', () => {
    const tree = renderer.create(<ReduxProvider reduxStore={store}><Router><GetLoginForm/></Router></ReduxProvider>).toJSON();
    expect(tree).toMatchSnapshot();

} )
    
