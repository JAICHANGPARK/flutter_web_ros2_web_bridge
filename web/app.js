window.state = {
    hello: 'world'
}

window.logger = (flutter_value) => {
   console.log({ js_context: this, flutter_value });
}


function alertMessage(text) {
    alert(text)
}

function add(firstNumber, secondNumber){
//  console.log({ js_context: this, (firstNumber + secondNumber) });
  return firstNumber + secondNumber;
}



