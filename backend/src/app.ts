import express from "express";
import lutadorRouter from "./routes/lutador_routes";
import lutaRouter from "./routes/luta_routes";
import cardRouter from "./routes/card_routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import cors from "cors";

const app = express();

// --------------------------------------------------------------------
// CORS — whitelist estável para aceitar todos os domínios do frontend
// --------------------------------------------------------------------
const FRONT_ORIGINS = [
  "https://apimmadouglasfrontend-c5736.vercel.app/",
  "https://apimmadouglasfrontend-a1em8bpf-joaos-projects-3bdc5736.vercel.app/",
  "http://localhost:5173/",
  "http://localhost:3000/"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (ex: Postman, curl)
      if (!origin) return callback(null, true);

      if (FRONT_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(Origin bloqueado pelo CORS: ${origin})
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 204,
  })
);

// Log opcional para debug de CORS
app.use((req, res, next) => {
  console.log([CORS DEBUG] Method=${req.method} Origin=${req.get("Origin")});
  next();
});

// --------------------------------------------------------------------
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
  res.send("API MMA rodando! Veja a documentação em /api-docs");
});

app.use("/api/lutadores", lutadorRouter);
app.use("/api/lutas", lutaRouter);
app.use("/api/cards", cardRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
