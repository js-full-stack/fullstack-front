// !Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

//
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStores } from "../../connection/useStore";

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
  show: boolean;
  setShow: any;
}

const ExerciseToProgramEditor = observer(({ show, setShow }: ChildProps) => {
  const exerciseStore = useStores().exercise;
  const [value, setValue] = useState([]);

  useEffect(() => {
    exerciseStore.getAllExercises();
  }, []);

  const handleChange = (val: any) => setValue(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            <ToggleButtonGroup
              type="checkbox"
              value={value}
              vertical={true}
              onChange={handleChange}
            >
              {exerciseStore.exercises.map(({ name, id }) => (
                <ToggleButton key={id} id={name} value={name}>
                  {name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default ExerciseToProgramEditor;
