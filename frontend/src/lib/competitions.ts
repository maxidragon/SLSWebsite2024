import { backendRequest } from "./request";

export const getAllCompetitions = async () => {
    const response = await backendRequest("competitions", "GET", false);
    return await response.json();
};

export const syncWcif = async (id: string) => {
    const response = await backendRequest(`competitions/sync/${id}`, "GET", true);
    return response.status;
};