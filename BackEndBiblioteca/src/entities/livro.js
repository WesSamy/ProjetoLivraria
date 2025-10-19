import { EntitySchema } from "typeorm";

const livro = new EntitySchema({
    name: "Livro",
    tableName: "livro",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        nome_livro: {type: "varchar", length: 45, nullable: false},
        publicacao: {type: "date", nullable: false},
        paginas: {type: "int", nullable: false},
        preco: {type: "decimal", precision: 6, scale: 2, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    },
    relations: {
        categoria: {type: "many-to-one", target: "Categoria", nullable: false},
        editora: {type: "many-to-one", target: "Editora", nullable: false}
    },
});

export default livro;