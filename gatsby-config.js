require("dotenv").config()

module.exports = {
  siteMetadata: {
    siteTitle: `DERRY`,
    author: `@sowasred1`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `limelight`,
          `Dawning of a New Day`,
          `Poppins`,
          `Raleway`,
          `Zeyada`,
          `Arapey`,
          `Noto Serif`,
          `Yantramanav`,
        ],
        display: "swap",
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-graphql-loader`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `blogposts`,
    //     path: `${__dirname}/src/blogposts`,
    //   },
    // },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000, // Default to 100
        contentTypes: [
          `user`,
          "product",
          "category",
          "footer-company-pages",
          "footer-help-pages",
          "menu-other-pages",
          "footer-company-pages",
          "brand",
          "blog",
        ],
        // If using single types place them in this array.
        singleTypes: [`home-page`],
        // // Possibility to login with a strapi user, when content types are not publically available (optional).
        loginData: {
          identifier: "manager",
          password: process.env.STRAPI_PSSWD,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Leather Jacket Store`,
        short_name: `Leather Jacket`,
        start_url: `/`,
        background_color: `black`,
        theme_color: `black`,
        display: `minimal-ui`,
        icon: `src/images/jacket.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: "./src/state/createStore",
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: "__PRELOADED_STATE__",
      },
    },
  ],
}
