const mongoose = require("mongoose");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Salad Nicoise",
    photo:
      "https://images.unsplash.com/photo-1534237863411-31a53eecfc7e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cc6196d1735ef71291dca7bef71f32cd&auto=format&fit=crop&w=1731&q=80",
    difficulty: "Easy",
    category: "Salads",
    cooking_method: "No Cook",
    ingredients: [
      "1 teaspoon  onion powder",
      "1 teaspoon  garlic powder",
      "½ teaspoon  salt",
      "2 cups green salad"
    ],
    instructions: [
      "Fill a deep skillet with ½ inch (1 cm) of vegetable oil and heat over medium-high heat until the oil reaches 325˚F (160˚C). Fry the egg rolls in batches of 1-2 at a time for 2½- 3 minutes on each side, until crispy and golden brown. Remove from oil and drain on a wire rack or plate lined with paper towels to absorb any extra oil.",
      "Enjoy!"
    ],
    yields: "4 servings",
    _author: new mongoose.Types.ObjectId()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Grilled Beaf Steak",
    photo:
      "https://images.unsplash.com/photo-1532597144951-3237ed98ab3a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f22f273fc7c7b2434ccd9231c15ade1b&auto=format&fit=crop&w=500&q=60",
    video: "https://www.youtube.com/watch?v=PD04CcRAng0",
    difficulty: "Medium",
    category: "Main Dish",
    cooking_method: "Grilling",
    cuisine: "German",
    short_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    prep_time: 15,
    cook_time: 75,
    ingredients: [
      "3.5 oz  glass noodle, 1 package (100 g)",
      "hot water, for soaking",
      "2 cups  shredded cabbage (200 g)",
      "1 cup  shredded carrots (110 g)",
      "½ cup  chopped scallions (50 g)"
    ],
    instructions: [
      "Place the glass noodles in a large bowl and add enough hot water to cover. Let sit for 10 minutes, until softened. Drain the noodles and chop into ½-inch (1-cm) pieces.",
      "In a large bowl, mix together the chopped glass noodles, cabbage, carrots, scallions, onion powder, garlic powder, salt, pepper, soy sauce, and sesame oil. Toss until well combined.",
      "Then, fold in the chopped shrimp and ground pork until just incorporated.",
      "Place a spring roll wrapper on a clean work surface and add 3 tablespoons of filling to the center. Fold the bottom of the wrapper over the filling, then fold in the sides and roll. Lightly wet the exposed with your fingertip and continue rolling to seal the egg roll. Repeat with the remaining wrappers and filling."
    ],
    notes:
      "It’s nice to see that there’s a different option for a non-drinker like me",
    yields: "15 servings",
    _author: new mongoose.Types.ObjectId()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Giant Caramel Candy Bar Cake",
    photo:
      "https://images.unsplash.com/photo-1532597144951-3237ed98ab3a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f22f273fc7c7b2434ccd9231c15ade1b&auto=format&fit=crop&w=500&q=60",
    video: "https://www.youtube.com/watch?v=PD04CcRAng0",
    difficulty: "Difficult",
    category: "Dessert",
    cooking_method: "Baking",
    prep_time: 10,
    cook_time: 45,
    ingredients: [
      "3 cups  all-purpose flour (375 g)",
      "¾ cup  granulated sugar (150 g)",
      "1 teaspoon  salt",
      "2 cups  unsalted butter, 4 sticks, cubed, room temperature (460 g)",
      "¾ cup  light brown sugar (165 g)"
    ],
    instructions: [
      "Preheat the oven to 350˚F (180˚C). Grease a 12x4½- in (30x11-cm) baking pan and line with parchment paper.",
      "Make the shortbread: In a large bowl, whisk together the flour, granulated sugar, and salt. Add the butter. Use your hands to work it into the flour until a dough forms. Transfer to the prepared loaf pan and spread evenly. Cover with foil.",
      "Bake for 45 minutes, then remove the foil and bake for another 45-60 minutes, until light golden brown. Let cool completely.",
      "Make the caramel filling: In a medium, heavy-bottomed saucepan, combine the brown sugar, corn syrup, butter, cream, and salt. Over medium-high heat, bring the caramel to a boil and let cook for 5 minutes. 5. Then, reduce the heat to low and cook for 10 more minutes, until slightly deeper golden in color. Remove the pot from the heat.",
      "Pour the caramel over the shortbread cookie. Let cool in the refrigerator for 2 hours or until set.",
      "Once the cookie has chilled, line a baking sheet with parchment paper.",
      "Make the chocolate ridges. Pour ⅓ of the melted chocolate onto the prepared baking sheet and spread into a 13x5-inch (33x12 cm) rectangle."
    ],
    yields: "4 servings",
    _author: new mongoose.Types.ObjectId()
  }
];
