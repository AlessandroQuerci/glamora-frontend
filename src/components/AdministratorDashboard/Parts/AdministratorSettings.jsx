import React, { useState } from "react";
import { Col, Container, Form, Row, Modal, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiPencil } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, updateUser } from "../../../redux/actions/actions";

const AdministratorSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const [userData, setUserData] = useState({
    id: user.id,
    name: user.name || "",
    surname: user.surname || "",
    email: user.email || "",
    imageUrl: user.imageUrl || "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setUserData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();

    const userJson = JSON.stringify({
      name: userData.name,
      surname: userData.surname,
    });

    const jsonBlob = new Blob([userJson], { type: "application/json" });
    formData.append("data", jsonBlob);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:8080/api/user/settings/${userData.id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Errore ${response.status}: ${response.statusText}`);
      }

      const updatedData = await response.json();

      setUserData((prev) => ({
        ...prev,
        name: updatedData.name,
        surname: updatedData.surname,
        imageUrl: updatedData.imageUrl || prev.imageUrl,
      }));

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        handleCloseModal();
      }, 2000);
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message || "Si è verificato un errore durante il salvataggio");
    }
  };

  return (
    <>
      <div className="d-flex flex-column p-5">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <p className="display-md-1 display-4 text-white fw-bold font-glamora text-truncate">Impostazioni</p>
          <Link onClick={handleOpenModal}>
            <HiPencil className="text-white fs-1" />
          </Link>
        </div>

        <Container fluid className="mt-5 pt-3">
          <Row className="d-flex justify-content-center align-items-center mb-5">
            <Col xl={7} className="border-start border-white border-3 ps-4">
              <p className="text-white font-glamora display-3 mb-3">
                {userData.name} {userData.surname}
              </p>
              <p className="text-white font-navbar fs-3 m-0">{userData.email}</p>
            </Col>
            <Col xl={3} className="mt-5 mt-md-0">
              {userData.imageUrl && (
                <img
                  src={
                    userData.imageUrl.startsWith("blob:")
                      ? userData.imageUrl
                      : userData.imageUrl.startsWith("http")
                      ? userData.imageUrl
                      : `http://localhost:8080${userData.imageUrl}`
                  }
                  alt="Profilo"
                  className="rounded-circle img-fluid object-fit-cover"
                  style={{ width: "200px", height: "200px" }}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="name" value={userData.name} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="surname" value={userData.surname} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Immagine profilo</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
              {userData.imageUrl && !selectedFile && (
                <div className="mt-2">
                  <img
                    src={userData.imageUrl.includes("blob:") ? userData.imageUrl : `http://localhost:8080${userData.imageUrl}`}
                    alt="Current"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                    className="img-thumbnail"
                  />
                </div>
              )}
            </Form.Group>

            <Button variant="dark" type="submit">
              Conferma modifiche
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {showAlert && (
        <Alert variant="success" className="position-fixed top-0 end-0 m-3">
          Profilo aggiornato con successo!
        </Alert>
      )}
    </>
  );
};

export default AdministratorSettings;
