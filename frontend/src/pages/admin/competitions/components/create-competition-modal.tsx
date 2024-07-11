import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCompetition } from "@/lib/competitions";

interface CreateCompetitionModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const CreateCompetitionModal = ({
    isOpen,
    handleClose,
}: CreateCompetitionModalProps) => {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const wcaId = formData.get("wcaId") as string;
        const name = formData.get("name") as string;
        const response = await createCompetition(wcaId, name);
        if (response.status === 201) {
            toast.success("Competition created successfully");
            navigate(`/admin/competitions/${response.data.id}`);
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
                        Create competition
                    </DialogTitle>
                </DialogHeader>
                <form className="mt-3 w-fit" onSubmit={handleSubmit}>
                    <div className={"mb-4 flex w-full flex-col space-y-2"}>
                        <Label htmlFor="wcaId">WCA ID</Label>
                        <Input id="wcaId" name="wcaId" placeholder="WCA ID" />
                    </div>
                    <div className={"mb-4 flex w-full flex-col space-y-2"}>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Name" />
                    </div>
                    <Button type="submit" className="w-fit min-w-[20%]">
                        Create
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCompetitionModal;
