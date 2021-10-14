import { Route } from "react-router-dom";
import { AuthCheck } from "reactfire";
import LoginContainer from "../login/LoginContainer";

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AuthCheck fallback={<LoginContainer />}>
          <Component {...rest} {...props} />
        </AuthCheck>
      )}
    />
  );
}
