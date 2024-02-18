const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// get all notes
app.get('/api/v1/notes/:username', async (req, res) => {
    const username = req.params.username;
    
    try {
        const notes = await pool.query('SELECT * FROM notes WHERE user_id = (SELECT user_id FROM users WHERE username = $1)', [username]);
        res.json(notes.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500);
    }
});

// get favourites
app.get('/api/v1/favourites/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const favourites = await pool.query('SELECT * FROM notes WHERE user_id = (SELECT user_id FROM users WHERE username = $1) AND is_favourite = true', [username]);
        res.json(favourites.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500);
    }
});

// search for user
app.get('/api/v1/search/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            res.json({ message: 'User not found' });
        } else {
            res.json({ message: 'User found' }); // placeholder for now

        }
    } catch (err) {
        console.error(err.message);
        res.status(500);
    }
});

// add note
app.post('/api/v1/uplift/:username', async (req, res) => {
    const username = req.params.username;
    const { title, content } = req.body;
    console.log(username);

    try {
        const user = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        const result = await pool.query('INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
        [user.rows[0].user_id, title, content]);
        console.log(result.rows[0]);
        res.json({ message: 'Note added' });
    } catch (err) {
        console.error(err.message);
        res.status(500);
    }
});

// set favourite
app.put('/api/v1/favourite/:note_id', async (req, res) => {
    const note_id = req.params.note_id;
    const { isFavourite } = req.body;

    try {
        const result = await pool.query('UPDATE notes SET is_favourite = $1 WHERE note_id = $2', [isFavourite, note_id]);
        res.json({ message: 'Note updated'});
    } catch (err) {
        console.error(err.message);
        res.status(500);
    }
});

// delete note
app.delete('/api/v1/delete/:note_id', async (req, res) => {
    const note_id = req.params.note_id;

    try {
        const result = await pool.query('DELETE FROM notes WHERE note_id = $1', [note_id]);
        res.json({ message: 'Note deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500);
    }
});

// register

app.post('/api/v1/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]);
        const user = result.rows[0];
        const token = jwt.sign({ id: user.user_id }, 'secret', { expiresIn: '1h' });
        res.json({ token: token, username: user.username });
    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') {
            res.json({ message: 'Username or e-mail already taken' });
        } else {
            res.status(500);
        }
    }
});

// login

app.post('/api/v1/login', async (req, res) => {
    const { username, password } = req.body;
    const isEmail = username.includes('@');

    const query = isEmail ? 'SELECT * FROM users WHERE email = $1' : 'SELECT * FROM users WHERE username = $1';

    try {
        const result = await pool.query(query, [username]);
        if (result.rows.length === 0) {
            res.json({ message: 'User not found' });
        } else {
            const user = result.rows[0];
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                const token = jwt.sign({ id: user.user_id }, 'secret', { expiresIn: '1h' });
                res.json({ token: token, username: user.username });
            } else {
                res.json({ message: 'Incorrect password' });
            }
        
    }
} catch (err) {
    console.error(err.message);
    res.status(500);
}
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// TODO: in the client app, implement limits for note length, title length, username length, password length, etc.