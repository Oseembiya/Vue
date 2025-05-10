const config = {
  development: {
    apiBaseUrl: "http://localhost:8000",
  },
  production: {
    apiBaseUrl: "https://myserver-xy36.onrender.com", // Updated with the actual Render URL
  },
};

export default config[process.env.NODE_ENV || "development"];
