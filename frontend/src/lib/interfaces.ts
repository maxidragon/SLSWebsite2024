export interface Competition {
    id: string;
    name: string;
    wcaId: string;
    events: string[];
    importedEvents: string[];
    wcaWebsite: string;
    isPublic: boolean;
    startDate: Date;
    endDate: Date;
    registrationOpen: Date;
    registrationClose: Date;
}

export interface Person {
    competitor: Competitor;
    score: number;
}
export interface Competitor {
    id: string;
    wcaId: string;
    name: string;
    countryIso2: string;
    avatarUrl: string;
}

export interface ResultByCompetition {
    competition: Competition;
    results: Result[];
    score: number;
}

export interface Result {
    id: string;
    eventId: string;
    pos: number;
    best: number;
    average: number;
    score: number;
}

export interface User {
    id: string;
    username: string;
}
