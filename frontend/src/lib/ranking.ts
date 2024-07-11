import { backendRequest } from "./request";

export const getRanking = async () => {
    const response = await backendRequest("ranking", "GET", false);
    return await response.json();
};

export const getPersonInfoAndResults = async (wcaId: string) => {
    const response = await backendRequest(
        `ranking/person/${wcaId}`,
        "GET",
        false
    );
    return await response.json();
};
