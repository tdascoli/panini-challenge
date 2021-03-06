// utils
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
};

var textbox = {
  'wm1982' : {
    fontSize: 22,
    textAlign: 'center',
    textWeight: '700',
    lineHeight: 0.9,
    fontFamily: 'Inter',
    left: 60,
    top: 320,
    width: 220,
    height: 60,
    selectable: true },
  'wm1986' : {
      fontSize: 22,
      textAlign: 'left',
      textWeight: '700',
      lineHeight: 0.9,
      fontFamily: 'Inter',
      left: 12,
      top: 360,
      width: 220,
      height: 60,
      selectable: true },
  'wm1990' : {
    fontSize: 18,
    textAlign: 'center',
    textWeight: '700',
    lineHeight: 0.9,
    fontFamily: 'Inter',
    left: 92,
    top: 365,
    width: 190,
    height: 60,
    selectable: true },
  'wm1994': {
    fontSize: 24,
    textAlign: 'center',
    textWeight: '700',
    lineHeight: 0.9,
    fontFamily: 'Inter',
    left: 80,
    top: 333,
    width: 200,
    height: 60,
    selectable: true },
  'wm2002' : {
    fontSize: 18,
    textAlign: 'left',
    textWeight: '700',
    lineHeight: 0.9,
    fontFamily: 'Inter',
    left: 14,
    top: 367,
    width: 272,
    height: 60,
    selectable: true },
  'wm2014' : {
    fontSize: 16,
    textAlign: 'center',
    textWeight: '700',
    lineHeight: 0.9,
    fontFamily: 'Inter',
    left: 14,
    top: 367,
    width: 272,
    height: 60,
    selectable: true },
  'wm2018' : {
    fontSize: 16,
    textAlign: 'left',
    textWeight: '700',
    lineHeight: 0.9,
    fontFamily: 'Inter',
    left: 60,
    top: 350,
    width: 272,
    height: 60,
    selectable: true },
  'default' : {
    fontSize: 16,
    textAlign: 'left',
    textWeight: '700',
    lineHeight: 0.9,
    fontFamily: 'Inter',
    left: 60,
    top: 350,
    width: 272,
    height: 60,
    selectable: true }
}
var teamTextbox = {
  'wm1982' : {
    fontSize: 16,
    textAlign: 'center',
    textWeight: '700',
    fontFamily: 'Inter',
    left: 60,
    top: 365,
    width: 220,
    height: 20,
    selectable: true },
  'wm1986' : {
    fontSize: 14,
    textAlign: 'right',
    textWeight: '700',
    fontFamily: 'Inter',
    left: 60,
    top: 10,
    width: 225,
    height: 20,
    selectable: true },
  'wm1990' : {
    fontSize: 14,
    textAlign: 'center',
    textWeight: '700',
    fontFamily: 'Inter',
    left: 92,
    top: 343,
    width: 190,
    height: 20,
    selectable: true },
  'wm1994': {
    fontSize: 24,
    textAlign: 'center',
    textWeight: '700',
    lineHeight: 0.9,
    fontFamily: 'Inter',
    left: 80,
    top: 333,
    width: 200,
    height: 60,
    selectable: true },
  'wm2002' : {
    fontSize: 14,
    textAlign: 'right',
    textWeight: '700',
    fontFamily: 'Inter',
    left: 267,
    top: 290,
    angle: 270,
    width: 200,
    height: 20,
    selectable: true },
  'wm2014' : {
    fontSize: 14,
    textAlign: 'right',
    textWeight: '700',
    fontFamily: 'Inter',
    left: 12,
    top: 390,
    angle: 270,
    width: 200,
    height: 20,
    selectable: true },
  'wm2018' : {
    fontSize: 12,
    textAlign: 'right',
    textWeight: '700',
    fontFamily: 'Inter',
    left: 70,
    top: 372,
    width: 210,
    height: 20,
    selectable: true },
  'default' : {
    fontSize: 12,
    textAlign: 'right',
    textWeight: '700',
    fontFamily: 'Inter',
    left: 70,
    top: 372,
    width: 210,
    height: 20,
    selectable: true }
}

// Models
function File(){
  var self = this;

  self.fileData = ko.observable({
    file: ko.observable(), // will be filled with a File object
    dataURL: ko.observable(), // FileReader.readAsDataURL(Blob|File) - The result property will contain the file/blob's data encoded as a data URL.
    base64String: ko.observable() // just the base64 string, without mime type or anything else
  });
}

function Panini(uuid = uuidv4()){
  var self = this;

  self.uuid = uuid;
  self.name = ko.observable();
  self.set = ko.observable();
  self.image = new File();

  self.canvas = ko.observable();
  //http://fabricjs.com/image-filters
  self.canvas.subscribe(function initCanvas(element) {
    var canvas = new fabric.Canvas(element, {
      preserveObjectStacking: true
    });

    canvas.setWidth(300);
    canvas.setHeight(400);

    // Playername
    var text = new fabric.Textbox("name name", textbox.default);
    canvas.insertAt(text,20);
    // Team
    var team = new fabric.Textbox("FC Länggasse", teamTextbox.default);
    canvas.insertAt(team,30);

    self.image.fileData().dataURL.subscribe(function(dataURL){
      addToCanvas(canvas, dataURL);
      canvas.renderAll();
    });

    self.set.subscribe(function(set){
      if (set!=undefined){
        /*
        canvas.setOverlayImage('./assets/set/'+set.id+'.png', function() {
          canvas.overlayImage.scaleToHeight(400);
          canvas.renderAll();
        });
        */
        addImgToCanvas(canvas, set);
        canvas.renderAll();
      }
    });

    self.name.subscribe(function(name){
      var playername = name.name; //name.name.replace(' ','\n');
      text.set({
        text: playername
      });
      canvas.renderAll();
    });
  });
};

function addToCanvas(canvas, dataURL){
  fabric.Image.fromURL(dataURL, function(img) {
      img.set({
          id: 'img',
          left: 0,
          top: 0,
          selectable: true,
          hasBorders: false,
          hasControls: true,
          hasRotatingPoint: false
      });
      img.scaleToWidth(300);

      var objs = canvas.getObjects();
      if (objs.length) {
          objs.forEach(function(e) {
              if (e && e.id === 'img') {
                  canvas.remove(e);
              }
          });
      }
      canvas.insertAt(img, 0);
  });
}

function addImgToCanvas(canvas, set){
  var imageObj = new Image();
  var path = './assets/set/'+set.id+'.png';
  imageObj.src = path;
  imageObj.onload = function () {
      var img = new fabric.Image(imageObj);
      img.set({
          id: 'set',
          left: 0,
          top: 0,
          selectable: false,
          hasBorders: false,
          hasControls: false,
          hasRotatingPoint: false
      });
      img.scaleToHeight(400);

      var objs = canvas.getObjects();
      if (objs.length) {
          objs.forEach(function(e) {
              if (e && e.id === 'set') {
                  canvas.remove(e);
              }
          });
      }
      canvas.insertAt(img, 0);
  };
}

function Player(name, id) {
    this.name = name;
    this.id = id;
};

function PaniniSet(name, id) {
    this.name = name;
    this.id = id;
};


function GeneratorViewModel(){
  var self = this;

  self.panini = new Panini();

  self.paniniSet = ko.observable();

  self.panini.set.subscribe(function(set){
    console.log('ko',set);
    if (set!=undefined){
      self.paniniSet('panini-sticker__'+set.id);
    }
  });

  self.set = ko.observableArray([
      new PaniniSet('WM 1982', 'wm1982'),
      new PaniniSet("WM 1986", 'wm1986'),
      new PaniniSet("WM 1990", 'wm1990'),
      new PaniniSet("WM 1994", 'wm1994'),
      new PaniniSet("WM 2002", 'wm2002'),
      new PaniniSet("WM 2014", 'wm2014'),
      new PaniniSet("WM 2018", 'wm2018')
  ]);

  self.players = ko.observableArray([
      new Player("Hans Müller", 1),
      new Player("Peter Meister", 2),
      new Player("Silvio Bernasconi", 3)
  ]);

  self.save = function(){
    var panini = {
        "image":self.panini.image,
    };
    console.log('save',ko.toJSON(panini));
  };
};

// KO
ko.bindingHandlers.canvas = {
  init: function(element, valueAccessor) {
    valueAccessor()(element);
  }
}

ko.fileBindings.defaultOptions = {
  wrapperClass: 'input-group',
  fileNameClass: 'disabled form-control',
  noFileText: 'Kein Bild ausgewählt',
  buttonGroupClass: 'input-group-append',
  buttonClass: 'btn btn-secondary',
  clearButtonClass: 'btn btn-warning',
  buttonText: 'Bild auswählen',
  changeButtonText: 'Ändern',
  clearButtonText: 'Löschen',
  fileName: true, // show the selected file name?
  clearButton: true, // show clear button?
  onClear: function(fileData, options) {
      if (typeof fileData.clear === 'function') {
          fileData.clear();
      }
  }
};

// change a default option
ko.fileBindings.defaultOptions.buttonText = 'Auswählen';


ko.applyBindings(new GeneratorViewModel());
