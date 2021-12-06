import 'package:flutter/material.dart';
import 'dart:js' as js;
import 'dart:html' as html;

import 'package:js/js.dart';

//
// @JS('JSON.stringify')
// external String stringify(Object obj);

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  // final JavascriptRuntime jsRuntime = getJavascriptRuntime();

  void addFromJs(int first, int second) {
    js.context.callMethod("add", [first, second]);
  }

  func() {
    html.Element customDom = html.querySelector(".custom") ?? html.Element.div();
    customDom.style.position = "fixed";
    customDom.style.top = "0px";
    customDom.style.left = "0px";
    customDom.style.zIndex = "100";
    print(customDom);
  }

  String pubData = "";
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    func();

    //setup listener ---------------------------------
    html.window.addEventListener("message", (event) {
      // print(event);
      html.MessageEvent event2 = event as html.MessageEvent;
      // print("Origin: ${event2.origin}");
      print("Get FrontData: " + event2.data);
      setState(() {
        pubData = event2.data ?? "";
      });
    });
    //------------------------------------------------
  }

  void _incrementCounter() {
    js.context.callMethod('alertMessage', ['Flutter is calling upon JavaScript!']);
    addFromJs(1, 2);
    js.context.callMethod('logger', ["hello"]);
    var state = js.JsObject.fromBrowserObject(js.context['state']);
    print(state['hello']);
    html.window.open("https://naver.com", "");
    setState(() {
      _counter++;
    });
  }
  @override
  void dispose() {
    // TODO: implement dispose
    html.window.removeEventListener('message', (e){}, true);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            Text(pubData)
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
