import { makeActive, toggle, missingField } from './utilities.js';

$(document).ready(function () {

    // Make current page active in navbar
    makeActive("contact");
    
    let form = document.getElementById("searchform");
    let message = "No given information. ";

    form.onsubmit = function() {
        let first = form.first.value;
        let last = form.last.value;
        let phone = form.phone.value;
        let email = form.email.value;

        // Verify there is enough information to actually perform a search.
        // Initially false till proven valid

        // Simply check for an @ symbol in the email address
        if (!first || !last || !phone || !email)
        {
            message = "All fields required: ";
        }
        else if (email != null)
        {
            for (i =0; i < email.length; i++)
            {
                if (email.charAt(i) == '@')
                {
                    return true;
                }
                else
                {
                    message = "Invalid email address: ";
                }
            }

        }
        // Check for a potentially invalid phone number
        else if (phone != null)
        {
            let numbers = 0;

            // Pull only the integers from phone and store them into numers[]
            for (i = 0; i < phone.length; i++)
            {
                if (!isNaN(parseInt(phone.charAt(i), 10)))
                {
                    numbers++;
                }
            }

            // Check to see if the phone number contained a valid number of digits
            if ((numbers.length < 10) || (numbers.length > 14))
            {
                message = "Invalid Phone Number: ";
            }
            else
            {
                return true;
            }

        }
        // Check to see if both the first AND last names are filled in
        else if ((first != null) || (last != null))
        {
            if (!first || !last)
            {
                message = "Both First AND Last names required: ";
            }
            else
            {
                return true;
            }
        }

        // Display error if required.
        missingField(message);
        toggle("block");
        return false;
    };

});