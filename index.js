const express = require("express");
const path = require("path");
const libraries = require("./components/library");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  let branchesList = await libraries.loadLibraryBranches();
  response.render("index", { title: "Home", branches: branchesList });
});

app.get("/branch/:id", async (request, response) => {
  let id = request.params.id;
  let branchData = await libraries.getBranchById(id);
  response.render("branch", { title: "Library Branch", branch: branchData });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
