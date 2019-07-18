import { makeActive, toggle, missingField } from './utilities.js';

$(document).ready(function() {

    // Make current page active in navbar
    makeActive("#equipment");

    let form = document.getElementById("equipmentform");
    

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