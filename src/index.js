import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client"; // Updated import
import App from "./App";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the App component using the new API
root.render(
  // <React.StrictMode>
  // <App />
  // </React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
