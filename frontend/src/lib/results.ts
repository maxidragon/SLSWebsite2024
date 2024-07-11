import { backendRequest } from "./request";

export const importResults = async (competitionId: string, eventId?: string) => {
    const response = await backendRequest(`results/${competitionId}?eventId=${eventId}`, "GET", true);
    return response.status;
};