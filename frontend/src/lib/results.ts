import { backendRequest } from "./request";

export const importResults = async (
    competitionId: string,
    eventId?: string
) => {
    const response = await backendRequest(
        eventId
            ? `results/${competitionId}?eventId=${eventId}`
            : `results/${competitionId}`,
        "GET",
        true
    );
    return response.status;
};
