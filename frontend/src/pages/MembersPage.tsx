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
      <h1>Members</h1>
      <p>This is your members page.</p>
      {members?.map((member) => (
        <li key={member.id}>
          <Link to={`/members/${member.id}`}>
            {member.display_name} ({member.name}) {member.id}
          </Link>
        </li>
      ))
      }
      <Link to={`/members/create`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Create
          </button>
      </Link>
    </div>
  );
};

export default MembersPage;