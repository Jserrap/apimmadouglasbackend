import express from "express";
import lutadorRouter from "./routes/lutador_routes";
import lutaRouter from "./routes/luta_routes";
import cardRouter from "./routes/card_routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import cors from "cors";

const app = express();

// ----------------------
// 🔥 CORS Configuration
// ----------------------
const allowedOrigins = [
  "https://apimmadouglasfrontend-c5736.vercel.app",
  "https://apimmadouglasfrontend-aiem80pt-joaos-projects-3bdc5736.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Additional CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  }
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// -------------------------
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API MMA rodando! Veja a documentação em /api-docs");
});

// Routes
app.use("/api/lutadores", lutadorRouter);
app.use("/api/lutas", lutaRouter);
app.use("/api/cards", cardRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
```

**Also, make sure:**

1. You've deployed this updated code to Onrender
2. Your Onrender backend is actually running (check the logs)
3. You're using the correct backend URL in your frontend (with double `m`)

If it still doesn't work, the issue might be that Onrender needs environment variables set. Go to your Onrender dashboard and add:
```
