
var stateInput = document.querySelector("#stateInput");
var cityInput = document.getElementById("cityInput");
var destinations = [ //[city state, pass, name, holding for time, holding for distance, holding for time id]
    ["39.501094, -106.141064", "Ikon", "Copper Mountain", "", "", {time: 0}], //The empty elements at the end of this array are to store data from the api.
    ["39.886426, -105.761774", "Ikon", "Winter Park", "", "", {time: 0}],
    ["43.586701, -110.826689", "Ikon", "Jackson Hole Resort", "", "", {time: 0}],
    ["40.455552, -106.808416", "Ikon", "Steamboat", "", "", {time: 0}],
    ["39.186963, -106.818610", "Ikon", "Aspen Resort", "", "", {time: 0}],
    ["39.605820, -105.951592", "Epic", "Keystone", "", "", {time: 0}],
    ["39.486158, -106.047807", "Epic", "Breckenridge", "", "", {time: 0}],
    ["39.644908, -106.388780", "Epic", "Vail", "", "", {time: 0}],
    ["37.935939, -107.813387", "Epic", "Telluride Resort", "", "", {time: 0}],
    ["39.642140, -105.873284", "Ikon", "Arapaho Basin", "", "", {time: 0}],
    ["38.410037, -79.994198", "Ikon", "Snowshoe Mountain Resort", "", "", {time: 0}],
    ["40.686594, -111.546415", "Ikon", "Solitude Resort", "", "", {time: 0}],
    ["40.653490, -111.508428", "Epic", "Park City", "", "", {time: 0}]

];


async function validation() { //main function
    let city = cityInput.value; //Used in validation
    let state = stateInput.value; //Used in validation

    if(city == "" || state == ""){ //Handles data validation, if someone doesnt fill in the form and submits, the process ends and the api is never called
        alert("Please fill out the entire form.");
        return console.log("incomplete form");
    }
    
    document.getElementById('outputHeader').innerHTML = 'Loading travel info...';
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


    let pass;
    pass = data[1]; //pass type
    //Pulls trip distance (in meters) and duration text and puts it in the destinations array
    for(let i = 0; i < travelArray.length; i++){
        if(travelArray[i].status == "ZERO_RESULTS") {
            document.getElementById('outputHeader').innerHTML = 'Results not found, please check location spelling and try again:';
        }
        if(pass == destinations[i][1]) {
            destinations[i][3] = travelArray[i].distance.text;
            destinations[i][4] = travelArray[i].duration.text;
            destinations[i].time = travelArray[i].duration.value;
        } else if (pass == "Any") {
            destinations[i][3] = travelArray[i].distance.text;
            destinations[i][4] = travelArray[i].duration.text;
            destinations[i].time = travelArray[i].duration.value;
        }
    }

    destinations = destinations.sort(({time: a}, {time: b}) => a - b); //Sorts the destination array by duration value (seconds)

    console.log(destinations);

    //write results back into html page
    document.getElementById('outputHeader').innerHTML = 'Your travel information is:';
     
    let outputString = "";
    for(let i = 0; i < destinations.length; i++) {
        if(pass == destinations[i][1]) {
            outputString = outputString + "<b>" + destinations[i][2] + "</b>" + ": " + destinations[i][4] + " (" + destinations[i][3] + ")." + "<br>";
        } else if (pass == "Any") {
            outputString = outputString + "<b>" + destinations[i][2] + "</b>" + ": " + destinations[i][4] + " (" + destinations[i][3] + ")." + "<br>";
        }
    }
    console.log(pass);
    console.log(outputString);
    document.getElementById('functionOutput').innerHTML =  `${outputString}`;
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
 data[0] = city + ", " + state + ", US";
 data[1] = pass;
 data[2] = travel;   
 console.log(data);   
 return data;  
}

//formats the requst url to include all origin and destination information, returning a "url" to be passed into the fetch
function urlBuilder() {
    let data = dataGather(); //Output: [city + state, pass, travel]
    let API_Key = "GGWaLc3iLeeNHbbsRlv7lXeyw81Qd4c4GO3cHkVa3pAavHXXOoD0AcmnVVrxZfk3";
    let origin = data[0];
    let resorts = [];
    //let pass = data[1];
    let travel = data[2]; //sets the distance unit for the if conditional below
    let url;
    let unit;

    if(travel == "Miles") { //sets the unit to be passed into the url and returned into the destination array
        unit = "imperial"
    } else if (travel == "Kilometers"){
        unit = "metric"
    }
 
    //if(pass == "Any") { //builds a string to set the destinations in the below url's
        for(let i = 0; i < destinations.length; i++) {
                resorts = resorts + "|" + (destinations[i][0]);
        }
     
        resorts = resorts.slice(1);
        url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${resorts}&units=${unit}&key=${API_Key}`,
        console.log(url)
        return url;
    //}  
    
    /*for(let i = 0; i < destinations.length; i++) {
        if(pass == destinations[i][1]) {
            resorts = resorts + "|" + (destinations[i][0]);
        }
    }
 
    resorts = resorts.slice(1);
    url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${resorts}&units=${unit}&key=${API_Key}`,
    console.log(url)
    return url;
*/
}