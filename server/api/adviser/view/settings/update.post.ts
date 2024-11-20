import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId, profilePictureFile, profilePictureName, username } = await readBody(event);

    await Databases.userIconsFirebaseStorage.writeFile(profilePictureFile);
    await Databases.updateOneUserViaId(userId, {
        username,
        profilePicture: profilePictureName
    });
    // await updatePassword(getAuth().currentUser, password);

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
