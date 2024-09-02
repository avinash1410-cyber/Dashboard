import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (<>    
    <h1>HOME</h1>
    <section>
      {user && <UserInfo user={user} />}
      <h1>You are on home page!</h1>
      <button onClick={logoutUser}>Logout</button>
    </section>
    </>

  );
};

export default Home;