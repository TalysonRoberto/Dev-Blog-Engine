const connection = require('../config/connection');

require('../models/UserTypesModel');
require('../models/TagModel');

connection.sync({force:true});