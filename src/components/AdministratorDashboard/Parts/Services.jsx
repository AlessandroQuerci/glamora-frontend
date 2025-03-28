import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Modal, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { useSelector } from "react-redux";

const Services = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  const shopId = useSelector((state) => state.shop.id);
  const token = useSelector((state) => state.user.token);

  const [newService, setNewService] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const [editService, setEditService] = useState({
    name: "",
    duration: "",
    price: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/shops/${shopId}/services`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Errore nel caricamento dei servizi");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      showAlertMessage(error.message, "danger");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => setShowCreateModal(true);

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewService({ name: "", duration: "", price: "" });
  };

  const handleOpenEditModal = (service) => {
    setCurrentServiceId(service.id);
    setEditService({
      name: service.name,
      duration: service.duration,
      price: service.price,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentServiceId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showCreateModal) {
      setNewService((prev) => ({ ...prev, [name]: value }));
    } else {
      setEditService((prev) => ({ ...prev, [name]: value }));
    }
  };

  const showAlertMessage = (message, variant = "success") => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newService,
          shopId: shopId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore nella creazione del servizio");
      }

      showAlertMessage("Servizio creato con successo!");
      fetchServices();
      handleCloseCreateModal();
    } catch (error) {
      showAlertMessage(error.message, "danger");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!currentServiceId) return;

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/api/services/${currentServiceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editService,
          id: currentServiceId,
          shopId: shopId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore nella modifica del servizio");
      }

      showAlertMessage("Servizio modificato con successo!");
      fetchServices();
      handleCloseEditModal();
    } catch (error) {
      showAlertMessage(error.message, "danger");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo servizio?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore nell'eliminazione del servizio");
      }

      showAlertMessage("Servizio eliminato con successo!");
      fetchServices();
    } catch (error) {
      showAlertMessage(error.message, "danger");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-column p-5">
        <div className="d-flex justify-content-between mb-5 align-items-center">
          <p className="display-1 text-white fw-bold font-glamora">Servizi</p>
          <Link onClick={handleOpenCreateModal}>
            <FaPlus className="text-white fs-1" />
          </Link>
        </div>

        {isLoading && services.length === 0 ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Container fluid>
            <Row className="d-none d-lg-flex border-bottom border-end border-white border-3">
              <Col xl={3} className="border-start border-white border-3 ps-3">
                <p className="text-white fs-3 font-navbar m-0 p-0">Nome</p>
              </Col>
              <Col xl={3} className="border-start border-white border-3 ps-3">
                <p className="text-white fs-3 font-navbar m-0 p-0">Prezzo in €</p>
              </Col>
              <Col xl={6} className="border-start border-white border-3"></Col>
            </Row>

            {services.map((service) => (
              <Row key={service.id} className="border-bottom border-end border-white border-3 d-flex justify-content-center align-items-center d-md-flex">
                <Col xs={10} xl={3} className="py-3 border-start border-top border-white border-3 ps-3">
                  <p className="text-white fs-3 font-navbar m-0 p-0">{service.name}</p>
                </Col>
                <Col xs={2} xl={3} className="py-3 border-top border-white border-3 ps-3">
                  <p className="text-white fs-3 font-navbar m-0 pe-5">{service.price}</p>
                </Col>
                <Col xs={12} xl={6} className="py-3 d-flex justify-content-around border-start border-top border-white border-3 ps-3 m-0">
                  <Link onClick={() => handleOpenEditModal(service)}>
                    <HiPencil className="text-white fs-1" />
                  </Link>
                  <Link onClick={() => handleDeleteService(service.id)}>
                    <MdDelete className="text-white fs-1" />
                  </Link>
                </Col>
              </Row>
            ))}
          </Container>
        )}
      </div>

      {/* Modale per creare un nuovo servizio */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crea un nuovo servizio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome del servizio</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newService.name}
                onChange={handleInputChange}
                placeholder="Inserisci il nome del servizio"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Durata (in minuti)</Form.Label>
              <Form.Control type="number" name="duration" value={newService.duration} onChange={handleInputChange} placeholder="Inserisci la durata" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prezzo (in €)</Form.Label>
              <Form.Control type="number" name="price" value={newService.price} onChange={handleInputChange} placeholder="Inserisci il prezzo" required />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : "Crea servizio"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modale per modificare un servizio esistente */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Servizio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome del servizio</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editService.name}
                onChange={handleInputChange}
                placeholder="Inserisci il nome del servizio"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Durata (in minuti)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={editService.duration}
                onChange={handleInputChange}
                placeholder="Inserisci la durata"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prezzo (in €)</Form.Label>
              <Form.Control type="number" name="price" value={editService.price} onChange={handleInputChange} placeholder="Inserisci il prezzo" required />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : "Salva modifiche"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Alert di conferma */}
      {showAlert && (
        <Alert variant={alertVariant} className="position-fixed top-0 end-0 m-3" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
    </>
  );
};

export default Services;
