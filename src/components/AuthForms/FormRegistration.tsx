// !Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import classNames from "classnames";

//
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStores } from "../../connection/useStore";
import { useNavigate } from "react-router-dom";

const styles = {
  form: {
    marginTop: 15,
  },
};

const FormRegistration = observer(() => {
  const store = useStores().auth;
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("athlete");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    const name = (e.target as HTMLInputElement).name;

    switch (name) {
      case "first_name":
        setFirstName(value);
        break;

      case "last_name":
        setLastName(value);
        break;

      default:
        break;
    }
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setPhone(value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setEmail(value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setPassword(value);
  };

  const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    setRole(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !password) {
      return toast.warn("All fields must be filled", {
        autoClose: 2500,
      });
    }

    await store.register(firstName, lastName, email, phone, password, role);

    navigate("/login");
  };

  return (
    <Form onSubmit={handleSubmit} style={styles.form}>
      <FloatingLabel label="First name" className="mb-4">
        <Form.Control
          onChange={handleChangeName}
          name="first_name"
          type="text"
          placeholder="first name"
        />
      </FloatingLabel>
      <FloatingLabel label="Last name" className="mb-4">
        <Form.Control
          onChange={handleChangeName}
          name="last_name"
          type="text"
          placeholder="last name"
        />
      </FloatingLabel>

      <FloatingLabel label="Phone number" className="mb-4">
        <Form.Control
          onChange={handleChangePhone}
          type="tel"
          placeholder="Phone"
        />
      </FloatingLabel>
      <FloatingLabel label="Email address" className="mb-4">
        <Form.Control
          onChange={handleChangeEmail}
          type="email"
          placeholder="Email"
        />
      </FloatingLabel>
      <FloatingLabel label="Password" className="mb-4">
        <Form.Control
          onChange={handleChangePassword}
          type="password"
          placeholder="Password"
        />
      </FloatingLabel>
      <FloatingLabel label="Choose role" className="mb-4">
        <Form.Select onChange={handleChangeRole}>
          <option defaultValue="athlete">Athlete</option>
          <option value="couch">Couch</option>
        </Form.Select>
      </FloatingLabel>

      <Button size="lg" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
});

export default FormRegistration;
