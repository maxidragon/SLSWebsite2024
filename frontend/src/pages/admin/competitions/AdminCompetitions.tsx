
import { getUserInfo } from "@/lib/auth";
import { getAllCompetitions } from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";
import { useState, useEffect } from "react";
import CompetitionsTable from "./components/competitions-table";

const AdminCompetitions = () => {
    const userInfo = getUserInfo();
    const [upcomingCompetitions, setUpcomingCompetitons] = useState<Competition[]>([]);
    const [pastCompetitions, setPastCompetitions] = useState<Competition[]>([]);

    useEffect(() => {
      getAllCompetitions().then((competitions) => {
        setUpcomingCompetitons(competitions.upcomingCompetitions);
        setPastCompetitions(competitions.pastCompetitions);
      });
    }, []);

    return (
        <div className="flex flex-col w-[70%] gap-3">
            <h1>Welcome {userInfo.username} to admin panel!</h1>
            <h2>Upcoming competitions</h2>
            <CompetitionsTable competitions={upcomingCompetitions} />
            <h2>Past competitions</h2>
            <CompetitionsTable competitions={pastCompetitions} />
        </div>
    )
};

export default AdminCompetitions;