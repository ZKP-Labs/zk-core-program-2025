const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// File to store user data
const usersFile = path.join(__dirname, 'users.json');

// Initialize users file if it doesn't exist
async function initUsersFile() {
    try {
        await fs.access(usersFile);
    } catch {
        await fs.writeFile(usersFile, JSON.stringify([]));
    }
}

// Get all users
async function getUsers() {
    await initUsersFile();
    const data = await fs.readFile(usersFile);
    return JSON.parse(data);
}

// Save users
async function saveUsers(users) {
    await fs.writeFile(usersFile, JSON.stringify(users));
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const users = await getUsers();
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    users.push({ username, password }); // Note: In production, hash the password!
    await saveUsers(users);
    res.json({ message: 'Registration successful' });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const users = await getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});