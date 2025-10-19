import express, { request, response } from "express";
import livro from "../entities/livro.js";
import categoria from "../entities/categoria.js";
import editora from "../entities/editora.js";
import { AppDataSource } from "../database/data-source.js";
import { Like, IsNull } from "typeorm";

const route = express.Router();

const repositorioLivro = AppDataSource.getRepository(livro);
const repositorioCategoria = AppDataSource.getRepository(categoria);
const repositorioEditora = AppDataSource.getRepository(editora);

route.get("/", async (request, response) => {
    const livros = await repositorioLivro.findBy({deletedAt: IsNull()});
    return response.status(200).send({"response": livros});   
});

route.get("/:foundNome", async(request, response) => {
    const {foundNome} = request.params;
    const foundLivro = await repositorioLivro.findBy({nome_livro: Like (`%${foundNome}`)});
    return response.status(200).send({"response": foundLivro});
});

route.post("/", async (request, response) => {
    const {nome_livro, publicacao, paginas, preco, id_cat, id_edit} = request.body;

    if(nome_livro.length < 1) {
        return response.status(400).send({"response": "O nome do livro deve ter pelo menos 1 caractere"});
    }

    if(publicacao.length != 8) {
        return response.status(400).send({"response": "A Data deve conter 8 caracteres."});
    }

    if(paginas.length < 1 || paginas.length > 4) {
        return response.status(400).send({"response": "As páginas devem conter ao menos 1 número e menos de 4 números."});
    }

    if(preco.length < 4) {
        return response.status(400).send({"response": "O preço deve conter pelo menos 4 caracteres."});
    }

    try {
        const editora = await repositorioEditora.findOneBy({
            id: id_edit,
            deletedAt: IsNull()
        });
        if(!editora) {
            return response.status(400).send({"response": "Esta editora não foi encontrada."});
        }

        const categoria = await repositorioCategoria.findOneBy({
            id: id_cat,
            deletedAt: IsNull()
        });
        if(!categoria) {
            return response.status(400).send({"response": "Esta categoria não foi encontrada"});
        }

        const novoLivro = repositorioLivro.create({nome_livro, publicacao, paginas, preco, categoria, editora});
        await repositorioLivro.save(novoLivro);
        return response.status(201).send({"response": "Livro cadastrado com sucesso"});
    } catch(err) {
        return response.status(500).send({"response": err});
    }

});

route.put("/:id", async (request, response) => {
    const {nome_livro, publicacao, paginas, preco, id_cat, id_edit} = request.body;
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({"response": "O id deve ser numérico."});
    }

    if(nome_livro.length < 1) {
        return response.status(400).send({"response": "O nome do livro deve ter pelo menos 1 caractere"});
    }

    if(publicacao.length != 8) {
        return response.status(400).send({"response": "A Data deve conter 8 caracteres."});
    }

    if(paginas.length < 1 || paginas.length > 4) {
        return response.status(400).send({"response": "As páginas devem conter ao menos 1 número e menos de 4 números."});
    }

    if(preco.length < 4) {
        return response.status(400).send({"response": "O preço deve conter pelo menos 4 caracteres."});
    }

    try {
        const editora = await repositorioEditora.findOneBy({
            id: id_edit,
            deletedAt: IsNull()
        });
        if(!editora) {
            return response.status(400).send({"response": "Esta editora não foi encontrada."});
        }

        const categoria = await repositorioCategoria.findOneBy({
            id: id_cat,
            deletedAt: IsNull()
        });
        if(!categoria) {
            return response.status(400).send({"response": "Esta categoria não foi encontrada"});
        }

        await repositorioLivro.update({id}, {nome_livro, publicacao, paginas, preco, categoria, editora});
        return response.status(200).send({"response": "Livro atualizado com sucesso."});
    } catch(err) {
        return response.status(500).send({"response": err});
    }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({"response": "O id precisa ser numérico"});
    }

    try {
        await repositorioLivro.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({"response": "Livro deletado com sucesso."});
    } catch(err) {
        return response.status(500).send({"response": err});
    }
});

export default route;