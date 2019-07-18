import { makeActive } from './utilities.js';

$(document).ready(function() {

    // Make current page active in navbar
    makeActive('#contact')
    

    let form = document.getElementById("contactinfo");

    let oldField = "field";

    // Toggles the alert popup on or off. 'onoff' is a "none" or "block"
    function toggle(onoff) {
        var alert = document.getElementById("alert");

        alert.style.display = onoff;
    }

    // Replaces the "field" in the alert with the appropriate first missing field.
    function missingField(name) {
        var alert = document.getElementById("alert").innerHTML;
        var field = alert.replace(oldField, name);
        oldField = name;
        document.getElementById("alert").innerHTML = field;
    }

    form.onsubmit = function() {
        if (!form.first.value)
        {
            missingField("First Name missing: ");
            toggle("block");
            return false;
        }
        else if (!form.last.value)
        {
            missingField("Last Name missing: ");
            toggle("block");
            return false;
        }
        else if (!form.phone.value)
        {
            missingField("Phone Number missing: ");
            toggle("block");
            return false;
        }
        else if (!form.email.value)
        {
            missingField("Email Addressing missing: ");
            toggle("block");
            return false;
        }
        else if (!form.address1.value)
        {
            missingField("Street Address missing: ");
            toggle("block");
            return false;
        }
        else if (!form.city.value)
        {
            missingField("City missing: ");
            toggle("block");
            return false;
        }
        else if (!form.state.value)
        {
            missingField("State missing: ");
            toggle("block");
            return false;
        }
        else if (!form.postal.value)
        {
            missingField("Postal Code missing: ");
            toggle("block");
            return false;
        }
        else // Check for a valid phone number
        {
            let phone = form.phone.value;
            let numbers = 0;

            // Pull only the integers from phone and store them into numers[]
            for (i = 0; i < phone.length; i ++)
            {
                if (!isNaN(parseInt(phone.charAt(i), 10)))
                {
                    numbers++;
                }
            }

            // Check to see if the phone number contained a valid number of digits
            if ((numbers.length < 10) || (numbers.length > 14))
            {
                missingField("Invalid Phone Number: ");
                toggle("block");
                return false;
            }


            // Must have passed all other tests at this point.
            // Pass onto next page with a success
            toggle("none");
            return true;
        }

    };

});
