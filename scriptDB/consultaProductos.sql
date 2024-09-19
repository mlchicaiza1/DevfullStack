USE test;
SELECT * FROM products;

SELECT * FROM products WHERE price > 100 AND stock > 0;

/*	
	Para optimizar la consulta se agrega los indices para las columnas  price y stock.
	Esto ayuda a reducir el número de registros que se tienen que examinar.
    Se filtra directamente los valores (price) mayores a 100 y el stock que es mayor a 0
*/
CREATE INDEX idx_price_stock ON products (price, stock);


/*
	Es mejor especificar solo las columnas necesarias
*/
SELECT id, name, price, stock FROM products WHERE price > 100 AND stock > 0;

/*
	LIMIT para limitar la cantidad de datos, 
    mejora el tiempo de respuesta cuando no se necesita todo el conjunto de datos.
    Util para la implemnetacion de paginación 
*/
SELECT id, name, price, stock FROM products WHERE price > 100 AND stock > 0 LIMIT 100;
