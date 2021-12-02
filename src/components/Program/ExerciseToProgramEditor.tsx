import "./Programs.scss";
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

interface ChildProps {
  show: boolean;
  setShow: any;
}

const ExerciseToProgramEditor = observer(({ show, setShow }: ChildProps) => {
  const exerciseStore = useStores().exercise;
  const programStore = useStores().program;
  const [value, setValue] = useState([]);

  const handleChange = (val: any) => setValue(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const programId = programStore.currentProgram?.id;

    if (programId) {
      await programStore.addExerciseToProgram(programId, value);
    }

    setShow(false);
    setValue([]);
  };

  const onCloseModal = () => {
    setShow(false);
    setValue([]);
  };

  useEffect(() => {
    exerciseStore.getAllExercises();
  }, []);

  return (
    <div>
      <Modal show={show} onHide={onCloseModal} size="sm">
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="formExerciseToProgram">
            <ToggleButtonGroup
              type="checkbox"
              value={value}
              vertical={true}
              onChange={handleChange}
              className="toggleButtonGroup"
            >
              {exerciseStore.exercises.map(({ name, id }) => (
                <ToggleButton
                  key={id}
                  id={id.toString()}
                  value={id}
                  className="toggleButton"
                  variant="primary"
                >
                  {name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Modal.Footer>
              <Button variant="warning" type="submit">
                Save exercises
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default ExerciseToProgramEditor;
