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
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow no origin (postman, curl, etc), production frontend, localhost, and any Vercel preview deploy
      if (
        ! origin ||
        allowedOrigins.includes(origin) ||
        /^https:\/\/apimmadouglasfrontend.*\. vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// -------------------------
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API MMA rodando!  Veja a documentação em /api-docs");
});

// Routes
app.use("/api/lutadores", lutadorRouter);
app.use("/api/lutas", lutaRouter);
app.use("/api/cards", cardRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
