// !Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//
import Moment from "react-moment";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStores } from "../../connection/useStore";
import ProgramEditor from "./ProgramEditor";
import ExerciseToProgramEditor from "./ExerciseToProgramEditor";
const styles = {
  buttonAdd: {
    marginBottom: 0,
  },

  button: {
    marginTop: 10,
    marginBottom: 30,
    marginRight: 15,
  },

  cardFooter: {
    marginRight: 5,
  },
};

const ProgramList = observer(() => {
  const programsStore = useStores().program;
  const exerciseStore = useStores().exercise;
  const authStore = useStores().auth;
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getProgramById = async (id: number) => {
    await programsStore.getProgramById(id);
  };

  useEffect(() => {
    programsStore.getAllPrograms();
  }, [programsStore.currentProgram]);

  return (
    <>
      {programsStore.programs.map(
        ({
          name,
          id,
          description,
          duration,
          price,
          createdAt,
          updatedAt,
          author,
        }) => (
          <div key={id}>
            <Card border="secondary">
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Description: {description}</Card.Text>
                <Card.Text>Duration {duration} hours </Card.Text>
                <Card.Text>Price: {price}$ </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small style={styles.cardFooter} className="text-muted">
                  <span style={styles.cardFooter}>Created:</span>
                  <Moment format="DD MMMM YYYY, HH:mm">{createdAt}</Moment>;
                </small>
                <br />
                <small style={styles.cardFooter} className="text-muted">
                  <span style={styles.cardFooter}>Last update:</span>
                  <Moment format="DD MMMM YYYY, HH:mm">{updatedAt}</Moment>;
                </small>
              </Card.Footer>
            </Card>

            {authStore.currentUser?.role === "couch" ? (
              <>
                <Button
                  onClick={() => {
                    getProgramById(id);
                    setShowModal(true);
                  }}
                  style={styles.button}
                  variant="warning"
                >
                  Add exercises to program
                </Button>
                <Button
                  onClick={() => {
                    getProgramById(id);
                    setShow(true);
                  }}
                  style={styles.button}
                  variant="warning"
                >
                  Update description
                </Button>
                <Button
                  onClick={() => programsStore.deleteProgram(id)}
                  style={styles.button}
                  variant="danger"
                >
                  Delete program
                </Button>
              </>
            ) : (
              <Button style={styles.button} variant="warning">
                Subscribe
              </Button>
            )}
          </div>
        )
      )}
      <ProgramEditor show={show} setShow={setShow} />
      <ExerciseToProgramEditor
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
});

export default ProgramList;

{
  /* <br /> */
}
{
  /* <small style={styles.cardFooter} className="text-muted">
                  <span style={styles.cardFooter}>
                    Author: {author.firstName}
                  </span>
                  <span style={styles.cardFooter}>{author.lastName}</span>
                </small> */
}
{
  /* <br /> */
}
{
  /* <small style={styles.cardFooter} className="text-muted"> */
}
{
  /* <span style={styles.cardFooter}>Email: {author.email}</span> */
}
{
  /* </small> */
}
{
  /* <br /> */
}
{
  /* <small style={styles.cardFooter} className="text-muted"> */
}
{
  /* <span style={styles.cardFooter}>Phone: {author.phone}</span> */
}
{
  /* </small> */
}
