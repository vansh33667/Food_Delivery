import { getFoodItems } from './lib/food-data';

const items = getFoodItems();
console.log('First 6 featured food items on home page:');
items.slice(0, 6).forEach((item, index) => {
  console.log(`${index + 1}. ${item.name} - ${item.cuisine} - ₹${item.price} - ${item.image}`);
});