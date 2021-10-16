import { Route } from "react-router-dom";
import { AuthCheck, SuspenseWithPerf } from "reactfire";
import { AppLayout } from "../layout/AppLayout";
import { Loading } from "../layout/Loading";
import LoginContainer from "../login/LoginContainer";

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AuthCheck fallback={<LoginContainer />}>
          <AppLayout>
            <SuspenseWithPerf fallback={<Loading />}>
              <Component {...rest} {...props} />
            </SuspenseWithPerf>
          </AppLayout>
        </AuthCheck>
      )}
    />
  );
}
