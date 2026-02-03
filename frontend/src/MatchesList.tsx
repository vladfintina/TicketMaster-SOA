import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { Match } from "./Types.tsx";

const MatchesList = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost/matches/matches")
            .then(res => res.json())
            .then(fetchedMatches => {
                setMatches(fetchedMatches);
                setLoading(false);
            })
            .catch(() => {
                alert("Failed to load matches");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading matches...</p>;
    }

    return (
        <div className="match-list">
            {auth.isAuthenticated ? (
                <p className="success-message">✅ You are logged in! Browse available matches:</p>
            ) : (
                <div className="auth-message">
                    <p>🔒 Please log in before buying tickets.</p>
                    <button onClick={() => navigate("/login")}> Log in </button>
                </div>
            )}

            {matches.map((match) => (
                <div key={match._id} className="match-item">
                    <span>{match.homeTeam} - {match.awayTeam}</span>
                    {auth.isAuthenticated && (
                        <button onClick={() => navigate(`/matches/${match._id}`)}>See details</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MatchesList;
