$(document).ready(function() {

    // Make current page active in navbar
    $("#skierinfo").addClass('active');

    let form = document.getElementById("skierinfo");
    let oldField = "field";

    // Just to make sure that the boxes are all unchecked upon loading. Don't want to accidentally pick a skier type.
    document.getElementById("type0").checked = false;
    document.getElementById("type1").checked = false;
    document.getElementById("type2").checked = false;
    document.getElementById("type3").checked = false;
    document.getElementById("type4").checked = false;



    form.onsubmit = function() {
        let weight = form.weight.value;
        let age = form.age.value;

        // Check for incompleteness
        if (!weight)
        {
            missingField("Weight has been left blank: ");
            // Activate the alert.
            toggle("block");
            return false;
        }
        if (weight < 22)
        {
            missingField("Are you really less than 22 lbs?");
            // Activate the alert.
            toggle("block");
            return false;
        }
        else if (!form.foot.value)
        {
            missingField("Height is incomplete: ");
            // Activate the alert.
            toggle("block");
            return false;
        }
        else if (form.inches.value > 11)
        {
            missingField("Inches cannont exceed 11. Use feet and inches: ");
            // Activate the alert.
            toggle("block");
            return false;
        }
        else if (!age)
        {
            missingField("Age required: ");
            // Activate the alert.
            toggle("block");
            return false;
        }
        else if (!form.type0.checked && !form.type1.checked && !form.type2.checked && !form.type3.checked && !form.type4.checked)
        {
            missingField("Must select a skier type: ");
            // Activate the alert.
            toggle("block");
            return false;
        }
        else if ((form.foot.value < 1) || form.inches.value < 0)
        {
            missingField("Invalid height: ");
            // Activate the alert.
            toggle("block");
            return false;
        }
        else if (!form.inches.value)
        {
            // At this point, everything should be filled out except inches. Set inches to 0 instead of blank
            form.inches.value = 0;
        }

        if ((weight < 48) && (form.type3.checked || form.type4.checked))
        {
            missingField("A type 3 or 3+ is inappropriate for a skier under 48lbs.");
            // Activate the alert.
            toggle("block");
            return false;
        }
        else if ((weight < 38) && (form.type0.checked))
        {
            missingField("A type -1 is inappropriate for a skier under 38lbs.");
            // Activate the alert.
            toggle("block");
            return false;
        }

        // Must have passed all basic tests. Input is valid.
        // This does NOT check to see if the Initial Indicator Setting will fall within the binding specs.
        toggle("none");
        return true;

    };


    // Catches certain key entries into the weight text field
    $("#weight").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, and enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


    // Catches certain key entries into the weight text field
    $("#age").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, and enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


    // Toggles the alert popup on of off.
    function toggle(onoff) {
        let alert = document.getElementById("alert");
        alert.style.display = onoff;
    }

    // Replaces the "field" in the alert with the appropriate first missing field.
    function missingField(name) {
        let alert = document.getElementById("alert").innerHTML;
        let field = alert.replace(oldField, name);
        oldField = name;
        document.getElementById("alert").innerHTML = field;
    }



    // Get the modal
    let modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let img = document.getElementById('myImg');
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };

    // When the user clicks on <span> (x), close the modal
    modal.onclick = function() {
        modal.style.display = "none";
    };
});