// some require vars that require an npm install
var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require("terminal-table");

//========================================
// FILL THIS IN WITH YOUR OWN MYSQL SETTINGS IF THEY DON'T MATCH THESE DEFAULTS.
var connection = mysql.createConnection({

    host: "127.0.0.1", 

    port: 8889,
  
    user: "root",
  
    password: "root",

	database: "bamazon_db"
	
});
//=========================================


// borrowed some function from the internet to validate integers.
// we'll call this twice during the purchasing phase. Once for the id and once for quantity.
function validateInput(value) {

	var int = Number.isInteger(parseFloat(value));

	var confirm = Math.sign(value);

	if (int && (confirm === 1)) {
		return true;
	} else {
		return "We don't sell incomplete units. Please try again.";
	};
}


function runBamazon() {

    // ssome greetings
    console.log("Welcome!\n")
    console.log("I'm selling some video games, movies and comics.")

	// Display the available inventory
	displayInventory();
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {

	// sql string to pull up alllll of the inventory
	sqlQuery = 'SELECT * FROM inventory';

	// Make the db query
	connection.query(sqlQuery, function(err, data) {
		if (err) throw err;

		console.log('Our Current Inventory: ');
		console.log('\n====================\n');

		var t = new Table();
 
		t.push(
  			["Item ID:", "Product", "Category", "Price"],
  			[""]
		);
 

		for (var i = 0; i < data.length; i++) {
			
			// making some vars to plug into the inventory table
			var itemID = data[i].id;
			var prod = data[i].product_name;
			var dept = data[i].department_name;
			var price = data[i].price;
			
			// push those vars into the table
			t.push(
				[" " + itemID + " ", " " + prod + " ", " " + dept + " ", " " + price + " "],
				[""]
			);
		};

		// display the complete table
		console.log("" + t);

	  	console.log("\n====================\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	purchaseInquiry();
	})
}

//function to prompt the user for their purchase
function purchaseInquiry() {

	inquirer.prompt([
		{
			// Prompt for the user to select an item by ID #
			type: 'input',
			name: 'id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			// second prompt for the quantity that they want
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {

        // some vars to hold customer input
		var item = input.id;

		var quantity = input.quantity;

		// writing some sql to plug in for searching for an item.
		var sqlQuery = 'SELECT * FROM inventory WHERE ?';

		// plug in the sql query to return the specifc item (and confrim it's in the invertory table)
		connection.query(sqlQuery, {id: item}, function(err, data) {

			if (err) throw err;

			// Any id that doesn't exist on the table will return an empty array.

			if (data.length === 0) {

                // so we can let them know that we don't have it.
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                console.log("\n====================\n")
				displayInventory();

			} else {

				var productData = data[0];


				// If the quantity requested by the user is in stock
				if (quantity <= productData.inventory_quantity) {
					console.log('We got that in stock!');

                    // writing some sql to uodate the inventory in stock
                    var newSqlQuery = 'UPDATE inventory SET inventory_quantity = ' + (productData.inventory_quantity - quantity) + ' WHERE id = ' + item;

					// Update the inventory
					connection.query(newSqlQuery, function(err, data) {
						if (err) throw err;

                        // then we finalize the transaction.
						console.log('Your total: $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n====================\n");

						// End the connection. You can now start over with "node bamazon.js"
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n====================\n");

					displayInventory();
				}
			}
		})
	})
}

// Run the app
runBamazon();
