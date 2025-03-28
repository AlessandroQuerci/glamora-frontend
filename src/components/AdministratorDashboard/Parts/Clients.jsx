import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

//ICONS
import { FaPlus } from "react-icons/fa";

//MEDIA
import user from "../../../assets/image/user/user.png";

const Clients = () => {
  return (
    <>
      <div className="d-flex flex-column p-5 ">
        <div className="d-flex justify-content-between mb-5 align-items-center">
          <p className="display-1 text-white fw-bold font-glamora ">Clienti</p>
        </div>
        <Container fluid className="d-flex justify-content-center align-items-center">
          <p className="display-2 text-white font-navbar">Coming Soon...</p>
          {/*

<Row className="d-flex justify-content-start mb-5">
  <Col xs={10} md={8} xl={6} className="d-flex ">
    <Form className="w-50">
      <Form.Group>
        <Form.Label className="text-white font-navbar fs-6 mb-3">Cerca tra i clienti</Form.Label>
        <Form.Control as={"textarea"} placeholder="Nome e cognome del cliente" rows={1} type="text" id="custom-input" />
      </Form.Group>
    </Form>
  </Col>
</Row>
<Row className="d-flex justify-content-start ">
  <div className="d-flex justify-content-center flex-column rounded-3 bg-glamora-2 pb-4 pe-4 ps-4 w-100">
    <div className="bg-white rounded-3 d-flex justify-content-start w-100 mt-4" id="clientCard">
      <Col xs={1}>
        <img src={user} alt="" id="dashClientNegozio" className="w-100 img-fluid object-fit-cover rounded-start" />
      </Col>
      <Col xs={11} className="px-3 ">
        <p className="fs-4 text-black font-glamora fw-bold m-0 p-0">Mirko Tomassini</p>
        <p className="fs-6 text-black m-0 p-0 text-truncate">esempio@gmail.com</p>
      </Col>
    </div>
    <div className="bg-white rounded-3 d-flex justify-content-start w-100 mt-4" id="clientCard">
      <Col xs={1}>
        <img src={user} alt="" id="dashClientNegozio" className="w-100 img-fluid object-fit-cover rounded-start" />
      </Col>
      <Col xs={11} className="px-3 ">
        <p className="fs-4 text-black font-glamora fw-bold m-0 p-0">Mirko Tomassini</p>
        <p className="fs-6 text-black m-0 p-0 text-truncate">esempio@gmail.com</p>
      </Col>
    </div>
    <div className="bg-white rounded-3 d-flex justify-content-start w-100 mt-4" id="clientCard">
      <Col xs={1}>
        <img src={user} alt="" id="dashClientNegozio" className="w-100 img-fluid object-fit-cover rounded-start" />
      </Col>
      <Col xs={11} className="px-3 ">
        <p className="fs-4 text-black font-glamora fw-bold m-0 p-0">Mirko Tomassini</p>
        <p className="fs-6 text-black m-0 p-0 text-truncate">esempio@gmail.com</p>
      </Col>
    </div>
    <div className="bg-white rounded-3 d-flex justify-content-start w-100 mt-4" id="clientCard">
      <Col xs={1}>
        <img src={user} alt="" id="dashClientNegozio" className="w-100 img-fluid object-fit-cover rounded-start" />
      </Col>
      <Col xs={11} className="px-3 ">
        <p className="fs-4 text-black font-glamora fw-bold m-0 p-0">Mirko Tomassini</p>
        <p className="fs-6 text-black m-0 p-0 text-truncate">esempio@gmail.com</p>
      </Col>
    </div>
  </div>
</Row> 
           */}
        </Container>
      </div>
    </>
  );
};

export default Clients;
