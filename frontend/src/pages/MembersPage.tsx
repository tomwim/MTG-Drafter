import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Member, fetchMembers } from '../api/memberApi'

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[] | null>(null);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const fetchedMembers = await fetchMembers();
        setMembers(fetchedMembers);
      } catch (err) {
        console.log("Fetch Members failed.")
      }
    };

    getMembers();
  }, []);

  return (
    <div className="members-page">
      <h1 className="text-center text-lg font-semibold pb-6">Members</h1>
      {members?.map((member) => (
        <li key={member.id}>
          <Link to={`/members/${member.id}`}>
            {member.display_name} ({member.name}) {member.id}
          </Link>
        </li>
      ))
      }

      <div className="pt-6">
        <button className="btn">
          <Link to={`/members/create`}>
            Create
          </Link>
        </button>
      </div>

    </div>
  );
};

export default MembersPage;