var { ObjectId } = require('mongodb');

module.exports = [{
  _id: new ObjectId().toHexString(),
  title: 'Egg',
  description: 'Some eggs are laid by female animals of many different species, including birds, reptiles, amphibians, mammals, and fish, and have been eaten by humans for thousands of years. Bird and reptile eggs consist of a protective eggshell, albumen, and vitellus, contained within various thin membranes.',
  image_url: 'https://www.seriouseats.com/recipes/images/2017/08/5708631471_06fed03518_o-1500x1125.jpg',
  __v: 0
}, {
  _id: new ObjectId().toHexString(),
  title: 'Brown Potato',
  description: 'Heat the oil in a deep fryer or large, heavy saucepan to 350 degrees F (175 degrees C). Deep fry the potatoes until golden brown. As you remove the potatoes from the oil, sprinkle them generously with garlic salt and parsley.',
  image_url: 'https://cdn.shopify.com/s/files/1/1017/2183/t/9/assets/live-preview-potato.png?18041034404087231518',
  __v: 0
}, {
  _id: new ObjectId().toHexString(),
  title: 'Pork',
  description: 'Pork is the culinary name for meat from a domestic pig. It is the most commonly consumed meat worldwide, with evidence of pig husbandry dating back to 5000 BC. Pork is eaten both freshly cooked and preserved. Curing extends the shelf life of the pork products.',
  image_url: 'https://www.farmison.com/thumbs/great-taste-pork-rack.13aa8aeb-ddf2-49b5-9273-78fe7ddaa836.square.900x900.jpg',
  __v: 0
}];