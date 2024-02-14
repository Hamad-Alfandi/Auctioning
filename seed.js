require("dotenv").config() // Necessary if connection string is in a .env file
require("./config/database") // Execute the code to connect to the db
const { ObjectId } = require("mongodb")
const auction = require("./models/auction")

// Define an async function to create the movie in the database
const createMovie = async () => {
  try {
    const doc = await auction.create({
      category: "Home Living",
      seller_id: "65c755919487889fde5c20ac",
      endDate: "2024-01-30",
      startingBid: "22",
    })
  } catch (err) {
    console.error(err)
  }
}

// Call the async function
createMovie()
