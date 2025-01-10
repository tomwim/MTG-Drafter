import { extractSvgPath } from "../../utils/svgUtils";
import httpClient from "./scryfallHttpClient";

interface SetListResponse {
    data : Set[]
}
export interface Set {
    id: string,
    name: string,
    code: string,
    icon_svg_uri : string,
    uri : string,
    scryfall_uri : string,
    set_type : string
}

export const fetchSets = async (): Promise<Set[]> => {
    try {
        const response = await httpClient.get<SetListResponse>('/sets');
        return response.data.data;
    } catch (error) {
        throw new Error(`Error fetching members.`);
    }
};

export const fetchSet = async (id: string): Promise<Set> => {
    try {
        const response = await httpClient.get<Set>(`/sets/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching members.`);
    }
};