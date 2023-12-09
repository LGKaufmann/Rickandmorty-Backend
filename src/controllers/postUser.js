const { User } = require("../DB_connection");

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
    const regexPassword = /[0-9]/;

    if (!email || !password)
      return res.status(400).json({ message: "faltan datos" });

    if (!regexEmail.test(email)) {
      return res.status(400).json({ message: "Email invalido" });
    }

    if (!regexPassword.test(password)) {
      return res
        .status(400)
        .json({ message: "A la contraseña le falta un numero" });
    }

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password,
      },
    });

    if (!created)
      return res.status(409).json({ message: "El email ya esta registrado" });

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
