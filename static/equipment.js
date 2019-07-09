$(document).ready(function() {

    // Make current page active in navbar
    $("#equipment").addClass('active');

    let form = document.getElementById("equipmentform");

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
        // Requires the very basics of information to identify equipment
        if (!form.skimake.value || !form.skimodel.value) {
            missingField("Requires ski make and model: ");
            toggle("block");
            return false;
        }
        else if (!form.bindmake.value || !form.bindmodel.value) {
            missingField("Binding make and model required: ");
            toggle("block");
            return false;
        }
        else if (!form.bootmake.value || !form.bootmodel.value || !form.bootcolor.value) {
            missingField("Boot make, model, and color required: ");
            toggle("block");
            return false;
        }
        else if (!form.solelength.value) {
            missingField("Boot sole length required: ");
            toggle("block");
            return false;
        }
        else if (!form.mountloc.value) {
            missingField("Mounting rocation required: ");
            toggle("block");
            return false;
        }

        // Must have passed all other tests at this point.
        // Pass onto next page with a success
        toggle("none");
        return true;

    };

});