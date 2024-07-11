
import { getUserInfo } from "@/lib/auth";
import { getAdminCompetitions } from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";
import { useState, useEffect } from "react";
import CompetitionsTable from "./components/competitions-table";

const AdminCompetitions = () => {
    const userInfo = getUserInfo();
    const [competitions, setCompetitions] = useState<Competition[]>([]);

    useEffect(() => {
      getAdminCompetitions().then((competitions) => {
        setCompetitions(competitions);
      });
    }, []);

    return (
        <div className="flex flex-col w-[70%] gap-3">
            <h1>Welcome {userInfo.username} to admin panel!</h1>
            <CompetitionsTable competitions={competitions} />
        </div>
    )
};

export default AdminCompetitions;