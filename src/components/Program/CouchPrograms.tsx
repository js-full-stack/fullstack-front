import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Moment from "react-moment";

import { useStores } from "../../connection/useStore";

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

interface ChildProps {
  setShow: any;
  setShowModal: any;
}

const CouchPrograms = observer(({ setShow, setShowModal }: ChildProps) => {
  const programsStore = useStores().program;
  const authStore = useStores().auth;

  const getProgramById = async (id: number) => {
    await programsStore.getProgramById(id);
  };

  return (
    <>
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
            </div>
          )
        )}
    </>
  );
});

export default CouchPrograms;
