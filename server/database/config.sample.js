module.exports.getDatabaseUri = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return "mongodb://";
    case "production":
      return "mongodb://";
    default:
      return "mongodb://";
  }
};
