var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myEdenDB');      // file database

const crypto = require('crypto');

//Testing one example
var inp = `starrynight`;
var hashPwd = crypto.createHash('sha256').update(inp).digest('hex');

console.log("Input String: "+inp);
console.log("Hash Value: " + hashPwd);

db.serialize(function() {
        
    db.run("CREATE TABLE IF NOT EXISTS EdenUser (name TEXT, password TEXT, fullname TEXT)");
    db.run("DELETE FROM EdenUser");
    db.run("CREATE TABLE IF NOT EXISTS EdenForm (name TEXT, email TEXT, comment TEXT, rating TEXT)");
    db.run("DELETE FROM EdenForm");
    inp = `whastupdoc`;
    db.run(`INSERT INTO EdenUser (name, password, fullname) VALUES ("bugsbunny23", "${crypto.createHash('sha256').update(inp).digest('hex')}", "Bugs Bunny")`);
    inp = `beatles1`;
    db.run(`INSERT INTO EdenUser (name, password, fullname) VALUES ("worldpeace", "${crypto.createHash('sha256').update(inp).digest('hex')}", "John Lennon")`);
    inp = `starrynight`;
    db.run(`INSERT INTO EdenUser (name, password, fullname) VALUES ("drummerboy68", "${crypto.createHash('sha256').update(inp).digest('hex')}", "Ringo Starr")`);
    inp = `yesterday1966`;
    db.run(`INSERT INTO EdenUser (name, password, fullname) VALUES ("sirpaul97", "${crypto.createHash('sha256').update(inp).digest('hex')}", "Paul McCartney")`);
    inp = `pebbles4ever`;
    db.run(`INSERT INTO EdenUser (name, password, fullname) VALUES ("stoneman12", "${crypto.createHash('sha256').update(inp).digest('hex')}", "Fred Flintstone")`);
    
    // The SELECT operation is performed on the DB one row at a time and the function
    // is called for each row 'selected'
    console.log('Display all content from all rows of the DB');
    db.each("SELECT * FROM EdenUser", function(err, row) {
        if (err){
            console.log(`There is an error in Display all contents query, error: ${err}`);
        } else {
            console.log("[all] Name: " + row.name + "  Password: " + row.password + "  Full name: " + row.fullname); 
        }
    });
    // Or you can select 'specific' fields from a data row
    console.log('Display only the name and password fields from all rows of the DB');
    db.each("SELECT name, password FROM EdenUser", function(err, row) {
        if (err){
            console.log(`There is an error in display name and password query, error: ${err}`);
        } else {
            console.log("[subset] Name: " + row.name + "  password: " + row.password); 
        }
    });
});
db.close(); 