'use client'

import { useRouter } from "next/navigation"

import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { displayPurposeOnly } from "@/app/lib/utils"

export default function SettingMenuBar(props) {

    const router = useRouter()
    const setIsLoggedIn = props.setIsLoggedIn

    const handleLogOut = () => {
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        router.push('/sign-in')
        // window.location.reload()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Image alt="settings.png" src="/settings.png" width={40} height={40} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                <DropdownMenuItem onClick={displayPurposeOnly}>Apperance</DropdownMenuItem>
                <DropdownMenuItem onClick={displayPurposeOnly}>Insight</DropdownMenuItem>
                <DropdownMenuItem onClick={displayPurposeOnly}>Settings</DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={displayPurposeOnly}> Report a problem</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
