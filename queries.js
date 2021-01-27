const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Assignment',
  password: '12345678910',
  port: 5432,
})


const getCars = (request, response) => {
  pool.query('SELECT car.id AS CarID,car."Name" AS CarName,model."Name" AS ModelName,make."name" AS MadeBy FROM Car INNER JOIN model ON car.modelid=model.id INNER JOIN make ON car.makeid=make.id;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getCarById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT car.id AS CarID,car."Name" AS CarName,model."Name" AS ModelName,make."name" AS MadeBy FROM Car INNER JOIN model ON car.modelid=model.id INNER JOIN make ON car.makeid=make.id WHERE car.id = $1;', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getCars,
  getCarById,
 }
