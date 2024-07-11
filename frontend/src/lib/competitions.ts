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

export const createCompetition = async (wcaId: string, name: string) => {
    const response = await backendRequest("competitions", "POST", true, {
        wcaId,
        name,
    });
    return {
        status: response.status,
        data: await response.json(),
    };
};
export const updateCompetition = async (data: Competition) => {
    const response = await backendRequest(
        `competitions/${data.id}`,
        "PUT",
        true,
        data
    );
    return response.status;
};

export const syncWcif = async (id: string) => {
    const response = await backendRequest(
        `competitions/sync/${id}`,
        "GET",
        true
    );
    return response.status;
};

export const deleteCompetition = async (id: string) => {
    const response = await backendRequest(`competitions/${id}`, "DELETE", true);
    return response.status;
};

export const addEvent = async (competitionId: string, eventId: string) => {
    const response = await backendRequest(
        `competitions/${competitionId}/event`,
        "POST",
        true,
        {
            eventId,
        }
    );
    return response.status;
};

export const deleteEvent = async (competitionId: string, eventId: string) => {
    const response = await backendRequest(
        `competitions/${competitionId}/event/${eventId}`,
        "DELETE",
        true
    );
    return response.status;
};
