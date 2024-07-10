import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username") as string;
        const password = data.get("password") as string
        const status = await login(username, password);
        if (status === 200) {
            toast.success("Successfully logged in.");
            navigate("/admin/competitions");
        } else if (status === 401) {
            toast.error("Wrong username or password");
        } else {
            toast.error("Something went wrong");
        }
    };
    return (
        <div
            className="mx-auto w-full max-w-md rounded-none border border-gray-300 bg-white p-4 shadow dark:border-gray-800 dark:bg-black md:rounded-2xl md:p-8"
        >
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Sign in</h2>
            <form className="my-8" onSubmit={handleSubmit}>
                <div className={'mb-4 flex w-full flex-col space-y-2'}>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" placeholder="Username" />
                </div>
                <div className={cn('mb-4 flex w-full flex-col space-y-2')}>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" placeholder="••••••••" type="password" />
                </div>

                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign in
                    <span
                        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
                    />
                    <span
                        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
                    />
                </button>

                <div
                    className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700"
                />
            </form>
        </div>
    );
};

export default Login;