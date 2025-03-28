import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

// MEDIA
import logo from "../../assets/image/logo/2.png";
import negozio from "../../assets/image/media/reviews/barber 27.png";
import { useSelector } from "react-redux";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Inserisci il nome di un negozio");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/shops/search-exact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: searchTerm,
        }),
      });

      if (!response.ok) {
        throw new Error("Nessun negozio trovato");
      }

      const data = await response.json();
      setShops(data);
    } catch (err) {
      setError(err.message);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShopClick = (shopId) => {
    navigate(`/details/${shopId}`);
  };

  return (
    <Container fluid className="bg-glamora min-vh-100">
      {/* Header con logo */}
      <Row className="d-flex justify-content-center align-items-center pt-4">
        <Col xs={12} className="text-center">
          <Link to="/">
            <img src={logo} alt="Logo" width="10%" className="py-4" draggable="false" />
          </Link>
        </Col>
      </Row>

      {/* Barra di ricerca */}
      <Row className="d-flex justify-content-center mt-3 px-3">
        <Col xs={12} md={8} lg={6}>
          <div className="d-flex align-items-center bg-white rounded-pill p-2 shadow">
            <Form.Control
              as="input"
              placeholder="Cerca il tuo negozio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 bg-transparent flex-grow-1"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button variant="link" onClick={handleSearch} disabled={loading} className="text-dark">
              <FaSearch size={20} />
            </Button>
          </div>
          {error && <p className="text-white text-center mt-2">{error}</p>}
        </Col>
      </Row>

      {/* Risultati */}
      <Row className="mt-4 px-3">
        <Col xs={12} className="d-flex flex-column align-items-center">
          {loading ? (
            <div className="text-white">Caricamento in corso...</div>
          ) : shops.length > 0 ? (
            shops.map((shop) => (
              <div
                key={shop.id}
                className="bg-glamora-2 rounded-3 p-3 mb-3 w-100"
                style={{ maxWidth: "600px", cursor: "pointer" }}
                onClick={() => handleShopClick(shop.id)}
              >
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <img
                      src={shop.imageUrl || negozio}
                      alt={shop.name}
                      className="rounded-circle"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h5 className="text-white mb-1">{shop.name}</h5>
                    <p className="text-white-50 mb-0">{shop.address}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && searchTerm && <div className="text-white">Nessun risultato trovato</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
