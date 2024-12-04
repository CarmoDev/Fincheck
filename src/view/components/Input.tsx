import { ComponentProps, forwardRef, useState } from "react";
import { CrossCircledIcon, EyeClosedIcon } from "@radix-ui/react-icons";

import { cn } from "../../app/utils/cn";
import Visibility from "@mui/icons-material/Visibility";

interface InputProps extends ComponentProps<"input"> {
    name: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ placeholder, name, id, error, className, type, ...props }, ref) => {
        if (type === "password") {
            id = "isPassword";
        }

        const inputId = id ?? name;
        const [isPasswordVisible, setIsPasswordVisible] = useState(true);

        function togglePasswordVisibility() {
            setIsPasswordVisible(!isPasswordVisible);

            const passwordField = document.getElementById(
                "isPassword"
            ) as HTMLInputElement;

            passwordField.type = isPasswordVisible ? "text" : "password";
        }

        return (
            <div className="relative">
                <input
                    {...props}
                    id={inputId}
                    type={type}
                    ref={ref}
                    name={name}
                    className={cn(
                        "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none",
                        error && "!border-red-900",
                        className
                    )}
                    placeholder=" "
                />

                <label
                    htmlFor={inputId}
                    // className="absolute left-[13px] top-3.5 pointer-events-none text-gray-700"
                    className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
                >
                    {placeholder}
                </label>

                {id === "isPassword" && (
                    <button
                        className="absolute right-[13px] top-[1rem] z-10"
                        onClick={togglePasswordVisibility}
                    >
                        {isPasswordVisible && (
                            <Visibility
                                className="text-gray-700 size-6 transition-all"
                                sx={{ width: 16, color: "#495057" }}
                            />
                        )}
                        {!isPasswordVisible && (
                            <EyeClosedIcon className="text-gray-700 transition-all" />
                        )}
                    </button>
                )}

                {error && (
                    <div className="flex gap-2 items-center mt-2 text-red-900">
                        <CrossCircledIcon />
                        <span className="text-xs text-red-900">{error}</span>
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";
