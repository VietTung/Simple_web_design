var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myEdenDB');

function validate()
{
    var valid=true;
    // validate name
    if (document.myForm.Name.value == "") {
        document.getElementById("validationName").innerHTML="Please enter your name<br>";
        document.getElementById("validationName").style.color="red";
        document.myForm.Name.focus();
        valid=false;
    }
    else
    {
        document.getElementById("validationName").innerHTML="Valid";
        document.getElementById("validationName").style.color="green";
    }
    //validate email
    if (document.myForm.Email.value == "") {
        document.getElementById("validationEmail").innerHTML="Please enter an email<br>";
        document.getElementById("validationEmail").style.color="red";
        document.myForm.Email.focus();
        valid= false;
    }
    else if (document.myForm.Email.value != "") {
        var emailID = document.myForm.Email.value;
        var atpos = emailID.indexOf("@");      
        if (atpos < 0) {
            document.getElementById("validationEmail").innerHTML="Please enter a valid email (contain '@')<br>";
            document.getElementById("validationEmail").style.color="red";
            document.myForm.Email.focus();
            valid= false;
        }
        else{
            document.getElementById("validationEmail").innerHTML="Valid";
            document.getElementById("validationEmail").style.color="green";
        }
    }
    // validate comment
    if (document.myForm.Comment.value == "") {
        document.getElementById("validationComment").innerHTML="Please enter your comment (`None` if you don't have any) <br>";
        document.getElementById("validationComment").style.color="red";
        document.myForm.Comment.focus();
        valid=false;
    }
    else
    {
        document.getElementById("validationComment").innerHTML="Valid";
        document.getElementById("validationComment").style.color="green";
    }

    return valid;
}
        


function submitVariable() {
    if (validate()){
        var name = document.getElementById("txtName").value;
        var email = document.getElementById("txtEmail").value;
        var comment = document.getElementById("txtComment").value;
        var rating = document.getElementById("rating").value;

        //Display in table
        let table = document.getElementById("table");
        let count = table.rows.length;

        let row = table.insertRow(count);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell1.innerHTML = count;
        cell2.innerHTML = name;
        cell3.innerHTML = email;
        cell4.innerHTML = comment;
        cell5.innerHTML = rating;

        //Insert into EdenForm table in the database
        db.run(`INSERT INTO EdenForm VALUES ("${name}", "${email}", "${comment}", "${rating}")`);

    }
    
}