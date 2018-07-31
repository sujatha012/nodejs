# nodejs

# Create Tables

CREATE TABLE `departments` (
  `Department_id` int(11) NOT NULL,
  `Department_name` varchar(45) DEFAULT NULL,
  `overhead_costs` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*
-- Query: SELECT * FROM bamazon.departments
LIMIT 0, 2000

-- Date: 2018-07-31 17:11
*/
INSERT INTO `departments` (`Department_id`,`Department_name`,`overhead_costs`) VALUES (1,'Electronics','10000');
INSERT INTO `departments` (`Department_id`,`Department_name`,`overhead_costs`) VALUES (2,'Furniture','5000');
INSERT INTO `departments` (`Department_id`,`Department_name`,`overhead_costs`) VALUES (3,'Stationary','2000');



CREATE TABLE `products` (
  `Item_id` int(11) NOT NULL,
  `Product_name` varchar(45) DEFAULT NULL,
  `Department_name` varchar(45) DEFAULT NULL,
  `Price` int(10) DEFAULT NULL,
  `Stock_quantity` int(10) DEFAULT NULL,
  `product_sales` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



/*
-- Query: SELECT * FROM bamazon.products
LIMIT 0, 2000

-- Date: 2018-07-31 17:11
*/
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (1,'Books','Stationary',600,1000,NULL);
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (2,'Three seater couch','Furniture',500,800,NULL);
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (3,'Chair','Furniture',600,92,NULL);
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (4,'Note Books','Stationary',500,650,NULL);
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (5,'Dining Table','Furniture',600,100,NULL);
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (6,'Markers','Stationary',100,991,'400');
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (7,'Chair','Furniture',700,90,NULL);
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (8,'Desktop','Electronics',2000,500,'200000');
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (9,'Keypad','Electronics',600,890,'6000');
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (10,'Laptop','Electronics',1000,90,NULL);
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (15,'iPad','Electronics',200,10,'1000');
INSERT INTO `products` (`Item_id`,`Product_name`,`Department_name`,`Price`,`Stock_quantity`,`product_sales`) VALUES (16,'sofa','Furniture',200,3,NULL);
