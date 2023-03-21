let express = require(`express`);
let app = express();

var port = normalizePort(process.env.PORT || `3000`);
app.set(`port`, port);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myEdenDB');

const crypto = require('crypto');

function normalizePort(val) {
	var port = parseInt(val,10);
	if (isNaN(port)){
		return val;
	}
	if (port >=0) {
		return port;
	}
	return false;
}

app.use(express.static(`public`));

//Here we are configuring express to use inbuilt body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));


app.post('/logins', function (req, res, next) {
    let username = req.body.name;
	//Hashed the password input to compare the value later on
    let password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    
    console.log("Just received POST data for users login endpoint!");
    console.log(`Data includes: ${username} and ${password}`);

	let check = false;

	db.all('SELECT * FROM EdenUser', function(err, rows){
        if (err) {
            return console.error(err.message);
        }
        if (rows.length === 0) { 
            console.log("The database is empty!") 
            html += '<p>No data found!</p>';
        } else {
            rows.forEach(function (row){
                console.log(`checking input ${username}/${password} against database ${row.name}/${row.password}`);
                if (username == row.name && password == row.password){
					check = true;
					usrnameVar = row.name;
                    fullnameVar = row.fullname;
                    res.status(200).redirect('/database.html')
				}
            });
        }
        if (check == false){
            let html = '';

            // Display a web page for failed login
            
            html += '<!doctype html><html lang="en">';
            html += '<head>';
            html += '<title>Bootstrap Express/SQLite3 Demo</title>';
            html += '<meta charset="utf-8">';
            html += '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
            html += '<link rel="stylesheet"';
            html += '  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"';
            html += '  integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"';
            html += '  crossorigin="anonymous">';
            html += '</head>';
        
            html += '<body><div class="container">';
            html += '<h3> The User Information Table </h3>';
            html += `<h1>Login Failed</h1>`;
            html += `<p>The <em>username</em> or <em>password</em> doesn't match our record</p>`;
            html += `<p><strong>Please go back and try login again<strong></p>`
            html += '</div>';
            html += '</body></html>';
            res.send( html );
        }
        
    });
	
});

app.post('/signups', function (req, res, next) {
    let username = req.body.name;
    let fname = req.body.fname;
	//Hashed the password input to compare the value later on
    let password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    
    console.log("Just received POST data for users signup endpoint!");
    console.log(`Data includes: ${username} and ${password}`);
    try{
        db.run(`INSERT INTO EdenUser (name, password, fullname) VALUES ("${username}", "${password}", "${fname}")`);
    } catch (error) {
        console.log("Signup error: ", error);
    } finally{
        res.status(200).redirect('/login.html')
    }

        
});
	


app.listen(port, function() {
	console.log(`Web server running at: http://localhost:${port}`);
	console.log(`Type Ctrl + C to shutdown web server`);
});