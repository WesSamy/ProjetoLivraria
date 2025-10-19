import express from "express";
import userController from "./controllers/userController.js";
import editoraController from "./controllers/editoraController.js";
import categoriaController from "./controllers/categoriaController.js";
import autorController from "./controllers/autorController.js";
import livroController from "./controllers/livroController.js";
import autorlivroController from "./controllers/autorlivroController.js";
import loginController from "./controllers/loginController.js";
import {authenticate} from "./utils/jwt.js";

const routes = express();

routes.use("/user", userController);
routes.use("/categoria", categoriaController);
routes.use("/editora", authenticate, editoraController);
routes.use("/autor", autorController);
routes.use("/livro", livroController);
routes.use("/autorlivro", autorlivroController);
routes.use("/login", loginController);

export default routes;