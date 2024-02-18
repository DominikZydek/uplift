
function UpliftWindow( {username, setShowUpliftWindow} ) {

    async function handleSubmit(event) {
        event.preventDefault();
        const title = event.target[0].value;
        const content = event.target[1].value;

        const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/uplift/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        }).then((response) => response.json());
        setShowUpliftWindow(false);
    }

    return (
        <div className="overlay" onClick={() => {}}>
            <div className="uplift-window">
                <div className="uplift-window-header">
                    <h2>up<span>lift</span> {username}!</h2>
                    <button className="close-button" onClick={() => setShowUpliftWindow(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" required/>
                    <textarea placeholder="Write something nice..." required></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default UpliftWindow;