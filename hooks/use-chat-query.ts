import qs from "query-string"

import { useParams } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSocket } from "@/components/providers/socket-provider"
import { Divide } from "lucide-react";


interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    language?: string;
}


export const useChatQuery =({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
    language = "en",
} : ChatQueryProps) => {
    const {isConnected} = useSocket();

    const fetchMessages= async ({pageParam = undefined}) =>{
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey] : paramValue,
                language: language, 
            }
        }, {skipNull: true});
        console.log("Url ", url);
        const res = await fetch(url);
        return res.json();
    }
    const {
        data, 
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000,
        initialPageParam: undefined, // Add the initialPageParam property
    });
    // console.log("data ==> \n",data)
    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    }
}