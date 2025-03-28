import { Col, Container, Row } from "react-bootstrap";

//MEDIA
import barber27 from "../../../assets/image/media/reviews/barber 27.png";
import barbificio from "../../../assets/image/media/reviews/il barbificio.png";
import barberSantaFe from "../../../assets/image/media/reviews/Barberia Santa Fè.png";
import barberPeloLoco from "../../../assets/image/media/reviews/Barberia PeloLoco.png";

const Review = () => {
  return (
    <>
      <div className="bg-black">
        <Container fluid className="px-4 py-4">
          <Row className="d-flex flex-sm-column flex-xl-row justify-content-around px-5 align-items-start">
            <Col sm={12} xl={3} className="d-flex flex-column justify-content-center p-2 py-3 align-items-center">
              <img className="img-fluid rounded-circle object-fit-cover mb-3  " src={barberPeloLoco} alt="" id="reviewImage" />
              <p className="fs-2 text-white font-glamora m-0 my-1">Barberia PeloLoco</p>
              <p className="fs-6 text-white font-navbar m-0 my-1 mb-2">Roma - Ciampino</p>
              <p className="fs-6 text-white font-navbar text-center m-0 w-75">
                <i>"Grazie a Glamora il mio team riesce a gestire in maniera impeccabile il portafoglio clienti"</i>
              </p>
            </Col>
            <Col sm={12} xl={3} className="d-flex flex-column justify-content-center p-2 py-3 align-items-center">
              <img className="img-fluid rounded-circle object-fit-cover mb-3  " src={barber27} alt="" id="reviewImage" />
              <p className="fs-2 text-white font-glamora m-0 my-1">Barber 27</p>
              <p className="fs-6 text-white font-navbar m-0 my-1 mb-2">Roma - Marconi</p>
              <p className="fs-6 text-white font-navbar text-center m-0 w-75">
                <i>"Wow! Il gestionale dei miei sogni, fortissimi!"</i>
              </p>
            </Col>
            <Col sm={12} xl={3} className="d-flex flex-column justify-content-center p-2 py-3 align-items-center">
              <img className="img-fluid rounded-circle object-fit-cover mb-3  " src={barberSantaFe} alt="" id="reviewImage" />
              <p className="fs-2 text-white font-glamora m-0 my-1">Barberia Santa Fè</p>
              <p className="fs-6 text-white font-navbar m-0 my-1 mb-2">Roma - Conca d'Oro</p>
              <p className="fs-6 text-white font-navbar text-center m-0 w-75">
                <i>"Le mie agende stavano esplodendo, ora grazie a Glamora riesco a gestire tutti gli appuntamenti comodamente dal mio tablet"</i>
              </p>
            </Col>
            <Col sm={12} xl={3} className="d-flex flex-column justify-content-center p-2 py-3 align-items-center">
              <img className="img-fluid rounded-circle object-fit-cover mb-3  " src={barbificio} alt="" id="reviewImage" />
              <p className="fs-2 text-white font-glamora m-0 my-1">Il Barbificio</p>
              <p className="fs-6 text-white font-navbar m-0 my-1 mb-2">Roma - Cipro</p>
              <p className="fs-6 text-white font-navbar text-center m-0 w-75">
                <i>"Finalmente riusciamo a metterci in gioco come mai prima d'ora, vi ringrazio dal profondo del cuore!"</i>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Review;
