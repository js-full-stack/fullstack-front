import { observer } from "mobx-react-lite";
import { useStores } from "../../connection/useStore";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },

  name: {
    fontSize: 12,
    fontWeight: 500,
    marginRight: 12,
    color: "#ffc107",
  },

  button: {
    marginRight: 10,
  },
};

const UserMenu = observer(() => {
  const user = useStores().auth;
  const navigate = useNavigate();
  const logOut = () => {
    user.logout();
    navigate("/");
  };
  return (
    <div style={styles.container}>
      <span style={styles.name}>Welcome, {user.currentUser?.email}!</span>
      <Button
        size="sm"
        variant="warning"
        style={styles.button}
        onClick={logOut}
        type="button"
      >
        Logout
      </Button>
    </div>
  );
});

export default UserMenu;
