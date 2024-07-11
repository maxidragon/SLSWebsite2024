import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { deleteCompetition, deleteEvent, getCompetitionById, syncWcif, updateCompetition } from "@/lib/competitions";
import { Competition } from "@/lib/interfaces";
import { importResults } from "@/lib/results";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AddEventModal from "./components/add-event-modal";
import { getEventName } from "@/lib/events";


const ManageCompetition = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [competition, setCompetiton] = useState<Competition | null>(null);
    const [isOpenAddEventModal, setIsOpenAddEventModal] = useState(false);

    const fetchData = useCallback(async () => {
        if (!id) return;
        const competition = await getCompetitionById(id);
        setCompetiton(competition);
    }, [id]);

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!competition) return;
        const status = await updateCompetition(competition);
        if (status === 200) {
            toast.success('Competition updated');
        } else {
            toast.error('Something went wrong');
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

    const handleDeleteEvent = async (eventId: string) => {
        if (!competition) return;
        if (!confirm(`Are you sure you want to delete ${getEventName(eventId)}?`)) return;
        const status = await deleteEvent(competition.id, eventId);
        if (status === 204) {
            toast.success(`${getEventName(eventId)} deleted successfully`);
        } else {
            toast.error("Something went wrong");
        }
        fetchData();
    };

    const handleSync = async () => {
        if (!competition) return;
        const status = await syncWcif(competition.id);
        if (status === 200) {
            toast.success("Competition synced successfully");
        } else {
            toast.error("Something went wrong");
        }
    };

    const handleImport = async (eventId: string) => {
        if (!competition) return;
        if (!confirm(`Are you sure you want to import results for ${getEventName(eventId)}?`)) return;
        const status = await importResults(competition.id, eventId);
        if (status === 200) {
            toast.success(`Results for ${getEventName(eventId)} imported successfully`);
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

    const handleCloseAddEventModal = () => {
        setIsOpenAddEventModal(false);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!competition) return <div>Loading...</div>
    return (
        <div
            className="w-[50%] h-full rounded-none border flex border-gray-300 bg-white p-4 shadow dark:border-gray-800 dark:bg-black md:rounded-2xl md:p-8"
        >
            <div className="flex flex-col gap-4 w-[50%]">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Manage competition</h2>
                <div className="flex gap-2">
                    <Button className="w-fit min-w-[20%]" onClick={handleSync}>
                        Sync with WCA
                    </Button>
                    <Button variant="destructive" className="w-fit min-w-[20%]" onClick={handleDelete}>
                        Delete competition
                    </Button>
                </div>
                <form className="my-8 w-fit" onSubmit={handleUpdate}>
                    <div className={'mb-4 flex w-full flex-col space-y-2'}>
                        <Label htmlFor="wcaId">WCA ID</Label>
                        <Input value={competition?.wcaId} id="wcaId" name="wcaId" placeholder="WCA ID" onChange={(event) => {
                            setCompetiton({ ...competition, wcaId: event.target.value });
                        }} />
                    </div>
                    <div className={'mb-4 flex w-full flex-col space-y-2'}>
                        <Label htmlFor="name">Name</Label>
                        <Input value={competition?.name} id="name" name="name" placeholder="Name" onChange={(event) => {
                            setCompetiton({ ...competition, name: event.target.value });
                        }} />
                    </div>
                    <div className={'mb-4 flex w-full flex-col space-y-2'}>
                        <Label htmlFor="startDate">Start date</Label>
                        <DatePicker date={new Date(competition.startDate)} onSelect={(date) => {
                            setCompetiton({ ...competition, startDate: date, });
                        }} />
                    </div>
                    <div className={'mb-4 flex w-full flex-col space-y-2'}>
                        <Label htmlFor="endDate">End date</Label>
                        <DatePicker date={new Date(competition.endDate)} onSelect={(date) => {
                            setCompetiton({ ...competition, endDate: date, });
                        }} />
                    </div>
                    <div className={'mb-4 flex w-full items-center gap-2'}>
                        <Checkbox id="isPublic" checked={competition.isPublic} onCheckedChange={() => {
                            setCompetiton({ ...competition, isPublic: !competition.isPublic });
                        }} />
                        <Label htmlFor="isPublic" className="text-sm font-medium leading-none">Is public</Label>
                    </div>
                    <Button>
                        Save
                    </Button>
                </form>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Import results</h2>
                <div className="flex gap-2">
                    <Button onClick={handleImportAll}>
                        Import all events
                    </Button>
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
                        {competition.events.map((eventId) => (
                            <TableRow>
                                <TableCell>
                                    <span key={eventId} className={`cubing-icon event-${eventId}`} title={getEventName(eventId)} />
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <Button onClick={() => handleImport(eventId)}>
                                        Import
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleDeleteEvent(eventId)}>
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
        </div>
    );
};

export default ManageCompetition;