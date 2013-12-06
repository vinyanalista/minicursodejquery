SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `agenda` ;
CREATE SCHEMA IF NOT EXISTS `agenda` DEFAULT CHARACTER SET latin1 ;
USE `agenda` ;

-- -----------------------------------------------------
-- Table `agenda`.`contato`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`contato` ;

CREATE  TABLE IF NOT EXISTS `agenda`.`contato` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(200) NOT NULL ,
  `apelido` VARCHAR(50) NULL ,
  `data_nascimento` DATE NULL ,
  `logradouro` VARCHAR(200) NULL ,
  `bairro` VARCHAR(50) NULL ,
  `cidade` VARCHAR(50) NULL ,
  `estado` VARCHAR(2) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agenda`.`categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`categoria` ;

CREATE  TABLE IF NOT EXISTS `agenda`.`categoria` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(50) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agenda`.`telefone`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`telefone` ;

CREATE  TABLE IF NOT EXISTS `agenda`.`telefone` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `numero` VARCHAR(11) NOT NULL ,
  `contato_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_telefone_contato`
    FOREIGN KEY (`contato_id` )
    REFERENCES `agenda`.`contato` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_telefone_contato_idx` ON `agenda`.`telefone` (`contato_id` ASC) ;


-- -----------------------------------------------------
-- Table `agenda`.`email`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`email` ;

CREATE  TABLE IF NOT EXISTS `agenda`.`email` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `endereco` VARCHAR(100) NOT NULL ,
  `contato_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_email_contato1`
    FOREIGN KEY (`contato_id` )
    REFERENCES `agenda`.`contato` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_email_contato1_idx` ON `agenda`.`email` (`contato_id` ASC) ;


-- -----------------------------------------------------
-- Table `agenda`.`foto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`foto` ;

CREATE  TABLE IF NOT EXISTS `agenda`.`foto` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `data_hora` DATETIME NULL ,
  `descricao` VARCHAR(100) NULL ,
  `contato_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `fk_foto_contato1`
    FOREIGN KEY (`contato_id` )
    REFERENCES `agenda`.`contato` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_foto_contato1_idx` ON `agenda`.`foto` (`contato_id` ASC) ;


-- -----------------------------------------------------
-- Table `agenda`.`contato_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `agenda`.`contato_categoria` ;

CREATE  TABLE IF NOT EXISTS `agenda`.`contato_categoria` (
  `contato_id` INT UNSIGNED NOT NULL ,
  `categoria_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`categoria_id`, `contato_id`) ,
  CONSTRAINT `fk_contato_has_categoria_contato1`
    FOREIGN KEY (`contato_id` )
    REFERENCES `agenda`.`contato` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contato_has_categoria_categoria1`
    FOREIGN KEY (`categoria_id` )
    REFERENCES `agenda`.`categoria` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_contato_has_categoria_categoria1_idx` ON `agenda`.`contato_categoria` (`categoria_id` ASC) ;

CREATE INDEX `fk_contato_has_categoria_contato1_idx` ON `agenda`.`contato_categoria` (`contato_id` ASC) ;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
