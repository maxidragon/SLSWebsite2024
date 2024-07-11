
import { getUserInfo } from "@/lib/auth";
import { getAdminCompetitions } from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";
import { useState, useEffect } from "react";
import CompetitionsTable from "./components/competitions-table";
import { Button } from "@/components/ui/button";
import CreateCompetitionModal from "./components/create-competition-modal";

const AdminCompetitions = () => {
  const userInfo = getUserInfo();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isOpenCreateCompetitionModal, setIsOpenCreateCompetitionModal] = useState(false);

  const handleCloseCreateCompetitionModal = () => {
    setIsOpenCreateCompetitionModal(false);
    fetchData();
  };

  const fetchData = () => {
    getAdminCompetitions().then((competitions) => {
      setCompetitions(competitions);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-[70%] gap-3">
      <h1>Welcome {userInfo.username} to admin panel!</h1>
      <Button className="w-fit" onClick={() => setIsOpenCreateCompetitionModal(true)}>
        Create new competition
      </Button>
      <CompetitionsTable competitions={competitions} fetchData={fetchData} />
      <CreateCompetitionModal isOpen={isOpenCreateCompetitionModal} handleClose={handleCloseCreateCompetitionModal} />
    </div>
  )
};

export default AdminCompetitions;