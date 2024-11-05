import jwt from 'jsonwebtoken';
import { Databases } from '~/library/databases/databases';

export default defineEventHandler(async (event) => {
  console.log("TEST POST");

  // console.log(`Student Count: ${().data}`);
  return {
    studentsCount: await Databases.getAllStudentsCount(),
    pendingAdvisersCount: await Databases.getAllPendingAdvisersCount(),
    reportsCount: await Databases.getAllAdminReportsCount('38gI8dbhyXEjNGeXWd0Q'),
  };

  
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
