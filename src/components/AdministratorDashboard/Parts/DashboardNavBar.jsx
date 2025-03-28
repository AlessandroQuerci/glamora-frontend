import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/actions"; // Assicurati che il percorso sia corretto

// ICONS
import { SiGoogleanalytics } from "react-icons/si";
import { FaCalendarAlt } from "react-icons/fa";
import { FaHandHolding } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const DashboardNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del link
    dispatch(logout()); // Dispatch dell'azione di logout
    navigate("/"); // Reindirizza alla home
  };

  return (
    <div className="h-100 d-flex flex-column align-items-center">
      {/* Sezione superiore con i link */}
      <div className="h-50 d-flex flex-column align-items-center">
        <Link to="/dashboard/store" className="py-4">
          <FaStore className="text-white fs-1" />
        </Link>
        <Link to="/dashboard/bookings" className="py-4">
          <FaCalendarAlt className="text-white fs-1" />
        </Link>
        <Link to="/dashboard/services" className="pb-4 pt-2">
          <FaHandHolding className="text-white fs-1" />
        </Link>
        <Link to="/dashboard/clients" className="py-4">
          <FaUsers className="text-white fs-1" />
        </Link>
      </div>

      {/* Sezione inferiore con impostazioni e logout */}
      <div className="h-50 d-flex flex-column-reverse align-items-center">
        <Link
          to="#" // Usa "#" come href temporaneo
          onClick={handleLogout}
          className="pb-5 text-decoration-none"
        >
          <CiLogout className="text-danger fs-1" />
        </Link>
        <Link to="/dashboard/settings" className="pb-5">
          <IoSettingsSharp className="text-white fs-1" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardNavBar;
