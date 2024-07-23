import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeaderFunction from "./server-header";
import {v4 as uuidv4} from "uuid";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ServerSectionFunction from "./server-section";
import { text } from "stream/consumers";
import { channel } from "diagnostics_channel";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";

interface ServerSideBarProps {
    serverId: string
}

const iconMap = {
  [ChannelType.TEXT] : <Hash className="mr-2 h-4 w-4"/>,
  [ChannelType.AUDIO] : <Mic className="mr-2 h-4 w-4"/>,
  [ChannelType.VIDEO] : <Video className="mr-2 h-4 w-4"/>,
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR] : <ShieldCheck className="h-4 w-4 text-indigo-500"/>,
  [MemberRole.ADMIN] : <ShieldAlert className="h-4 w-4 mr-2 text-rose-500"/>
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
    if (!server)
      return   redirect("/")
    return (
        <div className="flex flex-col text-primary w-full 
                dark:bg-[#2B2D31]  bg-[#2F3F5] h-full">
                  {/* Server Side Components */}
            <ServerHeaderFunction
                server={server}
                role={role}
            />      
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                  <ServerSearch
                    data={[
                      {
                        label: "Text Channles",
                        type: "channel",
                        data: textChannels?.map((channel) => ({
                          id: channel.id,
                          name: channel.name,
                          icon: iconMap[channel.type],
                        }))
                      },
                      {
                        label: "Voice Channles",
                        type: "channel",
                        data: audioChannels?.map((channel) => ({
                          id: channel.id,
                          name: channel.name,
                          icon: iconMap[channel.type],
                        }))
                      },
                      {
                        label: "Video Channles",
                        type: "channel",
                        data: videoChannels?.map((channel) => ({
                          id: channel.id,
                          name: channel.name,
                          icon: iconMap[channel.type],
                        }))
                      },
                      {
                        label: "Members",
                        type: "member",
                        data: members?.map((member) => ({
                          id: member.id,
                          name: member.profile.name,
                          icon: roleIconMap[member.role],
                        }))
                      }
                    ]}
                  />
                </div>
                <Separator
                 className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                  {
                    !!textChannels?.length && (
                      <div className="mb-2">
                        <ServerSectionFunction
                          sectionType="channels"
                          channelType={ChannelType.TEXT}
                          role={role}
                          label="Text Channel"
                        />
                        <div className="space-y-[2px]">
                        {
                          textChannels.map((channel) => (
                            <ServerChannel 
                              key={channel.id}
                              channel={channel}
                              role={role}
                              server={server}
                            />
                          ))
                        }
                        </div>
                      </div>
                    )
                  }
                  {
                    !!audioChannels?.length && (
                      <div className="mb-2">
                        <ServerSectionFunction
                          sectionType="channels"
                          channelType={ChannelType.AUDIO}
                          role={role}
                          label="Voice Channel"
                        />
                        <div className="space-y-[2px]">
                        {
                          audioChannels.map((channel) => (
                            <ServerChannel 
                              key={channel.id}
                              channel={channel}
                              role={role}
                              server={server}
                            />
                          ))
                        }
                        </div>
                      </div>
                    )
                  }
                  {
                    !!videoChannels?.length && (
                      <div className="mb-2">
                        <ServerSectionFunction
                          sectionType="channels"
                          channelType={ChannelType.VIDEO}
                          role={role}
                          label="Video Channel"
                        />
                        <div className="space-y-[2px]">
                        {
                          videoChannels.map((channel) => (
                            <ServerChannel 
                              key={channel.id}
                              channel={channel}
                              role={role}
                              server={server}
                            />
                          ))
                        }
                        </div>
                      </div>
                    )
                  }
                  {
                    !!members?.length && (
                      <div className="mb-2">
                        <ServerSectionFunction
                          sectionType="members"
                          role={role}
                          label="Members"
                          server={server}
                        />
                        {
                          members.map((member) => (
                            <ServerMember
                              key={member.id}
                              member={member}
                              server={server}
                            />
                          ))
                        }
                      </div>
                    )
                  }
            </ScrollArea>      
        </div>
    )
}