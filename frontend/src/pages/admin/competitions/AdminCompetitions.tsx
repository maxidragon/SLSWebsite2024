import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { getAdminCompetitions } from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";

import CompetitionsTable from "./components/competitions-table";
import CreateCompetitionModal from "./components/create-competition-modal";

const AdminCompetitions = () => {
    const navigate = useNavigate();
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [isOpenCreateCompetitionModal, setIsOpenCreateCompetitionModal] =
        useState(false);

    const handleCloseCreateCompetitionModal = () => {
        setIsOpenCreateCompetitionModal(false);
        fetchData();
    };

    const fetchData = () => {
        getAdminCompetitions().then((data) => {
            setCompetitions(data);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col w-[70%] gap-3">
            <div className="flex gap-3">
                <Button
                    className="w-fit"
                    onClick={() => setIsOpenCreateCompetitionModal(true)}
                >
                    Create new competition
                </Button>
                <Button className="w-fit" onClick={() => navigate("/users")}>
                    Manage users
                </Button>
            </div>
            <CompetitionsTable competitions={competitions} />
            <CreateCompetitionModal
                isOpen={isOpenCreateCompetitionModal}
                handleClose={handleCloseCreateCompetitionModal}
            />
        </div>
    );
};

export default AdminCompetitions;
