import { Col, Container, Row } from "react-bootstrap";

//ICONS
import { FaRegUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { BiCross } from "react-icons/bi";

const MainSection = () => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-white px-3">
        <p className="pt-5 font-glamora display-3 fw-bold w-100 text-center  mb-5">
          Scegli <i>Glamora</i>, il servizio fatto apposta per te!
        </p>

        <Container className="mb-5">
          <Row className="d-flex justify-content-between">
            <Col sm={12} xl={5} className="d-flex  bg-black rounded-5 p-3 mb-5 ">
              <div className="d-flex flex-column ">
                <FaRegUser className="text-white fs-icons mt-5 ms-4" />
                <div className="d-flex justify-content-start ms-4 mt-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">PRENOTA IN POCHI CLICK</p>
                </div>
                <div className="d-flex justify-content-start ms-4 mt-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">ORARI FLESSIBILI, SCEGLI QUANDO VUOI</p>
                </div>
                <div className="d-flex justify-content-start ms-4 mt-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">PROMEMORIA AUTOMATICI, NIENTE PIÙ DIMENTICANZE</p>
                </div>
                <div className="d-flex justify-content-start ms-4 mt-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">SERVIZI SU MISURA, PENSATI PER TE</p>
                </div>
                <div className="d-flex justify-content-start ms-4 mt-4 mb-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">OFFERTE ESCLUSIVE, SOLO PRENOTANDO ONLINE</p>
                </div>
              </div>
            </Col>
            <Col sm={12} xl={5} className="d-flex  bg-black rounded-5 p-3 mb-5 ">
              <div className="d-flex flex-column ">
                <FaBuildingUser className="text-white fs-icons mt-5 ms-4" />
                <div className="d-flex justify-content-start ms-4 mt-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">FLUSSO DI LAVORO SEMPLICE ED EFFICACE</p>
                </div>
                <div className="d-flex justify-content-start ms-4 mt-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">SFRUTTA IL 100% DEL TUO TEMPO</p>
                </div>
                <div className="d-flex justify-content-start ms-4 mt-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">DATI IN TEMPO REALE</p>
                </div>
                <div className="d-flex justify-content-start ms-4 mt-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">SERVIZIO CLIENTI INTEGRATO</p>
                </div>
                <div className="d-flex justify-content-start ms-4 mt-4">
                  <p className="text-white fs-5 fw-bold font-navbar me-2">-</p>
                  <p className="text-white fs-5 fw-bold font-navbar">CREA OFFERTE PER I TUOI CLIENTI</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MainSection;
