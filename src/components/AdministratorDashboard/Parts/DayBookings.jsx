import { Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DayBookings = () => {
  const { date } = useParams();
  const shopId = useSelector((state) => state.shop.id);
  const token = useSelector((state) => state.user.token);

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const morningSlots = bookings.filter((booking) => {
    const hours = new Date(booking.dateTime).getHours();
    return hours < 12;
  });

  const afternoonSlots = bookings.filter((booking) => {
    const hours = new Date(booking.dateTime).getHours();
    return hours >= 12;
  });

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const url = new URL("http://localhost:8080/api/bookings/today");
        url.searchParams.append("shopId", shopId);
        url.searchParams.append("date", date);

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status}`);
        }

        const data = await response.json();
        setBookings(data.bookings);
      } catch (err) {
        setError("Errore nel caricamento delle prenotazioni");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [date, shopId, token]);

  // Fetch dei dettagli della prenotazione quando selezionata
  const fetchBookingDetails = async (idBooking) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${idBooking}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }

      const bookingDetails = await response.json();
      setSelectedBooking(bookingDetails);
    } catch (err) {
      console.error("Errore nel caricamento dei dettagli:", err);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return <Container className="text-center text-danger my-5">{error}</Container>;
  }

  return (
    <div className="d-flex flex-column">
      {/* Sezione Prenotazioni */}
      <Container className="border h-75 mt-5 border-white border-2 rounded-4 p-0 overflow-hidden">
        {/* Prenotazioni Mattutine */}
        <Row className="border-bottom border-white border-2 py-3 m-0">
          <Col xs={12}>
            <p className="display-4 font-glamora text-white mt-2 ms-3 mb-3">Mattutine</p>
            <div className="d-flex flex-wrap px-3">
              {morningSlots.map((booking) => (
                <Button
                  key={`morning-${booking.id}`}
                  className="text-white font-navbar rounded-pill me-3 mb-3 fs-6 px-3"
                  variant={selectedBooking?.id === booking.id ? "light" : "outline-light"}
                  id="pillsBooking"
                  style={{
                    flex: "0 0 auto",
                    whiteSpace: "nowrap",
                    borderWidth: "2px",
                  }}
                  onClick={() => fetchBookingDetails(booking.id)}
                >
                  {formatTime(booking.dateTime)}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Prenotazioni Pomeridiane */}
        <Row className="py-3 m-0">
          <Col xs={12}>
            <p className="display-4 font-glamora text-white mt-2 ms-3 mb-3">Pomeridiane</p>
            <div className="d-flex flex-wrap px-3">
              {afternoonSlots.map((booking) => (
                <Button
                  key={`afternoon-${booking.id}`}
                  className="text-white font-navbar rounded-pill me-3 mb-3 fs-6 px-3"
                  variant={selectedBooking?.id === booking.id ? "light" : "outline-light"}
                  id="pillsBooking"
                  style={{
                    flex: "0 0 auto",
                    whiteSpace: "nowrap",
                    borderWidth: "2px",
                  }}
                  onClick={() => fetchBookingDetails(booking.id)}
                >
                  {formatTime(booking.dateTime)}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Dettagli Prenotazione */}
      <Container className="border mt-3 border-white border-2 rounded-4 p-0 overflow-hidden mt-5">
        <Row>
          <Col xs={12}>
            <p className="display-4 font-glamora text-white mt-2 ms-3 mb-4">Dettagli Prenotazione</p>

            <div className="d-flex align-items-center ms-4 my-3">
              <p className="fs-3 text-white font-navbar fw-bold me-3">Cliente: </p>
              <p className="fs-3 text-white font-glamora fw-bold">
                {selectedBooking ? `${selectedBooking.userName} ${selectedBooking.userSurname}` : "Nessuna prenotazione selezionata"}
              </p>
            </div>

            <div className="d-flex align-items-center ms-4 my-3">
              <p className="fs-3 text-white font-navbar fw-bold me-3">Servizio: </p>
              <p className="fs-3 text-white font-glamora fw-bold">{selectedBooking?.serviceName || "-"}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DayBookings;
