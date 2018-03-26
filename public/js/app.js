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
        return interval + ' ' + 'years';
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + ' ' + 'months';
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return interval + ' ' + (interval === 1 ? 'day' : 'days');
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return interval + ' ' + (interval === 1 ? 'hour' : 'hours');
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return interval + ' ' + (interval === 1 ? 'minute' : 'minutes');
      }
      return Math.floor(seconds) + ' ' + 'seconds';
    },
    tweetSourceLink: function() {
      return 'https://twitter.com/' +
        this.data.user.screen_name +
        '/status/' +
        this.data.id_str;
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
        '<a target="_blank" :href="tweetSourceLink">' +
          '{{ dateFromNow }} ago' +
        '</a>' +
      '</div>' +
      '<div class="tweet-content">' +
        '{{ parseURLs(data.text) }}' +
        '<div v-if="data.extended_entities && data.extended_entities.media">' +
          '<div v-for="(media, idx) in data.extended_entities.media">' +
            '<img v-if="media.type === \'photo\'" class="tweet-image" :class="{ \'tweet-image-multiple\': idx >= 1 }" :src="media.media_url_https" />' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
});

new Vue({
  el: '#app',
  data: {

    // You can change this URL to your own localhost server.
    apiService: {
      name: 'Node.js Server',
      url: 'https://mlh-localhost-sample-node.herokuapp.com'
      // url: 'http://localhost:3001'
    },

    tweets: [],

    loadingTweets: false,
    nextTweetsPageQuery: '',
    hasMoreTweets: true
  },
  created: function() {
    // Load Tweets as soon as the app starts up.
    this.loadTweets();
  },
  methods: {
    loadTweets: function() {
      // GET request from thrid-party API

      var self = this;
      self.loadingTweets = true;

      axios({
        method:'get',
        url: this.apiService.url + '/tweets',
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

          var nextQuery = response.data.search_metadata.next_results;
          if (nextQuery) {
            self.nextTweetsPageQuery = nextQuery;
          } else {
            self.nextTweetsPageQuery = '';
            self.hasMoreTweets = false;
          }

          self.loadingTweets = false;
        })
        .catch(function() {
          self.loadingTweets = false;
        });
    }
  }
});
