const express = require('express');
const mongoose = require('mongoose');
const snarkjs = require('snarkjs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/zkAuth', { useNewUrlParser: true, useUnifiedTopology: true });
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.get('/register', (req, res) => {
    res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const sec_1 = password.slice(0, Math.ceil(password.length / 2));
        const sec_2 = password.slice(Math.ceil(password.length / 2));
        const inputs = {
            sec_1: BigInt(Buffer.from(sec_1).toString('hex'), 16).toString(),
            sec_2: BigInt(Buffer.from(sec_2).toString('hex'), 16).toString(),
            hash: "0"
        };
        const { publicSignals } = await snarkjs.plonk.fullProve(
            inputs,
            './circuits/build/auth.wasm',
            './circuits/keys/auth_final.zkey'
        );
        const computedHash = publicSignals[0];
        
        const user = new User({ username, passwordHash: computedHash });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Registration Error:', error.message, error.stack);
        res.render('register', { error: 'Registration failed. Username may already exist.' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { error: 'User not found' });
        }
        const passwordHash = user.passwordHash;
        const sec_1 = password.slice(0, Math.ceil(password.length / 2));
        const sec_2 = password.slice(Math.ceil(password.length / 2));
        const inputs = {
            sec_1: BigInt(Buffer.from(sec_1).toString('hex'), 16).toString(),
            sec_2: BigInt(Buffer.from(sec_2).toString('hex'), 16).toString(),
            hash: passwordHash
        };
        const { proof, publicSignals } = await snarkjs.plonk.fullProve(
            inputs,
            './circuits/build/auth.wasm',
            './circuits/keys/auth_final.zkey'
        );
        const vKey = JSON.parse(require('fs').readFileSync('./circuits/keys/verification_key.json'));
        const isValid = await snarkjs.plonk.verify(vKey, publicSignals, proof);
        if (isValid && publicSignals[1] == 1) {
            res.render('user', { username });
        } else {
            res.render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login Error:', error.message, error.stack);
        res.render('login', { error: 'Login failed' });
    }
});

app.get('/user', (req, res) => {
    res.render('user', { username: 'Guest' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});