import { backendRequest } from "./request"

export const getRanking = async () => {
    const response = await backendRequest("ranking", "GET", false);
    return await response.json();
};