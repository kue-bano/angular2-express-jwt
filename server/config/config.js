/**
 * Created by Kingsley on 6/21/2017.
 */

const uuidV4 = require('uuid/v4');
const secretKey = uuidV4();

module.exports = {

  'secret': secretKey,

};
