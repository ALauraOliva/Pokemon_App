//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js'); //?este es mi conexion sequelize <<
const saveApiData = require('./src/controllers/saveApiData.js')
const getPokemonTypes = require('./src/controllers/getPokemonTypes.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log('1. DB super conectada')
  
  server.listen(3001, () => {
    console.log('2. Server listening at 3001'); // eslint-disable-line no-console
  });
});
