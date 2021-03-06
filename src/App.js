import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Account as AccountDetails } from "./pages/Account";
import { BlockDetails } from "./pages/BlockDetails";
import { SearchResult } from "./pages/SearchResult"
import Navbar from "./components/Navbar";
import { ApiProvider } from './Api/ApiContext';

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container pt-4">
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={"/about"} component={About} />
            <Route path={"/account/:adress"} component={AccountDetails} />
            <Route path={"/block/:id"} component={BlockDetails} />
            <Route path={"/search"} component={SearchResult} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
