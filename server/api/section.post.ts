import { Databases } from '~/library/databases/databases';

export default defineEventHandler(async (event) => {
  const { name, level } = await readBody(event);

  const timeline = await Databases.getMostRecentTimeline();
  const count = (await Databases.sectionFirebaseDatabase.countCollectionDocuments()).data;
  await Databases.createOneSection(`S-${count + 1}`, name, level, timeline.data.schoolYear)
});
  