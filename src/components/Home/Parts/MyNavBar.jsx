import { Navbar, Container, Nav, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/image/logo/2.png";
import { logout } from "../../../redux/actions/actions";

const MyNavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const handlePortalClick = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    navigate(user?.role === "USER" ? "/search" : "/dashboard");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar className="w-100 bg-glamora nav-border-bottom position-sticky" id="navbar" style={{ top: 0 }}>
      <Container fluid className="d-flex w-100">
        <Row className="w-100">
          <Col xs={3} xl={3} className="d-flex ps-5 justify-content-end">
            <Link to="/" className="m-0">
              <img src={logo} alt="" id="logo" draggable="false" />
            </Link>
          </Col>

          <Col xs={9} xl={9} className="d-flex justify-content-end pe-5 align-items-center">
            {/* Versione desktop */}
            <div className="d-none d-md-block custom-border">
              <Nav className="me-auto">
                <Nav.Link className="text-white fs-6 me-5 font-navbar nav-links" onClick={handlePortalClick} style={{ cursor: "pointer" }}>
                  PORTALE
                </Nav.Link>
              </Nav>
            </div>

            {/* Versione mobile */}
            <Dropdown className="d-md-none">
              <Dropdown.Toggle variant="secondary" id="dropdown-menu-mobile" className="text-white fs-6 font-navbar nav-links bg-transparent border-0">
                MENU
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark" align="end">
                <Dropdown.Item className="text-white fs-6" onClick={handlePortalClick}>
                  PORTALE
                </Dropdown.Item>
                {!token && (
                  <>
                    <Dropdown.Item className="text-white fs-6" href="/register">
                      SIGN IN
                    </Dropdown.Item>
                    <Dropdown.Item className="text-white fs-6" href="/login">
                      LOGIN
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* Pulsanti desktop */}
            {!token ? (
              <div className="ps-5 d-none d-md-block">
                <Button className="btn btn-light fw-bold font-navbar rounded-pill fs-7 me-4 btn-nav" href="/register">
                  SIGN IN
                </Button>
                <Button className="btn btn-light fw-bold font-navbar rounded-pill fs-7 btn-nav" href="/login">
                  LOGIN
                </Button>
              </div>
            ) : (
              <div>
                <Dropdown autoClose={true} className="custom-dropdown" drop="down-centered">
                  <Dropdown.Toggle id="dropdown-basic" className="bg-transparent text-white fs-6 me-3 font-navbar nav-links border-0 no-arrow rounded-0">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl.startsWith("http") ? user.imageUrl : `http://localhost:8080${user.imageUrl}`}
                        alt="Profile"
                        id="profileImageHome"
                        style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      <i className="bi bi-person-circle fs-4"></i>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="fs-5 bg-black rounded-0 p-0 text-white" align="end">
                    <Dropdown.Item className="text-white fs-5 p-4" onClick={() => navigate(`/accountpage/${user.id}`)}>
                      ACCOUNT
                    </Dropdown.Item>
                    <Dropdown.Item className="text-danger fs-5 p-4" onClick={handleLogout}>
                      LOGOUT
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
