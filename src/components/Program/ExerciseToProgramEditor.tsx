// !Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

//
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStores } from "../../connection/useStore";
import { isDeleteExpression } from "typescript";

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
  setShowModal: any;
  showModal: boolean;
}

const ExerciseToProgramEditor = observer(
  ({ showModal, setShowModal }: ChildProps) => {
    const exerciseStore = useStores().exercise;
    const [value, setValue] = useState([]);

    const handleChange = (val: any) => setValue(val);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setShowModal(false);
    };

    return (
      <div>
        TestData
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="modal-90w"
        >
          <Modal.Body>
            <Form onSubmit={handleSubmit} style={styles.form}>
              <ToggleButtonGroup
                type="checkbox"
                value={value}
                // onChange={handleChange}
              >
                {exerciseStore.exercises.map(({ name, id }, idx) => (
                  <ToggleButton id="tbg-btn-1" value={idx}>
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
  }
);

export default ExerciseToProgramEditor;
