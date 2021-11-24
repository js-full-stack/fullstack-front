import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "react-toastify/dist/ReactToastify.css";
import { useStores } from "../connection/useStore";

import img1 from "../images/g1.jpg";
import img2 from "../images/g2.jpg";
import img3 from "../images/g3.jpg";

const HomeView = () => {
  const authStore = useStores().auth;
  // useEffect(() => {
  //   console.log("mount before get current user");
  //   authStore.getCurrentUser();

  //   console.log("mount after get current user");
  // }, []);
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={img1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeView;
