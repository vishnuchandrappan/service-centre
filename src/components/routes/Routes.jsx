import { Route, Switch } from "react-router";
import { Home } from "../../pages/Home";
import { NewRegistration } from "../../pages/NewRegistration";
import { Registration } from "../../pages/registrations/Registration";
import { Registrations } from "../../pages/registrations/Registrations";
import { AppLayout } from "../layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

export const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute path="/newRegistration" component={NewRegistration} />
      <ProtectedRoute path="/registrations" exact component={Registrations} />
      <ProtectedRoute
        path="/registrations/:referenceNumber"
        component={Registration}
      />
      <Route>
        <AppLayout>
          <div>404</div>
        </AppLayout>
      </Route>
    </Switch>
  );
};
