import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeaderFunction from "./server-header";
import {v4 as uuidv4} from "uuid";

interface ServerSideBarProps {
    serverId: string
}
export default async function ServerSideBarFunction({
    serverId} : ServerSideBarProps){
    const profile = await currentProfile();
    if (!profile)
        return redirect("/");
    let server = await db.server.findUnique({
        where : {
            id: serverId
        },
        include : {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                },
            },
        }
    });
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
          {
            id: uuidv4(),
            name: 'Tech Talk',
            imageUrl: 'https://example.com/images/tech-talk.jpg',
            inviteCode: 'TECH123',
            profileId: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
            members: [
              {
                id: uuidv4(),
                role: MemberRole.ADMIN,
                profileId: uuidv4(),
                serverId: 'serverId2',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: uuidv4(),
                role: MemberRole.GUEST,
                profileId: uuidv4(),
                serverId: 'serverId2',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            channels: [
              {
                id: uuidv4(),
                name: 'Announcements',
                type: ChannelType.TEXT,
                profileId: uuidv4(),
                serverId: 'serverId2',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: uuidv4(),
                name: 'Tech Support',
                type: ChannelType.VIDEO,
                profileId: uuidv4(),
                serverId: 'serverId2',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          },
          {
            id: uuidv4(),
            name: 'Music Lovers',
            imageUrl: 'https://example.com/images/music-lovers.jpg',
            inviteCode: 'MUSIC123',
            profileId: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
            members: [
              {
                id: uuidv4(),
                role: MemberRole.MODERATOR,
                profileId: uuidv4(),
                serverId: 'serverId3',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: uuidv4(),
                role: MemberRole.GUEST,
                profileId: uuidv4(),
                serverId: 'serverId3',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            channels: [
              {
                id: uuidv4(),
                name: 'Song Sharing',
                type: ChannelType.TEXT,
                profileId: uuidv4(),
                serverId: 'serverId3',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: uuidv4(),
                name: 'Live Jam',
                type: ChannelType.AUDIO,
                profileId: uuidv4(),
                serverId: 'serverId3',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          },
          {
            id: uuidv4(),
            name: 'Art Community',
            imageUrl: 'https://example.com/images/art-community.jpg',
            inviteCode: 'ART123',
            profileId: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
            members: [
              {
                id: uuidv4(),
                role: MemberRole.ADMIN,
                profileId: uuidv4(),
                serverId: 'serverId4',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: uuidv4(),
                role: MemberRole.MODERATOR,
                profileId: uuidv4(),
                serverId: 'serverId4',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            channels: [
              {
                id: uuidv4(),
                name: 'Artwork Showcase',
                type: ChannelType.TEXT,
                profileId: uuidv4(),
                serverId: 'serverId4',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: uuidv4(),
                name: 'Art Tutorials',
                type: ChannelType.VIDEO,
                profileId: uuidv4(),
                serverId: 'serverId4',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          },
          {
            id: uuidv4(),
            name: 'Fitness Fanatics',
            imageUrl: 'https://example.com/images/fitness-fanatics.jpg',
            inviteCode: 'FITNESS123',
            profileId: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
            members: [
              {
                id: uuidv4(),
                role: MemberRole.GUEST,
                profileId: uuidv4(),
                serverId: 'serverId5',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            channels: [
              {
                id: uuidv4(),
                name: 'Workout Routines',
                type: ChannelType.TEXT,
                profileId: uuidv4(),
                serverId: 'serverId5',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: uuidv4(),
                name: 'Live Workouts',
                type: ChannelType.VIDEO,
                profileId: uuidv4(),
                serverId: 'serverId5',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          },
    ];
    const textChannels = server?.channels.filter((channel) => 
        channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => 
        channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => 
        channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member) => member.profileId !== profile.id);
    const role = server?.members.find((member) => member.profileId === profile.id)?.role;
    // if (!server)
    //   return   redirect("/")
    return (
        <div className="flex flex-col text-primary w-full 
                dark:bg-[#2B2D31]  bg-[#2F3F5] h-full">
                  {/* Server Side Components */}
            <ServerHeaderFunction
                server={server}
                role={role}
            />            
        </div>
    )
}