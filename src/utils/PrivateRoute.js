import { Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);
  return <Route {...rest}>{!user ?<Navigate to ="/products" />: children}</Route>;
};

export default PrivateRoute;