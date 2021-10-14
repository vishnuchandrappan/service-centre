import Login from "./Login";
import { useHistory } from "react-router-dom";
import { useAuth } from "reactfire";

export const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

export default function LoginContainer() {
  const auth = useAuth();
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      history.push("/");
    } catch (error) {
      console.log("error");
    }
  };

  return <Login handleSubmit={handleSubmit} />;
}
