//MEDIA
import heroPhoto1 from "../../../assets/image/media/hero/orologi.jpg";
import heroPhoto2 from "../../../assets/image/media/hero/1.jpg";
import heroPhoto3 from "../../../assets/image/media/hero/2.jpg";
import heroPhoto4 from "../../../assets/image/media/hero/3.jpg";
import heroPhoto5 from "../../../assets/image/media/hero/4.jpg";
import heroPhoto6 from "../../../assets/image/media/hero/5.jpg";
import heroPhoto7 from "../../../assets/image/media/hero/6.jpg";
import heroPhoto8 from "../../../assets/image/media/hero/7.jpg";
import heroPhoto9 from "../../../assets/image/media/hero/8.jpg";
import heroPhoto10 from "../../../assets/image/media/hero/9.jpg";

import { Col, Row, Container, Button } from "react-bootstrap";
const HeroSection = () => {
  return (
    <>
      <div className="d-none d-md-flex justify-content-sm-start justify-content-xl-center bg-white align-items-center nav-border-bottom ">
        <div className="w-100 w-xl-50   d-flex justify-content-center align-items-center  align-items-xl-start p-4 " id="textHero">
          <div className="w-100 w-xl-50 d-flex flex-column justify-content-center align-items-center  align-items-xl-start">
            <h2 className="d-none d-xl-block text-black font-hero  display-1  py-3 ">Ogni secondo conta, rendilo impeccabile...</h2>
            <p className="text-black  fs-5 py-2">Scopri l'universo Glamora e i partner affiliati...</p>
            {/* <div className="d-flex justify-content-between pt-2 align-middle">
              <Button className="btn btn-dark rounded-pill  fs-5 me-2 btn-nav" id="heroButtons">
                Cose che tutti ci chiedono?
              </Button>
              <Button className="btn btn-dark rounded-pill  fs-5 me-2 btn-nav" id="heroButtons">
                Accedi al portale
              </Button>
            </div> */}
          </div>
        </div>
        <div className="d-none d-xl-flex  w-50  p-5">
          <Container id="heroGrid">
            <Row className="d-flex justify-content-center p-0 h-50">
              <Col className="p-0 h-100" xs={4}>
                <div className="h-100">
                  <div className="h-30 p-2">
                    <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto9} alt="" id="photo1-1" />
                  </div>
                  <div className="h-70 p-2 ">
                    <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto8} alt="" id="photo2-1" />
                  </div>
                </div>
              </Col>
              <Col className="p-0  h-100" xs={6}>
                <div className=" h-100 p-2">
                  <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto5} alt="" id="photo3-1" />
                </div>
              </Col>
              <Col className="p-0  h-100" xs={2}>
                <div className="h-50 p-2 ">
                  <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto7} alt="" id="photo4-1" />
                </div>
                <div className="h-50 p-2 ">
                  <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto3} alt="" id="photo5-1" />
                </div>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center h-25 p-0 ">
              <Col className="p-0 h-100" xs={6}>
                <div className="h-100">
                  <div className="h-100 p-2 ">
                    <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto10} alt="" />
                  </div>
                </div>
              </Col>
              <Col className="p-0 h-100" xs={3}>
                <div className=" h-100 p-2">
                  <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto4} alt="" />
                </div>
              </Col>
              <Col className="p-0 h-100" xs={3}>
                <div className="h-100 p-2 ">
                  <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto6} alt="" />
                </div>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center h-25 p-0">
              <Col className="p-0 h-100" xs={3}>
                <div className="h-100">
                  <div className="h-100 p-2 ">
                    <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto2} alt="" />
                  </div>
                </div>
              </Col>
              <Col className="p-0 h-100" xs={9}>
                <div className=" h-100 p-2">
                  <img draggable="false" className="w-100 h-100 image-fluid object-fit-cover rounded" src={heroPhoto1} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
