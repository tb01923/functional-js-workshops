const {create, env} = require('sanctuary');
const {env: flutureEnv} = require('fluture-sanctuary-types');
const S = create({checkTypes: true, env: env.concat(flutureEnv)});

module.exports =  S ; 