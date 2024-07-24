import {db} from "@/lib/db"
import { profile } from "console";
import { createConnection } from "net";
import { NextResponse } from "next/server";





export  async function FindConversation(
    memberOneId: string, memberTwoId: string
) {
    try {
        return await db.conversation.findFirst({
            where : {
                AND :[
                    {memberOneId: memberOneId},
                    {memberTwoId: memberTwoId},
                ]
            },
            include : {
                 memberOne: {
                    include : {
                        profile: true,
                    }
                 },
                 memberTwo : {
                    include : {
                        profile : true,
                    }
                 }
            }
        });
    }
    catch (error) {
        return null;
    }
}


export  async function CreateNewConversation(
    memberOneId: string, memberTwoId: string
) {
    try {
        return await db.conversation.create({
            data : { 
                memberOneId,
                memberTwoId,
            },
            include  : {
                memberOne : {
                    include  : {
                        profile: true
                    }
                },
                memberTwo : {
                    include : {
                        profile: true,
                    }
                }
            }
        })
    } catch (error) {
        return null;
    }
}


export default async function GetOrCreateConversation(memberOneId: string,
    memberTwoId:string
) {
    let conversation = await FindConversation(memberOneId, memberTwoId) ||
        await FindConversation(memberTwoId, memberOneId);
    if (!conversation)
        conversation = await CreateNewConversation(memberOneId, memberTwoId);
    return conversation;
}