import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import type { IFile } from '~/library/files/iFile';
import { ParsedFile } from '~/library/files/parsedFile';

export default defineEventHandler(async (event) => {
  try {
    const { userId, file } = await readBody<{ userId: string, file: IFile[] }>(event);
    
    const admin = (await Databases.getOneAdminViaUserId(userId)).data;
    await Databases.userIconsFirebaseStorage.writeFileWithName(admin.id, new ParsedFile(file[0]));
    await Databases.updateOneUserViaId(admin.id, {
      profilePicture: admin.id
    });
    const image = (await Databases.userIconsFirebaseStorage.readFileLink(admin.id)).data;
    return new SuccessfulResult(image).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
