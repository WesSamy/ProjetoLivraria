import { EntitySchema } from "typeorm";

const autorLivro = new EntitySchema({
    name: "AutorLivro",
    tableName: "autorLivro",
    columns: {
        autorId: {primary: true, type: Number, nullable: false},
        livroId: {primary: true, type: Number, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    },
    relations: {
        autor: {type: "many-to-one", target: "Autor", nullable: false},
        livro: {type: "many-to-one", target: "Livro", nullable: false}
    },
});

export default autorLivro;