"use client"

import { Member, MemberRole, Profile } from "@prisma/client";
import UserAvatar from "../user-avatar";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import AciontTooltip from "../action-tooltip";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import * as z from "zod"
import axios from "axios";
import qs from "query-string"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    Form,
    FormField,
    FormControl,
    FormItem
} from "@/components/ui/form"

import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    }
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>
}
const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />,
    "ADMIN": <ShieldAlert className='h-4 w-4 ml-2 text-rose-600' />
}

const formShema = z.object({
    content: z.string().min(1),
});

export default function ChatItem(
    {
        id,
        content,
        member,
        timestamp,
        fileUrl,
        deleted,
        currentMember,
        isUpdated,
        socketUrl,
        socketQuery
    }: ChatItemProps
) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === "Escape" || event.key === 27){
                setIsEditing(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: {
            content: content
        }
    });

    useEffect(() => {
        form.reset({
            content: content,
        });
    }, [content]);
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formShema>) => {
        try {
             const url = qs.stringifyUrl({
                url : `${socketUrl}/${id}`,
                query: socketQuery
            })
            console.log("url -- ", url, "\n value ---- ", values)
            await axios.patch(url, values);
            form.reset();
            setIsEditing(false);
        }catch (error) {
            console.log(error);
        }
    }

    const fileType = fileUrl?.split(".").pop();
    // console.log("fileUrl => ", fileUrl, "fileType ==> ", fileType);
    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;
    return (
        <div className="relative group flex items-center 
            hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md 
                transition">
                    <UserAvatar src={member.profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full ">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-bold text-sm 
                                hover:underline cursor-pointer">
                                {member.profile.name}
                            </p>
                            <AciontTooltip
                                label={member.role}
                            >
                                {roleIconMap[member.role]}
                            </AciontTooltip>
                        </div>
                        <span className="text-xs font-bold text-zinc-500 
                            dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 
                                overflow-hidden border flex items-center bg-secondary 
                                h-48 w-48 bg-green-700"
                        >
                            <Image
                                src={fileUrl}
                                alt={content}
                                fill
                                className="object-cover bg-red-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </a>
                    )}
                    {
                        isPDF && (
                            <div className='relative flex items-center p-2 mt-2 rounded-md
                                bg-background/10'>
                                <FileIcon
                                    className='h-10 w-10 fill-indigo-200 stroke-indigo-500'
                                />
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener"
                                    className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
                                >
                                    PDF file
                                </a>
                            </div>
                        )
                    }
                    {
                        !fileUrl && !isEditing && (
                            <p className={cn("text-zinc-600 dark:text-zinc-300 font-semibold",
                                deleted && "italic text-zinc-500 dark:text-zinc text-xs mt-1"
                            )}>
                                {content}
                                {
                                    isUpdated && !deleted && (
                                        <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                            (edited)
                                        </span>
                                    )
                                }
                            </p>
                        )
                    }
                    {
                        !fileUrl && isEditing && (
                            <Form {...form}>
                                <form
                                    className="flex items-center w-full gap-x-2 pt-2"
                                    onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({field}) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <div className="relative w-full">
                                                        <Input
                                                            disabled={isLoading}
                                                            className="p-2 bg-zinc-200/90 
                                                            dark:bg-zinc-700/75 border-none border-0
                                                            focus-visible:ring-0 focus-visible:ring-offset-0
                                                            text-zinc-600 dark:text-zinc-200"
                                                            placeholder="Edited message"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button 
                                        disabled={isLoading}
                                        size={"sm"} 
                                        variant={"primary"}>
                                        Save
                                    </Button>
                                </form>
                                <span className="text-[10px] mt-1 text-zinc-400">
                                        Press escape to cancel, enter to save
                                </span>
                            </Form>
                        )
                    }
                    {/* {content} */}
                </div>
            </div>
            {
                canDeleteMessage && (
                    <div className="hidden group-hover:flex items-center gap-x-2
                    absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border
                    rounded-sm">
                        {
                            canEditMessage && (
                                <AciontTooltip label="Edit">
                                    <Edit
                                        onClick={() => setIsEditing(true)}
                                        className="cursor-pointer ml-auto w-4 h-4 text-zinc-500
                                        hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                                    />
                                </AciontTooltip>
                            )
                        }
                        <AciontTooltip label="Delete">
                            <Trash
                                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500
                                        hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                            />
                        </AciontTooltip>
                    </div>
                )
            }
        </div>
    )
}
