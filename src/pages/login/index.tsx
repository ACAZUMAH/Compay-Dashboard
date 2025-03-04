import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../providers/authProvider";

export const Login = () => {
  return (
    <AuthPage
      title={false}
      type="login"
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};
