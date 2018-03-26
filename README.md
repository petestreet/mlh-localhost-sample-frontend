## MLH Localhost Tweet Scraper

A sample application that gets Tweets from a backend application and displays them on the client.

### Setup

1. Clone this repository to your local machine: 
    
    `git clone git@github.com:petestreet/mlh-localhost-sample-frontend.git`

2. Open the `public` directory:

    `cd public`

3. Run the `index.html` with a local webserver:

    * If you already have Python installed, run `python -m SimpleHTTPServer 3000`
    
    * If you don't have Python, you can run it in two steps via Node:
        
        1. `npm install http-server -g`
        
        2. `http-server -p 3000`
        
    * Note that `3000` is the local port that the server application allows by default.
    
4. Follow the [setup instructions](https://github.com/petestreet/mlh-localhost-sample-node#setup) for running a local backend server.

This is just a static website, and by default it connects to the sample server application that hits the Twitter API.

For more info on the server application, check out its [git repository](https://github.com/petestreet/mlh-localhost-sample-node).

When you run the server locally, you'll have to change the URL that this frontend app connects to so it matches your local instance (hint: look for it in `public/js/app.js`).

### More details

This app uses two third-party libraries: [VueJS](https://vuejs.org/) and [Axios](https://github.com/axios/axios). Since it's relatively simple, we can get away with not having a build process. However, as you start adding more components and packages, you may want to use a more in-depth packaging solution. The [VueJS installation page](https://vuejs.org/v2/guide/installation.html) is a good place to start.

If you look in the `<head>` area of `public/index.html`, you'll see where both packages have been included. If you'd like to use the minified, production version of VueJS, comment out the first CDN link and uncomment the second one.

There are comments throughout the code that explain how the app works. I encourage you to use `public/index.html` as a starting point and work from there.

### Deployment

The [live app](https://mlh-tweet-scraper.firebaseapp.com/) is deployed on [Firebase Hosting](https://firebase.google.com/products/hosting/), which is a free solution that has some added benefits. However, since the frontend is just a collection of static files, you can host it [just about anywhere](https://www.google.com/search?q=static+site+hosting).

### License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/petestreet/mlh-localhost-sample-frontend/blob/master/LICENSE.md) file for details