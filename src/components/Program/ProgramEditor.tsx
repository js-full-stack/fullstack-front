import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import { useStores } from "../../connection/useStore";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";

interface ChildProps {
  setShow: any;
  show: boolean;
}

const ProgramEditor = observer(({ show, setShow }: ChildProps) => {
  const programStore = useStores().program;

  const [name, setName] = useState(programStore.currentProgram?.name);
  const [description, setDescription] = useState(
    programStore.currentProgram?.description
  );
  const [price, setPrice] = useState(programStore.currentProgram?.price);
  const [duration, setDuration] = useState(
    programStore.currentProgram?.duration
  );

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

  const onUpdateProgram = async (id: number) => {
    await programStore.updateProgram(id, {
      name,
      description,
      price,
      duration,
    });
  };

  const onResetChanges = () => {
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "" || description === "" || price === 0 || duration === 0) {
      return toast.warn("All fields must be filled", {
        autoClose: 2500,
      });
    }

    if (programStore.currentProgram) {
      onUpdateProgram(programStore.currentProgram.id);
    }
    await programStore.getAllPrograms();
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChangeName}
                defaultValue={programStore.currentProgram?.name}
                type="text"
                placeholder="Program name"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                defaultValue={programStore.currentProgram?.description}
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
                defaultValue={programStore.currentProgram?.price}
                placeholder="Program price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChangeDuration}
                type="number"
                placeholder="Program duration"
                defaultValue={programStore.currentProgram?.duration}
              />
            </Form.Group>

            <Stack direction="horizontal" gap={3}>
              <Button type="submit" variant="primary">
                Save changes
              </Button>
              <Button type="button" onClick={onResetChanges} variant="danger">
                Reset
              </Button>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
});

export default ProgramEditor;
