import AuthReducer from "./AuthReducer/AuthReducer";
import RequestReducer from "./RequestReducer/RequestReducer";
import UIReducer from "./UIReducer/UIReducer";

const RegisterReducer = {
  auth: AuthReducer,
  ui: UIReducer,
  request: RequestReducer,
};

export default RegisterReducer;
