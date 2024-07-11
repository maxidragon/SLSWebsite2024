import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { deleteEvent } from "@/lib/competitions";
import { getEventName } from "@/lib/events";
import { Competition } from "@/lib/interfaces";
import { importResults } from "@/lib/results";

import AddEventModal from "./add-event-modal";

interface ManageEventsProps {
    competition: Competition;
    fetchData: () => void;
}

const ManageEvents = ({ competition, fetchData }: ManageEventsProps) => {
    const [isOpenAddEventModal, setIsOpenAddEventModal] = useState(false);

    const handleImport = async (eventId: string) => {
        if (!competition) return;
        if (
            !confirm(
                `Are you sure you want to import results for ${getEventName(eventId)}?`
            )
        )
            return;
        const status = await importResults(competition.id, eventId);
        if (status === 200) {
            toast.success(
                `Results for ${getEventName(eventId)} imported successfully`
            );
        } else {
            toast.error("Something went wrong");
        }
    };

    const handleImportAll = async () => {
        if (!competition) return;
        if (!confirm("Are you sure you want to import all results?")) return;
        const status = await importResults(competition.id);
        if (status === 200) {
            toast.success("Results imported successfully");
        } else {
            toast.error("Something went wrong");
        }
    };

    const handleDeleteEvent = async (eventId: string) => {
        if (!competition) return;
        if (
            !confirm(
                `Are you sure you want to delete ${getEventName(eventId)}?`
            )
        )
            return;
        const status = await deleteEvent(competition.id, eventId);
        if (status === 204) {
            toast.success(`${getEventName(eventId)} deleted successfully`);
        } else {
            toast.error("Something went wrong");
        }
        fetchData();
    };

    const handleCloseAddEventModal = () => {
        setIsOpenAddEventModal(false);
        fetchData();
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Import results
                </h2>
                <div className="flex gap-2">
                    <Button onClick={handleImportAll}>Import all events</Button>
                    <Button onClick={() => setIsOpenAddEventModal(true)}>
                        Add event
                    </Button>
                </div>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {competition.events.map((eventId: string) => (
                            <TableRow>
                                <TableCell>
                                    <span
                                        key={eventId}
                                        className={`cubing-icon event-${eventId}`}
                                        title={getEventName(eventId)}
                                    />
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        onClick={() => handleImport(eventId)}
                                    >
                                        Import
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            handleDeleteEvent(eventId)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <AddEventModal
                isOpen={isOpenAddEventModal}
                handleClose={handleCloseAddEventModal}
                currentEvents={competition.events}
                competitionId={competition.id}
            />
        </>
    );
};

export default ManageEvents;
