// !Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// !Other
import Moment from "react-moment";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStores } from "../../connection/useStore";

// !Components
import ProgramEditor from "./ProgramEditor";
import ExerciseToProgramEditor from "./ExerciseToProgramEditor";
import Subscriptions from "./Subscriptions";
import AvailablePrograms from "./AvailablePrograms";

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
  const authStore = useStores().auth;
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const updateDescription = async (id: number) => {
    await programsStore.getProgramById(id);
    setShow(true);
  };

  const addExerciseToProgram = async (id: number) => {
    await programsStore.getProgramById(id);
    setShowModal(true);
  };

  useEffect(() => {
    programsStore.getAllPrograms();
  }, []);

  return (
    <>
      {authStore.currentUser?.role === "athlete" && (
        <>
          <Subscriptions />
          <AvailablePrograms />
        </>
      )}
      {/* <CouchPrograms setShow={setShow}  
        setShowModal={setShowModal}/> */}

      {authStore.currentUser?.role === "couch" &&
        programsStore.programs.map(
          ({
            name,
            id,
            description,
            duration,
            price,
            createdAt,
            updatedAt,
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

              <>
                <Button
                  onClick={() => addExerciseToProgram(id)}
                  style={styles.button}
                  variant="warning"
                >
                  Add exercises to program
                </Button>
                <Button
                  onClick={() => updateDescription(id)}
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
            </div>
          )
        )}
      <ProgramEditor show={show} setShow={setShow} />
      <ExerciseToProgramEditor show={showModal} setShow={setShowModal} />
    </>
  );
});

export default ProgramList;


