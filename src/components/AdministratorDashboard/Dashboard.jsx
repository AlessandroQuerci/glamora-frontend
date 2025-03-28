import { Col, Container, Row } from "react-bootstrap";
import { Routes, Route, Outlet } from "react-router-dom";

//PARTS

import AdministratorSettings from "./Parts/AdministratorSettings";
import Services from "./Parts/Services";
import Bookings from "./Parts/Bookings";
import Clients from "./Parts/Clients";
import DashboardNavBar from "./Parts/DashboardNavBar";
import Store from "./Parts/Store";

const Dashboard = () => {
  return (
    <>
      <Container fluid className="vh-100 bg-glamora ">
        <Row>
          <Col xs={0} md={1} className="d-none d-md-block vh-100 border-white border-end">
            <DashboardNavBar />
          </Col>
          <Col xs={12} md={11}>
            <Routes>
              <Route path="bookings" element={<Bookings />} />
              <Route path="services" element={<Services />} />
              <Route path="clients" element={<Clients />} />
              <Route path="store" element={<Store />} />
              <Route path="settings" element={<AdministratorSettings />} />
              <Route index element={<Store />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
