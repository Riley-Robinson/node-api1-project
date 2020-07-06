const express = require('express');

const shortid = require('shortid');

const server = express();

server.use(express.json());

let users = [
    {
        id: 1,
        name: "Riley Robinson",
        bio: "i have the attention span of a squid"
    },
    {
        id: 2,
        name: "Banana Man",
        bio: "IM A BANANA"
    },
    {
        id: 3,
        name: "Snow ball",
        bio: "Im LAzy Cross eyed and meow a lot"
    }
];

server.get("/", (req, res) => {
    res.send("<h1>taco's are amazing</h1>");
});

server.get('/api/users', (req, res) => {
   users
    ? res.status(200).json(users)
    : res.status(500).json({
        errorMessage: "the users info could not be retrieved.",
      });
});

server.get("/api/users/:id", function (req, res) {
    const reqId = Number(req.params.id);
    const reqUser = users.filter((user) => user.id == reqId);
  
    res
      .status(200)
      .json(reqUser)
      .catch((err) => {
        console.log("error", err);
        res.status(500).json({ error: " failed to find user" });
      });
  });

  server.post("/api/users", (req, res) => {
    const userInfo = req.body;
    
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({
          errorMessage: "Needs user name and bio .",
        });
      } else {
        users.push(userInfo)
          ? res.status(201).json(userInfo)
          : res.status(500).json({
              errorMessage: "Server Error 500",
            });
      }
   
  });

  server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    
    const user = users.find((e) => e.id === id);
  
    if (user) {
      users = users.filter((user) => user.id !== id);
      const deleted = users.find((e) => e.id === id);
      !deleted
        ? res.status(200).json(user)
        : res.status(500).json({
            errorMessage: "error when deleting",
          });
    } else {
      res.status(404).json({
        errorMessage: "the user with the specified id does not exist",
      });
    }
});

server.put("/api/users/:id", (req, res) => {
    const userInfo = req.body;
    const id = Number(req.params.id);
  
    if (!userInfo.name || !userInfo.bio) {
      res.status(400).json({
        errorMessage: "Provide a name and bio",
      });

    } else {
      const user = users.find((e) => e.id === id);
  
      if (user) {
      
        users = users.map((user) => {
          return user.id === id ? { id, ...userInfo } : user;
        });
      
        const updatedUser = users.find((e) => {
          return e.id === id;
        });
      
        updatedUser
          ? res.status(200).json(updatedUser)
          : res.status(500).json({
              errorMessage: "cannot modify user information",
            });
      
        } else {
      
            res.status(404).json({
          errorMessage: "cannot find user by ID.",
        });
      }
    }
  });



const PORT = 8000;
server.listen(PORT, () => console.log(`server is running on port ${PORT}`));

