import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Modal, Alert, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const StoreDetails = () => {
  const { id: shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user.id);

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/shops/${shopId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Errore nel caricamento del negozio");
        const data = await response.json();
        setShop(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [shopId]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/shops/${shopId}/services`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Errore nel caricamento dei servizi");
      const data = await response.json();
      setServices(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAvailableSlots = async () => {
    if (!selectedService || !selectedDate || selectedShift === null) return;

    try {
      const isMorning = selectedShift === "mattina";
      const date = selectedDate.toISOString().split("T")[0];

      const response = await fetch(
        `http://localhost:8080/api/bookings/available-slots?shopId=${shopId}&serviceId=${selectedService.id}&date=${date}&isMorning=${isMorning}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Errore nel recupero degli orari");

      const data = await response.json();
      setAvailableSlots(data.availableSlots || []);
    } catch (err) {
      setError(err.message);
      setAvailableSlots([]);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchServices();
    }
  }, [showModal]);

  useEffect(() => {
    if (selectedDate && selectedShift !== null) {
      fetchAvailableSlots();
    }
  }, [selectedDate, selectedShift]);

  const handleFinalBooking = async () => {
    try {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":");
      dateTime.setHours(parseInt(hours));
      dateTime.setMinutes(parseInt(minutes));

      const bookingRequest = {
        dateTime: dateTime.toISOString(),
        userId,
        shopId: parseInt(shopId),
        serviceId: selectedService.id,
      };

      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingRequest),
      });

      if (!response.ok) throw new Error("Errore nella prenotazione");

      const data = await response.json();
      setBookingSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        resetModal();
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    resetModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetModal();
  };

  const resetModal = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedShift(null);
    setAvailableSlots([]);
    setSelectedTime(null);
    setShowConfirmation(false);
    setBookingSuccess(false);
    setError(null);
  };

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-glamora">
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  if (error || !shop) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-glamora">
        <Alert variant="danger">{error || "Nessun negozio trovato"}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Container fluid className="p-0 vh-100">
        <Row className="h-100 p-4 pb-0 m-0 bg-glamora">
          <Col xs={12} md={5} className="d-flex p-0 pe-md-4 pb-4">
            <div className="bg-glamora-2 rounded-3 p-3">
              <img className="w-100 h-100 img-fluid object-fit-cover p-0 m-0 rounded" src={shop.imageUrl || negozio} alt={shop.name} id="detailsStore" />
            </div>
          </Col>
          <Col xs={12} md={7} className="d-flex flex-column p-0">
            <div className="bg-glamora-2 rounded-3 p-5 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <p className="display-4 fw-bold font-navbar text-white m-0 me-3">{shop.name}</p>
                <Link to={"/search"}>
                  <MdOutlineKeyboardArrowLeft className="text-white display-1" />
                </Link>
              </div>

              <p className="fs-4 font-navbar fw-bold text-white m-0 pt-2 me-5">{shop.address}</p>
              <div className="d-flex justify-content-start align-items-center p-0 pt-4">
                <p className="fs-4 fw-bold text-white p-0 m-0 me-4">ORARI</p>
                <div className="d-flex justify-content-start align-items-center p-0">
                  <p className="fs-4 text-white p-0 m-0 me-3">{shop.openingTime || "07:00"}</p>
                  <p className="fs-4 text-white p-0 m-0">{shop.closingTime || "21:00"}</p>
                </div>
              </div>
              <p className="fs-4 text-white px-0 m-0 mt-4">
                <i>{shop.description || "Nessuna descrizione disponibile"}</i>
              </p>
            </div>
            <div className="bg-glamora-2 rounded-3 p-5 mt-4 d-flex justify-content-center align-items-center mb-4">
              <p className="d-none d-md-block text-white fw-bold font-navbar fs-3 m-0 me-3">Questo negozio fa al caso tuo?</p>
              <Button className="btn btn-light rounded-pill fs-5 p-2 py-3 fw-bold font-navbar me-4 btn-nav" onClick={handleOpenModal}>
                PRENOTA ORA
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modale per la prenotazione */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Prenota un servizio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          {!selectedService ? (
            <>
              <p className="fs-5 mb-3">Seleziona un servizio:</p>
              {services.length === 0 ? (
                <Spinner animation="border" />
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {services.map((service) => (
                    <Button key={service.id} variant="outline-dark" className="rounded-pill" onClick={() => setSelectedService(service)}>
                      {service.name}
                    </Button>
                  ))}
                </div>
              )}
            </>
          ) : !selectedDate ? (
            <>
              <p className="fs-5 mb-3">Seleziona una data:</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
                dateFormat="dd/MM/yyyy"
                className="form-control mb-3"
                placeholderText="Seleziona una data"
                inline
              />
            </>
          ) : selectedShift === null ? (
            <>
              <p className="fs-5 mb-3">Seleziona un turno:</p>
              <div className="d-flex gap-3">
                <Button
                  variant={selectedShift === "mattina" ? "dark" : "outline-dark"}
                  className="flex-grow-1 py-2"
                  onClick={() => setSelectedShift("mattina")}
                >
                  Mattina
                </Button>
                <Button
                  variant={selectedShift === "pomeriggio" ? "dark" : "outline-dark"}
                  className="flex-grow-1 py-2"
                  onClick={() => setSelectedShift("pomeriggio")}
                >
                  Pomeriggio
                </Button>
              </div>
            </>
          ) : !selectedTime ? (
            <>
              <p className="fs-5 mb-3">Seleziona un orario disponibile:</p>
              {availableSlots.length === 0 ? (
                <Spinner animation="border" />
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {availableSlots.map((slot) => (
                    <Button key={slot} variant={selectedTime === slot ? "dark" : "outline-dark"} className="rounded-pill" onClick={() => setSelectedTime(slot)}>
                      {slot}
                    </Button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <p className="fs-5 mb-3">Conferma la prenotazione:</p>
              <div className="mb-3">
                <p>
                  <strong>Servizio:</strong> {selectedService.name}
                </p>
                <p>
                  <strong>Data:</strong> {selectedDate.toLocaleDateString()}
                </p>
                <p>
                  <strong>Orario:</strong> {selectedTime}
                </p>
              </div>
              <Button variant="dark" className="w-100 py-2" onClick={handleFinalBooking} disabled={bookingSuccess}>
                {bookingSuccess ? "Prenotazione confermata!" : "Conferma prenotazione"}
              </Button>
            </>
          )}
        </Modal.Body>
        {bookingSuccess && (
          <Alert variant="success" className="m-3">
            Prenotazione eseguita con successo! Riceverai una conferma via email.
          </Alert>
        )}
      </Modal>
    </>
  );
};

export default StoreDetails;
