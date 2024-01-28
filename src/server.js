const express = require("express");
const cors = require("cors");

const userRoutes = require("./route/UserRoute");
const pictureRoutes = require("./route/PictureRoute");

const connectToDatabase = require("./config/database");
connectToDatabase();

const app = express();

const corsOptions = {
  origin: "*", // Autorise toutes les origines
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Autorise ces méthodes HTTP
  credentials: true, // Autorise l'envoi de cookies avec les requêtes
  optionsSuccessStatus: 204, // Retourne le statut 204 No Content pour les requêtes OPTIONS
};

app.use(cors(corsOptions));

app.use(express.json());
app.get("/", (req, res, next) => {
  res.json({ message: "ça marche !!" });
});

app.use("/User", userRoutes);
app.use("/Picture", pictureRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
