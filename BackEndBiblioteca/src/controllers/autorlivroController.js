import express, { request, response } from "express";
import autor_livro from "../entities/autor_livro.js"
import autor from "../entities/autor.js";
import livro from "../entities/livro.js";
import { AppDataSource } from "../database/data-source.js";
import { Like, IsNull } from "typeorm";

const route = express.Router();

const repositorioAutorLivro = AppDataSource.getRepository(autor_livro);
const repositorioLivro = AppDataSource.getRepository(livro);
const repositorioAutor = AppDataSource.getRepository(autor);

route.get("/", async (request, response) => {
    const autoresLivro = await repositorioAutorLivro.findBy({deletedAt: IsNull()});
    return response.status(200).send({"response": autoresLivro});
});

route.get("/:foundNome", async (request, response) => {
    const {foundNome} = request.params;
    const foundAutorlivro = await repositorioAutorLivro.findBy({idAutor: Like (`%${foundNome}`)});
    return response.status(200).send({"response": foundAutorlivro});
});

route.get("/:foundNome", async (request, response) => {
    const {foundNome} = request.params;
    const foundautorLivro = await repositorioAutorLivro.findBy({idLivro: Like (`%${foundNome}`)});
    return response.status(200).send({"response": foundautorLivro});
});

route.post("/", async (request, response) => {
    const {autorId, livroId} = request.body;

    if(isNaN(autorId)) {
        return response.status(400).send({"response": "O id do autor deve ser numérico."});
    }

    if(isNaN(livroId)) {
        return response.status(400).send({"response": "O id do livro deve ser numérico."});
    }

    try {
        const autor = await repositorioAutor.findOneBy({
            id: autorId,
            deletedAt: IsNull()
        });
        if(!autor) {
            return response.status(400).send({"response": "Este autor não foi encontrado."});
        }

        const livro = await repositorioLivro.findOneBy({
            id: livroId,
            deletedAt: IsNull()
        });
        if(!livro) {
            return response.status(400).send({"response": "Este livro não foi encontrado"});
        }

        const novoAutorLivro = repositorioAutorLivro.create({autor, livro});
        await repositorioAutorLivro.save(novoAutorLivro);
        return response.status(201).send({"response": "Autor do livro cadastrado com sucesso"});
    } catch(err) {
        return response.status(500).send({"response": err});
    }
    
});

route.delete("/", async (request, response) => {
    const {autorId, livroId} = request.query;

    if(isNaN(autorId)) {
        return response.status(400).send({"response": "O id precisa ser numérico"});
    }

    if(isNaN(livroId)) {
        return response.status(400).send({"response": "O id precisa ser numérico"});
    }

    try {
        await repositorioAutorLivro.delete({autorId, livroId});
        return response.status(200).send({"response": "Autor do livro deletado com sucesso."});
    } catch(err) {
        return response.status(500).send({"response": err});
    }
});

export default route;