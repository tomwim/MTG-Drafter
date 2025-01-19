import React, { useState, useEffect } from 'react';
import MatchdayCreateForm from '../components/MatchdayCreateForm';
import { fetchSets, Set } from '../api/scryfall/setApi';


const CreateMatchdayPage: React.FC = () => {
    const [sets, setSets] = useState<Set[]>([]);

    useEffect(() => {
        const getSets = async () => {
            try {
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
            <h1 className="text-center text-lg font-semibold">Create Matchday</h1>
            {sets && <MatchdayCreateForm></MatchdayCreateForm>}
        </div>
    );
};

export default CreateMatchdayPage;