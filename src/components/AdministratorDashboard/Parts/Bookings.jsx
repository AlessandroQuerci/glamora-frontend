import React, { useState } from "react";
import { Col, Container, Form, Row, Modal, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

// ICONS
import { FaPlus } from "react-icons/fa";
import Calendary from "./Calendary";

const Bookings = () => {
  const [showModal, setShowModal] = useState(false); // Stato per aprire/chiudere il modale
  const [showAlert, setShowAlert] = useState(false); // Stato per mostrare l'alert di conferma

  // Stato per i dati della prenotazione
  const [bookingData, setBookingData] = useState({
    temporaryName: "", // Nome temporaneo come reminder
    date: "", // Data della prenotazione
    time: "", // Orario della prenotazione
    service: "", // Servizio richiesto
  });

  // Funzione per aprire il modale
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Funzione per chiudere il modale
  const handleCloseModal = () => {
    setShowModal(false);
    setBookingData({ temporaryName: "", date: "", time: "", service: "" }); // Resetta il form
  };

  // Funzione per gestire la modifica dei dati
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funzione per gestire l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simula l'invio dei dati (sostituisci con una chiamata API reale)
    console.log("Prenotazione creata:", bookingData);

    setShowAlert(true); // Mostra l'alert di conferma
    setTimeout(() => {
      setShowAlert(false); // Nasconde l'alert dopo 2 secondi
      handleCloseModal(); // Chiude il modale
    }, 2000);
  };

  return (
    <>
      <div className="d-flex flex-column pt-5 px-5">
        <div className="d-flex justify-content-between align-items-center">
          <p className="display-1 text-white fw-bold font-glamora">Prenotazioni</p>
          <Link onClick={handleOpenModal}>
            <FaPlus className="text-white fs-1" />
          </Link>
        </div>
      </div>
      <Calendary />

      {/* Modale per aggiungere una prenotazione senza utente collegato */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome temporaneo (reminder)</Form.Label>
              <Form.Control
                type="text"
                name="temporaryName"
                value={bookingData.temporaryName}
                onChange={handleInputChange}
                placeholder="Inserisci un nome temporaneo"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data della prenotazione</Form.Label>
              <Form.Control type="date" name="date" value={bookingData.date} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Orario della prenotazione</Form.Label>
              <Form.Control type="time" name="time" value={bookingData.time} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Servizio richiesto</Form.Label>
              <Form.Control as="select" name="service" value={bookingData.service} onChange={handleInputChange} required>
                <option value="">Seleziona un servizio</option>
                <option value="Taglio Uomo">Taglio Uomo</option>
                <option value="Taglio Donna">Taglio Donna</option>
                <option value="Barba">Barba</option>
                <option value="Colore Capelli">Colore Capelli</option>
              </Form.Control>
            </Form.Group>

            <Button variant="dark" type="submit">
              Aggiungi Prenotazione
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Alert di conferma */}
      {showAlert && (
        <Alert variant="success" className="position-fixed top-0 end-0 m-3">
          Prenotazione aggiunta con successo!
        </Alert>
      )}
    </>
  );
};

export default Bookings;
