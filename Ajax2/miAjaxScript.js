var urlEvents = 'http://localhost:3000/events';
// Crea el elemento grafico del evento
function printTicket(dataEvent) {
  console.log(dataEvent);
  //Genero el div con el nuevo ticket a imprimit.
  var divContent = '<div id="ticket" class="ticket">';
  divContent += '<label name="ticketNumber"> ' + dataEvent.id + '</label></br></br>';
  divContent += '<div name="eventTitle" class="eventTitle">'+ dataEvent.eventName + '</div></br>';
  divContent += '<p name="eventDate" class="alignRight">' + dataEvent.eventDate + ' - ' + dataEvent.eventTime + '</p></br>';
  divContent += '</div>';

  //Agrego el nuevo ticket al html
  return divContent;
}

// Realiza un get de todos los eventos
function llamarAlServidorYProcesar(){
  $.ajax({
    method: "GET",
    url: urlEvents,
    success: function( result ) {
      console.log(result);
      $( "#ticketPrinter" ).empty();
      for (var i = 0; i < result.length; i++) {
        console.log(result[i]);
        $( "#ticketPrinter" ).append(printTicket(result[i]));
      }
    }
  });
}

// equivalente del document.omload
$(function() {
    llamarAlServidorYProcesar();
});

// Crea el evento haciendo un POST
$("#create_event").submit(function(e) {
  var form = $(this);
  var url = form.attr('action');
  $.ajax({
    method: "POST",
    url: urlEvents,
    data: form.serialize(), // Transforma el form en json
    success: function( result ) {
      $( "#ticketPrinter" ).append(printTicket(result));
    }
  });
  e.preventDefault();
});

// Otra forma de hacer lo mismo
// $("#5").on( "click", function( event ) {
//   $.ajax({
//     method: "POST",
//     url: urlEvents,
//     data: {
//       "eventName":$( "#1" ).val(),
//       "eventPrice":$( "#2" ).val(),
//       "eventDate":$( "#3" ).val(),
//       "eventTime":$( "#4" ).val()
//     },
//     success: function( result ) {
//       $( "#ticketPrinter" ).append(printTicket(result));
//     }
//   });
// });
