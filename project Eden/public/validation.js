function validate()
{
    var valid=true;
    if (document.myForm.Name.value == "") {
        document.getElementById("nameValidation").innerHTML="Please enter your name";
        document.getElementById("nameValidation").style.color="red";
        document.myForm.Name.focus();
        valid=false;
    }
    else
    {
        document.getElementById("nameValidation").innerHTML="Valid";
        document.getElementById("nameValidation").style.color="green";
    }
    
    if (document.myForm.Email.value == "") {
        document.getElementById("emailValidation").innerHTML="Email must be a '@deakin.edu.au' email";
        document.getElementById("emailValidation").style.color="red";
        document.myForm.Email.focus();
        valid= false;
    }
    else if (document.myForm.Email.value != "") {
        var emailID = document.myForm.Email.value;
        var atpos = emailID.indexOf("@deakin.edu.au");      
        if (atpos < 0) {
            document.getElementById("emailValidation").innerHTML="Email must be a '@deakin.edu.au' email";
            document.getElementById("emailValidation").style.color="red";
            document.myForm.Email.focus();
            valid= false;
        }
        else{
            document.getElementById("emailValidation").innerHTML="Valid";
            document.getElementById("emailValidation").style.color="green";
        }
    }
    
    
    if (document.myForm.Zip.value == "" || document.myForm.Zip.value.length != 6) {
        document.getElementById("codeValidation").innerHTML="Please provide Deakin Unit (MIS872)";
        document.getElementById("codeValidation").style.color="red";
        document.myForm.Zip.focus();
        valid= false;
    }
    else{
        
        if(document.myForm.Zip.value.match("^[A-Z]{3}[0-9]{3}$"))
        {
            document.getElementById("codeValidation").innerHTML="Valid";
            document.getElementById("codeValidation").style.color="green";
        }
        else{
            
            document.getElementById("codeValidation").innerHTML="Please provide Deakin Unit (MIS872)";
            document.getElementById("codeValidation").style.color="red";
            document.myForm.Zip.focus();
        }
        
    }
    
    if (document.myForm.phone.value == "") {
        document.getElementById("phoneValidation").innerHTML="Please provide your phone number";
        document.getElementById("phoneValidation").style.color="red";
        document.myForm.phone.focus();
        valid= false;
        
    }
    else{
        if (document.myForm.phone.value.length < 10 || document.myForm.phone.value.length > 10) {      
            document.getElementById("phoneValidation").innerHTML="Phone number must have 10 digits";
            document.getElementById("phoneValidation").style.color="red";
            document.myForm.phone.focus();
            valid= false;
        }
        else
        {
            
            var phoneValid=true;
            var num=document.myForm.phone.value;
            for (let ch of num)
            {
                if (ch < '0' || ch > '9')
                {
                    document.getElementById("phoneValidation").innerHTML="Contains character '"+ch+"'. Numbers only";
                    document.getElementById("phoneValidation").style.color="red";
                    document.myForm.phone.focus();
                    valid=false;
                    phoneValid=false;                  
                }
                
            }
            if(phoneValid)
            {
                document.getElementById("phoneValidation").innerHTML="Valid";
                document.getElementById("phoneValidation").style.color="green";
            }
        }
    }
    return valid;
}

