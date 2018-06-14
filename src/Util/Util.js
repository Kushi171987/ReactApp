
export default {
   storage: localStorage,
   logout: function() {
      this.storage.clear();
   },
   removeToken: function() {
      delete this.storage.token;
   },
   getToken: function() {
      return this.storage.token;
   }, 
   setToken: function(token) {
      this.storage.token = token;
   }
}
