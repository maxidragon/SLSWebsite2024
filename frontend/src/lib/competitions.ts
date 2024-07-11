import { Competition } from "./interfaces";
import { backendRequest } from "./request";

export const getAllCompetitions = async () => {
    const response = await backendRequest("competitions", "GET", false);
    return await response.json();
};

export const getAdminCompetitions = async () => {
    const response = await backendRequest("competitions/admin", "GET", true);
    return await response.json();
};

export const getCompetitionById = async (id: string) => {
    const response = await backendRequest(`competitions/${id}`, "GET", true);
    return await response.json();
};

export const updateCompetition = async (data: Competition) => {
    const response = await backendRequest(`competitions/${data.id}`, "PUT", true, data);
    return response.status;
};

export const syncWcif = async (id: string) => {
    const response = await backendRequest(`competitions/sync/${id}`, "GET", true);
    return response.status;
};