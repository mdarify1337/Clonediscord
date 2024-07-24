import ChatHeader from "@/components/chat/chat-header";
import GetOrCreateConversation from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { error } from "console";
import { redirect } from "next/navigation"

interface MemberIdPageProps {
    params : {
        memberId: string;
        serverId: string;
    }
}


export default async function MemberIdPageFunction(
    {params} : MemberIdPageProps
){
    const profile = await currentProfile();
    if (!profile)
        return redirectToSignIn();
    console.log(profile)
    const currentMember = await db.member.findFirst({
        where : {
            serverId: params.serverId,
            profileId: params.memberId,
        },
        include : {
            profile : true,
        }
    })
    console.log(error, "errorhjsdfhsjhlsdfjhhjsdf")
    
    // const conversation = await GetOrCreateConversation(currentMember?.id, 
    //     params.memberId)
    // if (!conversation)
    //     return redirect(`/servers/${params.serverId}`);
    // const {memberOne, memberTwo} = conversation;
    // const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;
    // console.log("conversation ", conversation);
    return (
        <p>ehlhlsdflsfjsjdf</p>
    //    <div
    //     className="bg-white dark:bg-[#313338] flex flex-col h-full"
    //    >
    //         <ChatHeader 
    //             imageUrl={otherMember.profile.imageUrl}
    //             name={otherMember.profile.name}
    //             serverId={params.serverId}
    //             type={"conversation"}
    //         />
    //    </div>
    )
}
