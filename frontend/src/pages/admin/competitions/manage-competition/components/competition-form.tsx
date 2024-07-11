import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Competition } from "@/lib/interfaces";

interface CompetitionFormProps {
    competition: Competition;
    setCompetiton: (competition: Competition) => void;
    handleUpdate: (event: React.FormEvent) => void;
}

const CompetitionForm = ({
    competition,
    setCompetiton,
    handleUpdate,
}: CompetitionFormProps) => {
    return (
        <form className="my-8 w-fit" onSubmit={handleUpdate}>
            <div className={"mb-4 flex w-full flex-col space-y-2"}>
                <Label htmlFor="wcaId">WCA ID</Label>
                <Input
                    value={competition?.wcaId}
                    id="wcaId"
                    name="wcaId"
                    placeholder="WCA ID"
                    onChange={(event) => {
                        setCompetiton({
                            ...competition,
                            wcaId: event.target.value,
                        });
                    }}
                />
            </div>
            <div className={"mb-4 flex w-full flex-col space-y-2"}>
                <Label htmlFor="name">Name</Label>
                <Input
                    value={competition?.name}
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={(event) => {
                        setCompetiton({
                            ...competition,
                            name: event.target.value,
                        });
                    }}
                />
            </div>
            <div className={"mb-4 flex w-full flex-col space-y-2"}>
                <Label htmlFor="startDate">Start date</Label>
                <DatePicker
                    date={new Date(competition.startDate)}
                    onSelect={(date) => {
                        setCompetiton({
                            ...competition,
                            startDate: date,
                        });
                    }}
                />
            </div>
            <div className={"mb-4 flex w-full flex-col space-y-2"}>
                <Label htmlFor="endDate">End date</Label>
                <DatePicker
                    date={new Date(competition.endDate)}
                    onSelect={(date) => {
                        setCompetiton({
                            ...competition,
                            endDate: date,
                        });
                    }}
                />
            </div>
            <div className={"mb-4 flex w-full items-center gap-2"}>
                <Checkbox
                    id="isPublic"
                    checked={competition.isPublic}
                    onCheckedChange={() => {
                        setCompetiton({
                            ...competition,
                            isPublic: !competition.isPublic,
                        });
                    }}
                />
                <Label
                    htmlFor="isPublic"
                    className="text-sm font-medium leading-none"
                >
                    Is public
                </Label>
            </div>
            <Button>Save</Button>
        </form>
    );
};

export default CompetitionForm;
