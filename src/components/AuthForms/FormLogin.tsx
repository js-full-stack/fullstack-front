// !Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

//
import { observer } from "mobx-react-lite";
// import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useStores } from "../../connection/useStore";
import { useNavigate } from "react-router";
const styles = {
  form: {
    marginTop: 15,
  },
};

const FormLogin = observer(() => {
  const navigate = useNavigate();
  const authStore = useStores().auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setEmail(value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authStore.login(email, password);

      authStore.currentUser && navigate("/program");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={styles.form}>
      <FloatingLabel label="Email address" className="mb-2">
        <Form.Control
          onChange={handleChangeEmail}
          type="email"
          placeholder="Email"
        />
      </FloatingLabel>
      <FloatingLabel label="Password" className="mb-2">
        <Form.Control
          onChange={handleChangePassword}
          type="password"
          placeholder="Password"
        />
      </FloatingLabel>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
});

export default FormLogin;
