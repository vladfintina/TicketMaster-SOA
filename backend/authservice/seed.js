import mongoose from "mongoose";
import { User, Match, Ticket } from "./utils/database-utils.js";

const MONGO_URL = process.env.DATABASE_URL;

async function seed() {
    await mongoose.connect(MONGO_URL);

    // Clean old data (optional)
    await User.deleteMany({});
    await Match.deleteMany({});
    await Ticket.deleteMany({});

    // Create users
    const user1 = await User.create({
        email: "test1@test.com",
        password: "123456"
    });

    const user2 = await User.create({
        email: "test2@test.com",
        password: "123456"
    });

    // Create matches
    const match1 = await Match.create({
        homeTeam: "Barcelona",
        awayTeam: "Real Madrid",
        location: "Camp Nou",
        date: new Date("2026-02-01"),
        price: 50
    });

    const match2 = await Match.create({
        homeTeam: "Bayern",
        awayTeam: "Dortmund",
        location: "Allianz Arena",
        date: new Date("2026-03-10"),
        price: 40
    });

    // Create tickets
    await Ticket.create({
        matchId: match1._id,
        buyerId: user1._id
    });

    console.log("✅ Database seeded successfully");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});