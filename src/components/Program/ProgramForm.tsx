// !Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStores } from "../../connection/useStore";
import { toast } from "react-toastify";

const styles = {
  form: {
    marginTop: 15,
  },
  buttonModal: {
    marginTop: 15,
    marginBottom: 15,
  },
};

const ProgramForm = observer(() => {
  const programStore = useStores().program;
  const authStore = useStores().auth;

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setName(value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setDescription(value);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setPrice(Number(value));
  };
  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setDuration(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "" || description === "" || price === 0 || duration === 0) {
      return toast.warn("All fields must be filled", {
        autoClose: 2500,
      });
    }

    if (description.length < 20) {
      return toast.warn(
        "Description must be longer than or equal to 20 characters ",
        {
          autoClose: 2500,
        }
      );
    }
    await programStore.addProgram(name, description, price, duration);
    setName("");
    setDescription("");
    setPrice(0);
    setDuration(0);
    setShow(false);
  };

  return (
    <>
      {authStore.currentUser?.role === "couch" && (
        <Button
          variant="primary"
          onClick={() => setShow(true)}
          style={styles.buttonModal}
        >
          Add program
        </Button>
      )}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Form onSubmit={handleSubmit} style={styles.form}>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChangeName}
                type="text"
                placeholder="Program name"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                rows={5}
                onChange={handleChangeDescription}
                type="text"
                placeholder="Program description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChangePrice}
                type="number"
                placeholder="Program price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChangeDuration}
                type="number"
                placeholder="Program duration"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
});

export default ProgramForm;
