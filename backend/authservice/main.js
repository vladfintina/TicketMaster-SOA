import express from 'express';
import jwt from 'jsonwebtoken';
const app = express()
const port = 80
import mongoose from"mongoose";
import {User} from "../utils/database-utils.js"

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json())
app.get('/auth', (req, res) => {
    res.send('authservice')
})

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare passwords
        const isMatch = password === user.password;
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate a token (optional)
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'User registered', userId: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
