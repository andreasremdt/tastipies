var env = process.env.NODE_ENV || 'development';

switch (env) {
  case 'development':
    process.env.PORT = 3000;
    process.env.MONGODB_URI = '';
    process.env.MONGODB_USER = '';
    process.env.MONGODB_PWD = '';
    break;

  case 'test':
    process.env.PORT = 3000;
    process.env.MONGODB_URI = '';
    process.env.MONGODB_USER = '';
    process.env.MONGODB_PWD = '';
    break;

  case 'production':
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://';
    process.env.MONGODB_USER = '';
    process.env.MONGODB_PWD = '';
    break;
}