var request = require('supertest');
var _ = require('lodash');
var { ObjectId } = require('mongodb');
var app = require('../server');
var Ingredient = require('../server/models/ingredient');
var ingredients = require('./seeds/ingredients');
var mongoose = require('mongoose');



beforeEach(() => {
  return Ingredient.deleteMany({})
    .then(() => Ingredient.insertMany(ingredients));
});

afterAll((done) => {
  mongoose.disconnect(done)
});



describe('GET /api/ingredients', () => {
  test('it should return an array of ingredients', async () => {
    var response = await request(app).get('/api/ingredients');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(ingredients.length);
    expect(response.body).toEqual(ingredients);
  });
});



describe('GET /api/users/:id', () => {
  test('it should return a single ingredient object', async () => {
    var ingredient = ingredients[1];
    var response = await request(app).get(`/api/ingredients/${ingredient._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(ingredient);
  });

  test('it should return a 404 if the ingredient does not exist', async () => {
    var unkownId = new ObjectId().toHexString();
    var response = await request(app).get(`/api/ingredients/${unkownId}`);

    expect(response.statusCode).toBe(404);
  });

  test('it should return a 400 if the id is invalid', async () => {
    var invalidId = 423;
    var response = await request(app).get(`/api/ingredients/${invalidId}`);

    expect(response.statusCode).toBe(400);
  });
});



describe('POST /api/ingredient', () => {
  var ingredient = {
    title: 'Milk',
    description: 'Milk is a white liquid nutrient-rich food produced by the mammary glands of mammals. It is the primary source of nutrition for infant mammals before they are able to digest other types of food.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/220px-Milk_glass.jpg',
  };

  test('it should return an object', async () => {
    var response = await request(app).post('/api/ingredients').send(ingredient);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(ingredient);
  });
  
  test('it should persist a new ingredient in the database', async () => {
    var response = await request(app).post('/api/ingredients').send(ingredient);
    var query = await Ingredient.findOne({ title: ingredient.title });

    expect(response.statusCode).toBe(200);
    expect(query).toMatchObject(ingredient);
  });

  test('it should return a 400 if required data is missing', async () => {
    var response = await request(app).post('/api/ingredients').send(_.omit(ingredient, ['title']));
    var query = await Ingredient.find({ image_url: ingredient.image_url });

    expect(response.statusCode).toBe(400);
    expect(query.length).toBe(0);
  });

  test('it should return a 400 if the title is a duplicate', async () => {
    var response = await request(app).post('/api/ingredients').send(ingredients[0]);
    var query = await Ingredient.find({ image_url: ingredient.image_url });

    expect(response.statusCode).toBe(400);
    expect(query.length).toBe(0);
  });
});



describe('PATCH /api/ingredients/:id', () => {
  var update = { title: 'Carniflor' };

  test('it should update an ingredient in the database', async () => {
    var response = await request(app).patch(`/api/ingredients/${ingredients[2]._id}`).send(update);
    var query = await Ingredient.find({ title: update.title });

    expect(response.statusCode).toBe(200);
    expect(query[0].title).toBe(update.title);
    expect(query.length).toBe(1);
    expect(response.body).toMatchObject(ingredients[2]);
  });

  test('it should return a 400 if required data is missing', async () => {
    var response = await request(app).patch(`/api/ingredients/${ingredients[2]._id}`).send({ title: '' });
    var query = await Ingredient.find({ title: update.title });

    expect(response.statusCode).toBe(400);
    expect(query.length).toBe(0);
  });

  test('it should return a 404 if the ingredient does not exist', async () => {
    var id = new ObjectId().toHexString();
    var response = await request(app).patch(`/api/ingredients/${id}`).send({ title: update.title });

    expect(response.statusCode).toBe(404);
  });

  test('it should return a 400 if the title is a duplicate', async () => {
    var response = await request(app).patch(`/api/ingredients/${ingredients[2]._id}`).send({ title: ingredients[0].title });
    var query = await Ingredient.find({ title: ingredients[0].title });

    expect(response.statusCode).toBe(400);
    expect(query.length).toBe(1);
  });

  test('it should return a 400 if the id is invalid', async () => {
    var response = await request(app).patch(`/api/ingredients/1`).send({ title: update.title });

    expect(response.statusCode).toBe(400);
  });
});



describe('DELETE /api/ingredients/:id', () => {
  test('it should delete an ingredient', async () => {
    var response = await request(app).delete(`/api/ingredients/${ingredients[0]._id}`);
    var query = await Ingredient.findById(ingredients[0]._id);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(ingredients[0]);
    expect(query).toBeNull();
  });

  test('it should return a 404 if the ingredient does not exist', async () => {
    var id = new ObjectId().toHexString();
    var response = await request(app).delete(`/api/ingredients/${id}`);
    var query = await Ingredient.find({});

    expect(response.statusCode).toBe(404);
    expect(query.length).toBe(ingredients.length);
  });

  test('it should return a 400 if the id is invalid', async () => {
    var response = await request(app).delete('/api/ingredients/1');

    expect(response.statusCode).toBe(400);
  });
});