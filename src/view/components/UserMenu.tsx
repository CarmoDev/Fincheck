import UpgradeIcon from "@mui/icons-material/Upgrade";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { DropdownMenu } from "./DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";

export function UserMenu() {
    const { signout, user, isPremium } = useAuth();

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-200 cursor-pointer">
                    <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
                        {user?.name.slice(0, 2).toUpperCase()}
                    </span>
                </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content align="end" className="w-fit">
                {!isPremium && (
                    <DropdownMenu.Item
                        onSelect={signout}
                        className="flex items-center justify-between gap-3"
                    >
                        Melhorar Plano
                        <UpgradeIcon className="w-4 h-4 text-teal-900" />
                    </DropdownMenu.Item>
                )}

                {isPremium && (
                    <DropdownMenu.Item
                        onSelect={signout}
                        className="flex items-center justify-between gap-3"
                    >
                        Assinaturas
                        <GearIcon className="w-4 h-4" />
                    </DropdownMenu.Item>
                )}

                <DropdownMenu.Item
                    onSelect={signout}
                    className="flex items-center justify-between gap-3"
                >
                    Sair
                    <ExitIcon className="w-4 h-4" />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
