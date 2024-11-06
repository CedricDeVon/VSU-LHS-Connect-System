export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('test middleware');
    
    const data = await $fetch('/api/test', {
        method: 'POST'
    });
    
    // console.log(data);
    // try {
    //     window.localStorage!.setItem('userAuth', JSON.stringify(data))
    //     console.log(JSON.parse(window.localStorage!.getItem('userAuth')!));
    //     window.localStorage.removeItem('userAuth')
    //     console.log(window.localStorage!.getItem('userAuth'));
    //     console.log(window.localStorage);
        
    // } catch (error: any) {

    // }
    
    // if (window.localStorage.getItem('userAuth') === undefined) {
    //     window.localStorage.setItem('userAuth', JSON.stringify(data));  
    // }  
  });
  