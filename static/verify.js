$(document).ready(function() {
    let verifybutton = document.getElementById("informationverified");
    let newsubmitbutton = document.getElementById("newsubmitbutton");
    let contactchanges = document.getElementById("changecontactinfo");
    let submitcontact = document.getElementById("submitcontactchanges");
    let skierchanges = document.getElementById("changeskierstats");
    let submitskier = document.getElementById("submitskierchanges");

    let newcontactfields = ["newfirst","newlast","newphone","newemail","newaddress1","newaddress2","newcity","newstate","newpostal"];
    let contactfields = ["first","last","phone","email","address1","address2","city","state","postal"];
    let newskierfields = ["newweight","newfoot","newinches","newage","newskiertype"];
    let skierfields = ["weight","foot","inches","age","skiertype"];
    let changed = false;

    // Checks to ensure the checkbox is indeed checked.
    verifybutton.onclick = function() {
        if (!changed && document.getElementById("check").checked) {

            // Initialize a form to submit
            newform = document.createElement("form");
            newform.method = "POST";
            newform.action = "/done";

            // Add the form and submit it
            document.body.appendChild(newform);
            newform.submit();
        }
    };

    // Allow show the apprpriate text box for a value replacement.
    contactchanges.onclick = function() {
        showNewInputField(newcontactfields, true);
        document.getElementById("contacttable").style.display = "none";
        document.getElementById("newcontacttable").style.display = "";
        submitcontact.style.display = "";
        contactchanges.style.display = "none";
        changed = true;
    };

    // Revert with the changes
    submitcontact.onclick = function() {
        // Hide the change fields
        showNewInputField(newcontactfields, false);

        // Make the changes field by field.
        for (i = 0; i < contactfields.length; i++) {
            document.getElementById(contactfields[i]).innerHTML = document.getElementById(newcontactfields[i]).value;
        }

        // Hide or show buttons as required. Show the table again.
        document.getElementById("newcontacttable").style.display = "none";
        document.getElementById("contacttable").style.display = "";
        newsubmitbutton.style.display = "";
        verifybutton.style.display = "none";
        contactchanges.style.display = "";
        submitcontact.style.display = "none";
    };

    // Allow show the apprpriate text box for a value replacement.
    skierchanges.onclick = function() {
        showNewInputField(newskierfields, true);
        document.getElementById("skiertable").style.display = "none";
        document.getElementById("newskiertable").style.display = "";
        submitskier.style.display = "";
        skierchanges.style.display = "none";
        changed = true;
    };

    // Revert with the changes
    submitskier.onclick = function() {
        // Hide the change fields
        showNewInputField(newskierfields, false);

        // Make the changes field by field.
        for (i = 0; i < skierfields.length; i++) {
            document.getElementById(skierfields[i]).innerHTML = document.getElementById(newskierfields[i]).value;
        }

        // Hide or show buttons as required. Show the table again.
        document.getElementById("newskiertable").style.display = "none";
        document.getElementById("skiertable").style.display = "";
        newsubmitbutton.style.display = "";
        verifybutton.style.display = "none";
        skierchanges.style.display = "";
        submitskier.style.display = "none";
    };

    // Function to actually show the text box for the given field.
    // The 'bool' argument decides if the fields are shown (true) or hidden (false)
    function showNewInputField(field, bool) {
        // Loop through the input fields to show/hide them
        for (i = 0; i < field.length; i++) {
            let textbox = document.getElementById(field[i]);
            if (bool) {
                textbox.style.visibility = "visible";
            }
            else {
                textbox.style.visibility = "hidden";
            }
        }
    }


    newsubmitbutton.onclick = function() {
        // Submit a form to /verify to update the information if something actually changed.
        if (changed && document.getElementById("check").checked) {

            // Initialize the form to submit
            newform = document.createElement("form");
            newform.style.display = "none";
            newform.method = "POST";

            if (!changed) {
                // No information has been changed, section completed
                newform.action = "/done";
            }
            else {
                // Information has been changed and must be re-verified
                newform.action = "/update";

                // Add all the elements I want to send
                first = document.createElement("input");
                first.value = document.getElementById("first").innerHTML;
                first.name = "first";
                newform.appendChild(first);

                last = document.createElement("input");
                last.value = document.getElementById("last").innerHTML;
                last.name = "last";
                newform.appendChild(last);

                phone = document.createElement("input");
                phone.value = document.getElementById("phone").innerHTML;
                phone.name = "phone";
                newform.appendChild(phone);

                email = document.createElement("input");
                email.value = document.getElementById("email").innerHTML;
                email.name = "email";
                newform.appendChild(email);

                address1 = document.createElement("input");
                address1.value = document.getElementById("address1").innerHTML;
                address1.name = "address1";
                newform.appendChild(address1);

                address2 = document.createElement("input");
                address2.value = document.getElementById("address2").innerHTML;
                address2.name = "address2";
                newform.appendChild(address2);

                city = document.createElement("input");
                city.value = document.getElementById("city").innerHTML;
                city.name = "city";
                newform.appendChild(city);

                state = document.createElement("input");
                state.value = document.getElementById("state").innerHTML;
                state.name = "state";
                newform.appendChild(state);

                postal = document.createElement("input");
                postal.value = document.getElementById("postal").innerHTML;
                postal.name = "postal";
                newform.appendChild(postal);

                // Add the skier information
                weight = document.createElement("input");
                weight.value = document.getElementById("weight").innerHTML;
                weight.name = "weight";
                newform.appendChild(weight);

                foot = document.createElement("input");
                foot.value = document.getElementById("foot").innerHTML;
                foot.name = "foot";
                newform.appendChild(foot);

                inches = document.createElement("input");
                inches.value = document.getElementById("inches").innerHTML;
                inches.name = "inches";
                newform.appendChild(inches);

                age = document.createElement("input");
                age.value = document.getElementById("age").innerHTML;
                age.name = "age";
                newform.appendChild(age);

                skiertype = document.createElement("input");
                skiertype.value = document.getElementById("skiertype").innerHTML;
                skiertype.name = "skiertype";
                newform.appendChild(skiertype);
            }

            // Add the form and submit it
            document.body.appendChild(newform);
            newform.submit();
        }
    };
});

