/**
 * loadSpeed.js
 *
 * Used to calculate the load speed of a given website
 *
 */

var page = require('webpage'),
    tempPage,
    loadedPages = 0,
    numTests = 100,
    address,
    t1,
    t2,
    totalTime,
    deltaT = 0;

if (phantom.args.length === 0) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit();
} else {
    numTests = parseInt(phantom.args[0], 10);
    address = phantom.args[1];

    runTests();
}

function runTests() {
  t1 = Date.now();
  tempPage = page.create();
  tempPage.open(address, function(status) {
    if (status !== 'success') {
      console.log("Error loading site");
    } else {
      t2 = Date.now();
      deltaT = deltaT + (t2 - t1);
      loadedPages += 1;
      console.log("Loaded Pages: " + loadedPages);

      if (loadedPages === numTests) {
        console.log("Total Time: " + deltaT);
        console.log("Average Time: " + deltaT / numTests);
        phantom.exit();
      } else {
        runTests();
      }
    }
  });
}
