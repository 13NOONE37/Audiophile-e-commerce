module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      accessToken: process.env.NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN,
    },
    sites: [
      {
        name: "audiophile-eco",
        id: "9560f2f9-2e55-4205-b28c-fed874477078",
        buildHook: process.env.NETLIFY_BUILD_HOOK,
        branch: "main",
      },
    ],
  },
});
