var Logger = function(host, port) {

	this.host = 'localhost';
	//this.host = 'aji.local';
	//this.host = '172.20.101.56';
	this.port = port;

	this.connected = false;
	this._msgs = [];
	// just to queued up the messages
	Ti.API.log('DEBUG', 'Intialized logger with params:' + this.host + this.port);

	var self = this;

	////
	var socket = Ti.Network.Socket.createTCP({
		host : this.host,
		port : this.port,
		connected : function(e) {
			Ti.API.info('Socket opened!');
			Ti.Stream.pump(e.socket, readCallback, 10840, true);
			Ti.Stream.write(socket, Ti.createBuffer({
				value : 'Client connected!'
			}), writeCallback);
		},
		error : function(e) {
			Ti.API.info('Error (' + e.errorCode + '): ' + e.error);
			Ti.API.info('Error Reading from Server');
		},
	});
	socket.connect();

	function writeCallback(e) {
		//Ti.API.info('Successfully wrote to socket.');
	}

	function readCallback(e) {
		if (e.bytesProcessed == -1) {

		}
		try {
			if (e.buffer) {
				var received = e.buffer.toString();
				Ti.API.info('Received: ' + received);
				incomingData(received);
			} else {
				Ti.API.error('Error: read callback called with no buffer!');
			}
		} catch (ex) {
			Ti.API.error(ex);
			logInternal('Caught exception in readCallback:' + ex);
		}
	}

	///////////

	function incomingData(data) {
		Ti.API.log('INFO', 'executing code from console');
		try {
			//eval(data+'');
			(1, eval)(data + '');
			//eval('(function(){' + msg.data + '})()' );
			//Ti.API.fireEvent('invokeEval',  {data: msg.data});
			//Ti.API.log('INFO', "->" + data + "<-");
		} catch(ex) {
			Ti.API.info('Caught exception in incomingData:' + ex);
			logInternal('Caught exception in incomingData:' + ex);
		};
	};

	// function ensureConnection() {
	// if(socket.isValid) {return; };
	// this.connected = false;
	// var self = this;
	// var attempts = 0;
	// var checkSocketConnected = setInterval( function() {
	// self.connected = self.socket && self.socket.isValid;
	// attempts++;
	// if(attempts > 3) {
	// clearInterval(checkSocketConnected);
	// Ti.API.debug('Giving up trying to connect to Logging server');
	// };
	// if(self.connected) {
	// clearInterval(checkSocketConnected);
	// log('===========================================');
	// log('Device ' + Titanium.Platform.macaddress + ' connected (' + String.formatDate( new Date(), 'medium') + ')');
	// for(var i = 0, len = self._msgs.length; i < len; i++ ) {
	// log(self._msgs[i]);
	// };
	// self._msgs = [];
	// } else {
	// self.socket.connect(); // attempt to connect
	// };
	// }, 1000);
	// */
	// };

	/*
	 Log a message to the remote logging server
	 If the socket is not ready, queue up the messages to an array that will be sent when there's a good connection
	 */
	function logInternal(msg) {
		if (msg === null) {
			msg = '';
		};// make sure it doesn't bomb out on null objects
		try {
			// this.ensureConnection();
			if (socket.state === Titanium.Network.Socket.CONNECTED) {
				//msg = msg + '\n';
				//socket.write(JSON.stringify(msg));
				var encodedMsg = '\n' + msg;
				//JSON.stringify(msg);
				Ti.API.info("Sending result back:" + encodedMsg);
				Ti.Stream.write(socket, Ti.createBuffer({
					value : encodedMsg
				}), writeCallback);
			} else {
				this._msgs.push(msg);
				// queue up the msg
			};
		} catch (ex) {
			Ti.API.debug(ex);
		};
	};

	return logInternal;
}
