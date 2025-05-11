const config = {
  development: {
    apiBaseUrl: "http://localhost:8000",
  },
  production: {
    apiBaseUrl: "https://myserver-xy36.onrender.com", // Render URL for production
  },
  "github-pages": {
    apiBaseUrl: "https://myserver-xy36.onrender.com", // Same as production for GitHub Pages
  },
};

// Detect GitHub Pages environment
const isGitHubPages = window.location.hostname.includes("github.io");
const environment = isGitHubPages
  ? "github-pages"
  : process.env.NODE_ENV || "development";

console.log("API Environment:", environment);
console.log("API Base URL:", config[environment].apiBaseUrl);

export default config[environment];
