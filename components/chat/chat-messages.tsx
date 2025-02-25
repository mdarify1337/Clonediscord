"use client";

import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import ChatItem from "./chat-item";
import {format} from "date-fns"


const DATE_FORMAT = "d MMM yyyy, HH:mm"

interface   ChatMessagesProps{
    name: string,
    member : Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue:string,
    type: "channel" | "conversation";
}

type MessageWithMemberWithProfile = Message & {
    member : Member & {
        profile : Profile
    }
}

export  function ChatMessages({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
} : ChatMessagesProps){
    const queryKey = `chat:${chatId}`;

    const {
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        status,
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue 
    })
    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading ChatMessages...
                </p>
            </div>
        )
    }
    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500  my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something went wrong!
                </p>
            </div>
        )
    }
    console.log("data === \n", data);
    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1"/>
            <ChatWelcome 
                type={type}
                name={name}
            />
            <div
                className="flex flex-col-reverse mt-auto"
            >
                {
                    data?.pages.map((group, id) => (
                        <Fragment key={id}>
                            {
                                group.items.map((message: MessageWithMemberWithProfile) =>(
                                    <div key={message.id}>
                                        {
                                            <ChatItem
                                                key={message.id}
                                                id={message.id}
                                                member={message.member}
                                                currentMember={member}
                                                content={message.content}
                                                fileUrl={message.fileUrl}
                                                deleted={message.deleted}
                                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                                isUpdated={message.updatedAt !== message.createdAt}
                                                socketUrl={socketUrl}
                                                socketQuery={socketQuery}                                       
                                            />
                                        }
                                    </div>
                                ))
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}