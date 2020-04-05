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

  self.fileData().base64String.subscribe(function(base64String){
    //sendToServer(base64String);
    console.log('base64String');
  });
}

function Panini(uuid = uuidv4()){
  var self = this;

  self.uuid = uuid;
  self.name = ko.observable();
  self.image = new File();
};

function GeneratorViewModel(){
  var self = this;

  self.panini = new Panini();

  self.myCanvas = ko.observable();

  self.myCanvas.subscribe(function initCanvas(element) {
    self.panini.image.fileData().dataURL.subscribe(function(dataURL){
      console.log('image');
      var canvas = new fabric.Canvas(element, {
          preserveObjectStacking: true
      });

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
          canvas.add(img);
          img.bringToFront();
          canvas.renderAll();
      });
    });
  });

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
  noFileText: 'No file chosen',
  buttonGroupClass: 'input-group-append',
  buttonClass: 'btn btn-secondary',
  clearButtonClass: 'btn btn-warning',
  buttonText: 'Choose File',
  changeButtonText: 'Change',
  clearButtonText: 'Clear',
  fileName: true, // show the selected file name?
  clearButton: true, // show clear button?
  onClear: function(fileData, options) {
      if (typeof fileData.clear === 'function') {
          fileData.clear();
      }
  }
};

// change a default option
ko.fileBindings.defaultOptions.buttonText = 'Browse';


ko.applyBindings(new GeneratorViewModel());
