const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = async (request, response, next) => {
  const token = request.headers.authorization;

  try {
    // Vérifie si le token existe
    if (!token) {
      throw new Error("Aucun token fourni");
    }

    // Vérifie le token avec la clé secrète
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    // Vérifie si le token a expiré
    if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
      throw new Error("Token expiré");
    }

    // Le token est valide, passe à l'étape suivante
    next();
  } catch (error) {
    // Gére les différentes erreurs d'authentification
    if (error.name === "TokenExpiredError") {
      response.status(401).json({ error: "Token expiré" });
    } else {
      response.status(401).json({ error: "Authentification échouée" });
    }
  }
};
