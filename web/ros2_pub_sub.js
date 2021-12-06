  // Connecting to ROS
  // -----------------
  var ros = new ROSLIB.Ros();
  var isConnected = false;
   var count = 0;

  // If there is an error on the backend, an 'error' emit will be emitted.
  ros.on('error', function(error) {

    console.log(error);
  var obj = new Object();
   obj.connecting  = false;
   obj.connected  = false;
   obj.closed  = false;
   obj.error  = error;
   var jsonString= JSON.stringify(obj);
   console.log(error + jsonString);
     window.parent.postMessage(jsonString, "*");
  });

  // Find out exactly when we made a connection.
  ros.on('connection', function() {
    console.log('Connection made!');
    isConnected = true;

    var obj = new Object();
       obj.connecting  = false;
       obj.connected  = true;
       obj.closed  = false;
       obj.error  = "";
       var jsonString= JSON.stringify(obj);
       console.log('Connection made!' + jsonString);
         window.parent.postMessage(jsonString, "*");

  });

  ros.on('close', function() {
    console.log('Connection closed.');
    isConnected = false;
    var obj = new Object();
       obj.connecting  = false;
           obj.connected  = false;
           obj.closed  = true;
           obj.error  = "";
           var jsonString= JSON.stringify(obj);
             window.parent.postMessage(jsonString, "*");
  });

  // Create a connection to the rosbridge WebSocket server.
  ros.connect('ws://localhost:9090');

  // Publish a Topic
  var example = new ROSLIB.Topic({
    ros : ros,
    name : '/example_topic',
    messageType : 'std_msgs/String'
  });


  setInterval(() => {
    var message = 'hello from ros2bridge ' + count++;
    example.publish({data: message});
    if(isConnected){
     console.log('publish' + message);
//         window.parent.postMessage('publish' + message, "*");
    }else{
       console.log("Not Connected");
    }

  }, 1000);

  // Subscribe a Topic
  example.subscribe(function(message) {
   console.log('subscribe'+ message);
   window.parent.postMessage(""+message.data, "*");
  });