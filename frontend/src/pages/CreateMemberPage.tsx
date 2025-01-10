import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addMember } from '../api/memberApi'
import MemberForm from '../components/MemberForm';

const CreateMemberPage: React.FC = () => {
    const navigate = useNavigate();

    const onSubmitClicked = (name: string, display_name: string) => {
        addMember({ name : name, display_name : display_name })
        .then((result) => {
            navigate(`/members`)
        });
    };

    return (
        <div className="create-member-page">
            <h1>Create Member</h1>
            <MemberForm member={null} onFormSubmit={onSubmitClicked}></MemberForm>
        </div>
    );
};

export default CreateMemberPage;