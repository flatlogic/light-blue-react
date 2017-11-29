/* eslint-disable max-len */

module.exports = {
  // Node.js app
  port: process.env.PORT || 8080,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  defaultMeta: {
    title: 'Light Blue v3.9.0 built with React by Flatlogic',
    description: 'Light Blue v3.9.0 built with React, Redux and React Router by Flatlogic',
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Dashboard' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '000000000000000',
      secret: process.env.FACEBOOK_APP_SECRET || '000000000000000',
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '000000000000000',
      secret: process.env.GOOGLE_CLIENT_SECRET || '000000000000000',
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || '000000000000000',
      secret: process.env.TWITTER_CONSUMER_SECRET || '000000000000000',
    },
  },
};
