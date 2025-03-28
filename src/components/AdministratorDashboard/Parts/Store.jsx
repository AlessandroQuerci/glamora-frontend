import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Modal, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiPencil } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import { saveShop } from "../../../redux/actions/actions";

const Store = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [isLoading, setIsLoading] = useState(true);
  const [hasShop, setHasShop] = useState(false);
  const [currentShopId, setCurrentShopId] = useState(null);
  const dispatch = useDispatch();
  const [storeData, setStoreData] = useState({
    name: "",
    address: "",
    image: "",
    description: "",
    openingTime: "08:00",
    closingTime: "21:00",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchShopData = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/api/shops/owner/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch shop data");
        }

        const data = await response.json();
        if (data.length > 0) {
          const shop = data[0];
          setCurrentShopId(shop.id);
          setStoreData({
            name: shop.name,
            address: shop.address,
            image: shop.imageUrl || "",
            description: shop.description,
            openingTime: shop.openingTime,
            closingTime: shop.closingTime,
          });
          setHasShop(true);
          dispatch(saveShop(shop));
        }
      } catch (error) {
        console.error("Error fetching shop:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopData();
  }, [user?.id, token]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setStoreData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      setAlertMessage("User ID not available");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        name: storeData.name,
        ownerId: user.id,
        address: storeData.address,
        description: storeData.description,
        openingTime: storeData.openingTime,
        closingTime: storeData.closingTime,
      })
    );

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const url = hasShop ? `http://localhost:8080/api/shops/${currentShopId}` : "http://localhost:8080/api/shops";

      const method = hasShop ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Operation failed");
      }

      setStoreData((prev) => ({
        ...prev,
        image: responseData.imageUrl || prev.image,
      }));
      setHasShop(true);
      setAlertMessage(`Shop ${hasShop ? "updated" : "created"} successfully!`);
      setAlertVariant("success");
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error.message || `Error ${hasShop ? "updating" : "creating"} shop`);
      setAlertVariant("danger");
    } finally {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!hasShop) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-white display-4 mb-4">No shop registered</p>
        <Button variant="light" className="rounded-pill font-navbar fw-bold fs-4 px-4 py-2" onClick={handleOpenModal}>
          <FaPlus className="me-2" />
          Add your shop
        </Button>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create New Shop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Shop Name*</Form.Label>
                <Form.Control type="text" name="name" value={storeData.name} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address*</Form.Label>
                <Form.Control type="text" name="address" value={storeData.address} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Shop Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={storeData.description} onChange={handleInputChange} maxLength={200} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Opening Time*</Form.Label>
                <Form.Control type="time" name="openingTime" value={storeData.openingTime} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Closing Time*</Form.Label>
                <Form.Control type="time" name="closingTime" value={storeData.closingTime} onChange={handleInputChange} required />
              </Form.Group>

              <Button variant="dark" type="submit">
                Create Shop
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-column p-5">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <p className="display-1 text-white fw-bold font-glamora">My Shop</p>
          <Link onClick={handleOpenModal}>
            <HiPencil className="text-white fs-1" />
          </Link>
        </div>

        <Container fluid className="mt-5 pt-3">
          <Row className="d-flex justify-content-center align-items-center mb-5">
            <Col xs={12} xl={7} className="border-start border-white border-3 ps-4">
              <p className="text-white font-glamora display-3 mb-3">{storeData.name}</p>
              <p className="text-white font-navbar fs-3 m-0">{storeData.address}</p>
            </Col>
            <Col xl={3} className="d-none d-md-block">
              {storeData.image && (
                <img src={storeData.image} alt="Shop" className="rounded-circle img-fluid object-fit-cover" style={{ width: "200px", height: "200px" }} />
              )}
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center pt-5">
            <Col xl={7} className="border-start border-white border-3 ps-4 pe-5">
              <p className="text-white font-navbar fs-3 m-0">
                <i>{storeData.description}</i>
              </p>
            </Col>
            <Col xl={3} className="border-start border-white border-3 ps-4 mt-5 m-xl-0">
              <p className="text-white font-navbar fs-3 m-0">HOURS</p>
              <div className="d-flex justify-content-start">
                <p className="text-white font-navbar fs-3 m-0 me-4">{storeData.openingTime}</p>
                <p className="text-white font-navbar fs-3 m-0 me-4">-</p>
                <p className="text-white font-navbar fs-3 m-0">{storeData.closingTime}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Shop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Shop Name*</Form.Label>
              <Form.Control type="text" name="name" value={storeData.name} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address*</Form.Label>
              <Form.Control type="text" name="address" value={storeData.address} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Shop Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              {storeData.image && !selectedFile && (
                <div className="mt-2">
                  <img src={storeData.image} alt="Current shop" style={{ maxWidth: "100px", maxHeight: "100px" }} className="img-thumbnail" />
                  <p className="text-muted small mt-1">Current image</p>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={storeData.description} onChange={handleInputChange} maxLength={200} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Opening Time*</Form.Label>
              <Form.Control type="time" name="openingTime" value={storeData.openingTime} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Closing Time*</Form.Label>
              <Form.Control type="time" name="closingTime" value={storeData.closingTime} onChange={handleInputChange} required />
            </Form.Group>

            <Button variant="dark" type="submit">
              Update Shop
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {showAlert && (
        <Alert variant={alertVariant} className="position-fixed top-0 end-0 m-3" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
    </>
  );
};

export default Store;
