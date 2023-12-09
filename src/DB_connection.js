require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;
const FavoriteModel = require("./models/Favorite");
const UserModel = require("./models/User");

// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(
  // URL
  `postgresql://postgres:Ebe3*G1cF4*EC43aDfaABFg5F42Eg2EB@viaduct.proxy.rlwy.net:25806/railway`,
  { logging: false, native: false }
);

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.
FavoriteModel(sequelize);
//
UserModel(sequelize);
//

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Favorite } = sequelize.models;

User.belongsToMany(Favorite, { through: "user_favorite" });
Favorite.belongsToMany(User, { through: "user_favorite" });

module.exports = {
  User,
  Favorite,
  conn: sequelize,
};
