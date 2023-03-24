import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className="Navigation">
      Navigation
      <Outlet />
    </div>
  );
};

export default Navigation;
