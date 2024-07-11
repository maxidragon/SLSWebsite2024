import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    deleteCompetition,
    getCompetitionById,
    syncWcif,
    updateCompetition,
} from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";

import CompetitionForm from "./components/competition-form";
import ManageEvents from "./components/manage-events";

const ManageCompetition = () => {
    const { id } = useParams<{
        id: string;
    }>();
    const navigate = useNavigate();
    const [competition, setCompetiton] = useState<Competition | null>(null);

    const fetchData = useCallback(async () => {
        if (!id) return;
        const data = await getCompetitionById(id);
        setCompetiton(data);
    }, [id]);

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!competition) return;
        const status = await updateCompetition(competition);
        if (status === 200) {
            toast.success("Competition updated");
        } else {
            toast.error("Something went wrong");
        }
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this competition?")) {
            if (!competition) return;
            const status = await deleteCompetition(competition.id);
            if (status === 204) {
                toast.success("Competition deleted successfully");
                navigate("/admin/competitions");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    const handleSync = async () => {
        if (!competition) return;
        const status = await syncWcif(competition.id);
        if (status === 200) {
            toast.success("Competition synced successfully");
        } else {
            toast.error("Something went wrong");
        }
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!competition) return <div>Loading...</div>;
    return (
        <div className="w-[50%] h-full rounded-none border flex border-gray-300 bg-white p-4 shadow dark:border-gray-800 dark:bg-black md:rounded-2xl md:p-8">
            <div className="flex flex-col gap-4 w-[50%]">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Manage competition
                </h2>
                <div className="flex gap-2">
                    <Button className="w-fit min-w-[20%]" onClick={handleSync}>
                        Sync with WCA
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-fit min-w-[20%]"
                        onClick={handleDelete}
                    >
                        Delete competition
                    </Button>
                </div>
                <CompetitionForm
                    competition={competition}
                    setCompetiton={setCompetiton}
                    handleUpdate={handleUpdate}
                />
            </div>
            <ManageEvents competition={competition} fetchData={fetchData} />
        </div>
    );
};

export default ManageCompetition;
