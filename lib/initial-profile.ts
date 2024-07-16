import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";
import { db } from "./db";

export const initialProfile = async () => {
  console.log("Database URL: ==> \n", process.env.DATABASE_URL); 
  const user = await currentUser();
  if (!user) {
    await redirectToSignIn();
    return null; // Explicitly return null after redirect
    // return <RedirectToSignIn />;
  }

  const profile = await db.profile.findUnique({
    where: { userID: user.id },
  });

  if (profile) return profile;

  const newProfile = await db.profile.create({
    data: {
      userID: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl || '',
      email: user.emailAddresses[0].emailAddress,
    },
  });
  
  return newProfile;
};
