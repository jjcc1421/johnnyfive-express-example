const five = require('johnny-five');
const board = new five.Board({
  repl: false
});
const express = require('express')
const app = express()
const port = 3000


board.on('ready', () => {
  const led = new five.Led(5);
  const potentiometer = new five.Sensor({
    pin: 'A2',
    freq: 500
  });
  let potentiometerValue = -1;

  potentiometer.on("data", function() {
    console.log(this.value)
    potentiometerValue = this.value;
  });
  
  app.get('/led', (req, res) => {
    led.toggle();
    res.send('Toogle led!');
  })

  app.get('/sensor', (req, res) => {
    res.send(`sensor ${potentiometerValue}`);
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});