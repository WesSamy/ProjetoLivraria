import { EntitySchema } from "typeorm";

const editora = new EntitySchema({
    name: "Editora",
    tableName: "editora",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        nome_editora: {type: "varchar", length: 100, nullable: false},
        cnpj: {type: "varchar", length: 18, nullable: false},
        email: {type: "varchar", length: 100, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () =>
        "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default editora;