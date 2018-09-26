var { ObjectId } = require('mongodb');

module.exports = [{
  _id: new ObjectId().toHexString(),
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  password: 'd3ef3wre4e',
  __v: 0
}, {
  _id: new ObjectId().toHexString(),
  name: 'Jane Smith',
  email: 'jane@smith.com',
  password: '2wqere8iuktgf',
  __v: 0
}, {
  _id: new ObjectId().toHexString(),
  name: 'Tony Stark',
  email: 'tony@avengers.org',
  password: 'CapAmericaS%cks',
  __v: 0
}];