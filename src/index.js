import { createRoot } from "react-dom/client";
import "./i18nextInit";
import "./index.scss";
import App from "./App";
import store from "./redux/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
// ReactDOM.render(<App />, document.getElementById('root'));
