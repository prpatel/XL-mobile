
var Logger = function(host,port) {
	
  this.host = host;
  this.port = port;
  this.socket = null;
  this.connected = false;
  this._msgs = []; // just to queued up the messages
  Ti.API.log('DEBUG', 'Intialized logger with params:' + this.host + this.port);
  function connect() {
  var self = this;
  this.socket = Ti.Network.createTCPSocket( {
    hostName: this.host, 
    port: this.port,
    mode: Ti.Network.READ_WRITE_MODE
  });
  this.socket.addEventListener('read', function(msg) {
  	Ti.API.log('DEBUG', 'executing code from console');
    try {
    	   eval(msg.data+'');
       //eval('(function(){' + msg.data + '})()' );
	   //Ti.API.fireEvent('invokeEval',  {data: msg.data});
	   Ti.API.log('DEBUG', "->" + msg.data + "<-");
    } catch(ex) {
      log(ex);
    };
  });
  this.socket.addEventListener('readError', function(){
    Ti.API.debug('Error Reading from Logging Server');
    self.connected = false;
    // self.ensureConnection();
  });
  this.socket.addEventListener('writeError', function() {
    Ti.API.debug('Error Writing to Logging Server');
    self.connected = false;
    // self.ensureConnection();
  });
  ensureConnection();
 }

  function ensureConnection() {
  if(this.socket.isValid) {return; };
  this.connected = false;
  var self = this;
  var attempts = 0;
  var checkSocketConnected = setInterval( function() {
    self.connected = self.socket && self.socket.isValid;
    attempts++;
    if(attempts > 3) { 
      clearInterval(checkSocketConnected);
      Ti.API.debug('Giving up trying to connect to Logging server');
    };
    if(self.connected) {
      clearInterval(checkSocketConnected);
      log('===========================================');
      log('Device ' + Titanium.Platform.macaddress + ' connected (' + String.formatDate( new Date(), 'medium') + ')');
      for(var i = 0, len = self._msgs.length; i < len; i++ ) {
        log(self._msgs[i]);
      };
      self._msgs = [];
    } else {
      self.socket.connect(); // attempt to connect
    };
  }, 1000);
};

/*
 Log a message to the remote logging server
 If the socket is not ready, queue up the messages to an array that will be sent when there's a good connection
*/
function log(msg) {
  if(msg === null) { msg = ''; }; // make sure it doesn't bomb out on null objects
  try {
    // this.ensureConnection();
    if(this.connected) {
      this.socket.write(JSON.stringify(msg));
    } else {
      this._msgs.push(msg); // queue up the msg
    };
  } catch (ex) {
    Ti.API.debug(ex);
  };
};
connect();
return log;
}