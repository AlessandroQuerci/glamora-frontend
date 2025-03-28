import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Calendary = () => {
  // Stato per mese e anno selezionati
  const [meseSelezionato, setMeseSelezionato] = useState(new Date().getMonth());
  const [annoSelezionato, setAnnoSelezionato] = useState(new Date().getFullYear());

  // Nomi dei mesi in italiano
  const nomiMesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

  // Genera un array di anni per il selettore (da 5 anni fa a 5 anni dopo)
  const anniDisponibili = [];
  const annoCorrente = new Date().getFullYear();
  for (let i = annoCorrente - 5; i <= annoCorrente + 5; i++) {
    anniDisponibili.push(i);
  }

  // Genera i giorni del calendario per il mese/anno selezionato
  const generaGiorniCalendario = () => {
    const ultimoGiorno = new Date(annoSelezionato, meseSelezionato + 1, 0);
    const giorniTotali = ultimoGiorno.getDate();

    const giorniCalendario = [];

    // Aggiungi tutti i giorni del mese
    for (let i = 1; i <= giorniTotali; i++) {
      giorniCalendario.push(i);
    }

    return giorniCalendario;
  };

  // Organizza i giorni in righe di 7 giorni ciascuna
  const organizzaGiorniInRighe = () => {
    const giorniCalendario = generaGiorniCalendario();
    const righe = [];

    for (let i = 0; i < giorniCalendario.length; i += 7) {
      righe.push(giorniCalendario.slice(i, i + 7));
    }

    return righe;
  };

  // Ottieni l'array delle righe di giorni
  const righeCalendario = organizzaGiorniInRighe();

  // Funzione per gestire il cambio di mese
  const handleMeseChange = (e) => {
    setMeseSelezionato(parseInt(e.target.value));
  };

  // Funzione per gestire il cambio di anno
  const handleAnnoChange = (e) => {
    setAnnoSelezionato(parseInt(e.target.value));
  };

  // Funzione per passare al mese precedente
  const mesePrecedente = () => {
    if (meseSelezionato === 0) {
      setMeseSelezionato(11);
      setAnnoSelezionato(annoSelezionato - 1);
    } else {
      setMeseSelezionato(meseSelezionato - 1);
    }
  };

  // Funzione per passare al mese successivo
  const meseSuccessivo = () => {
    if (meseSelezionato === 11) {
      setMeseSelezionato(0);
      setAnnoSelezionato(annoSelezionato + 1);
    } else {
      setMeseSelezionato(meseSelezionato + 1);
    }
  };

  // Funzione per gestire il click su un giorno
  const handleGiornoClick = (giorno) => {
    console.log(`Hai selezionato: ${giorno} ${nomiMesi[meseSelezionato]} ${annoSelezionato}`);
  };

  const larghezzaCella = 100 / 7;

  return (
    <Container fluid className="p-3">
      <Row className="mb-4">
        <Col>
          <Row className="align-items-center">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Mese</Form.Label>
                <Form.Select value={meseSelezionato} onChange={handleMeseChange}>
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
                <Form.Select value={annoSelezionato} onChange={handleAnnoChange}>
                  {anniDisponibili.map((anno) => (
                    <option key={anno} value={anno}>
                      {anno}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} className="d-flex justify-content-end align-items-end">
              <Button variant="outline-light" onClick={mesePrecedente} className="me-2">
                &lt; Mese precedente
              </Button>
              <Button variant="outline-light" onClick={meseSuccessivo}>
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
                {riga.map((giorno, colIndex) => {
                  const celleNecessarie = 7;

                  return (
                    <div
                      key={`${rigaIndex}-${colIndex}`}
                      style={{
                        width: `${larghezzaCella}%`,
                        minHeight: "100px",
                      }}
                      className="p-1"
                    >
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

                          <span className="badge bg-black  rounded-pill">0</span>
                        </div>
                        <div className="flex-grow-1">{/* Qui puoi visualizzare le prenotazioni del giorno */}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Aggiungi celle vuote per completare la riga a 7 elementi */}
                {Array.from({ length: 7 - riga.length }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    style={{
                      width: `${larghezzaCella}%`,
                      minHeight: "100px",
                    }}
                    className="p-1"
                  >
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
