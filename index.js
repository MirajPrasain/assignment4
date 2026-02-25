const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


const breedImages = {
  beagle: ["beagle1.jpg", "beagle2.jpg"],
  husky: ["husky1.jpg", "husky2.jpg"],
  pug: ["pug1.jpg", "pug2.jpg"],
};


function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


app.get("/breeds", (req, res) => {
  res.json(Object.keys(breedImages));
});


app.get("/image/:breed", (req, res) => {
  const breed = req.params.breed.toLowerCase();
  const images = breedImages[breed];

  if (!images) {
    return res.status(404).json({ error: "No such breed" });
  }

  const file = randomFromArray(images);
  res.json({ breed, image: `/img/${file}` });
});


app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});