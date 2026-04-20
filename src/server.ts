import app from "./app.js";
import { envVars } from "./config/env.js";

// Start the server
const bootStrap = async () => {
  try {
    app.listen(envVars.PORT, () => {
      console.log(`Server is running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

bootStrap();
