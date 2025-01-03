import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Matchday, fetchMatchday } from '../api/matchdayApi'


const MatchdayPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const matchdayId = parseInt(id || '', 10);
    const [matchday, setMatchday] = useState<Matchday | null>(null);
    
    useEffect(() => {
        const getMatchdays = async () => {
          try {
            console.log("GetMatchdays")
            const fetchedMatchdays = await fetchMatchday(matchdayId);
            setMatchday(fetchedMatchdays);
          } catch (err) {
            console.log("Fetch matchdays failed.")
          }
        };
    
        getMatchdays();
      }, []);
    return (
        <div className="matchday-page">
            <h1>Matchday {matchdayId}</h1>
            <p>This is your matchday page.</p>
        </div>
    );
};

export default MatchdayPage;