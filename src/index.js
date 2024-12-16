import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Loader from "./components/Loader";

const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
