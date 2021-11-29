// !Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";

//
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useStores } from "../../connection/useStore";
import ExerciseEditor from "./ExerciseEditor";

const styles = {
  buttonAdd: {
    marginBottom: 0,
  },

  buttonDelete: {
    marginTop: 10,
    marginBottom: 30,
    marginRight: 15,
  },
  cardFooter: {
    marginRight: 5,
  },
  buttonUpdate: {
    marginTop: 10,
    marginBottom: 30,
  },
};

const ExerciseList = observer(() => {
  const [show, setShow] = useState(false);

  const exercisesStore = useStores().exercise;

  const getExerciseById = async (id: number) => {
    await exercisesStore.getExerciseById(id);
    setShow(true);
  };

  useEffect(() => {
    exercisesStore.getAllExercises();
  }, []);
  return (
    <>
      {exercisesStore.exercises.map(
        ({ name, description, createdAt, updatedAt, id }) => (
          <div key={id}>
            <Card border="secondary">
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Description: {description}</Card.Text>
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
            <Button
              onClick={() => exercisesStore.deleteExercise(id)}
              style={styles.buttonDelete}
              variant="danger"
            >
              Delete exercise
            </Button>
            <Button
              onClick={() => getExerciseById(id)}
              style={styles.buttonUpdate}
              variant="warning"
            >
              Update exercise
            </Button>
          </div>
        )
      )}
      <ExerciseEditor show={show} setShow={setShow} />
    </>
  );
});

export default ExerciseList;
