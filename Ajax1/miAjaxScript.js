var invocation = new XMLHttpRequest();
var url = 'http://localhost:3000/events';

// Realiza el get de los eventos
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
            // Itera y agrega al html
            for (var i = 0; i < obj.length; i++) {
              document.getElementById("content").innerHTML += obj[i].eventName;
            }
          }
      };
      invocation.send();
    }
}

// Listeners
document.getElementById("obtenerInfoBtn").onclick = function(){
  llamarAlServidorYProcesar();
};

document.getElementById("enviarInfoBtn").onclick = function(){
  lamarAlServidorYEnviar();
};

// Realiza un POST
function lamarAlServidorYEnviar(){
  // Prepara el objeto
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
          var obj = JSON.parse(this.responseText);
          console.log(obj);
          console.log(this.responseText);
        }
    };
    invocation.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // Envia la informacion al servidor
    invocation.send(clean(data));
  }
}

// Transforma el json en un string con &
function clean(data){
  return Object.keys(data).map(
      function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
  ).join('&');
}
