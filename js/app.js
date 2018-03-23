/*

This file holds our custom Vue code.
Feel free to expand on it: add more components,
methods, and computed properties. We can also
make use of a client-side router, flux data store,
and other whiz-bang features.

Check out the guide here: https://vuejs.org/v2/guide/

*/

new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!',

    apiServices: [
      {
        id: 0,
        name: 'Node.js',
        url: 'nodeURL',
        selected: true
      },
      {
        id: 1,
        name: 'Rails',
        url: 'railsURL',
        selected: false
      }
    ]
  },
  computed: {
    currentApiService: function() {
      return this.apiServices.find(function(service) {
        return service.selected === true;
      });
    }
  },
  methods: {
    switchApiService: function() {
      // This method cycles through our array of API services,
      // so you're free to add your own service in addition to
      // the ones listed above.

      // Get the API service that's currently in use.
      var currentService =
        this.apiServices.find(function(service) {
          return service.selected === true;
        });

      // Find the next service according to the incrementing id field.
      // Loop back to the first one if we're at the end of the array.
      var nextServiceId = (currentService.id + 1) % this.apiServices.length;

      // Select the next service, and deselect the current one.
      var nextService =
        this.apiServices.find(function(service) {
          return service.id === nextServiceId;
        });

      nextService.selected = true;
      currentService.selected = false;
    },
    callAPI: function() {
      // GET request from thrid-party API
      axios({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/posts/1'
      })
        .then(function(response) {
          console.log('response: ', response);
        });
    }
  }
});
