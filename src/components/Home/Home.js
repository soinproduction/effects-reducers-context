import React, {useContext} from "react";

import Card from "../UI/Card/Card";
import styles from "./Home.module.css";
import authContext from "../../store/auth-context";

const Home = () => {
    const {onLogout} = useContext(authContext);

  return (
    <Card className={styles.home}>
      <h1>Рады Вас Видеть Снова!</h1>
        <button onClick={onLogout}>Выйти</button>
    </Card>
  );
};

export default Home;
