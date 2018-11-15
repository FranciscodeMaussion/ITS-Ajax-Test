var invocation = new XMLHttpRequest();
var url = 'http://localhost:3000/events';
function llamarAlServidorYProcesar(){
  if(invocation)
    {
      invocation.open('GET', url, true);
      invocation.onreadystatechange =  function() {
          if(this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(this.state);
            console.log(obj);
            console.log(this.responseText);
            document.getElementById("content").innerHTML = "";
            for (var i = 0; i < obj.length; i++) {
              document.getElementById("content").innerHTML += obj[i].eventName;
            }
          }
      };
      invocation.send();
    }
}

document.getElementById("obtenerInfoBtn").onclick = function(){
  llamarAlServidorYProcesar();
};

document.getElementById("enviarInfoBtn").onclick = function(){
  lamarAlServidorYEnviar();
};
// invocation.setRequestHeader('Access-Control-Allow-Origin', '*');
// invocation.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// invocation.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// invocation.setRequestHeader('Access-Control-Allow-Credentials', true);

function lamarAlServidorYEnviar(){
  var data = {
    "eventName":"Mega Eventos!",
    "eventPrice":123,
    "eventDate":"2018-11-10",
    "eventTime":"09:00:00"
  }
  if(invocation){
    invocation.open('POST', url, true);
    invocation.onreadystatechange =  function() {
        if(this.readyState == 4 && this.status == 200) {
          // Request finished. Do processing here.
          var obj = JSON.parse(this.responseText);
          console.log(obj);
          console.log(this.responseText);
        }
    };
    invocation.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    invocation.send(clean(data));
  }
}

function clean(data){
  return Object.keys(data).map(
      function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
  ).join('&');
}
