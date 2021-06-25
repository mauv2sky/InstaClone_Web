import { isLoggedInVar } from "../apollo";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => isLoggedInVar(false)}>log out</button>
        </div>
    )
}
export default Home;