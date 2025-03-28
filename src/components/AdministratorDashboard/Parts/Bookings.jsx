import React from "react";
import { Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Calendary from "./Calendary";
import DayBookings from "./DayBookings";

const Bookings = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex flex-column pt-5 px-5">
        <div className="d-flex justify-content-between align-items-center">
          <p className="display-1 text-white fw-bold font-glamora">Prenotazioni</p>
        </div>
      </div>

      <Routes>
        <Route index element={<Calendary />} />
        <Route path="day/:date" element={<DayBookings />} />
      </Routes>
    </>
  );
};

export default Bookings;
