const axios = require("axios");

const getCharById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      // `https://rym2.up.railway.app/api/character/${id}?key=pi-lgkaufmann`
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const { name, status, gender, species, origin, image } = data;
    const character = { id, name, status, gender, species, origin, image };

    if (character.name) {
      return res.status(200).json(character);
    }

    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = getCharById;
