//html templates 27.27
var template1 = '<div><div><h5>';
var template2 = '</h5><p>';
var template3 = '</p></div></div>';

//----------------------------------------------------------chat system
var chatGroupHeight;
function Set_Chat_Group_Height(size){chatGroupHeight = ($( window ).height()) * size -$("#ChatTitles").height() - 50; }
//function Set_Chat_CSS_Show_Chat(){$( "#chatGroups" ).height( chatGroupHeight ).css({});}


const socket = io();

socket.on('message', message => {
  var msgTemplate = template1 + 'User' + template2 + message + template3;
  $("#MessageCollection").append(msgTemplate);
  Auto_Scroll_Down();
});

function Auto_Scroll_Down(){
  $('#MessageCollection').animate({
      scrollTop: $('#MessageCollection').get(0).scrollHeight
  }, 500);
}


//----------------------------------------------------------chat system
$(document).ready(function () {

    //Set_Chat_Group_Height(1);

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');

    });

    $("#BtnStreetSearch").click(function(){
      LYA_Street_Search($("#TxtStreet").val());
    });

    $("#BtnSend").click(function(){
      //LYA_Street_Search($("#TxtStreet").val());
      var msg = $("#TxtMsg").val();
      socket.emit('chatMessage', msg);
      Auto_Scroll_Down();
      $("#TxtMsg").val("");
    });

    $("#BtnFinancial").click(function(){
      $( "#dynamicContent" ).load( "./pages/financial.html" );
    });


    //show/hide chatGroups
    /*$('#Link25').click( function(e) { Set_Chat_Group_Height(0.25);$("#chatGroups").height(chatGroupHeight).collapse('show');} );
    $('#Link50').click( function(e) { Set_Chat_Group_Height(0.5);  $("#chatGroups").height(chatGroupHeight).collapse('show');} );
    $('#Link100').click( function(e) { Set_Chat_Group_Height(1); $("#chatGroups").height(chatGroupHeight).collapse('show');} );*/
    $('#LinkHide').click( function(e) { Set_Chat_Group_Height(1); $("#chatGroups").height(chatGroupHeight).toggle("fast"); } );
});



/*
<li class="nav-item">
  <div class="input-group float-right">
    <input id="TxtStreet" type="text" class="form-control" aria-label="Text input with dropdown button">
    <div class="input-group-append">
      <button id="BtnStreetSearch" class="btn btn-secondary" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Search</button>
      <div id="StreetSelect" class="dropdown-menu">
      </div>
    </div>
  </div>
</li>
*/

function LYA_Street_Search(txt){
  $.get( "https://lotyouraddress.com/lya_streets.php", { street: txt } )
  .done(function( data ) {
    console.log( "Data Loaded: " + data );
    Process_Street_Data(data);
  });
}

function Process_Street_Data(data){
  $("#StreetSelect").html("");
  var jsonData = JSON.parse(data);
  for (var i = 0; i < jsonData.length; i++) {
      var d = jsonData[i];
      var STREET_NAME = d.STREET_NAME;
      var STREET_TYPE_CODE = d.STREET_TYPE_CODE;
      var Suburb = d.Suburb;
      var Postcode = d.Postcode;
      var full_txt = STREET_NAME + " " + STREET_TYPE_CODE + ", " + Suburb + ", " + Postcode;
      var txt_to_html = '<a class="dropdown-item" href="#">' + full_txt + '</a>';
      $( "#StreetSelect" ).append( txt_to_html );
  }
  //$('#StreetSelect dropdown-toggle').dropdown();
}
