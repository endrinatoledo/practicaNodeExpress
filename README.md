

Paso 1. npm i
Paso 2. crear la base de datos ver archivo config/config.json
Paso 3. ejecutar sequelize db:migrate
Paso 4. ejecutar insert de pruebas

INSERT INTO `prueba1`.`users` (`email`, `first_name`, `last_name`, `avatar`) VALUES ('endrx12@gmail.com', 'Endrina', 'Toledo', 'https://reqres.in/img/faces/2-image.jpg');
INSERT INTO `prueba1`.`users` (`email`, `first_name`, `last_name`, `avatar`) VALUES ('cperez@gmail.com', 'Carlos', 'Perez', 'https://reqres.in/img/faces/4-image.jpg');

Paso 5. npm start