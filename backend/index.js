import app from "./src/app.js";

app.use("/run", (req, res) => {
  res.send("server running");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server running at port ", port);
});
