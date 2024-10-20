// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

//find users by name and job, step 7 
const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

// implement hard delete button
const deleteByID = (id) =>{
  const intialLength = users["users_list"].length;
  users["users_list"] = users["users_list"].filter((user) => user["id"] != id);
  return users["users_list"].length < intialLength;
};

// assingment 3
app.use(cors()); //allow backend to respond to calls coming from a differnt origin, not good securtity practice

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


// Remove it since it overrode the new users endpoint
// app.get("/users", (req, res) => {
//   res.send(users);
// });

//remove bc it overrode the name and job
// app.get("/users", (req, res) => {
//   const name = req.query.name; //help
//   if (name != undefined) {
//     let result = findUserByName(name);
//     result = { users_list: result };
//     res.send(result);
//   } else {
//     res.send(users);
//   }
// });

// query for specific name AND job
app.get("/users", (req, res) => {
  const name = req.query.name; //name
  const job = req.query.job; //job
  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

// search by ID
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// why isnt this being overidden 
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

// the DELETE http method to remove user
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  const deleted = deleteByID(id);

  if (!deleted){
    res.status(404).send("Not found");
  } else{
    res.status(204).send("No content");
  }
});


//do i need a fetch call ?