import { useState } from "react";
import { useCookies } from "react-cookie";
import UpliftWindow from "./UpliftWindow";
import baseURL from "../api";

function Navbar() {

    const [cookies, setCookie, removeCookie] = useCookies(null);

    const [error, setError] = useState("");
    const [showUpliftWindow, setShowUpliftWindow] = useState(false);
    const [username, setUsername] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const usernameToCheck = event.target.username.value;

        const result = await fetch(
            `${baseURL}/search/${usernameToCheck}`
        ).then((response) => response.json());
        if (result.message === "User not found") {
            setError(result.message);
            setShowUpliftWindow(false);
        } else {
            setError("");
            if (result.message === "User found") {
                setUsername(usernameToCheck);
                setShowUpliftWindow(true);
            }
        }
    }

    function signOut() {
        removeCookie("username");
        removeCookie("authToken");
        window.location.reload();
    }

    return (
        <>
            <div className="nav-container">
                <nav>
                    <h1>up<span>lift</span></h1>
                    <div className="greeting">
                        <h2>Hello, <span>{cookies.username}</span></h2>
                        <button onClick={signOut}>Sign out</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="search-input"
                            name="username"
                            type="text"
                            placeholder="Search for a user..."
                            required
                        />
                        <button className="search-button" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg>
                        </button>
                    </form>
                    {error && <p className="user-not-found">{error}</p>}
                </nav>
            </div>
            {showUpliftWindow && <UpliftWindow username={username} setShowUpliftWindow={setShowUpliftWindow} />}
        </>

    );
}

export default Navbar;
