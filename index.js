const express = require("express")
const shortid = require("shortid")
const server = express()

server.get("/", (req, res) => {
	res.json({ api: " Api is running " })
})

server.use(express.json())

let games = [
	{
		id: 1,
		name: "Mass effect",
		bio:
			"Super soldier takes on alien cuddlefish death robots and wins maybe",
	},
	{
		id: 2,
		name: " halo ",
		bio: "Super soldier takes on alien armada and wins",
	},
	{
		id: 3,
		name: "Apex Legends",
		bio: "Battle Royal game about Legends fighting to the death",
	},
	{
		id: 4,
		name: "Skyrim",
		bio:
			"free roam andbox rpg based around human that can absorb dragon soals",
	},
]

//get requests

server.get("/api/games", (req, res) => {
	games
		? res.status(200).json(games)
		: res.status(500).json({
				errorMessage: "the game info could not be retrieved.",
		  })
})

server.get("/api/games/id", (req, res) => {
	const reqId = Number(req.params.id)
	const reqGames = games.filter((games) => games.id == reqId)

	res.status(200)
		.json(reqGames)
		.catch((err) => {
			console.log("error", err)
			res.status(500).json({ error: "failed to find game " })
		})
})

// post request

server.post("/api/games", (req, res) => {
	const gameInfo = req.body

	if (!gameInfo.name || !gameInfo.bio) {
		res.status(400).json({
			errorMessage: "needs game name and bio.",
		})
	} else {
		games.push(gameInfo)
			? res.status(201).json(gameInfo)
			: res.status(500).json({
					errorMessage: "Server Error 500",
			  })
	}
})

//delete requests

server.delete("/api/games/:id", (req, res) => {
	const id = Number(req.params.id)
	const game = games.find((e) => e.id === id)

	if (game) {
		games = games.filter((game) => game / id !== id)
		const deleted = games.find((e) => e.id === id)
		!deleted
			? res.status(200).json(game)
			: res.status(500).json({
					errorMessage: "error when deleting",
			  })
	} else {
		res.status(404).json({
			errorMessage: "the game with the specific id does not exist",
		})
	}
})

// patch request

server.patch("/api/games/:id", (req, res) => {
	const gameInfo = req.body
	const id = Number(req.params.id)

	if (!gameInfo.name || !gameInfo.bio) {
		res.status(400).json({
			errorMessage: "provide a game and bio",
		})
	} else {
		const game = game.find((e) => e.id === id)

		if (game) {
			games = gmaes.map((game) => {
				return game.id === id ? { id, ...gameInfo } : game
			})
			const updatedGame = games.find((e) => {
				return e.id === id
			})
			updatedGame
				? res.status(200).json(updatedGame)
				: res.status(500).json({
						errorMessage: "cannot modify game info",
				  })
		} else {
			res.status(404).json({
				errorMessage: " cannont find game by ID.",
			})
		}
	}
})

server.listen(8000, () => console.log("\n == API running  == \n"))
