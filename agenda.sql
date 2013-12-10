SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


-- -----------------------------------------------------
-- Table `foto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `foto` ;

CREATE  TABLE IF NOT EXISTS `foto` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `nome_arquivo` VARCHAR(100) NOT NULL ,
  `data_hora` DATETIME NULL ,
  `descricao` VARCHAR(100) NULL ,
  `contato_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_foto_contato`
    FOREIGN KEY (`contato_id` )
    REFERENCES `contato` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_foto_contato_idx` ON `foto` (`contato_id` ASC) ;

CREATE INDEX `fk_foto_nome_arquivo_idx` ON `foto` (`nome_arquivo` ASC) ;


-- -----------------------------------------------------
-- Table `contato`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `contato` ;

CREATE  TABLE IF NOT EXISTS `contato` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(200) NOT NULL ,
  `apelido` VARCHAR(50) NULL ,
  `data_nascimento` DATE NULL ,
  `logradouro` VARCHAR(200) NULL ,
  `numero` TINYINT NULL ,
  `bairro` VARCHAR(50) NULL ,
  `cidade` VARCHAR(50) NULL ,
  `estado` VARCHAR(2) NULL ,
  `foto_id` INT UNSIGNED NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_contato_foto`
    FOREIGN KEY (`foto_id` )
    REFERENCES `foto` (`id` )
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_contato_foto_idx` ON `contato` (`foto_id` ASC) ;


-- -----------------------------------------------------
-- Table `categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `categoria` ;

CREATE  TABLE IF NOT EXISTS `categoria` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(50) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telefone`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `telefone` ;

CREATE  TABLE IF NOT EXISTS `telefone` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `numero` VARCHAR(15) NOT NULL ,
  `contato_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_telefone_contato`
    FOREIGN KEY (`contato_id` )
    REFERENCES `contato` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_telefone_contato_idx` ON `telefone` (`contato_id` ASC) ;


-- -----------------------------------------------------
-- Table `email`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `email` ;

CREATE  TABLE IF NOT EXISTS `email` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `endereco` VARCHAR(100) NOT NULL ,
  `contato_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_email_contato`
    FOREIGN KEY (`contato_id` )
    REFERENCES `contato` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_email_contato_idx` ON `email` (`contato_id` ASC) ;


-- -----------------------------------------------------
-- Table `contato_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `contato_categoria` ;

CREATE  TABLE IF NOT EXISTS `contato_categoria` (
  `contato_id` INT UNSIGNED NOT NULL ,
  `categoria_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`categoria_id`, `contato_id`) ,
  CONSTRAINT `fk_contato_categoria_contato`
    FOREIGN KEY (`contato_id` )
    REFERENCES `contato` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_contato_categoria_categoria`
    FOREIGN KEY (`categoria_id` )
    REFERENCES `categoria` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_contato_categoria_categoria_idx` ON `contato_categoria` (`categoria_id` ASC) ;

CREATE INDEX `fk_contato_categoria_contato_idx` ON `contato_categoria` (`contato_id` ASC) ;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
