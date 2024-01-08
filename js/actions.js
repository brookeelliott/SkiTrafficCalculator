
var stateInput = document.querySelector("#stateInput");
var cityInput = document.getElementById("cityInput");



function validation() {

    dataGather(); //Output: [city, state, pass, travel]


}








//Function that gathers data from the form and outputs [city, state, pass, travel]
    //This function calls the abbrState function, converting state in the process. 
function dataGather() {
    let city = cityInput.value;
    let state = stateInput.value;
    let data = [];

    if(city == "" || state == ""){
        alert("Please fill out the entire form.");
        return console.log("incomplete form");
    }

    let pass = "";
    let passIndex = document.forms[1];
    for(let i = 0; i < passIndex.length; i++)
    {
        if(passIndex[i].checked) {
            pass += passIndex[i].value;
        }
    } 

    let travel = "";
    let travelIndex = document.forms[2];
    for(let i = 0; i < travelIndex.length; i++)
    {
        if(travelIndex[i].checked) {
            travel += travelIndex[i].value;
        }
    } 

console.log(city);
console.log(state);
console.log(pass);
console.log(travel);
abbrState(state);
 data[0] = city;
 data[1] = state;
 data[2] = pass;
 data[3] = travel;   
 console.log(data);   
 return data;  
}
  //Function to convert all state inputs to their ISO code and validate for invalid inputs
function abbrState(input1){
    let input = input1;
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length + 1; i++){
            if (i == 50) {
                console.log("Invalid state entry");
                return alert("Invalid state entry. Please check spellign and try again.")
            }
            if(states[i][0] == input){
                console.log(states[i][1]);
                return(states[i][1])
            } 
        }
} 

 