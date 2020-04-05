// utils
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
};

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

    self.image.fileData().dataURL.subscribe(function(dataURL){
      console.log('image');
      addToCanvas(canvas, dataURL);
    });

    self.set.subscribe(function(set){
      if (set!=undefined){
        canvas.setOverlayImage('../assets/set/'+set.id+'.png', function() {
          canvas.overlayImage.scaleToHeight(400);
          canvas.renderAll();
        });
      }
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
          hasControls: false,
          hasRotatingPoint: false
      });
      img.scaleToWidth(300);
      canvas.add(img);
  });
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
            new Player("UK", 65000000),
            new Player("USA", 320000000),
            new Player("Sweden", 29000000)
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
