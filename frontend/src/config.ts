interface ConfigInterface {
  url: string;
}

const config: ConfigInterface = { url: "http://localhost:3001" };

if (process.env.NODE_ENV == "production") {
  config.url = window.location.origin;
}

export default config;
