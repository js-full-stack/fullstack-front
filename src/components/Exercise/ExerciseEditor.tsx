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

interface ChildProps {
  setShow: any;
  show: boolean;
}

const ExerciseEditor = observer(({ show, setShow }: ChildProps) => {
  const exerciseStore = useStores().exercise;

  const [name, setName] = useState(exerciseStore.currentExercise?.name);
  const [description, setDescription] = useState(
    exerciseStore.currentExercise?.description
  );

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setName(value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setDescription(value);
  };

  const onUpdateExercise = async (id: number) => {
    await exerciseStore.updateExercise(id, {
      name,
      description,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "" || description === "") {
      return toast.warn("All fields must be filled", {
        autoClose: 2500,
      });
    }

    if (exerciseStore.currentExercise) {
      await onUpdateExercise(exerciseStore.currentExercise.id);
    }
    setShow(false);
  };

  return (
    <div>
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
                defaultValue={exerciseStore.currentExercise?.name}
                placeholder="Exercise name"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                onChange={handleChangeDescription}
                defaultValue={exerciseStore.currentExercise?.description}
                as="textarea"
                rows={5}
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

export default ExerciseEditor;
