
var stateInput = document.querySelector("#stateInput");
var cityInput = document.getElementById("cityInput");
var destinations = [ //[city state, pass, name]
    ["39.501094, -106.141064", "Ikon", "Copper Mountain", "", ""],
    ["39.886426, -105.761774", "Ikon", "Winter Park", "", ""],
    ["43.586701, -110.826689", "Ikon", "Jackson Hole Resort", "", ""],
    ["40.455552, -106.808416", "Ikon", "Steamboat", "", ""],
    ["39.186963, -106.818610", "Ikon", "Aspen Resort", "", ""],
    ["39.605820, -105.951592", "Epic", "Keystone", "", ""],
    ["39.486158, -106.047807", "Epic", "Breckenridge", "", ""],
    ["39.644908, -106.388780", "Epic", "Vail", "", ""],
    ["37.935939, -107.813387", "Epic", "Telluride Resort", "", ""],

];


async function validation() { //main function
   
    let city = cityInput.value; //Used in validation
    let state = stateInput.value; //Used in validation

    if(city == "" || state == ""){ //Handles data validation, if someone doesnt fill in the form and submits, the process ends and the api is never called
        alert("Please fill out the entire form.");
        return console.log("incomplete form");
    }
   
    let data = dataGather(); //Output: [city + state, pass, travel]

    //Uses the url from urlbuilder to hit the distancematrix.ai endpoint, returning an array of distances and times. 
        //Async (as well as validates) to ensure promise finishes before call completes)
    async function fetchTravelInfo(){
        let url = urlBuilder();
        let res;
        //let travelArray = [];

        let options = {
            method: 'GET',
            headers: {
                'Content-Type':
                    'application/json'
            },
        }
     
        let fetchRes = await fetch(
            url,
            options);
            let travelArray = await fetchRes.json()
            console.log(travelArray);
            return travelArray.rows[0].elements;
        } //DO NOT DELETE
        
    let travelArray = await fetchTravelInfo(); //gets data from distance matrix api
    
    //Pulls trip distance (in meters) and duration text and puts it in the destinations array
    for(let i = 0; i < travelArray.length; i++){
        destinations[i][3] = travelArray[i].distance.text;
        destinations[i][4] = travelArray[i].duration.text;
    }
    console.log(destinations);





}


//Function that gathers data from the form and outputs [city + state, pass, travel]
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
//Function to convert all state inputs to their ISO code
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
//formats the requst url to include all origin and destination information, returning a "url" to be passed into the fetch
function urlBuilder() {
    let data = dataGather(); //Output: [city + state, pass, travel]
    let API_Key = "GGWaLc3iLeeNHbbsRlv7lXeyw81Qd4c4GO3cHkVa3pAavHXXOoD0AcmnVVrxZfk3";
    let origin = data[0];
    let resorts = [];
    let pass = data[1];
    let travel = data[2]; //sets the distance unit for the if conditional below
    let url;
    let unit;

    if(travel == "Miles") { //sets the unit to be passed into the url and returned into the destination array
        unit = "imperial"
    } else if (travel == "Kilometers"){
        unit = "metric"
    }
 
    if(pass == "Any") { //builds a string to set the destinations in the below url's
        for(let i = 0; i < destinations.length; i++) {
                resorts = resorts + "|" + (destinations[i][0]);
        }
     
        resorts = resorts.slice(1);
        url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${resorts}&units=${unit}&key=${API_Key}`,
        console.log(url)
        return url;
    }  
    
    for(let i = 0; i < destinations.length; i++) {
        if(pass == destinations[i][1]) {
            resorts = resorts + "|" + (destinations[i][0]);
        }
    }
 
    resorts = resorts.slice(1);
    url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${resorts}&units=${unit}&key=${API_Key}`,
    console.log(url)
    return url;



}