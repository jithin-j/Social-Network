import { Navigate } from "react-router-dom";
const Protected = ({children}) => {
    const isAuthenticated = localStorage.getItem("token");
    if(isAuthenticated){
        var isLoggedIn = true;
    }
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
