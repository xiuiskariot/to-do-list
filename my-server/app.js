import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.text())

let taskData = [];

function getNewId(arr) {
  let max = 0;
  for (const item of arr) {
    if (item.id > max) max = item.id;
  }
  return max + 1;
}

app.post("/todos", (req, res) => {
  const taskObjSerever = req.body;
  taskObjSerever.id = getNewId(taskData);
  taskData.push(taskObjSerever);
  console.log(taskData);
  res.json(taskData);
});

app.get("/todos", (req, res) => {
  res.json(taskData);
});

//удалить все
app.delete("/todos", (req, res, next) => {
  taskData = [];
  res.json(taskData);
});

//удалить одну
app.delete("/todos/:id", (req, res, next) => {
  const { id } = req.params;
  taskData = taskData.filter((el) => el.id != id);
  res.json(taskData);
});

//изменить статус объекта
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  let currentTask = taskData.findIndex((el) => el.id == id);
  taskData[currentTask].status = !taskData[currentTask].status;
  res.json(taskData);
});

//удалить завершенные
app.delete("/checked", (req, res) => {
  taskData = taskData.filter((el) => el.status != true);
  res.json(taskData);
});

//отредактировать
app.patch("/rewrite/:id", (req, res) => {
  const { id } = req.params;
  let currentTask = taskData.findIndex((el) => el.id == id);
  taskData[currentTask].taskValue = req.body;
  res.json(taskData);
});

app.listen(PORT, () => {
  console.log(`🙏🙏🙏Server has been started on port ${PORT}`);
});
