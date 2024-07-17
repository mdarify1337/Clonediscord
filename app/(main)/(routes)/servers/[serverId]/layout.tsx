import { RedirectToSignIn } from "@clerk/nextjs"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ServerSideBarFunction from "@/components/server/server-sidebar";
import {v4 as uuidv4} from "uuid";
import { ChannelType, MemberRole } from "@prisma/client";
// import { channel } from "diagnostics_channel";

export default async function ServerIdLayoutFunction(
    {children,
        params,
    } : 
    {children: React.ReactNode;
     params: {serverId: string}
    }){
    const profile = await currentProfile();
    if (!profile)
        return <RedirectToSignIn />;
    const server = await db.server.findUnique({
        where : {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
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
    if (!servers)
        return redirect("/");
    // console.log(servers)
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 
                z-20 flex-col fixed inset-y-0 font-bold">
                <ServerSideBarFunction serverId={params.serverId} />
                {/* Server Side Components */}
                {/* {
                    servers.map((server)=> (
                        <div key={server.id} className='mb-4'>
                            <p>{server.name}</p>
                            {
                                server.channels.map((chan) =>(
                                    <>
                                        <p>{chan.name}</p>
                                        <ul>
                                            {chan.name} + ' ' {chan.id}
                                            <br />
                                            {chan.serverId}
                                            
                                        </ul>
                                    </>
                                ))
                            }
                        </div>
                    ))
                } */}
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    )
}

