const token={}

getToken()
async function getToken() {
    const response =await  fetch('/user/getToken')
    const data =await  response.json()
    console.log(data)
}

async function getFulldata() {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer "+token.value
        }
    }
    const response = await fetch('/nedbDemo/fullData',options)
    const data = await response.json()
    var object = JSON.stringify(data,undefined, 4);

    document.getElementById('fulldata').innerHTML = object;
}

function emptyFulldata() {
    document.getElementById('fulldata').innerHTML = "";
}

// Uses path parameter
async function getGenderData() {
    var gender = document.getElementById('gender').value;

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer "+token.value
        }
    }

    const response = await fetch('/nedbDemo/genderData/'+gender, options)
    const data = await response.json()
    var object = JSON.stringify(data,undefined, 4);

    document.getElementById('genderData').innerHTML = object;
}

function emptytGenderData() {
    document.getElementById('genderData').innerHTML = "";
}

// Uses header Parameters
async function getIdData() {
    var id = document.getElementById('_id').value;

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'id': id,
            'Authorization': "Bearer "+token.value
        }
    }
    
    const response = await fetch('/nedbDemo/getIdData', options)
    const data = await response.json()
    var object = JSON.stringify(data,undefined, 4);

    document.getElementById('idData').innerHTML = object;
}

function emptyIdData() {
    document.getElementById('idData').innerHTML = "";
}

async function compareWeights() {
    var weight = document.getElementById('weight').value;

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'weight': weight,
            'Authorization': "Bearer "+token.value
        }
    }
    
    const response = await fetch('/nedbDemo/compareWeights', options)
    const data = await response.json()
    var object = JSON.stringify(data,undefined, 4);

    document.getElementById('compareWeights').innerHTML = object;
}

function emptyCompareWeights() {
    document.getElementById('compareWeights').innerHTML = "";
}

async function inOperator() {
    var inOperator = document.getElementById('in').value;
  
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'inOperator': inOperator,
            'Authorization': "Bearer "+token.value
        }
    }
    
    const response = await fetch('/nedbDemo/inOperator', options)
    const data = await response.json()
    var object = JSON.stringify(data,undefined, 4);

    document.getElementById('inOperator').innerHTML = object;
}

function emptyInOperator() {
    document.getElementById('inOperator').innerHTML = "";
}

async function substring() {
    var substring = document.getElementById('substring').value;
  
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'substring': substring,
            'Authorization': "Bearer "+token.value
        }
    }
    
    const response = await fetch('/nedbDemo/substringData', options)
    const data = await response.json()
    var object = JSON.stringify(data,undefined, 4);

    document.getElementById('substringData').innerHTML = object;
}

function emptySubstring() {
    document.getElementById('substringData').innerHTML = "";
}

// Uses query parameter
async function compareLatLon() {
    var compareLat = document.getElementById('compareLat').value;
    var compareLon = document.getElementById('compareLon').value;
  
    const compareData={compareLat,compareLon}

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer "+token.value
        }
    }
    
    const response = await fetch('/nedbDemo/compareData?' + new URLSearchParams(compareData), options)
    const data = await response.json()
    var object = JSON.stringify(data,undefined, 4);

    document.getElementById('CompareLatLon').innerHTML = object;
}

function emptyCompareLatLon() {
    document.getElementById('CompareLatLon').innerHTML = "";
}
