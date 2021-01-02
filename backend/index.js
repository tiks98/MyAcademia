import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send(`My Academia is running ${PORT}`));

app.listen(PORT, () =>
  console.log(`MyAcademia server is running on port ${PORT}`)
);
