// Stored save data array — preserved from a loaded save, or built from defaults
var savedParts = null;

// Map of array indices to form field IDs
var fieldMap = {
    0: "level",
    1: "money",
    2: "gold",
    28: "basic",
    29: "plasma",
    30: "sniper",
    31: "scatter",
    32: "cannon",
    33: "poison",
    37: "u1",   // Basic Ball Speed
    38: "u2",   // Basic Ball Power
    39: "u3",   // Plasma Ball Range
    40: "u4",   // Plasma Ball Power
    41: "u5",   // Sniper Ball Speed
    42: "u6",   // Sniper Ball Power
    43: "u7",   // Scatter Ball Extra Balls
    44: "u8",   // Scatter Ball Power
    45: "u9",   // Cannon Ball Speed
    46: "u10",  // Cannon Ball Power
    47: "u11",  // Poison Ball Speed
    48: "u12",  // Poison Ball Power
    50: "u13",  // Laser(s) Power
    51: "u14",  // Click Power
    52: "p1",   // Level Cash Complete Bonus
    53: "p2",   // Ball Speed Increase
    54: "p3",   // Ball Power Multiplier
    55: "p4",   // Unlock VAUS Laser
    56: "p5",   // Maximum Number of Balls
    104: "blackbricks",
    109: "skillpoints"
};

// Default template used when generating from scratch (no loaded save)
var defaultTemplate = "0,0,0,2,0,0,0,0,0,0,0,1,1,0,43595.78,999999,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0";

// Loads a base64 save code, decodes it, and populates all form fields
function loadSave(){
    var b64Input = document.getElementById("b64").value.trim();
    if (!b64Input) return;

    var decoded;
    try {
        decoded = atob(b64Input);
    } catch(e) {
        document.getElementById("loadStatus").innerHTML = "<code style='color:red'>Invalid base64 string!</code>";
        return;
    }

    // Store the full save data so getCode() preserves everything
    savedParts = decoded.split(",");

    // Show raw decoded data for reference
    document.getElementById("rawData").innerHTML = "<code style='color:blue; word-break:break-all'>" + decoded + "</code>";

    // Populate form fields from saved data
    var loaded = 0;
    for (var idx in fieldMap) {
        var el = document.getElementById(fieldMap[idx]);
        if (el && savedParts[idx] !== undefined) {
            el.value = savedParts[idx];
            loaded++;
        }
    }

    document.getElementById("loadStatus").innerHTML = "<code style='color:green'>Loaded " + loaded + " fields from save code (" + savedParts.length + " total values)</code>";

    // Regenerate the output code with loaded values
    getCode();
}

function status(){
    document.getElementById("status").innerHTML = "<code>...</code>";
}

function getCode(){
    // Start from loaded save data if available, otherwise use defaults
    var parts;
    if (savedParts) {
        parts = savedParts.slice(); // copy so we don't mutate the original
    } else {
        parts = defaultTemplate.split(",");
    }

    // Write form field values back into the array
    for (var idx in fieldMap) {
        var el = document.getElementById(fieldMap[idx]);
        if (el) {
            parts[idx] = cN(el.value);
        }
    }

    var data = parts.join(",");
    var newdata = btoa(data);
    document.getElementById("output").innerHTML = "<textarea class='output'>" + newdata + "</textarea>";

    if (atob(newdata) === data) {
        document.getElementById("status").innerHTML = "<code style='color:green'>Successfully encoded the string!</code>";
    } else {
        document.getElementById("status").innerHTML = "<code style='color:red'>There was an error with the code...</code>";
    }
}

/*
cN() or, check Null, changes the value from 0 to the actual number 0 by default.
If this wasn't here, you'd have empty parts in the string
which are considered null, causing issue in the game
*/
function cN(e) {
    if (e == 0 || e === "") {
        e = "0";
    }
    return e;
}
