import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userid");

    // Redirect the user to the login page
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>
      <span>Logout</span>
    </button>
  );
};
export default LogoutButton;