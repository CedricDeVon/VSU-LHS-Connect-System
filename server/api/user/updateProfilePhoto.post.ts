import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId, profilePictureFile, profilePictureName } = await readBody(event);

    await Databases.userIconsFirebaseStorage.writeFile(profilePictureFile);
    await Databases.updateOneUserViaId(userId, {
        profilePicture: profilePictureName
    });

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
