import { useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email obbligatoria";
    if (!formData.password) newErrors.password = "Password obbligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const responseData = await response.text();
      const data = responseData ? JSON.parse(responseData) : null;

      console.log("Dati ricevuti dal backend:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Errore durante il login");
      }

      const authData = {
        token: data.token,
        user: {
          id: data.user?.id,
          name: data.user?.name,
          surname: data.user?.surname,
          email: data.user?.email,
          imageUrl: data.user?.imageUrl,
          role: data.user?.role,
        },
      };

      console.log("Dati che verranno dispatchati:", authData);
      dispatch(loginSuccess(authData));
      navigate(data.user?.role === "USER" ? "/search" : "/dashboard");
    } catch (error) {
      setErrors({ api: error.message });
    }
  };

  return (
    <>
      <Container fluid className="bg-black vh-100 d-flex justify-content-center">
        <Row className="d-flex justify-content-center align-items-center flex-grow-1">
          <Col xs={10} md={8} xl={6}>
            <div className="bg-white rounded-3 d-flex justify-content-center p-3 ">
              <div className="bg-black rounded-3 d-flex flex-column justify-content-start p-5 flex-grow-1">
                <p className="display-3 fw-bold font-glamora text-white mb-4">Login</p>

                {errors.api && <div className="alert alert-danger">{errors.api}</div>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white font-navbar fs-6 mb-1">E-mail</Form.Label>
                    <Form.Control
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ resize: "none", overflow: "hidden" }}
                      as={"textarea"}
                      placeholder="Inserisci qui la tua E-mail..."
                      rows={1}
                      type="email"
                      id="custom-input"
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-white font-navbar fs-6 mb-1">Password</Form.Label>
                    <Form.Control
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      style={{ resize: "none", overflow: "hidden" }}
                      as={"textarea"}
                      placeholder="Inserisci qui la tua password..."
                      rows={1}
                      type="password"
                      id="custom-input"
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between w-100 mt-3 align-items-center">
                    <Link to="/">
                      <MdKeyboardArrowLeft className="text-white display-3" />
                    </Link>
                    <Button type="submit" className="btn btn-light font-navbar fw-bold rounded-pill fs-5 px-3 btn-nav w-auto mt-3">
                      Avanti
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
