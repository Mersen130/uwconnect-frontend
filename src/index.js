import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { CometChat } from '@cometchat-pro/chat';

let appID = process.env.REACT_APP_COMETCHAT_APPID;
const region = "us";
let authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
var appSetting = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(region)
            .build();
const root = ReactDOM.createRoot(document.getElementById('root'));
CometChat.init(appID, appSetting).then(() => {
  console.log("Initialization completed successfully")
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App/>
        </Router>
      </PersistGate>
    </Provider>
  );
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
