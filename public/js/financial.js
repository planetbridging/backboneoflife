
var financialData = new Array();
var searchTerms = new Array();


$("#BtnFinancialUpdate").click(function(){
  processResults();
});

function processResults(){
  searchTerms = new Array();
  var lines = $('#TxtSearchTerms').val().split('\n');
  for(var i = 0;i < lines.length;i++){
    var canProcess = lines[i].includes(",");
    if(canProcess){
      searchTerms.push(lines[i]);
    }
  }
}

function processTotalResult(){
  var totalItemsCount = 0;
  var totalItemsSelected = 0;
  var totalItemsUnknown = 0;
  var dataPoints = new Array();
  for(var i = 0;i < financialData.length;i++){
    /*for(var s = 0;s < searchTerms.length;s++){
    }*/
    if(financialData[i][2]){
      var canProcess = lines[line].includes(",");
    }
  }
}

function loadChart(){
  var chart = new CanvasJS.Chart("chartTotal",
    {
      title:{
        text: "Gaming Consoles Sold in 2012"
      },
      legend: {
        maxWidth: 350,
        itemWidth: 120
      },
      data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{indexLabel}",
        dataPoints: [
          { y: 4181563, indexLabel: "PlayStation 3" },
          { y: 2175498, indexLabel: "Wii" },
          { y: 3125844, indexLabel: "Xbox 360" },
          { y: 1176121, indexLabel: "Nintendo DS"},
          { y: 1727161, indexLabel: "PSP" },
          { y: 4303364, indexLabel: "Nintendo 3DS"},
          { y: 1717786, indexLabel: "PS Vita"}
        ]
      }
      ]
    });
    chart.render();
}

const output = document.getElementById('output');
if (window.FileList && window.File) {
  document.getElementById('file-selector').addEventListener('change', event => {
    output.innerHTML = '';
    for (const file of event.target.files) {
      const li = document.createElement('li');
      const name = file.name ? file.name : 'NOT SUPPORTED';
      const type = file.type ? file.type : 'NOT SUPPORTED';
      const size = file.size ? file.size : 'NOT SUPPORTED';
      li.textContent = `name: ${name}, type: ${type}, size: ${size}`;
      output.appendChild(li);

      readFile(file);

    }
  });
}

function readFile(file) {
let reader = new FileReader();

reader.readAsText(file);

reader.onload = function() {
//console.log(reader.result);
//processData(reader.result);
processData(reader.result);
};

reader.onerror = function() {
console.log(reader.error);
};

}

function processData(data) {


var lines = data.split('\n');
for(var line = 0; line < lines.length; line++){
  //console.log(lines[line]);
  var canProcess = lines[line].includes(",");
  if(canProcess){

    var splitData = lines[line].split(",");
    //console.log(splitData[1]);
    financialData.push(splitData);
  }
}



}
