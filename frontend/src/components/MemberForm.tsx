import React, { useState, useEffect } from "react";
import { Member } from "../api/memberApi";

interface MemberFormProps {
    member: Member | null;
    onFormSubmit: (name : string, display_name : string) => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onFormSubmit }) => {
    const [display_name, setDisplayName] = useState<string>(member?.display_name || '');
    const [name, setName] = useState<string>(member?.name || '');

    useEffect(() => { 
        setDisplayName(display_name);
        setName(name);
    }, [display_name, name]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Pass form data to the parent component
        onFormSubmit(name, display_name);
    };

    return (
        <div className="edit-member-page">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text"
                            placeholder={name}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="display_name">
                            Display name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="display_name" type="text"
                            placeholder={display_name}
                            value={display_name}
                            onChange={(e) => setDisplayName(e.target.value)} 
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );

}

export default MemberForm;