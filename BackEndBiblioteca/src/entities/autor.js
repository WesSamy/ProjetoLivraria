import { EntitySchema } from "typeorm";

const autor = new EntitySchema({
    name: "Autor",
    tableName: "autor",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        nome_autor: {type: "varchar", length: 50, nullable: false},
        data_nascimento: {type: "date", nullable: false},
        nacionalidade: {type: "varchar", length: 50, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default autor;