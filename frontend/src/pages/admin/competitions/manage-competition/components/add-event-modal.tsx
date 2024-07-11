import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addEvent } from "@/lib/competitions";
import events from "@/lib/events";
import { useState } from "react";
import toast from "react-hot-toast";

interface AddEventModalProps {
    isOpen: boolean;
    handleClose: () => void;
    currentEvents: string[];
    competitionId: string;
}

const AddEventModal = ({
    isOpen,
    handleClose,
    currentEvents,
    competitionId
}: AddEventModalProps) => {
    const possibleEvents = events.filter(event => !currentEvents.includes(event.id));
    const [selectedEvent, setSelectedEvent] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const status = await addEvent(competitionId, selectedEvent);
        if (status === 201) {
            toast.success("Event added successfully");
            setSelectedEvent("");
            handleClose();
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="overflow-hidden p-5">
                <DialogHeader className="pt-3">
                    <DialogTitle className="text-2xl font-bold">
                        Add event
                    </DialogTitle>
                </DialogHeader>
                <form className="mt-3 w-fit" onSubmit={handleSubmit}>
                    <div className={'mb-4 flex w-full flex-col space-y-2'}>
                        <Label htmlFor="eventId">Event</Label>
                        <Select value={selectedEvent} onValueChange={(value) => setSelectedEvent(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select event" />
                            </SelectTrigger>
                            <SelectContent>
                                {possibleEvents.map(event => (
                                    <SelectItem key={event.id} value={event.id}>
                                        {event.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-fit min-w-[20%]">
                        Add
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddEventModal;