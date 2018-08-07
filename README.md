## bamazon

#Description
This is a simple node app to run an uncomplicated market system.
It has a preset stock of inventory that is presented to the customer which can then we ordered by the customer. There is no working real world transaction process however it can do some basic math functions to update inventory based off of units purchased and provide a total for multiples of a unit.

#Requirements
Please npm install the following npm packages prior to using this app:

- inquirer (used to present prompts to the user)

- mysql (provides the database)

- terminal-table (presents the appropriate data as a table rather than just console logging line after line.)

A user would also have to run the shema and seeds sql file in their mysql workbench (or other gooey) before running bamazon.js as a node application.

Lastly, bamazon.js comes with some preset values in the mysql connection variable.
The defaults are as listed below:

        var connection = mysql.createConnection({

            host: "127.0.0.1", 

            port: 8889,
        
            user: "root",
        
            password: "root",

            database: "bamazon_db"
            
        });

If you're mysql settings are different, be sure to update them before running the app.

#Future Updates
I would love to add inventory management features (such as the suggested employee and management functionality) as well as ways to calculate tax and multiples unit types in one "transaction." This can all be added in time.

#References

This is how the inventory table should turn out in mysql: ./examples/1_inventory_table_mysql.png

The Welcome and Inventory Table as presented in the terminal:
./examples/2_bamazon_inventory_table

Results when the customer request is for an item with the requested quanitity in stock:
./examples/3_in_stock_results

How the table would look in mysql after the last results went through:
./examples/4_mysql_updated

These are the results for when a request is made that is greater than the current inventory:
5_out_of_stock_results