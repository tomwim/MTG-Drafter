import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Member, fetchMember, editMember } from '../api/memberApi'
import MemberForm from '../components/MemberForm';

const EditMemberPage: React.FC = () => {
    const navigate = useNavigate();

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
    }, []);

    const onSubmitClicked = (name: string, display_name: string) => {
        if (member) {
            member.display_name = display_name;
            member.name = name;
            editMember(member.id, member)
                .then((result) => {
                    // Todo: show error message
                    navigate(`/members/${member.id}`);
                })
                .catch((error) => {
                    // Todo: show error message
                    navigate(`/members/${member.id}`);
                });
        }

    };

    return (
        <div className="edit-member-page">
            <h1>{member?.display_name}</h1>
            <p>{member?.name} ({member?.id})</p>
            {member && <MemberForm member={member} onFormSubmit={onSubmitClicked}></MemberForm>}
        </div>
    );
};

export default EditMemberPage;