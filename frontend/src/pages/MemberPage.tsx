import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Member, fetchMember } from '../api/memberApi'

const MemberPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const memberId = parseInt(id || '', 10);

    const [member, setMember] = useState<Member | null>(null);


    useEffect(() => {
        const getMember = async () => {
            try {
                const fetchedMember = await fetchMember(memberId);
                setMember(fetchedMember);
            } catch (err) {
                console.log("Fetch member failed.")
            }
        };

        getMember();
    }, [id]);

    return (
        <div className="member-page">
            <h1 className="text-center text-lg font-semibold pb-6">{member?.display_name}</h1>
            <p>{member?.name} ({member?.id})</p>
            <div className="pt-6">
                <button className="btn">
                    <Link to={`/members/${member?.id}/edit`}>
                        Edit
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default MemberPage;