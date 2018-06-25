var table;
var img;

function preload(){
  table = loadTable( "data/data.csv" );
  img = loadImage("data/print.png")
}

function setup(){
  var canvas = createCanvas( 1102,672 );
  canvas.parent("datavia");
  console.log( table.getRowCount());
  console.log( table.getColumnCount());
  //noStroke();

  }


function draw(){
  background(255);
image( img,0,0,width,height);

var dataTipXY = drawLine();
dataTip( dataTipXY[0],dataTipXY[1],dataTipXY[2] );
}

function drawLine(){
  var dataTipX = -1;
  var dataTipY = -1;
  var message = "";
  strokeWeight(0.2);
  var lastXax = 0;
  var lastYax = 0;
  var lastXay = 0;
  var lastYay = 0;
  var lastXaz = 0;
  var lastYaz = 0;
  var markerSize = 5;

  for ( i = 0; i < table.getRowCount(); i++ ){
    var row = table.getRow(i);
    var ax = row.get(0);//accelerometer x reading
    var ay = row.get(1);
    var az = row.get(2);
    var timeStamp = i * 200;
    //x accelerometer
    var y = map(ax,-15,15,0,height );
    var x = map(timeStamp,0,200*table.getRowCount(),0,width );
    fill(220,20,60);
    stroke(220,20,60);
    ellipse( x,y,2,2 );
    line( lastXax,lastYax,x,y);
      if ( mouseX < x + markerSize/2 && mouseX > x - markerSize/2 && mouseY < y + markerSize/2 && mouseY > y - markerSize/2 ){
        dataTipX = x;
        dataTipY = y;
        message = "Acceleration in X=" + ax +"m/s^2\n" + "Time =" + timeStamp + "ms";
      }
    lastXax = x;
    lastYax = y;
    //y accelerometer
    var y = map(ay,-25,5,0,height );
    var x = map(timeStamp,0,200*table.getRowCount(),0,width );
    fill(0,0,128);
    stroke(0,0,128);
    rect( x,y,2,2 );
    line( lastXay,lastYay,x,y);

  
    lastXay = x;
    lastYay = y;
    //z accelerometer
    var y = map(az,-30,10,0,height );
    var x = map(timeStamp,0,200*table.getRowCount(),0,width );
    fill(255,215,0);
    stroke(255,215,0);
    ellipse( x,y,2,2 );
    line( lastXaz,lastYaz,x,y);
    lastXaz = x;
    lastYaz = y;

  }
return [dataTipX,dataTipY,message];
}


function dataTip( x, y,message ){
  if( x > 0 && y > 0 ){
    //console.log( "Acceleration in X=" + ax +"m/s^2");
    //console.log( "Time =" + timeStamp + "ms" );
    var boxWidth = 150;
    var boxHeight = 80;
    fill(128,128,128,32);
    if( y < boxHeight ){
      rect ( x-boxWidth/2, y, boxWidth, boxHeight )
      textSize(18);
      stroke(0,0,0);
      fill(0,0,0);
      text(message, x-boxWidth/2, y, boxWidth, boxHeight)
    }else{
    rect( x-boxWidth/2, y-boxHeight, boxWidth, boxHeight);
    textSize(18);
    stroke(0,0,0);
    fill(0,0,0);
    text(message, x-boxWidth/2, y-boxHeight, boxWidth, boxHeight)
     }

  }
}
