const token={}

// function adjustHeight(el){
//     el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "60px";
// }

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

function getLatLon() {
    if ('geolocation' in navigator) {
        console.log('goelocation available')
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            document.getElementById('latitude').textContent = lat
            document.getElementById('longitude').textContent = lon

            const location = { lat, lon };

            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(location)
            }
        
            fetch('/form/location', options)
        })
    }
    else {
        console.log('goelocation not available')
    }
}

async function verifyToken(){
    token.value=document.getElementById('token').value

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer "+token.value
        }
    }
    console.log(options)
    const response = await fetch('/user/verifyToken', options)
    const data = await response.json()
    var object = JSON.stringify(data,undefined, 4)

    document.getElementById('decodedtoken').textContent = object;
    document.getElementById('settoken').value ="Bearer "+token.value;
}
