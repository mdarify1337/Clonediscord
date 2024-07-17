"use client"

import { ServerWithMembersWithProfiles } from "@/types"
import {ChannelType, MemberRole} from "@prisma/client"
import {v4 as uuidv4} from "uuid";
interface ServerHeaerProps{
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
}

import  {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { 
    ChevronDown, 
    LogOut, 
    PlusCircle, 
    Settings, 
    Trash, 
    UserPlus, 
    Users 
} from "lucide-react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {useModal} from "@/hooks/use-modal-store"

const servers = [
    {
        id: uuidv4(),
        name: 'Gaming Hub',
        imageUrl: 'https://example.com/images/gaming-hub.jpg',
        inviteCode: 'GAMING123',
        profileId: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        members: [
          {
            id: uuidv4(),
            role: MemberRole.ADMIN,
            profileId: uuidv4(),
            serverId: 'serverId1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            role: MemberRole.MODERATOR,
            profileId: uuidv4(),
            serverId: 'serverId1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            role: MemberRole.GUEST,
            profileId: uuidv4(),
            serverId: 'serverId1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        channels: [
          {
            id: uuidv4(),
            name: 'General Chat',
            type: ChannelType.TEXT,
            profileId: uuidv4(),
            serverId: 'serverId1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            name: 'Voice Chat',
            type: ChannelType.AUDIO,
            profileId: uuidv4(),
            serverId: 'serverId1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
];

export default function ServerHeaderFunction({
    server,
    role,
} : ServerHeaerProps){
    const {onOpen} = useModal();
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR
    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
                className="focus:outline-none"
                asChild    
            >
                <button
                    className="w-full text-md font-semibold px-3 flex
                    items-center h-12 border-neutral-200 
                    dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10
                    dark:hover:bg-zinc-700/50 transition"
                >
                    {
                        servers.map((server) => (
                            <p>{server.name}</p>
                        ))
                    }
                    <ChevronDown
                        className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 text-xs font-medium text-black 
                dark:text-neutral-400 space-y-[2px]"
            >
                {
                    isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("invite", {server: server})}
                            className="text-indigo-600 dark:text-indigo-400
                            px-3 py-2 text-sm cursor-pointer font-bold"
                        >
                            Invite People
                            <UserPlus className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isAdmin && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer font-bold">
                            Server Settings
                            <Settings className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isAdmin && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer font-bold">
                            Manage Members
                            <Users className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isModerator && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer font-bold">
                            Create Channel
                            <PlusCircle className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isModerator && (<DropdownMenuSeparator/>)
                }
                {
                    isAdmin && (
                        <DropdownMenuItem
                            className="text-rose-600 dark:hover:text-rose-500 px-3 py-2 text-sm cursor-pointer font-bold">
                            Delete Server
                            <Trash className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    !isAdmin && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer font-bold">
                            Leave Server
                            <LogOut className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
