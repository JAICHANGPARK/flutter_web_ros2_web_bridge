  // Connecting to ROS
  // -----------------
  var ros = new ROSLIB.Ros();

  // If there is an error on the backend, an 'error' emit will be emitted.
  ros.on('error', function(error) {
<!--    document.getElementById('connecting').style.display = 'none';-->
<!--    document.getElementById('connected').style.display = 'none';-->
<!--    document.getElementById('closed').style.display = 'none';-->
<!--    document.getElementById('error').style.display = 'inline';-->
    console.log(error);
  });

  // Find out exactly when we made a connection.
  ros.on('connection', function() {
    console.log('Connection made!');

<!--    document.getElementById('connecting').style.display = 'none';-->
<!--    document.getElementById('error').style.display = 'none';-->
<!--    document.getElementById('closed').style.display = 'none';-->
<!--    document.getElementById('connected').style.display = 'inline';-->
  });

  ros.on('close', function() {
    console.log('Connection closed.');
<!--    document.getElementById('connecting').style.display = 'none';-->
<!--    document.getElementById('connected').style.display = 'none';-->
<!--    document.getElementById('closed').style.display = 'inline';-->
  });

  // Create a connection to the rosbridge WebSocket server.
  ros.connect('ws://localhost:9090');

  // Publish a Topic
  var example = new ROSLIB.Topic({
    ros : ros,
    name : '/example_topic',
    messageType : 'std_msgs/String'
  });

  var count = 0;
  setInterval(() => {
    var message = 'hello from ros2bridge ' + count++;
    example.publish({data: message});
    console.log('publish' + message);
     window.parent.postMessage('publish' + message, "*");
<!--    document.getElementById("publisher").innerText = message;-->
  }, 1000);

  // Subscribe a Topic
  example.subscribe(function(message) {
   console.log('subscribe');
   window.parent.postMessage('any message', "*");
<!--    document.getElementById("subscription").innerText = message.data-->
  });