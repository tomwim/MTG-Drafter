import httpClient from "./httpClient";

export interface Member {
    id: number,
    name: string,
    display_name: string
}

export const fetchMembers = async (): Promise<Member[]> => {
    try {
        const response = await httpClient.get<Member[]>('/members');
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching members.`);
    }
};

export const fetchMember = async (id: number): Promise<Member> => {
    try {
        const response = await httpClient.get<Member>(`/members/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching member with ID ${id}.`);
    }
};

export const addMember = async (data: Partial<Member>) => {
    try {
        const response = await httpClient.post<Member>(`/member`, data);
        return response.data;
    } catch (error: any) {
        console.error('Error creating member:', error);
        throw new Error('Failed to create member.');
    }
}

export const editMember = async (id: number, updated_data: Partial<Member>) => {
    try {
        const response = await httpClient.put<Member>(`/members/${id}`, updated_data);
        return response.data;
    } catch (error: any) {
        console.error('Error updating member:', error);
        throw new Error('Failed to update member.');
    }
}