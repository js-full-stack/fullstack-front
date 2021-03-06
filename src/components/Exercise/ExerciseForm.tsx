// !Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//
import { observer } from "mobx-react-lite";
import { useState } from "react";
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

const ExerciseForm = observer(() => {
  const exerciseStore = useStores().exercise;

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setName(value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setDescription(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "" || description === "") {
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
    await exerciseStore.addExercise(name, description);
    setShow(false);
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
        style={styles.buttonModal}
      >
        Add exercise
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Form onSubmit={handleSubmit} style={styles.form}>
            <Form.Group className="mb-2">
              <Form.Control
                onChange={handleChangeName}
                type="text"
                placeholder="Exercise name"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                rows={5}
                onChange={handleChangeDescription}
                type="text"
                placeholder="Exercise description"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default ExerciseForm;
