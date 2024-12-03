import express from "express";
const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HElllo Ashmita!");
});
app.get("/ash", (req, res) => {
  res.send("HElllo ash!");
});

let teaData = [];
let nextId = 1;

//add new tea
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all the tea
app.get("/tea", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/tea/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//update tea

app.put("/tea/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete tea
app.delete("/tea/:id", (req, res) => {
  console.log("deleted");
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
