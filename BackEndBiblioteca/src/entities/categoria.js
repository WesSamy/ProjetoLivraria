import { EntitySchema } from "typeorm";

const categoria = new EntitySchema({
    name: "Categoria",
    tableName: "categoria",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        nome_categoria: {type: "varchar", length: 45, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () =>
        "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default categoria;