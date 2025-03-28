import { useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/actions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Nome obbligatorio";
    if (!formData.surname) newErrors.surname = "Cognome obbligatorio";
    if (!formData.email) newErrors.email = "Email obbligatoria";
    if (!formData.password) newErrors.password = "Password obbligatoria";
    if (!formData.role) newErrors.role = "Seleziona un ruolo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log(
        "Dati inviati:",
        JSON.stringify(
          {
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          },
          null,
          2
        )
      );
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const responseData = await response.text();
      const data = responseData ? JSON.parse(responseData) : null;

      if (!response.ok) {
        throw new Error(data?.message || "Errore durante la registrazione");
      }

      const authData = {
        token: data.token,
        user: {
          id: data.user?.id,
          name: data.user?.name,
          surname: data.user?.surname,
          email: data.user?.email,
          role: data.user?.role,
        },
      };

      dispatch(loginSuccess(authData));
      navigate(formData.role === "USER" ? "/search" : "/dashboard");
    } catch (error) {
      setErrors({ api: error.message });
    }
  };

  return (
    <Container fluid className="bg-glamora vh-100 d-flex justify-content-center">
      <Row className="d-flex justify-content-center align-items-center flex-grow-1">
        <Col xs={12} md={12} xl={6}>
          <div className="bg-white rounded-3 d-flex justify-content-center p-3">
            <div className="bg-black rounded-3 d-flex flex-column justify-content-start p-5 flex-grow-1">
              <div className="d-flex justify-content-between align-items-center">
                <p className="display-3 fw-bold font-glamora text-white mb-4">Register</p>
                <Link to="/">
                  <MdKeyboardArrowLeft className="text-white display-3" />
                </Link>
              </div>

              {errors.api && <div className="alert alert-danger">{errors.api}</div>}

              <Form onSubmit={handleSubmit}>
                {/* Campi del form mantenuti uguali */}
                {["name", "surname", "email", "password"].map((field) => (
                  <Form.Group key={field} className="mb-4">
                    <Form.Label className="text-white font-navbar fs-6 mb-1">
                      {field === "name" && "Nome"}
                      {field === "surname" && "Cognome"}
                      {field === "email" && "E-mail"}
                      {field === "password" && "Password"}
                    </Form.Label>
                    <Form.Control
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      style={{ resize: "none", overflow: "hidden" }}
                      as="textarea"
                      rows={1}
                      type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                      isInvalid={!!errors[field]}
                    />
                    <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
                  </Form.Group>
                ))}

                <Form.Group className="mt-5" aria-required>
                  <div className="mb-3">
                    {["USER", "SHOP_MANAGER"].map((role) => (
                      <Form.Check
                        key={role}
                        type="checkbox"
                        className="text-white font-navbar fs-5 mt-2"
                        label={role === "USER" ? "CLIENTE" : "NEGOZIANTE"}
                        checked={formData.role === role}
                        onChange={() => handleRoleChange(role)}
                        isInvalid={!!errors.role}
                      />
                    ))}
                    {errors.role && <div className="text-danger">{errors.role}</div>}
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-between w-100 mt-3">
                  <Button as={Link} to="/login" className="btn btn-light font-navbar fw-bold rounded-pill fs-6 px-3 btn-nav w-auto my-3">
                    Login
                  </Button>
                  <Button type="submit" className="btn btn-light font-navbar fw-bold rounded-pill fs-6 px-3 btn-nav w-auto my-3">
                    Avanti
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
