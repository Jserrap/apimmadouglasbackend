import express, { Request, Response, NextFunction } from "express";
import lutadorRouter from "./routes/lutador_routes";
import lutaRouter from "./routes/luta_routes";
import cardRouter from "./routes/card_routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import cors, { CorsOptions } from "cors";

const app = express();

// --------------------------------------------------------------------
// CORS — whitelist estável para aceitar múltiplos origins (Vercel/localhost)
// --------------------------------------------------------------------
const FRONT_ORIGINS: string[] = [
  "https://apimmadouglasfrontend-c5736.vercel.app/",
  "https://apimmadouglasfrontend-a1em8bpf-joaos-projects-3bdc5736.vercel.app/",
  "http://localhost:5173/",
  "http://localhost:3000/"
];

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Permite requests sem origin (ex: curl, Postman, algumas integrações)
    if (!origin) {
      return callback(null, true);
    }

    if (FRONT_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin bloqueado pelo CORS: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Log opcional para debug de CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log([CORS DEBUG] Method=${req.method} Origin=${req.get("Origin")});
  next();
});

app.use(express.json());

// Rotas
app.get("/", (req: Request, res: Response) => {
  res.send("API MMA rodando! Veja a documentação em /api-docs");
});

app.use("/api/lutadores", lutadorRouter);
app.use("/api/lutas", lutaRouter);
app.use("/api/cards", cardRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
