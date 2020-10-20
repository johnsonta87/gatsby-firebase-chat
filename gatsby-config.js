module.exports = {
  siteMetadata: {
    title: `Gatsby React / Firebase Chat`,
    description: ``,
    author: `@johnsonta87`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyChd0wjsbFU3JVCZSovmyqlCk2tE4fEQ_g",
          authDomain: "react-firebase-chat-5e2eb.firebaseapp.com",
          databaseURL: "https://react-firebase-chat-5e2eb.firebaseio.com",
          projectId: "react-firebase-chat-5e2eb",
          storageBucket: "react-firebase-chat-5e2eb.appspot.com",
          messagingSenderId: "95025648774",
          appId: "1:95025648774:web:5ccbcc535c1a1d6b9fad07"
        }
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
