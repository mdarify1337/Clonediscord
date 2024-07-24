import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface ServerIdPageProps {
  params: {
    serverId: string
  }
}


async function ServerIdpage({params} : ServerIdPageProps) {
  const profile = await currentProfile();
  if (!profile)
    return redirectToSignIn();
  const server =await db.server.findUnique({
    where : {
      id: params.serverId,
      members : {
        some: {
          profileId : profile.id,
        }
      }
    },
    include : {
      channels: {
        where : {
          name: "general"
        }, 
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  })
  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== "general")
      return null;
  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
  return (
    <div className='flex flex-col bg-slate-600 w-fit 
        p-2 rounded-lg justify-center items-center  font-bold top-4 absolute'>
            <p>
                Server-Id-Page
            </p>
    </div>
  )
}

export default ServerIdpage