export function makeActive(tab) {
    $(tab).addClass('active');
}

export function toggle(onoff) {
     // Toggles the alert popup on or off. 'onoff' is a "none" or "block"
    var alert = document.getElementById("alert");

    alert.style.display = onoff;
}

// TODO : This probably won't reset upon new page. Will need to address this. Maybe just setup the whole innerHTML 
//        and declare the rest of the string in the following function
let oldField = "field";

export function missingField(name) {
    // Replaces the "field" in the alert with the appropriate first missing field.
    var alert = document.getElementById("alert").innerHTML;
    var field = alert.replace(oldField, name);
    oldField = name;
    document.getElementById("alert").innerHTML = field;
}