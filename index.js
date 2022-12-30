const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 3000; //Save the port number where your server will be listening
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

const retrieveEnvelopeById = (id) => {
  const envelope = envelopes_data.find(
    (envelope) => envelope.id === Number(id)
  );
  return envelope;
};

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

app.get("/envelopes/:id", (req, res) => {
  // extract the envelope ID from the request object
  const envelopeId = req.params.id;

  // retrieve the envelope with the corresponding ID from the database or global variable
  const envelope = retrieveEnvelopeById(Number(envelopeId));

  // send the envelope as a response to the client
  res.send({ envelope });
});

app.post("/envelopes/:id/", (req, res) => {
  // extract the envelope ID and amount to be subtracted from the request object
  const envelopeId = req.params.id;
  const amount = req.body["amount"];
  console.log(amount, envelopeId);

  // validate the request data
  if (!envelopeId || !amount) {
    return res.status(400).send({ message: "Invalid request data" });
  }

  // retrieve the envelope with the corresponding ID from the database or global variable
  let envelope = retrieveEnvelopeById(envelopeId);

  // update the envelope's budget and the total budget

  envelope.information.budget = envelope.information.budget - amount;
  res.send({ envelope });
});

app.delete("/envelopes/:id/", (req, res) => {
  // extract the envelope ID from the request object
  const envelopeId = req.params.id;

  // use the filter function to create a new array of envelopes that excludes the envelope with the specified ID
  envelopes_data = envelopes_data.filter(
    (envelope) => envelope.id !== Number(envelopeId)
  );
  console.log(envelopes_data);

  // return a response indicating that the envelope was successfully deleted
  res.send({ message: "Envelope deleted successfully" });
});

app.post("/envelopes/transfer/:from/:to/", (req, res) => {
  const toEnvelopeId = req.params.to;
  const fromEnvelopeId = req.params.from;
  const amount = req.body.amount;

  let toEnvelope = retrieveEnvelopeById(toEnvelopeId);
  let fromEnvelope = retrieveEnvelopeById(fromEnvelopeId);

  toEnvelope.information.budget += amount;
  fromEnvelope.information.budget -= amount;

  res.send({ toEnvelope, fromEnvelope });
});
