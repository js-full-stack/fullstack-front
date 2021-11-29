import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Moment from "react-moment";
import "./Programs.scss";
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

const Subscriptions = observer(() => {
  const programsStore = useStores().program;
  const authStore = useStores().auth;
  const currentSubscriptions = programsStore.programs.filter(
    (program) => program.isSubscribe === true
  );

  return (
    <>
      {authStore.currentUser?.role === "athlete" &&
      currentSubscriptions.length > 0 ? (
        <h2>Total subscriptions: {currentSubscriptions.length}</h2>
      ) : (
        <p>Уou are not subscribed to any program</p>
      )}
      {authStore.currentUser?.role === "athlete" &&
        currentSubscriptions.map(
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
                  {authStore.currentUser?.role === "athlete" && (
                    <div>
                      <br />

                      <small style={styles.cardFooter} className="text-muted">
                        <span style={styles.cardFooter}>
                          Author: {author.firstName}
                        </span>
                        <span style={styles.cardFooter}>{author.lastName}</span>
                      </small>

                      <br />

                      <small style={styles.cardFooter} className="text-muted">
                        <span style={styles.cardFooter}>
                          Email: {author.email}
                        </span>
                      </small>

                      <br />

                      <small style={styles.cardFooter} className="text-muted">
                        <span style={styles.cardFooter}>
                          Phone: {author.phone}
                        </span>
                      </small>
                    </div>
                  )}
                </Card.Footer>
              </Card>

              <Button
                onClick={() => programsStore.unsubscribeUserFromProgram(id)}
                className="button"
                variant="danger"
              >
                Unsubscribe
              </Button>
            </div>
          )
        )}
    </>
  );
});

export default Subscriptions;
