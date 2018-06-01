import axios from 'axios';

// import util from './Util';


// const devUrl = 'http://18.220.197.216/';

const getBaseUrl = () => {
   let baseUrl = window.location.protocol + '//' + window.location.host + '/';
//    if( (window.location.host.indexOf('localhost') !== -1) || (window.location.host.indexOf('192.168') !== -1 ) ) {
//       baseUrl = devUrl;
//    }
   return baseUrl;
};

axios.getBaseUrl= function(){
   return getBaseUrl();
}


axios.setAPIToken = () => {
   axios.defaults.headers.common['authorization'] = '';
}


axios.setAPIVersion = (version) => {
   axios.defaults.headers['api-version'] = version;
}


axios.logout = () => {
   delete axios.defaults.headers.common['authorization'];
//    util.logout();
}


axios.defaults.baseURL = getBaseUrl();
axios.setAPIToken();


axios.interceptors.request.use( 
   (config) => {
      // console.log(config);
      let token = ''; // util.getToken();
      if (!(token && token.length > 0)) {
            delete axios.defaults.headers.common['authorization'];
//             util.removeToken();
      }
      return config;
   }, (error) => {
      console.warn(error);
      return Promise.reject(error);
   }
);

// axios.interceptors.request.eject(myRequestInterceptor);


axios.interceptors.response.use(
   (response) => {
      // console.log(response);
      return response;
   }, (error) => {
      console.warn(error);
      // if there is no authorization force the user to logout.
      if( (error.response && error.response.data) && (error.response.data.detail === "Authentication credentials were not provided.") ) {
         axios.defaults.headers.common['authorization'] = '';
//          util.logout();
      }
      return Promise.reject(error);
   }
);
// axios.interceptors.request.eject(myResponseInterceptor);

axios.setAPIVersion('1.0');

export default axios;

