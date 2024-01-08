
var stateInput = document.querySelector("#stateInput");
var cityInput = document.getElementById("cityInput");
var destinations = [ //[city state, pass, name]
    ["Copper Mountain CO, US", "Ikon", "Copper Mountain"],
    ["39.886426, -105.761774", "Ikon", "Winter Park"],
    ["Jackson Wy US", "Ikon", "Jackson Hole Resort"],
    ["Steamboat Springs CO, US", "Ikon", "Steamboat"],
    ["Aspen CO, US", "Ikon", "Aspen Resort"],
    ["Keystone CO, US", "Epic", "Keystone"],
    ["Breckenridge CO, US", "Epic", "Breckenridge"],
    ["Vail CO, US", "Epic", "Vail"],
    ["Telluride CO, US","Epic", "Telluride Resort"],

];

// https://api.distancematrix.ai/maps/api/distancematrix/json?origins=51.4822656,-0.1933769&destinations=51.4994794,-0.1269979&key=${API_Key}
//Contains api requests and sorting of return data
function validation() {
   
    let city = cityInput.value;
    let state = stateInput.value;

    if(city == "" || state == ""){
        alert("Please fill out the entire form.");
        return console.log("incomplete form");
    }
   
    let data = dataGather(); //Output: [city, state, pass, travel]

   //let API_Key = "GGWaLc3iLeeNHbbsRlv7lXeyw81Qd4c4GO3cHkVa3pAavHXXOoD0AcmnVVrxZfk3";
   
    fetchTravelInfo();

    

    if(data == "Ikon") { //ikon resort API call





    } else if (data == "Epic") { // Epic resort API call
        
    } else { // Any resort api call
        
    }
}


//Function that gathers data from the form and outputs [city, state, pass, travel]
    //This function calls the abbrState function, converting state in the process. 
function dataGather() {
    let city = cityInput.value;
    let state = stateInput.value;
    let data = [];

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
state = abbrState(state);
 data[0] = city + ", " + state + ", US";
 data[1] = pass;
 data[2] = travel;   
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

function fetchTravelInfo(){
    let url = urlBuilder();
    //let data = dataGather(); //Output: [city, state, pass, travel]
    let res;

    let options = {
        method: 'GET',
        headers: {
            'Content-Type':
                'application/json'
        },
    }
     
    let fetchRes = fetch(
        url,
        options);
    fetchRes.then(res =>
        res.json()).then(d => {
            console.log(d)
            return res;
        })

}

function urlBuilder() {
    let data = dataGather(); //Output: [city, state, pass, travel]
    let API_Key = "GGWaLc3iLeeNHbbsRlv7lXeyw81Qd4c4GO3cHkVa3pAavHXXOoD0AcmnVVrxZfk3";
    let origin = data[0];
    let resorts = [];
    let pass = data[1];
    let url;

    
    if(pass == "Any") {
        for(let i = 0; i < destinations.length; i++) {
                resorts = resorts + "|" + (destinations[i][0]);
        }
     
        resorts = resorts.slice(1);
        url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${resorts}&key=${API_Key}`,
        console.log(url)
        return url;
    }  
    
    for(let i = 0; i < destinations.length; i++) {
        if(pass == destinations[i][1]) {
            resorts = resorts + "|" + (destinations[i][0]);
        }
    }
 
    resorts = resorts.slice(1);
    url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${resorts}&key=${API_Key}`,
    console.log(url)
    return url;



}