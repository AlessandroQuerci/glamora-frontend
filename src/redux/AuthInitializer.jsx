import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreAuth } from "../redux/actions/actions";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("reduxState"))?.user;
    if (authData?.token && authData?.isAuthenticated) {
      dispatch(restoreAuth(authData));
    }
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
