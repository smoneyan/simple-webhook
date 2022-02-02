// Require express and body-parser
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// Initialize express and define a port
const app = express();
const PORT = 3000;
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.text({ type: "text/plain" }));
app.use(bodyParser.urlencoded({ type: "application/x-www-form-urlencoded" }));
// app.use(bodyParser.text({ type: "*" }));
app.use(bodyParser.json({ type: "application/json" }));
// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.post("/webhook", (req, res) => {
  let response;
  if ("application/json" === req.headers["content-type"]) {
    response = req.body;
    console.log(response);
    res.json(response);

    if (response.hasOwnProperty("SubscribeURL")) {
      url = response.SubscribeURL;
      console.log(url);
      if (typeof url !== "undefined" && url !== null) {
        https
          .get(url, (resp) => {
            let data = "";

            // A chunk of data has been received.
            resp.on("data", (chunk) => {
              data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on("end", () => {
              console.log(data);
            });
          })
          .on("error", (err) => {
            console.log("Error: " + err.message);
          });
      }
    }
  } else {
    try {
      response = JSON.parse(req.body);
    } catch (e) {
      console.log("Not a valid JSON sent");
      res.status(200).end(); // Responding is important
      return false;
    }
  }

  // Call your action on the request here
  res.status(200).end(); // Responding is important
});
