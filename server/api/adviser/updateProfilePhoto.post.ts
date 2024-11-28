import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import type { IFile } from '~/library/files/iFile';
import { ParsedFile } from '~/library/files/parsedFile';

export default defineEventHandler(async (event) => {
  try {
    const { userId, file } = await readBody<{ userId: string, file: IFile[] }>(event);
    
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    await Databases.userIconsFirebaseStorage.writeFileWithName(adviser.id, new ParsedFile(file[0]));
    await Databases.updateOneAdviserViaId(adviser.id, {
      profilePicture: adviser.id
    });
    const image = (await Databases.userIconsFirebaseStorage.readFileLink(adviser.id)).data;
    return new SuccessfulResult(image).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
