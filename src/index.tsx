import React from "react";
import ReactDOM from "react-dom/client";
import "./app.css";
import { Router } from "./app/Router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
document.title = "GENIUS READER";

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>
);
