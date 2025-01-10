import React, { useState, useEffect } from 'react';
import MatchdayCreateForm from '../components/MatchdayCreateForm';
import { fetchSets, Set } from '../api/scryfall/setApi';


const CreateMatchdayPage: React.FC = () => {
    const [sets, setSets] = useState<Set[]>([]);

    useEffect(() => {
        const getSets = async () => {
            try {
                console.log("GetMatchdays")
                const fetchedSets = await fetchSets();
                setSets(fetchedSets);
            } catch (err) {
                console.log("Fetch sets failed.")
            }
        };

        getSets();
    }, []);

    return (
        <div className="create-matchday-page">
            <h1>Create new matchday</h1>
            {sets && <MatchdayCreateForm></MatchdayCreateForm>}
        </div>
    );
};

export default CreateMatchdayPage;