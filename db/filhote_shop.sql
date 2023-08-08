-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema filhote_shop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema filhote_shop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `filhote_shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `filhote_shop` ;

-- -----------------------------------------------------
-- Table `filhote_shop`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `filhote_shop`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `pais` VARCHAR(50) NULL DEFAULT NULL,
  `provincia` VARCHAR(50) NULL DEFAULT NULL,
  `genero` ENUM('FEMENINO', 'MASCULINO', 'OTRO') NULL DEFAULT NULL,
  `nacimiento` DATE NULL DEFAULT NULL,
  `telefono` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `filhote_shop`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `filhote_shop`.`categorias` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre_categoria` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `filhote_shop`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `filhote_shop`.`productos` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(100) NOT NULL,
  `detalle_producto` VARCHAR(900) NULL DEFAULT NULL,
  `precio_producto` DECIMAL(10,2) NULL DEFAULT NULL,
  `stock_producto` INT NULL DEFAULT NULL,
  `url_imagen_producto` VARCHAR(200) NULL DEFAULT NULL,
  `id_categoria` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  INDEX `id_categoria` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `productos_ibfk_1`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `filhote_shop`.`categorias` (`id_categoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `filhote_shop`.`carrito_compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `filhote_shop`.`carrito_compras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `nombre_producto` VARCHAR(100) NOT NULL,
  `precio_producto` DECIMAL(10,2) NOT NULL,
  `url_imagen_producto` VARCHAR(200) NULL DEFAULT NULL,
  `stock_producto` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_usuario` (`id_usuario` ASC) VISIBLE,
  INDEX `id_producto` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `carrito_compras_ibfk_1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `filhote_shop`.`usuarios` (`id_usuario`),
  CONSTRAINT `carrito_compras_ibfk_2`
    FOREIGN KEY (`id_producto`)
    REFERENCES `filhote_shop`.`productos` (`id_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `filhote_shop`.`producto_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `filhote_shop`.`producto_categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL DEFAULT NULL,
  `id_categoria` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_producto` (`id_producto` ASC) VISIBLE,
  INDEX `id_categoria` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `producto_categoria_ibfk_1`
    FOREIGN KEY (`id_producto`)
    REFERENCES `filhote_shop`.`productos` (`id_producto`),
  CONSTRAINT `producto_categoria_ibfk_2`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `filhote_shop`.`categorias` (`id_categoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

 Query: SELECT * FROM filhoteshop_db.productos
LIMIT 0, 1000

-- Date: 2023-08-07 23:54
*/
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (1,'Correa Larga para Perros','Correa de 5 metros para perros, con enganche seguro, reforzada. Varios colores.',1500,500,'https://i.ibb.co/wzDgwsY/correa-Perro.jpg',1,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (2,'Alimento Balanceado para Gatos 7.5kg','Bolsa de Alimento balanceado de 7.5 kg para gatos adultos castrados. Sabor pescado',12000,40,'https://i.ibb.co/VwRzYfZ/balanceado-Gato.jpg',2,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (3,'Cepillo Autolimpiante Macostas Perros Gatos','Peine/Cardina autolimpiante con cerdas de acero inoxidable y mango ergonómico. Elimina enredos, suciedad y pelo suelto',2500,100,'https://i.ibb.co/nsmfXvH/cepillo-cardina.jpg',2,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (4,'Jaula para roedores N2','Casita ideal para tu roedor, de un nivel, con bebedor automático y desmontable para facil limpieza',11800,500,'https://i.ibb.co/M8hM024/jaula-roedor.jpg',3,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (5,'Cucha Moises para Perros','Cucha/Moises para perros de diversos tamaños. Confeccionado con materiales premium, tela antidesgarro, resistente, con cierre para un facil lavado. Varios colores.',10000,30,'https://i.ibb.co/gDKN6t1/moises-Perro.jpg',1,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (6,'Pecera','Tamaño pequeño, para Beta',3000,150,'https://i.ibb.co/LPZvNGV/pecera.jpg',3,'2023-07-24 16:42:57','2023-07-24 16:42:57');
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (7,'Alimento Humedo para Gatos en Lata','Sabor Merluza, 340 gramos, gatos Adultos',800,20,'https://i.ibb.co/rdzqtfp/pate-Gato.jpg',2,'2023-07-24 16:42:57','2023-07-24 16:42:57');
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (8,'Comedero para perros, come lento','Comedero come-lento para perros, tamaño mediano, varios colores',1300,100,'https://i.ibb.co/mNhczK0/comelento-Perro.jpg',1,'2023-07-24 16:42:57','2023-07-24 16:42:57');
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (9,'Alimento Balanceado para Perros 18kg','Balanceado para perros adultos. Marca Caudillo, Sabor carne y pollo, 18 kg.',15000,30,'https://i.ibb.co/1JRghmr/balanceado-Perro.png',1,'2023-07-24 16:42:57','2023-07-24 16:42:57');
INSERT INTO `` (`id`,`nombre_producto`,`detalle_producto`,`precio_producto`,`stock_producto`,`url_imagen_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (10,'Alimento en escamas para peces 150gr','Marca Shulet, 150 gramos',600,100,'https://i.ibb.co/KXTHfdv/comida-Peces.png',3,'2023-07-24 16:42:57','2023-07-24 16:42:57');

/*
-- Query: SELECT * FROM filhoteshop_db.producto_categoria
LIMIT 0, 1000

-- Date: 2023-08-08 09:40
*/
INSERT INTO `` (`id`,`id_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (1,1,1,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`id_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (2,2,2,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`id_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (3,3,1,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`id_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (4,3,2,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`id_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (5,4,3,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`id_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (6,5,1,'2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`id_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (7,6,3,'2023-07-24 18:46:03','2023-07-24 18:46:03');
INSERT INTO `` (`id`,`id_producto`,`id_categoria`,`createdAt`,`updatedAt`) VALUES (8,7,2,'2023-07-24 18:46:03','2023-07-24 18:46:03');

/*
-- Query: SELECT * FROM filhoteshop_db.usuarios
LIMIT 0, 1000

-- Date: 2023-08-08 09:41
*/
INSERT INTO `` (`id`,`nombre_completo`,`username`,`password`,`email`,`direccion`,`provincia`,`pais`,`nacimiento`,`telefono`,`rol`,`createdAt`,`updatedAt`) VALUES (1,'Admin','Admin','$2b$10$0zCyfC.hPfTMh6MXtw2Mm.OrLOegzqz6.DZQ6Ya3Q9ZlU8Zbnj5/i','admin@admin.com','colon 210','CORDOBA','Argentina','2000-01-01 00:00:00','0123456789','admin','2023-07-25 18:41:38','2023-07-25 18:41:38');
INSERT INTO `` (`id`,`nombre_completo`,`username`,`password`,`email`,`direccion`,`provincia`,`pais`,`nacimiento`,`telefono`,`rol`,`createdAt`,`updatedAt`) VALUES (2,'gimena distefano','gime88','$2b$10$fb5KBYlQJCIwxUE/U/1sKexWLzgJVD4txcAS2qKHXq7Ooi9yoXGcy','gimed@mail.com','cordoba 25','CORDOBA','ARGENTINA','1988-06-16 00:00:00','0000000000','customer','2023-07-25 18:45:31','2023-08-08 01:43:46');


/*
-- Query: SELECT * FROM filhoteshop_db.categorias
LIMIT 0, 1000

-- Date: 2023-08-08 09:40
*/
INSERT INTO `` (`id`,`nombre_categoria`,`createdAt`,`updatedAt`) VALUES (1,'PERROS','2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`nombre_categoria`,`createdAt`,`updatedAt`) VALUES (2,'GATOS','2023-07-19 01:13:05','2023-07-19 01:13:05');
INSERT INTO `` (`id`,`nombre_categoria`,`createdAt`,`updatedAt`) VALUES (3,'EXOTICOS','2023-07-19 01:13:05','2023-07-19 01:13:05');
