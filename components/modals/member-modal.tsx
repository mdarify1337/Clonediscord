
"use client";

import qs from "query-string";

import '../../list.css'
import * as z from "zod"
import axios from "axios"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; 

import { 
    ScrollArea 
} from '@/components/ui/scroll-area';

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from '@/types';
import UserAvatar from '@/components/user-avatar';
import { 
    MoreVertical, 
    ShieldCheck, 
    ShieldQuestion, 
    Shield,
    ShieldAlert,
    Check,
    Gavel,
    Loader2
    } from 'lucide-react';
import { useState } from 'react';

import {ChannelType, MemberRole} from "@prisma/client"
import {v4 as uuidv4} from "uuid";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";

const roleIconMap = {
    "GUEST" : null,
    "MODERATOR" : <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500'/>,
    "ADMIN": <ShieldCheck className='h-4 w-4 ml-2 text-rose-600' />
}
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

export default function MemberModal(){
    const router = useRouter();
    const {onOpen, isOpen, onClose, type, data} = useModal();
    const [loadingId, setLoadingId] = useState<string>("");
    const isModalOpen = isOpen && type === "members";
    const {server} = data as {server: ServerWithMembersWithProfiles};
    console.log("type ==> \n", type,"\n", "data ==> \n ", data);
    const onKickChange = async (memberId: string) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url : `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,                }
            });
            const response = await axios.delete(url);
            console.log("response ", response);
            router.refresh();
            onOpen("members", {server: response.data})
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    }
    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url : `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,                }
            });
            const response = await axios.patch(url, {role});
            console.log("response ", response);
            router.refresh();
            onOpen("members", {server: response.data})
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-extrabold">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription
                        className='text-center text-zinc-800 font-bold'
                    >
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
               <ScrollArea
                className='mt-8 max-h-[420px] pr-6 '
               >
                {server?.members?.map((member) => (
                    <div 
                        key={member.id} 
                        className='flex items-center gap-x-2 mb-6 '
                        >
                            <UserAvatar
                                src={member.profile.imageUrl}
                            />
                            <div
                                className='flex flex-col gap-y-1 mb-2'
                            >
                                <div
                                    className='text-xs font-bold flex 
                                    items-center gap-x-1 '
                                >
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p
                                    className='text-xs text-zinc-500 font-bold'
                                >
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                                <div
                                    className='ml-auto'
                                >
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical 
                                                className='h-4 w-4 text-zinc-500'>
                                            </MoreVertical>
                                            <DropdownMenuContent side='left'>
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger
                                                        className='flex items-center'
                                                    >
                                                        <ShieldQuestion />
                                                        <span>Role</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem
                                                                onClick={() => onRoleChange(member.id, "GUEST")}
                                                            >
                                                                <Shield 
                                                                    className='h-4 w-4 mr-2'
                                                                />
                                                                Guest
                                                                {member.role === "GUEST" && (
                                                                    <Check 
                                                                        className='h-4 w-4 ml-auto'
                                                                    />
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => onRoleChange(member.id, "MODERATOR")}
                                                            >
                                                                <ShieldCheck
                                                                    className='h-4 w-4 mr-2'
                                                                />
                                                                Moderator
                                                                {member.role === "MODERATOR" && (
                                                                    <Check 
                                                                        className='h-4 w-4 ml-auto'
                                                                    />
                                                                )}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem
                                                    onClick={() => onKickChange(member.id)}
                                                >
                                                    <Gavel className="h-4 w-4 mr-2"/>
                                                    Kick
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenuTrigger>
                                    </DropdownMenu>
                                </div>
                            )}
                            {
                                loadingId === member.id && (
                                    <Loader2
                                        className='animate-spin text-zinc-500 ml-auto w-4 h-4'
                                    />
                                )
                            }
                    </div>
                ))}

               </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}