import { Route, Switch } from "react-router";
import { Home } from "../../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

export const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route>
        <div>404</div>
      </Route>
    </Switch>
  );
};
