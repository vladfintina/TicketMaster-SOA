import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

export const User = mongoose.model('User', userSchema);

export const matchSchema = new mongoose.Schema({
    homeTeam: {type: String, required: true},
    awayTeam: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: Date, required: true},
    price: {type: Number, required: true},
});

export const Match = mongoose.model('Match', matchSchema);

export const ticketSchema = new mongoose.Schema({
    matchId: {type: mongoose.Schema.Types.ObjectId, required: true},
    buyerId: {type: mongoose.Schema.Types.ObjectId, required: true}
});

export const Ticket = mongoose.model('Ticket', ticketSchema);