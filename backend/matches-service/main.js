const express = require('express')
const app = express()
const port = 80
const mongoose = require('mongoose');
const {Match} = require("../utils/database-utils");

mongoose.connect(process.env.DATABASE_URL);

app.use(express.json())

app.get('/matches', (req, res) => {
    res.send('matches-service')
})

app.get('/matches/matches', async (req, res) => {
    try {
        const matches = await Match.find(undefined, undefined, undefined);
        res.send(matches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get(`/matches/matches/:matchId`, async (req, res) => {
    try {
        const match = await Match.findOne({_id: req.params.matchId});
        res.send(match);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
