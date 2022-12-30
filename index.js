const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 3000; //Save the port number where your server will be listening

let envelopes_data = [
  {
    id: 1,
    information: {
      title: "Groceries",
      budget: 20,
    },
  },
  {
    id: 2,
    information: {
      title: "Gas",
      budget: 30,
    },
  },
  {
    id: 3,
    information: {
      title: "Health and grooming",
      budget: 50,
    },
  },
  {
    id: 4,
    information: {
      title: "Clothing",
      budget: 60,
    },
  },
  {
    id: 5,
    information: {
      title: "Dining out",
      budget: 70,
    },
  },
  {
    id: 6,
    information: {
      title: "Household items",
      budget: 80,
    },
  },
  {
    id: 7,
    information: {
      title: "Pet care",
      budget: 15,
    },
  },
  {
    id: 8,
    information: {
      title: "Children's items",
      budget: 40,
    },
  },
];

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});

app.post("/envelopes", (req, res) => {
  // extract the information about the envelopes and total budget from the request body

  // generate the individual budget envelopes
  // code goes here
  // send a response to the client
  res.send({ message: "Envelopes created successfully" });
});

app.get("/allEnvelopes", (req, res) => {
  const envelopes = envelopes_data;
  res.send({ envelopes });
});
