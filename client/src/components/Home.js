import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import UpliftNote from './UpliftNote';
import ModeSelector from './ModeSelector';

function Home() {

    const [cookies, setCookie, removeCookie] = useCookies(null);

    const [notes, setNotes] = useState([]);
    const [mode, setMode] = useState('All notes');

    const username = cookies.username;

    async function getNotes() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/notes/${username}`);
            const data = await response.json();
            setNotes(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getFavourites() {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/favourites/${username}`);
            const data = await response.json();
            setNotes(data);
        } catch (err) {
            console.error(err.message);
        }

    }

    useEffect(() => {
        if (mode === 'All notes') {
            getNotes();
        } else if (mode === 'Favourites') {
            getFavourites();
        }
    }, [notes]);

    const sortedNotes = notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


    return (
        <>
            <div className="notes-container">
                <ModeSelector modes={['All notes', 'Favourites']} mode={mode} setMode={setMode} />
                { sortedNotes.length > 0 ? 
                    (<div className="notes-grid">
                        {sortedNotes.map(note => <UpliftNote key={note.id} note={note} getNotes={getNotes} />)}
                    </div>)
                 : 
                <p className='no-notes'>No notes to display :(</p> }
            </div>
            <footer>
                <p>© {new Date().getFullYear()} uplift by Dominik Żydek</p>
            </footer>
        </>
    );
}

export default Home;