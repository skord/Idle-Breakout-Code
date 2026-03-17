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

  var parts = decoded.split(",");

  // Show raw decoded data for reference
  document.getElementById("rawData").innerHTML = "<code style='color:blue; word-break:break-all'>" + decoded + "</code>";

  // Map indices to field IDs based on the save format
  var fieldMap = {
    0: "level",
    1: "money",
    2: "gold",
    // 3-27: fixed/internal values
    28: "basic",
    29: "plasma",
    30: "sniper",
    31: "scatter",
    32: "cannon",
    33: "poison",
    // 34-36: unused
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
    // 49: unused
    50: "u13",  // Laser(s) Power
    51: "u14",  // Click Power
    52: "p1",   // Level Cash Complete Bonus
    53: "p2",   // Ball Speed Increase
    54: "p3",   // Ball Power Multiplier
    55: "p4",   // Unlock VAUS Laser
    56: "p5",   // Maximum Number of Balls
    // 57-103: fixed/internal values
    104: "blackbricks",
    // 105-108: fixed
    109: "skillpoints"
    // 110-112: fixed
  };

  var loaded = 0;
  for (var idx in fieldMap) {
    var fieldId = fieldMap[idx];
    var el = document.getElementById(fieldId);
    if (el && parts[idx] !== undefined) {
      el.value = parts[idx];
      loaded++;
    }
  }

  document.getElementById("loadStatus").innerHTML = "<code style='color:green'>Loaded " + loaded + " fields from save code (" + parts.length + " total values)</code>";

  // Regenerate the output code with loaded values
  getCode();
}

function status(){
    document.getElementById("status").innerHTML ="<code>...</code>"
}

function getCode(){
var d = document;
//valuables
var level = d.getElementById("level").value;
var money = d.getElementById("money").value;
var gold = d.getElementById("gold").value;
var bb = d.getElementById("blackbricks").value;
var sp = d.getElementById("skillpoints").value;
//balls
var basic = d.getElementById("basic").value;
var plasma = d.getElementById("plasma").value;
var sniper = d.getElementById("sniper").value;
var scatter = d.getElementById("scatter").value;
var cannon = d.getElementById("cannon").value;
var poison = d.getElementById("poison").value;
//prestige
var p1 = d.getElementById("p1").value;
var p2 = d.getElementById("p2").value;
var p3 = d.getElementById("p3").value;
var p4 = d.getElementById("p4").value;
var p5 = d.getElementById("p5").value;
//upgrades
var u1 = d.getElementById("u1").value;
var u2 = d.getElementById("u2").value;
var u3 = d.getElementById("u3").value;
var u4 = d.getElementById("u4").value;
var u5 = d.getElementById("u5").value;
var u6 = d.getElementById("u6").value;
var u7 = d.getElementById("u7").value;
var u8 = d.getElementById("u8").value;
var u9 = d.getElementById("u9").value;
var u10 = d.getElementById("u10").value;
var u11 = d.getElementById("u11").value;
var u12 = d.getElementById("u12").value;
var u13 = d.getElementById("u13").value;
var u14 = d.getElementById("u14").value;
//have to add skills :P
/*
4 rows, 6 columns: 
# # # # # # - Always damage black bricks
# # # # # # - Personal upgrades
# # # # # # - Small chance of damaging all bricks at once
# # # # # # - Personal upgrades
*/
/*
var r1c1 = d.getElementById("").value;//Always damage black bricks
var r2c1 = d.getElementById("").value;//Retain earned black bricks after prestige
var r3c1 = d.getElementById("").value;//Small chance of damaging all bricks at once
var r4c1 = d.getElementById("").value;//Basic ball power multiplies for every basic ball you have
var r1c2 = d.getElementById("").value;//Always damage black bricks
var r2c2 = d.getElementById("").value;//Splash damage from plasma balls 4x
var r3c2 = d.getElementById("").value;//Small chance of damaging all bricks at once
var r4c2 = d.getElementById("").value;//Boss bricks lose all laser protection
var r1c3 = d.getElementById("").value;//Always damage black bricks
var r2c3 = d.getElementById("").value;//Offline cash earnings x10
var r3c3 = d.getElementById("").value;//Small chance of damaging all bricks at once
var r4c3 = d.getElementById("").value;//Increase speed limit to 60
var r1c4 = d.getElementById("").value;//Always damage black bricks
var r2c4 = d.getElementById("").value;//Single hit scatter balls balls damage 2x
var r3c4 = d.getElementById("").value;//Small chance of damaging all bricks at once
var r4c4 = d.getElementById("").value;//Power ups duration doubled
var r1c5 = d.getElementById("").value;//Always damage black bricks
var r2c5 = d.getElementById("").value;//Lasers always damage black bricks
var r3c5 = d.getElementById("").value;//Small chance of damaging all bricks at once
var r4c5 = d.getElementById("").value;//Enable mouse hold to click
var r1c6 = d.getElementById("").value;//Always damage black bricks
var r2c6 = d.getElementById("").value;//Poisoned bricks take damage over time
var r3c6 = d.getElementById("").value;//Small chance of damaging all bricks at once
var r4c6 = d.getElementById("").value;//Poisoned bricks slowly infect nearby bricks

*/
let data = cN(level)+","+cN(money)+","+cN(gold)+",2,0,0,0,0,0,0,0,1,1,0,43595.78,999999,0,0,0,0,0,0,0,0,0,0,0,0,"+cN(basic)+","+cN(plasma)+","+cN(sniper)+","+cN(scatter)+","+cN(cannon)+","+cN(poison)+",0,0,0,"+cN(u1)+","+cN(u2)+","+cN(u3)+","+cN(u4)+","+cN(u5)+","+cN(u6)+","+cN(u7)+","+cN(u8)+","+cN(u9)+","+cN(u10)+","+cN(u11)+","+cN(u12)+",0,"+cN(u13)+","+cN(u14)+","+cN(p1)+","+cN(p2)+","+cN(p3)+","+cN(p4)+","+cN(p5)+",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"+cN(bb)+",0,0,0,1,"+cN(sp)+",1,0,0";
let newdata = btoa(data); //encode data to Base64
document.getElementById("output").innerHTML = "<textarea class='output'>"+newdata+"</textarea>"; //display the code
    if (atob(newdata) === data){ //check if encoded newdata matches original data
        document.getElementById("status").innerHTML = "<code style='color:green'>Successfully encoded the string!</code>"
    }else{
        document.getElementById("status").innerHTML = "<code style='color:red'>There was an error with the code...</code>"
    }
/*
cN() or, check Null, changes the value from 0 to the actual number 0 by default. 
If this wasn't here, you'd have empty parts in the string 
which are considered null, causing issue in the game
*/
    function cN(e) {
      if (e == 0) {
        e = "0";
      }
      return e;
    }
}
