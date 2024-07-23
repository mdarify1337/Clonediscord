import  {initialProfile} from '@/lib/initial-profile'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { InitialModal } from '@/components/modals/initial-modal';


const SetupPage = async () => {
  const profile = await initialProfile();
  
  if (!profile) {
    return (
      <div>
        Error: Profile not found.
      </div>
    );
  }
  console.log("profile : ==> \n", profile);

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.userID
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  console.log("server : ==> ",server);

  return <InitialModal/>
  // return <p></p>

}

export default SetupPage;