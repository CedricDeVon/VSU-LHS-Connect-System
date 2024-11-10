import jwt from 'jsonwebtoken';

import { ConfigurationReaders } from '~/library/configurationReaders/configurationReaders';

export default defineEventHandler(async (event) => {
    try {
        const { jsonWebToken } = await readBody(event);
        return {
            ...jwt.verify(jsonWebToken, ConfigurationReaders.nuxtConfigurationReader.CRYPTOGRAPHY_KEY),
            isSuccessful: true
        };

    } catch (error: any) {
        return { isSuccessful: false, error };
    }
})


// const jsonWebToken = await $fetch('/api/jwt/sign', {
//   method: 'POST',
//   body: {
//       id: '1',
//       username: 'a',
//       email: 'a@gmail.com',
//       password: 'password_1234',
//       status: true,
//       type: 'admin'
//   }
// });

// const user = await getCurrentUser();
  // if (user === null) {
  //   return navigateTo("/LoginPage", { replace: true });

  // } else {
    
  // }
  // return navigateTo("/AdminDashboard");

//   const jsonWebToken = window.localStorage!.getItem('userAuth');
//   if (jsonWebToken === null) {
//       console.log('No User Auth');
//       return navigateTo("/LoginPage", { replace: true });
//   }
  
//   const result = await $fetch('/api/jwt/verify', {
//     method: 'POST', body: { jsonWebToken }
//   });
//   if (!result.isSuccessful) {
//       console.log('User Auth Invalid or Expired');
//       return navigateTo("/LoginPage", { replace: true });
//   }
