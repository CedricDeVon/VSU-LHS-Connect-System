import { Databases } from '~/library/databases/databases';

export default defineEventHandler(async (event) => {
  return {
    advisers: (await Databases.getAllAdvisers()).data
  }
});
  