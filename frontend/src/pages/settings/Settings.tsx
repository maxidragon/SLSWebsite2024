import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/lib/auth";

const Settings = () => {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;
        const repeatPassword = formData.get("repeatPassword") as string;
        if (newPassword !== repeatPassword) {
            return toast.error("Passwords do not match");
        }
        const status = await changePassword(currentPassword, newPassword);
        if (status === 200) {
            toast.success("Password changed successfully");
        } else if (status === 403) {
            toast.error("Wrong password");
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mx-auto w-full max-w-md rounded-none border border-gray-300 bg-white p-4 shadow dark:border-gray-800 dark:bg-black md:rounded-2xl md:p-8">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Change password
            </h2>
            <form className="my-8" onSubmit={handleSubmit}>
                <div className="mb-4 flex w-full flex-col space-y-2">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="••••••••"
                        type="password"
                    />
                </div>
                <div className="mb-4 flex w-full flex-col space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input
                        id="newPassword"
                        name="newPassword"
                        placeholder="••••••••"
                        type="password"
                    />
                </div>
                <div className="mb-4 flex w-full flex-col space-y-2">
                    <Label htmlFor="repeatPassword">Repeat now password</Label>
                    <Input
                        id="repeatPassword"
                        name="repeatPassword"
                        placeholder="••••••••"
                        type="password"
                    />
                </div>

                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Change password
                </button>
            </form>
        </div>
    );
};

export default Settings;
