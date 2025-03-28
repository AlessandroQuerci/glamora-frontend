import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Calendary = () => {
  const [meseSelezionato, setMeseSelezionato] = useState(new Date().getMonth());
  const [annoSelezionato, setAnnoSelezionato] = useState(new Date().getFullYear());
  const [statsPrenotazioni, setStatsPrenotazioni] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const shopId = useSelector((state) => state.shop.id);
  const token = useSelector((state) => state.user.token);

  const nomiMesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

  useEffect(() => {
    const fetchBookingStats = async () => {
      if (!shopId) return;

      setLoading(true);
      setError(null);

      try {
        const url = new URL("http://localhost:8080/api/bookings/stats");
        url.searchParams.append("shopId", shopId);
        url.searchParams.append("year", annoSelezionato);
        url.searchParams.append("month", meseSelezionato + 1);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status}`);
        }

        const data = await response.json();

        setStatsPrenotazioni(data.dailyCounts);
      } catch (err) {
        setError("Errore nel caricamento delle statistiche");
        console.error("Errore fetch prenotazioni:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingStats();
  }, [shopId, annoSelezionato, meseSelezionato]);

  const handleGiornoClick = (giorno) => {
    const dataFormattata = `${annoSelezionato}-${(meseSelezionato + 1).toString().padStart(2, "0")}-${giorno.toString().padStart(2, "0")}`;
    navigate(`day/${dataFormattata}`);
  };

  const generaGiorniCalendario = () => {
    const ultimoGiorno = new Date(annoSelezionato, meseSelezionato + 1, 0);
    const giorniTotali = ultimoGiorno.getDate();

    const giorniCalendario = [];

    for (let i = 1; i <= giorniTotali; i++) {
      giorniCalendario.push(i);
    }

    return giorniCalendario;
  };

  const organizzaGiorniInRighe = () => {
    const giorniCalendario = generaGiorniCalendario();
    const righe = [];

    for (let i = 0; i < giorniCalendario.length; i += 7) {
      righe.push(giorniCalendario.slice(i, i + 7));
    }

    return righe;
  };

  const righeCalendario = organizzaGiorniInRighe();

  const getNumeroPrenotazioni = (giorno) => {
    const dataFormattata = `${annoSelezionato}-${(meseSelezionato + 1).toString().padStart(2, "0")}-${giorno.toString().padStart(2, "0")}`;
    return statsPrenotazioni[dataFormattata] || 0;
  };

  const larghezzaCella = 100 / 7;

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return <Container className="text-center text-danger my-4">{error}</Container>;
  }

  return (
    <Container fluid className="p-3">
      <Row className="mb-4">
        <Col>
          <Row className="align-items-center">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Mese</Form.Label>
                <Form.Select value={meseSelezionato} onChange={(e) => setMeseSelezionato(parseInt(e.target.value))}>
                  {nomiMesi.map((mese, index) => (
                    <option key={index} value={index}>
                      {mese}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Anno</Form.Label>
                <Form.Select value={annoSelezionato} onChange={(e) => setAnnoSelezionato(parseInt(e.target.value))}>
                  {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i).map((anno) => (
                    <option key={anno} value={anno}>
                      {anno}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} className="d-flex justify-content-end align-items-end">
              <Button
                variant="outline-light"
                onClick={() => {
                  if (meseSelezionato === 0) {
                    setMeseSelezionato(11);
                    setAnnoSelezionato(annoSelezionato - 1);
                  } else {
                    setMeseSelezionato(meseSelezionato - 1);
                  }
                }}
                className="me-2"
              >
                &lt; Mese precedente
              </Button>
              <Button
                variant="outline-light"
                onClick={() => {
                  if (meseSelezionato === 11) {
                    setMeseSelezionato(0);
                    setAnnoSelezionato(annoSelezionato + 1);
                  } else {
                    setMeseSelezionato(meseSelezionato + 1);
                  }
                }}
              >
                Mese successivo &gt;
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="calendario-container" style={{ width: "100%" }}>
            {righeCalendario.map((riga, rigaIndex) => (
              <div key={rigaIndex} className="d-flex w-100 mb-2">
                {riga.map((giorno, colIndex) => (
                  <div key={`${rigaIndex}-${colIndex}`} style={{ width: `${larghezzaCella}%`, minHeight: "100px" }} className="p-1">
                    <div
                      className="h-100 p-2 border d-flex flex-column"
                      style={{
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                        backgroundColor:
                          giorno === new Date().getDate() && meseSelezionato === new Date().getMonth() && annoSelezionato === new Date().getFullYear()
                            ? "#e6f7ff"
                            : "white",
                      }}
                      onClick={() => handleGiornoClick(giorno)}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">{giorno}</span>
                        <span className="badge bg-black rounded-pill">{getNumeroPrenotazioni(giorno)}</span>
                      </div>
                      <div className="flex-grow-1"></div>
                    </div>
                  </div>
                ))}

                {/* Celle vuote per completare la riga */}
                {Array.from({ length: 7 - riga.length }).map((_, index) => (
                  <div key={`empty-${index}`} style={{ width: `${larghezzaCella}%`, minHeight: "100px" }} className="p-1">
                    <div className="h-100 border bg-light"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Calendary;
