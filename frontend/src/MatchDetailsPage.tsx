import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Match } from "./Types.tsx";
import { useAuth } from "./AuthContext.tsx";

const MatchDetailsPage = () => {
    const { matchId } = useParams();
    const [match, setMatch] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    useEffect(() => {
        fetch(`http://localhost/matches/matches/${matchId}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load match details");
                return res.json();
            })
            .then(setMatch)
            .catch(() => alert("Match details could not be loaded."))
            .finally(() => setLoading(false));
    }, [matchId]);

    if (loading) return <p>Loading match details...</p>;
    if (!match) return <p>Match not found.</p>;

    const onBuyTicket = () => {
        fetch(`http://localhost/tickets/${matchId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: auth.token }),
        })
            .then(res => res.ok ? alert("Ticket purchased successfully!") : alert("Failed to buy ticket."))
            .catch(() => alert("An error occurred while purchasing the ticket."));
    };

    return (
        <div className="card">
            <h2>{match.homeTeam} - {match.awayTeam}</h2>
            <p>Location: {match.location}</p>
            <button onClick={onBuyTicket}>Buy Ticket</button>
        </div>
    );
};

export default MatchDetailsPage;
