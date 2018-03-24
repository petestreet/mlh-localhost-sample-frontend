/*

This file holds our custom Vue code.
Feel free to expand on it: add more components,
methods, and computed properties. We can also
make use of a client-side router, flux data store,
and other whiz-bang features.

Check out the guide here: https://vuejs.org/v2/guide/

*/

Vue.component('tweet', {
  props: {
    data: Object,
  },
  computed: {
    dateFromNow: function() {
      // Source for this function:
      // https://stackoverflow.com/a/3177838/2865122
      var seconds = Math.floor((new Date() - Date.parse(this.data.created_at)) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + ' years';
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + ' months';
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return interval + ' ' + (interval === 1 ? 'day' : 'days');
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + ' hours';
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + ' minutes';
      }
      return Math.floor(seconds) + ' seconds';
    }
  },
  methods: {
    parseURLs: function(text) {
      // Left as an exercise. Look at the Tweet data format:
      // data.entities.urls
      return text;
    }
  },
  template:
    '<div class="tweet">' +
    '<div class="tweet-time-ago">' +
    '{{ dateFromNow }} ago' +
    '</div>' +
    '<div class="tweet-content">' +
    '{{ parseURLs(data.text) }}' +
    '</div>' +
    '</div>'
});

new Vue({
  el: '#app',
  data: {
    apiServices: [
      {
        id: 0,
        name: 'Node.js',
        url: 'https://mlh-localhost-sample-node.herokuapp.com',
        selected: true
      },
      {
        id: 1,
        name: 'Rails',
        url: 'railsURL',
        selected: false
      }
      // TODO: local server URLs as well:
      // http://localhost:3001
    ],

    tweets: [],

    loadingTweets: false,
    nextTweetsPageQuery: ''
  },
  created: function() {
    // Load Tweets as soon as the app starts up.
    this.loadTweets();
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
    loadTweets: function() {
      // GET request from thrid-party API

      var self = this;
      self.loadingTweets = true;

      axios({
        method:'get',
        url: this.currentApiService.url + '/tweets',
        params: {
          searchQuery: this.nextTweetsPageQuery
        }
      })
        .then(function(response) {
          var newTweets = response.data.statuses;
          if (newTweets) {
            newTweets.forEach(function(tweet) {
              self.tweets.push(tweet);
            });
          }

          self.nextTweetsPageQuery = response.data.search_metadata.next_results || '';
          self.loadingTweets = false;
        })
        .catch(function() {
          self.loadingTweets = false;
        });
    }
  }
});
