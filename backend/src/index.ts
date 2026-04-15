import "dotenv/config";
import app from "./app";
import { env } from "./config/env";

const PORT = env.SERVER_PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${env.NODE_ENV ?? "development"}`);
});

export default app;
