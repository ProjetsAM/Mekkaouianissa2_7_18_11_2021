// import package http de node
const http = require("http");
// import de l'application
const app = require("./app");
// import de la bdd
const db = require("./models/index");

/* La fonction normalizePort renvoie un port valide, qu'il soit fourni 
sous la forme d'un numéro ou d'une chaîne */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3001"); 
app.set("port", port);

/* La fonction errorHandler recherche les différentes erreurs et les gère
 de manière appropriée. Elle est ensuite enregistrée dans le serveur */
const errorHandler = (error) => { 
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
const server = http.createServer(app); // Création du serveur qui utilise app //

db.sequelize.sync().then(function () {
  server.on("error", errorHandler);
  /* Un écouteur d'évènements est également enregistré, consignant le port 
    ou le canal nommé sur lequel le serveur s'exécute dans la console */
  server.on("listening", () => { 
    const address = server.address();
    const bind =
      typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
  });
  server.listen(port);  // Le serveur écoute le port définit auparavant //
});

