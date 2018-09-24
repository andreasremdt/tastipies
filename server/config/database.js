var env = process.env.NODE_ENV || 'development';

switch (env) {
  case 'development':
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://ds259912.mlab.com:59912/recipe-app';
    process.env.MONGODB_USER = 'admin';
    process.env.MONGODB_PWD = '34rdfbh56trfg';
    break;

  case 'test':
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://ds259912.mlab.com:59912/recipe_app_test';
    process.env.MONGODB_USER = 'admin';
    process.env.MONGODB_PWD = '23wedv234wesdqea';
    break;

  case 'production':
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://';
    process.env.MONGODB_USER = '';
    process.env.MONGODB_PWD = '';
    break;
}