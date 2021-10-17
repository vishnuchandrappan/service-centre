import { Route, Switch } from "react-router";
import { Employees } from "../../pages/employees/Employees";
import { Home } from "../../pages/Home";
import { NewRegistration } from "../../pages/registrations/NewRegistration";
import { Registration } from "../../pages/registrations/Registration";
import { Registrations } from "../../pages/registrations/Registrations";
import { AppLayout } from "../layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

export const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute path="/registrations" exact component={Registrations} />
      <ProtectedRoute
        path="/registrations/new"
        exact
        component={NewRegistration}
      />
      <ProtectedRoute
        path="/registrations/:referenceNumber"
        component={Registration}
      />
      <ProtectedRoute
        path="/registrations/:referenceNumber"
        component={Registration}
      />
      <ProtectedRoute path="/employees" exact component={Employees} />
      <Route>
        <AppLayout>
          <div>404</div>
        </AppLayout>
      </Route>
    </Switch>
  );
};
