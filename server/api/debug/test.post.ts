import jwt from 'jsonwebtoken';
import { ConfigurationReaders } from '~/library/configurationReaders/configurationReaders';
import { Databases } from '~/library/databases/databases';
import { useFirebaseAuth } from "vuefire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { IFile } from '~/library/files/iFile';

export default defineEventHandler(async (event) => {
  console.log("TEST POST");
  const { files } = await readBody<{ files: IFile[] }>(event);
  console.log(files[0]);
  // const auth = useFirebaseAuth()!;
  // await signInWithEmailAndPassword(auth, 'admin.cs@vsuihs.com', '326_TheWorldIsFlat');
  
  // console.log(ConfigurationReaders.nuxtConfigurationReader.EMAIL_PUBLIC_KEY)
  // console.log(ConfigurationReaders.nuxtConfigurationReader.EMAIL_SERVICE_ID)
  // console.log(ConfigurationReaders.nuxtConfigurationReader.EMAIL_TEMPLATE_ID)

  return true
  // console.log(`Student Count: ${().data}`);
  // return {
  //   a: [await Databases.getAllStudentsCount(),
  //   await Databases.getAllPendingAdvisersCount(),
  //   await Databases.getAllAdminReportsCount('38gI8dbhyXEjNGeXWd0Q'),
  //   await Databases.getAllAdvisers(),
  //   await Databases.getAllUsers(),
  //   await Databases.getAllStudents(),
  //   await Databases.getAllSections(),
  //   await Databases.getMostRecentTimeline()]


  
  // try {
  //   var token = jwt.sign({
  //     data: {
  //       email: 'email@gmail.com',
  //       password: 'userpassword1234',
  //       status: true
  //     },
  //     exp: Math.floor(Date.now() / 1000) + (60 * 60)
  //   }, 'password1234');
  //   // var decoded = jwt.verify(token, 'password1234');
  //   return { token, decoded: undefined }

  // } catch (error: any) {
  //   console.log(error);
  // }


})
