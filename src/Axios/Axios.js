import axios from 'axios';

import util from '../Util/Util';


// Replace actual server's host url & api url in the place of `realsite.com` & `https://api.realsite.com`
function getBackendUrl(){
   let backendHost;
   const hostname = window && window.location && window.location.hostname;
   
   if(hostname === 'realsite.com') {
     backendHost = 'https://api.realsite.com';
   } else if(hostname === 'staging.realsite.com') {
     backendHost = 'https://staging.api.realsite.com';
   } else if(/^qa/.test(hostname)) {
     backendHost = `https://api.${hostname}`;
   } else if(process && process.env.REACT_APP_BACKEND_HOST) {
     backendHost = process.env.REACT_APP_BACKEND_HOST;
   } else {
      backendHost = window.location.protocol + '//' + window.location.host + '/';
   }
   return backendHost;   
}

axios.baseUrl = getBackendUrl(); //'';

axios.getBaseUrl = function(){
   return getBackendUrl(); //'';
}

axios.setAPIToken = () => {
   axios.defaults.headers.common['authorizSation'] = util.getToken();;
}

axios.setAPIVersion = (version) => {
   axios.defaults.headers['api-version'] = version;
}

axios.logout = () => {
   delete axios.defaults.headers.common['authorization'];
   util.logout();
}

axios.defaults.baseURL = axios.getBaseUrl();
// util.setToken('KUSHALAKUMARREDDYGAJJALA');
axios.setAPIToken();

/*
* Request Interceptor
*/
const myRequestInterceptor = axios.interceptors.request.use( 
   (config) => {
//       console.log(config);
      let token = util.getToken();
      if (!(token && token.length > 0)) {
            delete axios.defaults.headers.common['authorization'];
            util.removeToken();
      }
      return config;
   }, (error) => {
      console.warn(error);
      return Promise.reject(error);
   }
);

axios.ejectRequestInterceptor = () => {
   if(myRequestInterceptor){
      this.interceptors.request.eject(myRequestInterceptor);
   }
}

/*
* Response Interceptor
*/
const myResponseInterceptor = axios.interceptors.response.use(
   (response) => {
      // console.log(response);
      return response;
   }, (error) => {
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.warn(error.response.data);
         console.warn(error.response.status);
         console.warn(error.response.headers);
         // if there is no authorization force the user to logout.
         if( (error.response && error.response.data) && (error.response.data.detail === "Authentication credentials were not provided.") ) {
               axios.logout();
         }
      } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
         // http.ClientRequest in node.js
         console.warn(error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.warn('Error', error.message);
      }
      console.warn(error.config);
      return Promise.reject(error);
   }
);

axios.ejectResponseInterceptor = () => {
   if(myResponseInterceptor){
      this.interceptors.response.eject(myResponseInterceptor);
   }
}

axios.setAPIVersion('1.0');

export default axios;

