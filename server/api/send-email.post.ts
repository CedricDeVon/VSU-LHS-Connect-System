// import { useRuntimeConfig } from '#app';
import { ConfigurationReaders  } from '../../library/configurationReaders/configurationReaders'
import emailjs from '@emailjs/browser';

export default defineEventHandler(async (event) => {
  // const config = useRuntimeConfig();
  const body = await readBody(event);
  console.log(body)

  const templateParams = {
    from_name: body.from_name,
    to_email: body.to_email,
    message: body.message
  };

  console.log(ConfigurationReaders.nuxtConfigurationReader.EMAIL_SERVICE_ID)
  console.log(ConfigurationReaders.nuxtConfigurationReader.EMAIL_TEMPLATE_ID)
  console.log(templateParams)
  console.log(ConfigurationReaders.nuxtConfigurationReader.EMAIL_PUBLIC_KEY)
            
  // NUXT_PUBLIC_SERVICE_ID=
  // NUXT_PUBLIC_TEMPLATE_ID=
  // NUXT_PUBLIC_PUBLIC_KEY=
  /*try {
    await emailjs.send(
      'service_ed7jrha',
      'template_hlo6o6u',
      templateParams,
      '9z156a6CxQRX8siHq'
    );
    return { success: true, message: 'Email sent successfully!' };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email. Please try again.' };
  }*/
});