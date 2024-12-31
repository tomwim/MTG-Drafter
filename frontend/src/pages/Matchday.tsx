import React from 'react';
import { useParams } from 'react-router-dom';


const Matchday: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const matchdayId = parseInt(id || '', 10);
    return (
        <div className="matchday-page">
            <h1>Matchday {matchdayId}</h1>
            <p>This is your matchday page.</p>
        </div>
    );
};

export default Matchday;