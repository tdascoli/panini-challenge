(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
  width: 300,
  height: 400,
  fps: 24,
  color: "#FFFFFF",
  manifest: [
    {src:"img/clublogos/superleague/youngboys.png", id:"clublogo"},
    {src:"img/sticker/superleague.png", id:"league"},
    {src:"uploads/croppic/5e7de3be57fb3.jpg", id:"player"}
  ]
};



// symbols:



(lib.clublogo = function() {
  this.initialize(img.clublogo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,80,80);


(lib.league = function() {
  this.initialize(img.league);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,80,77);


(lib.player = function() {
  this.initialize(img.player);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,400);


// stage content:
(lib.superleage = function() {
  this.initialize();

  // clublogo
  this.instance = new lib.clublogo();
  this.instance.setTransform(198,264);

  // bl-logo
  this.instance_1 = new lib.league();
  this.instance_1.setTransform(18,18);

  // text
  this.text = new cjs.Text("TEst TEST", "bold 18px 'Roboto'", "#FFFFFF");
  this.text.textAlign="center";
  this.text.lineHeight = 20;
  this.text.lineWidth = 256;
  this.text.setTransform(148,347);

  // sticker
  this.shape = new cjs.Shape();
  this.shape.graphics.lf(["#707D86","#A5B4C0"],[0,0.376],0,187,0,-187).s().p("A1YbEMgABg2GQAAiKCJAAMAmggABQCJAAAACKMAABA2HQAACJiJAAMgmgAABQiJAAAAiKgAzQ8kQhhAAAABiMAABAu4MApigABMgABgu4QAAhihhAAg");
  this.shape.setTransform(150,200);

  this.shape_1 = new cjs.Shape();
  this.shape_1.graphics.f("#999999").s().p("A3bfPMAAAg+eMAu2AAAMAAAA+egA3RfFMAuiAAAMAAAg+KMguiAAAg");
  this.shape_1.setTransform(150,200);

  this.shape_2 = new cjs.Shape();
  this.shape_2.graphics.f("#FFFFFF").s().p("A3RfFMAAAg+KMAuiAAAMAAAA+KgA1Z7CMAAAA2GQABCKCJAAMAmgAAAQCJAAAAiKMAAAg2GQAAiLiJAAMgmgAAAIgBAAQiJAAAACLg");
  this.shape_2.setTransform(150,200);

  // foto
  this.instance_2 = new lib.player();

  this.addChild(this.instance_2,this.shape_2,this.shape_1,this.shape,this.text,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(150,200,300,400);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;






var canvas, stage, exportRoot;

function init2() {
  canvas = document.getElementById("canvas");
  images = images||{};

  var loader = new createjs.LoadQueue(false);
  loader.addEventListener("fileload", handleFileLoad);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt) {
  if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {
  exportRoot = new lib.superleage();

  stage = new createjs.Stage(canvas);
  stage.addChild(exportRoot);
  stage.update();

  createjs.Ticker.setFPS(lib.properties.fps);
  //createjs.Ticker.addEventListener("tick", stage);
}

$(document).ready(function() {
  $("#picsend").click(function() {
    var canvas  = document.getElementById("canvas");
//			var dataUrl = canvas.toDataURL();
    var dataUrl = canvas.toDataURL('image/jpeg', 1);
    document.getElementById("imgdata").value = dataUrl;
    document.getElementById("myform").submit();
  });
});
