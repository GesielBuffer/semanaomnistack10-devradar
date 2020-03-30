const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    //buscar Devs num raio de 10km
    //filtrar por tecnologias

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        //vale a pena consultar a fundo todos operadores do mongodb como $in == https://docs.mongodb.com/manual/reference/operator/query/
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json({ devs });
  }
};
