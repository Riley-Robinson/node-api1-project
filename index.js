const express = require("express");
const shortid = require("shortid");
const server = express();

server.get("/", (req, res) => {
	res.json({ api: " Api is running " });
});
server.use(express.json());



let users = [
	{
		id: 1,
		name: "Roland",
		bio: "Six shooting main chacter from a book by stehen king",
	},
	{
		id: 2,
		name: " Comander shepard ",
		bio: "N7 soldier from the masseffect universe ",
	},
	{
		id: 3,
		name: "Pathfinder",
		bio: "Sentient robot that is useing the apex games to find his creater ",
	},
	{
		id: 4,
		name: "Master Chief",
		bio: "super soldier designed in the spartan11 program",
	},
];

//get requests

server.get("/api/users", (req, res) => {
	users
		? res.status(200).json(users)
		: res.status(500).json({
			errorMessage: "the users info could not be retrieved.",
		});
});

server.get("/api/users/:id", (req, res) => {
	const reqId = Number(req.params.id);
	const reqUser = users.filter((user) => user.id == reqId);

	res.status(200)
		.json(reqUser)
		.catch((err) => {
			console.log("error", err)
			res.status(500).json({ error: "failed to find user " });
		});
});

// post request

server.post("/api/users", (req, res) => {
	const userInfo = req.body;

	if (!userInfo.name || !userInfo.bio) {
		res.status(400).json({
			errorMessage: "needs user name and bio.",
		});
	} else {
		users.push(userInfo)
			? res.status(201).json(userInfo)
			: res.status(500).json({
				errorMessage: "Server Error 500",
			});
	}
});

//delete requests

server.delete("/api/users/:id", (req, res) => {
	const id = Number(req.params.id);
	const user = users.find((e) => e.id === id);

	if (user) {
		users = users.filter((user) => user / id !== id);
		const deleted = users.find((e) => e.id === id);
		!deleted
			? res.status(200).json(user)
			: res.status(500).json({
				errorMessage: "error when deleting",
			});
	} else {
		res.status(404).json({
			errorMessage: "the user with the specific id does not exist",
		});
	}
});

// patch request

server.patch("/api/users/:id", (req, res) => {
	const userInfo = req.body
	const id = Number(req.params.id);

	if (!userInfo.name || !userInfo.bio) {
		res.status(400).json({
			errorMessage: "provide a user and bio",
		});
	} else {
		const user = users.find((e) => e.id === id);

		if (user) {
			users = users.map((user) => {
				return user.id === id ? { id, ...userInfo } : user;
			});
			const updatedUser = users.find((e) => {
				return e.id === id
			});
			updatedUsers
				? res.status(200).json(updatedUser)
				: res.status(500).json({
					errorMessage: "cannot modify user info",
				});
		} else {
			res.status(404).json({
				errorMessage: " cannont find user by ID.",
			});
		}
	}
});

server.listen(8000, () => console.log("\n == API running  == \n"));
