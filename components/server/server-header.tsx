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
import { ChevronDown, UserPlus } from "lucide-react";

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
                            className="text-indigo-600 dark:text-indigo-400
                            px-3 py-2 text-sm cursor-pointer"
                        >
                            Invite People
                            <UserPlus/>
                        </DropdownMenuItem>
                    )
                }
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
