module.exports = class Db1748301368451 {
    name = 'Db1748301368451'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`password\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`typeUser\` enum ('admin', 'comum') NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`livro\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_livro\` varchar(45) NOT NULL, \`publicacao\` date NOT NULL, \`paginas\` int NOT NULL, \`preco\` decimal(6,2) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, \`categoriaId\` int NOT NULL, \`editoraId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`editora\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_editora\` varchar(100) NOT NULL, \`cnpj\` varchar(18) NOT NULL, \`email\` varchar(100) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categoria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_categoria\` varchar(45) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`autorLivro\` (\`autorId\` int NOT NULL, \`livroId\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`autorId\`, \`livroId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`autor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_autor\` varchar(50) NOT NULL, \`data_nascimento\` date NOT NULL, \`nacionalidade\` varchar(50) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`livro\` ADD CONSTRAINT \`FK_71d8ca8f12af61304dee8ed22dc\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`livro\` ADD CONSTRAINT \`FK_d6d849ca4a6ab2c41710cf27372\` FOREIGN KEY (\`editoraId\`) REFERENCES \`editora\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`autorLivro\` ADD CONSTRAINT \`FK_a243e613d8939069fe7109d6118\` FOREIGN KEY (\`autorId\`) REFERENCES \`autor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`autorLivro\` ADD CONSTRAINT \`FK_c418cf5e4de7c815289ac874989\` FOREIGN KEY (\`livroId\`) REFERENCES \`livro\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`autorLivro\` DROP FOREIGN KEY \`FK_c418cf5e4de7c815289ac874989\``);
        await queryRunner.query(`ALTER TABLE \`autorLivro\` DROP FOREIGN KEY \`FK_a243e613d8939069fe7109d6118\``);
        await queryRunner.query(`ALTER TABLE \`livro\` DROP FOREIGN KEY \`FK_d6d849ca4a6ab2c41710cf27372\``);
        await queryRunner.query(`ALTER TABLE \`livro\` DROP FOREIGN KEY \`FK_71d8ca8f12af61304dee8ed22dc\``);
        await queryRunner.query(`DROP TABLE \`autor\``);
        await queryRunner.query(`DROP TABLE \`autorLivro\``);
        await queryRunner.query(`DROP TABLE \`categoria\``);
        await queryRunner.query(`DROP TABLE \`editora\``);
        await queryRunner.query(`DROP TABLE \`livro\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
