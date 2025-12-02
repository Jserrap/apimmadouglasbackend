import express from "express";
import lutadorRouter from "./routes/lutador_routes.js";
import lutaRouter from "./routes/luta_routes.js";
import cardRouter from "./routes/card_routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import cors from "cors";

const app = express();

// --------------------------------------------------------------------
// CORS — Corrigido e aceitando qualquer deploy do Vercel
// --------------------------------------------------------------------
const LOCAL_WHITELIST = [
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite chamadas sem origin (Postman, Insomnia, Curl)
      if (!origin) return callback(null, true);

      // Aceita qualquer deployment Vercel do seu projeto
      if (origin.startsWith("https://apimmadouglasfrontend")) {
        return callback(null, true);
      }

      // Origens locais fixas
      if (LOCAL_WHITELIST.includes(origin)) {
        return callback(null, true);
      }

      // Caso contrário: bloqueia
      return callback(
        new Error(`Origin bloqueado pelo CORS: ${origin}`),
        false
      );
    },

    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

// Habilita preflight OPTIONS para todas rotas
app.options("*", cors());

// Log opcional de CORS
app.use((req, res, next) => {
  console.log(
    `[CORS DEBUG] Method=${req.method} Origin=${req.get("Origin")}`
  );
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
