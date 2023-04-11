import './matchMedia.mock';
import GetIdentity from '../route/profile/identity';
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


test('should render enrollment component', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetIdentity/></Router></ReduxProvider>);
    const loginElement = screen.getByTestId('identity-1');
    // const loginElement = screen.getByPlaceholderText("Faculty");
    // const loginElement = screen.getByText("Faculty");
    expect(loginElement).toBeInTheDocument();
} )


test('should render CreateProfile component', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetIdentity/></Router></ReduxProvider>);
    const loginElement = screen.getByText("--Select Profile Picture--");
    expect(loginElement).toBeInTheDocument();
} )

test('should render CreateProfile component', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetIdentity/></Router></ReduxProvider>);
    const loginElement = screen.getByPlaceholderText("First Name");
    expect(loginElement).toBeInTheDocument();
} )

test('should render CreateProfile component', () => {
    render(<ReduxProvider reduxStore={store}><Router><GetIdentity/></Router></ReduxProvider>);
    const loginElement = screen.getByPlaceholderText("Last Name");
    expect(loginElement).toBeInTheDocument();
} )


test('matches snapshot', () => {
    const tree = renderer.create(<ReduxProvider reduxStore={store}><Router><GetIdentity/></Router></ReduxProvider>).toJSON();
    expect(tree).toMatchSnapshot();

} )
    
