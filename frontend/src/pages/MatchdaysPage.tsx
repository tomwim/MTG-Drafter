import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Matchday, fetchMatchdays } from '../api/matchdayApi'

const MatchdaysPage: React.FC = () => {
  const [matchdays, setMatchdays] = useState<Matchday[] | null>(null);

  useEffect(() => {
    const getMatchdays = async () => {
      try {
        console.log("GetMatchdays")
        const fetchedMatchdays = await fetchMatchdays();
        setMatchdays(fetchedMatchdays);
      } catch (err) {
        console.log("Fetch matchdays failed.")
      }
    };

    getMatchdays();
  }, []);

  return (
    <div className="matchdays-page">
      <h1>Matchdays</h1>
      <p>This is your matchdays page.</p>
      {matchdays?.map((matchday) => (
        <li key={matchday.id}>
          <Link to={`/matchdays/${matchday.id}`}>
            {matchday.date} ({matchday.match_type} {matchday.set_id})
          </Link>
        </li>
      ))
      }
    </div>
  );
};

export default MatchdaysPage;