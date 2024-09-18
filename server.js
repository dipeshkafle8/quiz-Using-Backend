const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static("quizUsingBackEnd/frontend/"));

app.get("/", (req, res) => {
  res.sendFile(index.html);
});

app.get("/getQuestions", (req, res) => {
  fs.readFile("quizUsingBackEnd/questions.json", "utf-8", (err, data) => {
    if (err) {
      res.json({ msg: "Error in reading File" });
    } else {
      res.send(data);
    }
  });
});

app.listen(8000, () => {
  console.log("Server started at 8000");
});
