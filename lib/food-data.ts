// Food item types
export interface FoodItem {
  id: string
  name: string
  category: string
  cuisine: string
  image: string
  price: number // Now stored in INR
  isVeg: boolean
  mealType: "breakfast" | "lunch" | "dinner" | "all"
  description: string
  rating: number
  prepTime: string
  calories: number
  protein?: number
}

// Cuisines - Added South Indian and KFC categories
export const cuisines = [
  "Gujarati",
  "Punjabi",
  "Italian",
  "Chinese",
  "Mexican",
  "Thai",
  "Japanese",
  "American",
  "Mediterranean",
  "Indian",
  "South Indian",
  "Fast Food",
] as const

// Categories - Added Waffles, Eggs, Combo Meals
export const categories = [
  "Pizzas",
  "Burgers",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Snacks",
  "Salads",
  "Soups",
  "Rice & Biryani",
  "Bread & Naan",
  "Seafood",
  "Pasta",
  "Sandwiches",
  "Wraps",
  "Curries",
  "Grills",
  "Waffles",
  "Eggs",
  "Combo Meals",
  "Fried Chicken",
] as const

// Meal types
export const mealTypes = ["breakfast", "lunch", "dinner", "all"] as const

// Base food templates for generating items - Prices now in INR
const foodTemplates = {
  Gujarati: [
    { name: "Dhokla", basePrice: 99, isVeg: true, prepTime: "15 min", calories: 180, protein: 6, image: "https://i.pinimg.com/1200x/ae/d7/7b/aed77b9ec65fe5a9e353c27ef788bed2.jpg" },
    { name: "Thepla", basePrice: 79, isVeg: true, prepTime: "20 min", calories: 220, protein: 5, image: "https://i.pinimg.com/1200x/cd/2f/29/cd2f2908425ed47ef0b6b69b59afd233.jpg" },
    { name: "Khandvi", basePrice: 119, isVeg: true, prepTime: "25 min", calories: 150, protein: 7, image: "https://i.pinimg.com/736x/a9/65/7d/a9657d44c8f7ec1aa597bf1df21ceed6.jpg" },
    { name: "Undhiyu", basePrice: 199, isVeg: true, prepTime: "45 min", calories: 350, protein: 12, image: "https://i.pinimg.com/736x/fc/25/04/fc25046b997e5a38e617884cd55c8ac7.jpg" },
    { name: "Gujarati Daldhokli", basePrice: 129, isVeg: true, prepTime: "30 min", calories: 200, protein: 10, image: "https://i.pinimg.com/1200x/00/93/60/009360a68019efaf546f41dfd15e6806.jpg" },
    { name: "Handvo", basePrice: 119, isVeg: true, prepTime: "35 min", calories: 280, protein: 8, image: "https://i.pinimg.com/736x/6a/71/2b/6a712b12d9717871fe714fe4f71e304d.jpg" },
    { name: "Fafda Jalebi", basePrice: 99, isVeg: true, prepTime: "20 min", calories: 400, protein: 4, image: "https://i.pinimg.com/1200x/7d/09/50/7d0950ded8060a20750a737a73d25f5f.jpg" },
    { name: "Sev Tameta", basePrice: 149, isVeg: true, prepTime: "25 min", calories: 250, protein: 6, image: "https://i.pinimg.com/736x/f0/9c/1f/f09c1fa7af79dbbd4da2c873eac5b5a3.jpg" },
    { name: "Kadhi", basePrice: 119, isVeg: true, prepTime: "30 min", calories: 180, protein: 8, image: "https://i.pinimg.com/1200x/0e/5c/c3/0e5cc3c9f03f6cd812277b2a39eb52aa.jpg" },
    { name: "Patra", basePrice: 129, isVeg: true, prepTime: "40 min", calories: 220, protein: 5, image: "https://i.pinimg.com/736x/3f/bc/30/3fbc3081e35ac032dcb7a9fa95f0f535.jpg" },
  ],
  Punjabi: [
    { name: "Butter Chicken", basePrice: 299, isVeg: false, prepTime: "35 min", calories: 450, protein: 32, image: "https://i.pinimg.com/736x/a8/89/ac/a889ac23c9bcdc0a2bb5e0e784473c29.jpg" },
    { name: "Dal Makhani", basePrice: 199, isVeg: true, prepTime: "40 min", calories: 380, protein: 18, image: "https://i.pinimg.com/1200x/c1/16/82/c11682efd8412b401ac14ea1d52e0a98.jpg" },
    { name: "Paneer Tikka", basePrice: 249, isVeg: true, prepTime: "25 min", calories: 320, protein: 22, image: "https://i.pinimg.com/736x/5f/d4/32/5fd4328d6e3d5ad1b01b2c5d132d27e7.jpg" },
    { name: "Chole Bhature", basePrice: 179, isVeg: true, prepTime: "30 min", calories: 520, protein: 15, image: "https://i.pinimg.com/736x/d6/60/25/d660255e0ac13e20bc3c674ee3d11ac4.jpg" },
    { name: "Sarson Ka Saag", basePrice: 199, isVeg: true, prepTime: "45 min", calories: 280, protein: 12, image: "https://i.pinimg.com/736x/38/0e/b6/380eb658253d760f8cb1037d9437263c.jpg" },
    { name: "Amritsari Kulcha", basePrice: 149, isVeg: true, prepTime: "25 min", calories: 350, protein: 10, image: "https://i.pinimg.com/1200x/fc/07/07/fc070786cd5b9b6912310dd9893162bb.jpg" },
    { name: "Tandoori Chicken", basePrice: 349, isVeg: false, prepTime: "40 min", calories: 380, protein: 38, image: "https://i.pinimg.com/736x/b2/d0/9f/b2d09f3a81e1b2e6d381e3ee1c96d7c4.jpg" },
    { name: "Rajma Chawal", basePrice: 179, isVeg: true, prepTime: "35 min", calories: 420, protein: 16, image: "https://i.pinimg.com/736x/c2/63/43/c26343f672c70c13c669ed413a9566fb.jpg" },
    { name: "Aloo Paratha", basePrice: 129, isVeg: true, prepTime: "20 min", calories: 380, protein: 8, image: "https://i.pinimg.com/1200x/08/31/34/08313476bf75758c0a2b9a3f1b599218.jpg" },
    { name: "Lassi", basePrice: 79, isVeg: true, prepTime: "5 min", calories: 200, protein: 6, image: "https://i.pinimg.com/1200x/3f/9b/b5/3f9bb5e955c7437a02232d66a8637538.jpg" },
  ],
  Italian: [
    { name: "Margherita Pizza", basePrice: 249, isVeg: true, prepTime: "20 min", calories: 680, protein: 18, image: "https://i.pinimg.com/1200x/87/d3/dc/87d3dc0225d21869daf72e1f9a198ba4.jpg" },
    { name: "Pepperoni Pizza", basePrice: 299, isVeg: false, prepTime: "20 min", calories: 750, protein: 24, image: "https://i.pinimg.com/1200x/e5/f6/a1/e5f6a176802a7f17363494f27b22d474.jpg" },
    { name: "Spaghetti Carbonara", basePrice: 279, isVeg: false, prepTime: "25 min", calories: 580, protein: 22, image: "https://i.pinimg.com/1200x/db/f1/71/dbf17103efd8f40987db361dd552c663.jpg" },
    { name: "Fettuccine Alfredo", basePrice: 249, isVeg: true, prepTime: "20 min", calories: 620, protein: 16, image: "https://i.pinimg.com/1200x/67/1c/d3/671cd30d7445eccad0c6ebe10ef2239a.jpg" },
    { name: "Lasagna", basePrice: 329, isVeg: false, prepTime: "45 min", calories: 720, protein: 28, image: "https://i.pinimg.com/736x/5f/55/8e/5f558e444074efdc29df96057bab0582.jpg" },
    { name: "Bruschetta", basePrice: 149, isVeg: true, prepTime: "15 min", calories: 220, protein: 6, image: "https://i.pinimg.com/1200x/76/e9/79/76e97957a5901184a2da857d3729743d.jpg" },
    { name: "Tiramisu", basePrice: 179, isVeg: true, prepTime: "10 min", calories: 350, protein: 8, image: "https://i.pinimg.com/1200x/24/1f/40/241f40cdb81ee38b3d1e87a593c5ace7.jpg" },
    { name: "Risotto", basePrice: 299, isVeg: true, prepTime: "35 min", calories: 480, protein: 14, image: "https://i.pinimg.com/736x/78/06/2d/78062d26c2dc6cf853d73ecf2fab21d5.jpg" },
    { name: "Caprese Salad", basePrice: 199, isVeg: true, prepTime: "10 min", calories: 280, protein: 12, image: "https://i.pinimg.com/1200x/86/f1/2e/86f12e6de21fe5485921a17f18b11799.jpg" },
    { name: "Penne Arrabbiata", basePrice: 229, isVeg: true, prepTime: "20 min", calories: 450, protein: 12, image: "https://i.pinimg.com/736x/6d/20/d3/6d20d35aa822b9acb7a2da497b54f7ce.jpg" },
  ],
  Chinese: [
    { name: "Kung Pao Chicken", basePrice: 279, isVeg: false, prepTime: "25 min", calories: 420, protein: 28, image: "https://i.pinimg.com/1200x/66/73/bf/6673bfb5d4a0d11120ee316d4ea7a16b.jpg" },
    { name: "Vegetable Fried Rice", basePrice: 179, isVeg: true, prepTime: "15 min", calories: 380, protein: 10, image: "https://i.pinimg.com/736x/cc/68/5c/cc685c34fa8a72fe23148a08f7d3bfb7.jpg" },
    { name: "Spring Rolls", basePrice: 149, isVeg: true, prepTime: "20 min", calories: 250, protein: 6, image: "https://i.pinimg.com/736x/57/16/16/571616efee0c936a787963050a2fbba5.jpg" },
    { name: "Manchurian", basePrice: 199, isVeg: true, prepTime: "25 min", calories: 320, protein: 12, image: "https://i.pinimg.com/736x/d2/26/09/d22609efc42984ac31068cafc8f9427b.jpg" },
    { name: "Hakka Noodles", basePrice: 179, isVeg: true, prepTime: "15 min", calories: 400, protein: 10, image: "https://i.pinimg.com/1200x/e0/dd/c0/e0ddc0615de172b35cc1d5b838772c4e.jpg" },
    { name: "Sweet and Sour Pork", basePrice: 299, isVeg: false, prepTime: "30 min", calories: 480, protein: 26, image: "https://i.pinimg.com/1200x/7f/7f/7c/7f7f7c00a8a6643eebe47d7450c0dd68.jpg" },
    { name: "Dim Sum", basePrice: 249, isVeg: false, prepTime: "25 min", calories: 280, protein: 18, image: "https://i.pinimg.com/736x/1c/b1/c5/1cb1c53970c9ea0cdbb1e14c38ece6bb.jpg" },
    { name: "Hot and Sour Soup", basePrice: 129, isVeg: true, prepTime: "15 min", calories: 120, protein: 8, image: "https://i.pinimg.com/736x/79/85/1b/79851b39afb791a120f940594374a0d2.jpg" },
    { name: "Chow Mein", basePrice: 199, isVeg: false, prepTime: "20 min", calories: 450, protein: 20, image: "https://i.pinimg.com/736x/03/8e/20/038e206ad91f021d961c59f7b1e3633c.jpg" },
    { name: "Mapo Tofu", basePrice: 179, isVeg: true, prepTime: "20 min", calories: 280, protein: 16, image: "https://i.pinimg.com/736x/60/aa/f2/60aaf2b66805f814f2cfa2530681d3a0.jpg" },
  ],
  Mexican: [
    { name: "Beef Tacos", basePrice: 229, isVeg: false, prepTime: "20 min", calories: 380, protein: 24, image: "https://i.pinimg.com/1200x/94/f5/b4/94f5b48f11bd49642b9d7bf329028198.jpg" },
    { name: "Veggie Burrito", basePrice: 199, isVeg: true, prepTime: "15 min", calories: 520, protein: 16, image: "https://i.pinimg.com/736x/1a/d8/c1/1ad8c15c201bd0749adf1d5a74b3e8a0.jpg" },
    { name: "Quesadilla", basePrice: 179, isVeg: true, prepTime: "15 min", calories: 450, protein: 18, image: "https://i.pinimg.com/1200x/64/04/b4/6404b4be1237dce2674e5fdfead27529.jpg" },
    { name: "Guacamole", basePrice: 129, isVeg: true, prepTime: "10 min", calories: 180, protein: 4, image: "https://i.pinimg.com/736x/f0/82/ad/f082adbcd46fe982f7e0fdbd3e8799da.jpg" },
    { name: "Enchiladas", basePrice: 249, isVeg: false, prepTime: "30 min", calories: 480, protein: 22, image: "https://i.pinimg.com/736x/c4/a7/36/c4a73677ba3f261bd345d2331d1ecce3.jpg" },
    { name: "Nachos Supreme", basePrice: 199, isVeg: true, prepTime: "15 min", calories: 550, protein: 14, image: "https://i.pinimg.com/736x/bb/2d/2d/bb2d2d5f9e7876b44bc8565fbdac5a3b.jpg" },
    { name: "Churros", basePrice: 99, isVeg: true, prepTime: "20 min", calories: 280, protein: 4, image: "https://i.pinimg.com/736x/49/92/e5/4992e59f1afd1994535ceedcfd20f068.jpg" },
    { name: "Fajitas", basePrice: 299, isVeg: false, prepTime: "25 min", calories: 420, protein: 28, image: "https://i.pinimg.com/1200x/55/13/8d/55138dc39ce58f88867047e58fc9db67.jpg" },
    { name: "Elote", basePrice: 89, isVeg: true, prepTime: "10 min", calories: 220, protein: 6, image: "https://i.pinimg.com/1200x/6d/99/5a/6d995a709fa26a6e09a91cc470eda2b8.jpg" },
    { name: "Pozole", basePrice: 229, isVeg: false, prepTime: "45 min", calories: 350, protein: 20, image: "https://i.pinimg.com/1200x/f9/cf/31/f9cf315d71a00b04f3e50e7f82105c0e.jpg" },
  ],
  Thai: [
    { name: "Pad Thai", basePrice: 249, isVeg: false, prepTime: "20 min", calories: 450, protein: 22, image: "https://i.pinimg.com/1200x/be/61/3e/be613ebbeb5246ab16483a8a7f5ca5bf.jpg" },
    { name: "Green Curry", basePrice: 279, isVeg: false, prepTime: "25 min", calories: 380, protein: 24, image: "https://i.pinimg.com/1200x/39/83/6b/39836bd01a36adeafd6e28c2f88d9c15.jpg" },
    { name: "Tom Yum Soup", basePrice: 179, isVeg: false, prepTime: "20 min", calories: 180, protein: 16, image: "https://i.pinimg.com/1200x/80/8c/5a/808c5a37a276b328958ffcb8a6a8b446.jpg" },
    { name: "Mango Sticky Rice", basePrice: 149, isVeg: true, prepTime: "15 min", calories: 320, protein: 6, image: "https://i.pinimg.com/736x/7f/59/04/7f590467bd9c1be33b48cc14ab3d4c3e.jpg" },
    { name: "Thai Basil Chicken", basePrice: 279, isVeg: false, prepTime: "20 min", calories: 350, protein: 26, image: "https://i.pinimg.com/1200x/27/33/fa/2733facaa2b940c8257d2b9997008c61.jpg" },
    { name: "Som Tam", basePrice: 149, isVeg: true, prepTime: "15 min", calories: 150, protein: 6, image: "https://i.pinimg.com/736x/5b/1c/fa/5b1cfaaa9f6d0b15f76ee8a449540a0d.jpg" },
    { name: "Massaman Curry", basePrice: 299, isVeg: false, prepTime: "35 min", calories: 480, protein: 28, image: "https://i.pinimg.com/1200x/a7/6a/14/a76a14394baff6b6002cafd5bc6ff82a.jpg" },
    { name: "Satay Skewers", basePrice: 199, isVeg: false, prepTime: "25 min", calories: 280, protein: 24, image: "https://i.pinimg.com/736x/db/e4/1c/dbe41cd0313c65f7ad82d85e5d2674b3.jpg" },
    { name: "Thai Iced Tea", basePrice: 89, isVeg: true, prepTime: "5 min", calories: 180, protein: 2, image: "https://i.pinimg.com/1200x/2b/d0/cb/2bd0cbbafd55dbd933ad73d90fcb72d5.jpg" },
    { name: "Larb", basePrice: 229, isVeg: false, prepTime: "20 min", calories: 250, protein: 22, image: "https://i.pinimg.com/1200x/4a/fa/73/4afa73ea2846e9aea743eb48485d683b.jpg" },
  ],
  Japanese: [
    { name: "Sushi Roll", basePrice: 299, isVeg: false, prepTime: "25 min", calories: 320, protein: 18, image: "https://i.pinimg.com/736x/09/15/1d/09151d0100060e1de5165623865f2c2b.jpg" },
    { name: "Ramen", basePrice: 279, isVeg: false, prepTime: "30 min", calories: 480, protein: 24, image: "https://i.pinimg.com/1200x/b9/d7/a7/b9d7a7b90d8f6d45187c18a8b3600f53.jpg" },
    { name: "Tempura", basePrice: 229, isVeg: true, prepTime: "20 min", calories: 350, protein: 10, image: "https://i.pinimg.com/736x/4f/75/3f/4f753fc74ab74085851f04ddb1c2074e.jpg" },
    { name: "Teriyaki Chicken", basePrice: 279, isVeg: false, prepTime: "25 min", calories: 380, protein: 30, image: "https://i.pinimg.com/1200x/01/ba/90/01ba90c3038fae15d8335ad3aed61f9e.jpg" },
    { name: "Miso Soup", basePrice: 99, isVeg: true, prepTime: "10 min", calories: 80, protein: 6, image: "https://i.pinimg.com/1200x/74/ea/51/74ea51b40b2b46827fc2692f093c7061.jpg" },
    { name: "Gyoza", basePrice: 179, isVeg: false, prepTime: "20 min", calories: 280, protein: 14, image: "https://i.pinimg.com/1200x/2c/a5/44/2ca54433e94ea3ddbfd9b434fd2cbcc4.jpg" },
    { name: "Udon Noodles", basePrice: 229, isVeg: true, prepTime: "15 min", calories: 350, protein: 12, image: "https://i.pinimg.com/1200x/ae/66/c9/ae66c9bfb8627483417e9458acab85c9.jpg" },
    { name: "Katsu Curry", basePrice: 299, isVeg: false, prepTime: "30 min", calories: 620, protein: 28, image: "https://i.pinimg.com/1200x/a5/e0/86/a5e086762afd42aceb50cbf8eb9324ca.jpg" },
    { name: "Edamame", basePrice: 89, isVeg: true, prepTime: "10 min", calories: 120, protein: 12, image: "https://i.pinimg.com/1200x/73/65/33/7365337145a0cdf1df9979e5846b55cb.jpg" },
    { name: "Matcha Ice Cream", basePrice: 99, isVeg: true, prepTime: "5 min", calories: 180, protein: 4, image: "https://i.pinimg.com/736x/65/21/db/6521dbbe75f5213a1f5063aaef09da37.jpg" },
  ],
  American: [
    { name: "Classic Cheeseburger", basePrice: 249, isVeg: false, prepTime: "20 min", calories: 650, protein: 32, image: "https://i.pinimg.com/736x/e8/27/03/e82703f522f7f7281039ff08f9eb5812.jpg" },
    { name: "BBQ Ribs", basePrice: 449, isVeg: false, prepTime: "45 min", calories: 750, protein: 42, image: "https://i.pinimg.com/736x/79/47/0c/79470c53f376ed90b29c4aceb14f0e2f.jpg" },
    { name: "Buffalo Wings", basePrice: 229, isVeg: false, prepTime: "25 min", calories: 420, protein: 28, image: "https://i.pinimg.com/1200x/d3/d8/0a/d3d80adb039cb256ee25aafb0851e562.jpg" },
    { name: "Mac and Cheese", basePrice: 179, isVeg: true, prepTime: "20 min", calories: 520, protein: 18, image: "https://i.pinimg.com/1200x/bb/02/f1/bb02f1c5f3b7f0864b4dd733cdcf5e7d.jpg" },
    { name: "Pancakes", basePrice: 149, isVeg: true, prepTime: "15 min", calories: 450, protein: 10, image: "https://i.pinimg.com/736x/41/6e/d3/416ed3b6f00ef7226ed8cb85ca28a2d9.jpg" },
    { name: "BLT Sandwich", basePrice: 199, isVeg: false, prepTime: "15 min", calories: 380, protein: 20, image: "https://i.pinimg.com/736x/8e/a4/2d/8ea42dc71ba6d341a6e47125cd1b9740.jpg" },
    { name: "Philly Cheesesteak", basePrice: 299, isVeg: false, prepTime: "20 min", calories: 580, protein: 34, image: "https://i.pinimg.com/1200x/ff/41/5b/ff415b0f058c730f475e35239e5d35ba.jpg" },
    { name: "Caesar Salad", basePrice: 179, isVeg: true, prepTime: "10 min", calories: 280, protein: 12, image: "https://i.pinimg.com/736x/00/38/9d/00389ddab812fdc051465e0d21b83ee8.jpg" },
    { name: "Apple Pie", basePrice: 129, isVeg: true, prepTime: "10 min", calories: 320, protein: 4, image: "https://i.pinimg.com/1200x/89/ea/a3/89eaa37b3556a56e0b5add4937cf99cb.jpg" },
    { name: "Onion Rings", basePrice: 99, isVeg: true, prepTime: "15 min", calories: 350, protein: 6, image: "https://i.pinimg.com/736x/2c/ed/3d/2ced3dc9ae193322fb00afa11bfcb292.jpg" },
  ],
  Mediterranean: [
    { name: "Falafel Wrap", basePrice: 199, isVeg: true, prepTime: "20 min", calories: 420, protein: 16, image: "https://i.pinimg.com/736x/fe/d1/72/fed172a1a15c32c764e378787d40ad64.jpg" },
    { name: "Hummus Platter", basePrice: 149, isVeg: true, prepTime: "10 min", calories: 280, protein: 10, image: "https://i.pinimg.com/736x/e9/34/24/e934249c07589d09241ebf7c63df42b0.jpg" },
    { name: "Greek Salad", basePrice: 179, isVeg: true, prepTime: "10 min", calories: 220, protein: 8, image: "https://i.pinimg.com/736x/1d/59/a9/1d59a97d28d4e7b8673175ad8a925497.jpg" },
    { name: "Shawarma", basePrice: 249, isVeg: false, prepTime: "25 min", calories: 480, protein: 28, image: "https://i.pinimg.com/1200x/f8/bb/ba/f8bbbae407ed2bd8ad39bdf8853df821.jpg" },
    { name: "Moussaka", basePrice: 299, isVeg: false, prepTime: "40 min", calories: 520, protein: 26, image: "https://i.pinimg.com/736x/c0/55/09/c05509518bf56896a189cbd9b3580afc.jpg" },
    { name: "Tabbouleh", basePrice: 129, isVeg: true, prepTime: "15 min", calories: 180, protein: 6, image: "https://i.pinimg.com/1200x/03/9b/b8/039bb8322048bb4e46d8963dc9e05ec6.jpg" },
    { name: "Baklava", basePrice: 99, isVeg: true, prepTime: "10 min", calories: 350, protein: 6, image: "https://i.pinimg.com/1200x/5f/3a/4f/5f3a4f236e69ce77990fffb1545a11f0.jpg" },
    { name: "Grilled Halloumi", basePrice: 199, isVeg: true, prepTime: "15 min", calories: 280, protein: 18, image: "https://i.pinimg.com/1200x/df/2b/c7/df2bc7196badf68e139cf465e6748a49.jpg" },
    { name: "Lamb Kebab", basePrice: 349, isVeg: false, prepTime: "30 min", calories: 420, protein: 32, image: "https://i.pinimg.com/1200x/dc/ba/46/dcba464a4bc3ebfda0a0859a5e770be8.jpg" },
    { name: "Spanakopita", basePrice: 179, isVeg: true, prepTime: "25 min", calories: 320, protein: 12, image: "https://i.pinimg.com/1200x/12/c9/9d/12c99da8f6336922bb3aa27cc18aa5cf.jpg" },
  ],
  Indian: [
    { name: "Dal Chawal", basePrice: 299, isVeg: false, prepTime: "45 min", calories: 550, protein: 28, image: "https://i.pinimg.com/736x/49/c4/20/49c42040a9b2c03c305e2ae9cf8606f8.jpg" },
    { name: "Mix Bhajiya", basePrice: 229, isVeg: true, prepTime: "30 min", calories: 350, protein: 20, image: "https://i.pinimg.com/1200x/4e/d9/29/4ed929ace520f88dfc42be70efc284cc.jpg" },
    { name: "Samosa", basePrice: 79, isVeg: true, prepTime: "20 min", calories: 280, protein: 6, image: "https://i.pinimg.com/736x/1b/da/ca/1bdaca54b40441bc8a1bccc733e3ca43.jpg" },
    { name: "Kachori", basePrice: 49, isVeg: true, prepTime: "10 min", calories: 180, protein: 6, image: "https://i.pinimg.com/1200x/eb/3c/34/eb3c341a0a08a1d3999a0cb873ad2eb1.jpg" },
    { name: "Shrikhand", basePrice: 149, isVeg: true, prepTime: "25 min", calories: 380, protein: 10, image: "https://i.pinimg.com/1200x/8e/5c/12/8e5c1250680b38cf4686d455be5eb5e2.jpg" },
    { name: "Gulab Jamun", basePrice: 79, isVeg: true, prepTime: "10 min", calories: 250, protein: 4, image: "https://i.pinimg.com/736x/e6/51/46/e651469a60a2a99adfb2e8cd1fdbc6a4.jpg" },
    { name: "Gajar no halwa", basePrice: 329, isVeg: false, prepTime: "35 min", calories: 480, protein: 34, image: "https://i.pinimg.com/1200x/7b/5c/a1/7b5ca102f12233f8459e4d1490837b19.jpg" },
    { name: "Sev khamni", basePrice: 249, isVeg: true, prepTime: "30 min", calories: 320, protein: 14, image: "https://i.pinimg.com/736x/48/19/3e/48193e655240317fb8b68cc70cf07e30.jpg" },
    { name: "Bhindi Masala", basePrice: 179, isVeg: true, prepTime: "25 min", calories: 220, protein: 8, image: "https://i.pinimg.com/1200x/b6/d9/1a/b6d91ab32bdde9e1c4553ad41ea298e4.jpg" },
    { name: "Bhaji pav & Pulav", basePrice: 89, isVeg: true, prepTime: "5 min", calories: 180, protein: 6, image: "https://i.pinimg.com/736x/65/39/33/653933b82210377a7c7163e00797a259.jpg" },
  ],

  "South Indian": [
    { name: "Idli Sambar", basePrice: 99, isVeg: true, prepTime: "20 min", calories: 250, protein: 8, image: "https://i.pinimg.com/1200x/d5/cd/da/d5cdda22f2061de591b048b67bbf0e67.jpg" },
    { name: "Medu Vada", basePrice: 89, isVeg: true, prepTime: "25 min", calories: 280, protein: 10, image: "https://i.pinimg.com/1200x/b3/97/35/b39735b8aec0947aca0f798e7cacfa47.jpg" },
    { name: "Rava Dosa", basePrice: 129, isVeg: true, prepTime: "15 min", calories: 320, protein: 8, image: "https://i.pinimg.com/736x/d0/14/34/d01434aa0b488c9241fdb595c4616ce8.jpg" },
    { name: "Uttapam", basePrice: 119, isVeg: true, prepTime: "20 min", calories: 300, protein: 9, image: "https://i.pinimg.com/1200x/00/d4/85/00d48595bec455a80aa0b1d51666b96d.jpg" },
    { name: "Pongal", basePrice: 109, isVeg: true, prepTime: "25 min", calories: 350, protein: 12, image: "https://i.pinimg.com/1200x/f6/96/98/f69698a26bac4f460c86d7108532cfa2.jpg" },
    { name: "Appam with Stew", basePrice: 149, isVeg: true, prepTime: "30 min", calories: 380, protein: 10, image: "https://i.pinimg.com/1200x/99/91/ae/9991ae18ce9e9827241944cac5f4451f.jpg" },
    { name: "Masala Deosa(Spicial)", basePrice: 329, isVeg: false, prepTime: "40 min", calories: 450, protein: 36, image: "https://i.pinimg.com/736x/2b/35/43/2b3543cf136127e86cffce7c835b5a61.jpg" },
    { name: "Paper Dosa", basePrice: 299, isVeg: false, prepTime: "35 min", calories: 380, protein: 32, image: "https://i.pinimg.com/736x/9d/c8/41/9dc841bb8a46b3f469e3dee02ab7b2d9.jpg" },
    { name: "Rasam", basePrice: 79, isVeg: true, prepTime: "15 min", calories: 80, protein: 4, image: "https://i.pinimg.com/1200x/d6/d1/8f/d6d18fa6d64c51c376de1d218dbc5c15.jpg" },
    { name: "Coconut Chutney", basePrice: 49, isVeg: true, prepTime: "10 min", calories: 120, protein: 2, image: "https://i.pinimg.com/1200x/08/81/a6/0881a6133d714ca8892e42ebf405eb53.jpg" },
  ],
  "Fast Food": [
    {
      image: "https://i.pinimg.com/1200x/c0/2d/59/c02d5949b1b2eb0f6fe97713173410f3.jpg",
      name: "Fruit Salad",
      basePrice: 499,
      isVeg: false,
      prepTime: "20 min",
      calories: 850,
      protein: 48,
    },
    { name: "Hot Wings", basePrice: 249, isVeg: false, prepTime: "15 min", calories: 420, protein: 28, image: "https://i.pinimg.com/736x/39/43/4d/39434d6f8235406f7aba4ca6cbb5247a.jpg" },
    { name: "Chicken Popcorn", basePrice: 199, isVeg: false, prepTime: "12 min", calories: 380, protein: 24, image: "https://i.pinimg.com/736x/39/43/4d/39434d6f8235406f7aba4ca6cbb5247a.jpg" },
    { name: "Zinger Burger", basePrice: 229, isVeg: false, prepTime: "15 min", calories: 520, protein: 26, image: "https://i.pinimg.com/736x/e5/df/6a/e5df6a695af69cec44d11faf4f7b7a33.jpg" },
    { name: "Chicken Strips", basePrice: 219, isVeg: false, prepTime: "15 min", calories: 400, protein: 30, image: "https://i.pinimg.com/736x/01/6b/fc/016bfc6fb73aaedba5cf5df6f96789c0.jpg" },
    { name: "Spicy Chicken Sandwich", basePrice: 199, isVeg: false, prepTime: "12 min", calories: 480, protein: 24, image: "https://i.pinimg.com/736x/c0/7f/d5/c07fd509ed6a0e23950d24360fb54daa.jpg" },
    { name: "Crispy Chicken Wrap", basePrice: 179, isVeg: false, prepTime: "10 min", calories: 450, protein: 22, image: "https://i.pinimg.com/1200x/21/0f/7d/210f7da6d4a1b2c0c29d7463d4a538bf.jpg" },
    { name: "Chicken Rice Bowl", basePrice: 249, isVeg: false, prepTime: "15 min", calories: 580, protein: 32, image: "https://i.pinimg.com/1200x/4c/0f/f4/4c0ff40bcb0e1147af56a50a5798d27a.jpg" },
    { name: "Crunchy Tenders", basePrice: 189, isVeg: false, prepTime: "12 min", calories: 350, protein: 26, image: "https://i.pinimg.com/1200x/4a/aa/5b/4aaa5bd5afce1c189cf2343b0fee25ce.jpg" },
    { name: "Family Feast Bucket", basePrice: 799, isVeg: false, prepTime: "25 min", calories: 1200, protein: 72, image: "https://i.pinimg.com/736x/5b/77/f6/5b77f6e1287fa3e48ff5f60acf38373a.jpg" },
  ],
}

const waffleItems = [
  { name: "Classic Belgian Waffle", basePrice: 149, isVeg: true, prepTime: "15 min", calories: 380, protein: 8, image: "https://i.pinimg.com/1200x/c3/5d/90/c35d90be4c5ab34504681200afc62145.jpg" },
  { name: "Chocolate Chip Waffle", basePrice: 179, isVeg: true, prepTime: "15 min", calories: 450, protein: 10, image: "https://i.pinimg.com/1200x/6c/c6/f3/6cc6f399d42170307aefb435f52201e9.jpg" },
  { name: "Blueberry Waffle", basePrice: 169, isVeg: true, prepTime: "15 min", calories: 400, protein: 9, image: "https://i.pinimg.com/1200x/23/e8/83/23e883d226bf1f44c7857bb44789a049.jpg" },
  { name: "Strawberry Cream Waffle", basePrice: 189, isVeg: true, prepTime: "18 min", calories: 480, protein: 10, image: "https://i.pinimg.com/1200x/48/2d/b8/482db8f656061c1602c57f190e244e9a.jpg" },
  { name: "Nutella Banana Waffle", basePrice: 199, isVeg: true, prepTime: "15 min", calories: 520, protein: 12, image: "https://i.pinimg.com/736x/c8/f9/66/c8f9663ca6ff01f2a3ccc17057b1e91f.jpg" },
  { name: "Red Velvet Waffle", basePrice: 209, isVeg: true, prepTime: "18 min", calories: 490, protein: 10, image: "https://i.pinimg.com/736x/f2/ae/bb/f2aebb69d28f86c87830f27dda3f07de.jpg" },
  { name: "Peanut Butter Waffle", basePrice: 179, isVeg: true, prepTime: "15 min", calories: 510, protein: 16, image: "https://i.pinimg.com/1200x/2f/67/b9/2f67b9a689054f45ef5daa6f1739eba3.jpg" },
  { name: "Maple Bacon Waffle", basePrice: 229, isVeg: false, prepTime: "20 min", calories: 580, protein: 18, image: "https://i.pinimg.com/736x/d3/1d/48/d31d48f2e1e5eb5fc4eea1dc0a6ecc47.jpg" },
  { name: "Oreo Crumble Waffle", basePrice: 199, isVeg: true, prepTime: "15 min", calories: 540, protein: 11, image: "https://i.pinimg.com/736x/e7/da/8f/e7da8f8069722eee7bae87c2669fa0bb.jpg" },
  { name: "Caramel Apple Waffle", basePrice: 189, isVeg: true, prepTime: "18 min", calories: 460, protein: 9, image: "https://i.pinimg.com/736x/42/94/c3/4294c3caeea49e1aef0ef29a10c33e56.jpg" },
]

const eggItems = [
  // Scrambled & Omelets
  { name: "Classic Scrambled Eggs", basePrice: 99, isVeg: false, prepTime: "10 min", calories: 220, protein: 14, image: "https://i.pinimg.com/1200x/7f/18/15/7f18154140a993f34d708a25aad447ee.jpg" },
  { name: "Cheese Scrambled Eggs", basePrice: 129, isVeg: false, prepTime: "12 min", calories: 280, protein: 18, image: "https://i.pinimg.com/1200x/34/5d/a7/345da74511c63d44ece119a91a2596b6.jpg" },
  { name: "Masala Scrambled Eggs", basePrice: 119, isVeg: false, prepTime: "12 min", calories: 250, protein: 16, image: "https://i.pinimg.com/1200x/3f/6f/4f/3f6f4fab781606a104278111ea33bfc0.jpg" },
  { name: "Half fry (Single)", basePrice: 149, isVeg: false, prepTime: "15 min", calories: 320, protein: 20, image: "https://i.pinimg.com/736x/64/b9/5e/64b95e18467ef9b5bb7cbc2d8089f5e8.jpg" },
  { name: "Cheese Omelet", basePrice: 139, isVeg: false, prepTime: "12 min", calories: 300, protein: 22, image: "https://i.pinimg.com/736x/a9/c3/6e/a9c36e795b0db69ddb430030a740c9b9.jpg" },
  { name: "Boiled Eggs", basePrice: 159, isVeg: false, prepTime: "15 min", calories: 290, protein: 20, image: "https://i.pinimg.com/736x/a9/c3/6e/a9c36e795b0db69ddb430030a740c9b9.jpg" },
  { name: "Scotch Egg", basePrice: 149, isVeg: false, prepTime: "15 min", calories: 280, protein: 18, image: "https://i.pinimg.com/736x/d6/ba/0c/d6ba0c7838d6952d6fb2666f11810a5d.jpg" },
  { name: "Egg Salad", basePrice: 179, isVeg: false, prepTime: "15 min", calories: 380, protein: 28, image: "https://i.pinimg.com/1200x/47/25/d2/4725d22e191f87756ecef0914e789e60.jpg" },
  { name: "Denver Omelet", basePrice: 189, isVeg: false, prepTime: "18 min", calories: 400, protein: 30, image: "https://i.pinimg.com/1200x/86/6c/8f/866c8f51d0a512a8030cef398f76f887.jpg" },
  { name: "Greek Omelet", basePrice: 169, isVeg: false, prepTime: "15 min", calories: 340, protein: 24, image: "https://i.pinimg.com/736x/f4/61/a6/f461a68d5e33c041a15a9af65a1ac9c4.jpg" },
  // Fried & Poached
  { name: "Sunny Side Up Eggs", basePrice: 89, isVeg: false, prepTime: "8 min", calories: 180, protein: 12, image: "https://i.pinimg.com/1200x/f7/e8/7e/f7e87e7868d7f1a4b6889575eeddb81f.jpg" },
  { name: "Over Easy Eggs", basePrice: 89, isVeg: false, prepTime: "8 min", calories: 180, protein: 12, image: "https://i.pinimg.com/736x/eb/23/94/eb23945274044b0342ea4fbb12d3eb32.jpg" },
  { name: "Fried Egg Sandwich", basePrice: 129, isVeg: false, prepTime: "12 min", calories: 350, protein: 18, image: "https://i.pinimg.com/736x/6f/af/f1/6faff1c1fd2d0a3c0bc0f28679e1017a.jpg" },
  { name: "Eggs Benedict", basePrice: 249, isVeg: false, prepTime: "20 min", calories: 480, protein: 24, image: "https://i.pinimg.com/1200x/71/6a/9b/716a9bfeee9b11e48a6d7b5ecb70b8c1.jpg" },
  { name: "Eggs Florentine", basePrice: 229, isVeg: false, prepTime: "20 min", calories: 420, protein: 22, image: "https://i.pinimg.com/1200x/61/36/b5/6136b5b75dd20fa974670059c4173d37.jpg" },
  { name: "Poached Eggs on Toast", basePrice: 149, isVeg: false, prepTime: "15 min", calories: 280, protein: 16, image: "https://i.pinimg.com/1200x/61/36/b5/6136b5b75dd20fa974670059c4173d37.jpg" },
  { name: "Shakshuka", basePrice: 199, isVeg: false, prepTime: "25 min", calories: 350, protein: 18, image: "https://i.pinimg.com/1200x/76/46/2e/76462e9a3387df362b5be66f90b5859b.jpg" },
  { name: "Turkish Eggs", basePrice: 179, isVeg: false, prepTime: "18 min", calories: 320, protein: 16, image: "https://i.pinimg.com/1200x/58/c7/d0/58c7d0684716e743c3022786c0369816.jpg" },
  // Boiled Eggs
  { name: "Soft Boiled Eggs", basePrice: 69, isVeg: false, prepTime: "8 min", calories: 140, protein: 12, image: "https://i.pinimg.com/1200x/5a/ef/d3/5aefd3cc028569db21c928b37379ea18.jpg" },
  { name: "Hard Boiled Eggs", basePrice: 69, isVeg: false, prepTime: "12 min", calories: 140, protein: 12, image: "https://i.pinimg.com/736x/eb/23/94/eb23945274044b0342ea4fbb12d3eb32.jpg" },
  { name: "Egg Salad", basePrice: 149, isVeg: false, prepTime: "15 min", calories: 280, protein: 16, image: "https://i.pinimg.com/1200x/4b/4e/29/4b4e299d537cc5fd4cc8db83137b801a.jpg" },
  { name: "Deviled Eggs", basePrice: 129, isVeg: false, prepTime: "20 min", calories: 220, protein: 14, imge: "https://i.pinimg.com/1200x/38/47/b4/3847b40836e2d5d6ca5d9b49d1e0e7c0.jpg" },
  { name: "Scotch Eggs", basePrice: 199, isVeg: false, prepTime: "25 min", calories: 420, protein: 24, image: "https://i.pinimg.com/736x/a9/46/80/a9468055f404fb1d6009e4e4398b0620.jpg" },
  { name: "Egg Mayo Sandwich", basePrice: 119, isVeg: false, prepTime: "10 min", calories: 320, protein: 14, image: "https://i.pinimg.com/736x/d7/c2/3d/d7c23d22266928def3cd99ff32010766.jpg" },
  // Indian Egg Dishes
  { name: "Egg Curry", basePrice: 179, isVeg: false, prepTime: "25 min", calories: 380, protein: 22, image: "https://i.pinimg.com/1200x/98/8c/14/988c14d330598ec327e16424a37c36d3.jpg" },
  { name: "Egg Biryani", basePrice: 199, isVeg: false, prepTime: "35 min", calories: 480, protein: 24, image: "https://i.pinimg.com/1200x/fb/59/60/fb596057f73356f0fa951a1b05ca31a2.jpg" },
  { name: "Egg Fried Rice", basePrice: 169, isVeg: false, prepTime: "15 min", calories: 420, protein: 18, image: "https://i.pinimg.com/736x/69/a1/b6/69a1b683131c3b3d270adfd478ae0bfc.jpg" },
  { name: "Egg Paratha", basePrice: 129, isVeg: false, prepTime: "20 min", calories: 380, protein: 16, image: "https://i.pinimg.com/1200x/9c/81/c6/9c81c66364417abeccb7b714da670f67.jpg" },
  { name: "Anda Bhurji", basePrice: 139, isVeg: false, prepTime: "15 min", calories: 280, protein: 18, image: "https://i.pinimg.com/1200x/85/07/4d/85074d1a7e924c885688429559963ec7.jpg" },
  { name: "Egg Masala", basePrice: 169, isVeg: false, prepTime: "20 min", calories: 340, protein: 20, image: "https://i.pinimg.com/1200x/98/8c/14/988c14d330598ec327e16424a37c36d3.jpg" },
  { name: "Egg Keema", basePrice: 199, isVeg: false, prepTime: "25 min", calories: 400, protein: 26, image: "https://i.pinimg.com/1200x/c8/c9/16/c8c916950ca588d137289c6c285280be.jpg" },
  { name: "Egg Dosa", basePrice: 149, isVeg: false, prepTime: "18 min", calories: 350, protein: 16, image: "https://i.pinimg.com/1200x/e1/94/3e/e1943e394886fcdef12fd79ccc035b84.jpg" },
  { name: "Egg Uttapam", basePrice: 139, isVeg: false, prepTime: "18 min", calories: 340, protein: 16, image: "https://i.pinimg.com/1200x/20/d4/24/20d424ed88bb522973c1cc40ae9370b7.jpg" },
  { name: "Kerala Egg Roast", basePrice: 189, isVeg: false, prepTime: "25 min", calories: 360, protein: 22, image: "https://i.pinimg.com/736x/38/d5/6d/38d56d57024b60407014bebffe16a9fc.jpg" },
  // Asian Egg Dishes
  { name: "Egg Drop Soup", basePrice: 99, isVeg: false, prepTime: "12 min", calories: 120, protein: 10, image: "https://i.pinimg.com/1200x/1c/21/54/1c2154c8cd7cbdfbf0090a4bd16b9e76.jpg" },
  { name: "Steamed Egg Custard", basePrice: 119, isVeg: false, prepTime: "20 min", calories: 180, protein: 12, image: "https://i.pinimg.com/1200x/37/81/8c/37818c58a9270ccd00a9794dc92374ac.jpg" },
  { name: "Tamagoyaki", basePrice: 139, isVeg: false, prepTime: "15 min", calories: 200, protein: 14, image: "https://i.pinimg.com/1200x/97/a9/99/97a9999b285d5a2ca4a3b4b2e35df286.jpg" },
  { name: "Century Egg Congee", basePrice: 149, isVeg: false, prepTime: "25 min", calories: 280, protein: 16, image: "https://i.pinimg.com/736x/09/6c/e6/096ce6f2be8578ea64ca185a085f8501.jpg" },
  { name: "Korean Steamed Eggs", basePrice: 129, isVeg: false, prepTime: "18 min", calories: 180, protein: 14, image: "https://i.pinimg.com/1200x/37/81/8c/37818c58a9270ccd00a9794dc92374ac.jpg" },
  { name: "Thai Egg Salad", basePrice: 159, isVeg: false, prepTime: "15 min", calories: 260, protein: 16, image: "https://i.pinimg.com/736x/29/36/f2/2936f22da05d7716454168e3e4775d37.jpg" },
  // Breakfast Combos
  { name: "Full English Breakfast", basePrice: 299, isVeg: false, prepTime: "25 min", calories: 750, protein: 38, image: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "American Breakfast Platter", basePrice: 279, isVeg: false, prepTime: "22 min", calories: 680, protein: 34, image: "https://i.pinimg.com/1200x/87/ed/14/87ed14a0c2c98e336cda9ca4e2310c9c.jpg" },
  { name: "Eggs & Bacon", basePrice: 199, isVeg: false, prepTime: "15 min", calories: 450, protein: 28, image: "https://i.pinimg.com/1200x/e9/40/29/e94029b3d1e3e88a08036bc8e72543e8.jpg" },
  { name: "Eggs & Sausage", basePrice: 209, isVeg: false, prepTime: "18 min", calories: 480, protein: 30, image: "https://i.pinimg.com/736x/dd/8e/a1/dd8ea1d362a49082c735594c0cf97adb.jpg" },
  { name: "Breakfast Burrito with Eggs", basePrice: 229, isVeg: false, prepTime: "18 min", calories: 520, protein: 26, image: "https://i.pinimg.com/1200x/53/d9/8e/53d98eda29cea4d01395424dad0244a2.jpg" },
  { name: "Egg & Cheese Croissant", basePrice: 179, isVeg: false, prepTime: "12 min", calories: 420, protein: 18, image: "https://i.pinimg.com/736x/b6/3e/3b/b63e3b9100fed145a1dad8d813435cd0.jpg" },
  { name: "Egg Muffin", basePrice: 149, isVeg: false, prepTime: "10 min", calories: 350, protein: 16, image: "https://i.pinimg.com/736x/e2/6c/f4/e26cf4e93fc668041edfdef2562bf28d.jpg" },
  { name: "Huevos Rancheros", basePrice: 219, isVeg: false, prepTime: "20 min", calories: 480, protein: 22, image: "https://i.pinimg.com/1200x/be/24/0b/be240b4ef8e10585645877ee7cea5cbf.jpg" },
  { name: "Egg & Avocado Toast", basePrice: 189, isVeg: false, prepTime: "12 min", calories: 380, protein: 18, image: "https://i.pinimg.com/1200x/2b/c5/4a/2bc54ab609fc9d71785c17a39fb2587e.jpg" },
  { name: "French Toast with Eggs", basePrice: 199, isVeg: false, prepTime: "18 min", calories: 520, protein: 20, image: "https://i.pinimg.com/1200x/d9/6d/ea/d96dea8ca2a5733e344b5f909fd9abef.jpg" },
]

const comboMeals = [
  // Punjabi Combos
  {
    image: "https://i.pinimg.com/1200x/9c/e8/1f/9ce81ff34b0386b595ba97417d81a283.jpg",
    name: "Punjabi Thali Combo",
    basePrice: 349,
    isVeg: true,
    prepTime: "30 min",
    calories: 850,
    protein: 28,
    cuisine: "Punjabi",
  },
  {
    image: "https://i.pinimg.com/1200x/98/8c/14/988c14d330598ec327e16424a37c36d3.jpg",
    name: "Egg Curry Combo",
    basePrice: 399,
    isVeg: false,
    prepTime: "35 min",
    calories: 920,
    protein: 38,
    cuisine: "Punjabi",
  },
  {
    image: "https://i.pinimg.com/736x/ff/20/18/ff201831f9dd63c8ba5b11ff1a7cbf7f.jpg",
    name: "Chole Bhature Combo",
    basePrice: 249,
    isVeg: true,
    prepTime: "25 min",
    calories: 720,
    protein: 22,
    cuisine: "Punjabi",
  },
  {
    image: "https://i.pinimg.com/736x/ff/20/18/ff201831f9dd63c8ba5b11ff1a7cbf7f.jpg",
    name: "Dal Makhani Combo",
    basePrice: 279,
    isVeg: true,
    prepTime: "30 min",
    calories: 680,
    protein: 26,
    cuisine: "Punjabi",
  },
  {
    image: "https://i.pinimg.com/1200x/09/47/ba/0947baf85cca7c298158a02ad232a3d3.jpg",
    name: "Paneer Feast Combo",
    basePrice: 329,
    isVeg: true,
    prepTime: "30 min",
    calories: 780,
    protein: 32,
    cuisine: "Punjabi",
  },
  // Gujarati Combos
  {
    image: "https://i.pinimg.com/736x/78/54/72/7854722f65d1b1c02360ba579d194037.jpg",
    name: "Gujarati Thali Combo",
    basePrice: 299,
    isVeg: true,
    prepTime: "35 min",
    calories: 750,
    protein: 24,
    cuisine: "Gujarati",
  },
  {
    name: "Dhokla Special Combo",
    basePrice: 199,
    isVeg: true,
    prepTime: "20 min",
    calories: 480,
    protein: 16,
    cuisine: "Gujarati",
  },
  {
    image: "https://i.pinimg.com/1200x/b1/e4/d5/b1e4d5439222dc1014948f0ff38143d9.jpg",
    name: "Kathiyawadi Thali",
    basePrice: 349,
    isVeg: true,
    prepTime: "40 min",
    calories: 820,
    protein: 26,
    cuisine: "Gujarati",
  },
  // South Indian Combos
  {
    image: "https://i.pinimg.com/1200x/de/43/21/de43212bcbd6cce15b59ed1c4ce6885a.jpg",
    name: "South Indian Thali Combo",
    basePrice: 279,
    isVeg: true,
    prepTime: "30 min",
    calories: 680,
    protein: 22,
    cuisine: "South Indian",
  },
  {
    image: "https://i.pinimg.com/736x/4e/31/c0/4e31c084f48e2d67d0bdccca7432a1df.jpg",
    name: "Dosa Feast Combo",
    basePrice: 249,
    isVeg: true,
    prepTime: "25 min",
    calories: 620,
    protein: 18,
    cuisine: "South Indian",
  },
  {
    name: "Idli Sambar Combo",
    basePrice: 179,
    isVeg: true,
    prepTime: "20 min",
    calories: 450,
    protein: 14,
    cuisine: "South Indian",
  },
  {
    image: "https://i.pinimg.com/1200x/6a/6c/c4/6a6cc4f8b1153e05aa5eef1fce8e30f8.jpg",
    name: "Masala Chana",
    basePrice: 399,
    isVeg: false,
    prepTime: "35 min",
    calories: 850,
    protein: 42,
    cuisine: "South Indian",
  },
  // Burger Combos
  {
    image:"https://i.pinimg.com/736x/fc/0a/42/fc0a4289efcea387a45d10799cd3261d.jpg",
    name: "Egg salad",
    basePrice: 299,
    isVeg: false,
    prepTime: "18 min",
    calories: 920,
    protein: 36,
    cuisine: "American",
  },
  {
    name: "Veg Burger + Fries Combo",
    basePrice: 249,
    isVeg: true,
    prepTime: "18 min",
    calories: 780,
    protein: 18,
    cuisine: "American",
  },
  {
    image:"https://i.pinimg.com/1200x/ad/90/d4/ad90d4dbfeef909328588940cd81f308.jpg",
    name: "Chana Salad",
    basePrice: 399,
    isVeg: false,
    prepTime: "22 min",
    calories: 1100,
    protein: 48,
    cuisine: "American",
  },
  {
    image:"https://i.pinimg.com/736x/ad/15/ff/ad15ff23937f50693f043e971fd426e4.jpg",
    name: "Clean Food",
    basePrice: 329,
    isVeg: false,
    prepTime: "20 min",
    calories: 950,
    protein: 40,
    cuisine: "American",
  },
  // Biryani Combos
  {
    image:"https://i.pinimg.com/736x/8c/24/3c/8c243cc8e49925b96f1cac71cd39de6d.jpg",
    name: "Green Salad",
    basePrice: 379,
    isVeg: false,
    prepTime: "40 min",
    calories: 880,
    protein: 36,
    cuisine: "Indian",
  },
  {
    name: "Veg Biryani Combo",
    basePrice: 279,
    isVeg: true,
    prepTime: "35 min",
    calories: 720,
    protein: 20,
    cuisine: "Indian",
  },
  {
    image:"https://i.pinimg.com/1200x/51/1f/05/511f0585a516f302320338f5d28535ad.jpg",
    name: "Pasta salad",
    basePrice: 399,
    isVeg: false,
    prepTime: "45 min",
    calories: 950,
    protein: 40,
    cuisine: "Indian",
  },
  // Family Combos
  {
    image:"https://i.pinimg.com/1200x/05/68/89/0568893d2e5d355983084b7a3727397e.jpg",
    name: "Protin Shake",
    basePrice: 899,
    isVeg: false,
    prepTime: "30 min",
    calories: 2200,
    protein: 96,
    cuisine: "Fast Food",
  },
  {
    image:"https://i.pinimg.com/1200x/c6/50/da/c650da00562f5263c23369911fb2bff8.jpg",
    name: "Greek salad Bowl",
    basePrice: 699,
    isVeg: false,
    prepTime: "35 min",
    calories: 1800,
    protein: 72,
    cuisine: "Indian",
  },
  {
    image: "https://i.pinimg.com/736x/d8/63/b6/d863b6c96bab71a7cbba4ed0021796ba.jpg",
    name: "Karela Juice",
    basePrice: 10,
    isVeg: false,
    prepTime: "40 min",
    calories: 3300,
    protein: 120,
    cuisine: "Fast Food",
  },
]

const paneerItems = [
  { name: "Paneer Tikka", basePrice: 249, isVeg: true, prepTime: "25 min", calories: 320, protein: 22 },
  { name: "Paneer Butter Masala", basePrice: 269, isVeg: true, prepTime: "30 min", calories: 420, protein: 24 },
  { name: "Kadai Paneer", basePrice: 259, isVeg: true, prepTime: "28 min", calories: 380, protein: 22 },
  { name: "Paneer Bhurji", basePrice: 199, isVeg: true, prepTime: "20 min", calories: 340, protein: 24 },
  { name: "Shahi Paneer", basePrice: 279, isVeg: true, prepTime: "30 min", calories: 450, protein: 22 },
  { name: "Paneer Do Pyaza", basePrice: 249, isVeg: true, prepTime: "25 min", calories: 360, protein: 20 },
  { name: "Paneer Lababdar", basePrice: 269, isVeg: true, prepTime: "28 min", calories: 400, protein: 22 },
  { name: "Paneer Kofta", basePrice: 289, isVeg: true, prepTime: "35 min", calories: 480, protein: 26 },
  { name: "Paneer Makhani", basePrice: 279, isVeg: true, prepTime: "30 min", calories: 440, protein: 24 },
  { name: "Paneer Jalfrezi", basePrice: 259, isVeg: true, prepTime: "25 min", calories: 350, protein: 22 },
  { name: "Achari Paneer", basePrice: 269, isVeg: true, prepTime: "28 min", calories: 380, protein: 22 },
  { name: "Paneer Angara", basePrice: 289, isVeg: true, prepTime: "30 min", calories: 400, protein: 24 },
  { name: "Paneer Handi", basePrice: 279, isVeg: true, prepTime: "32 min", calories: 420, protein: 24 },
  { name: "Paneer Pasanda", basePrice: 299, isVeg: true, prepTime: "35 min", calories: 460, protein: 26 },
  { name: "Paneer Kolhapuri", basePrice: 269, isVeg: true, prepTime: "28 min", calories: 390, protein: 22 },
  { name: "Malai Paneer Tikka", basePrice: 279, isVeg: true, prepTime: "25 min", calories: 380, protein: 24 },
  { name: "Tandoori Paneer", basePrice: 269, isVeg: true, prepTime: "28 min", calories: 340, protein: 26 },
  { name: "Paneer Wrap", basePrice: 179, isVeg: true, prepTime: "15 min", calories: 420, protein: 22 },
  { name: "Paneer Rice Bowl", basePrice: 229, isVeg: true, prepTime: "20 min", calories: 520, protein: 26 },
  { name: "Paneer Salad Bowl", basePrice: 199, isVeg: true, prepTime: "15 min", calories: 280, protein: 24 },
]

const saladItems = [
  { name: "Greek Power Salad", basePrice: 199, isVeg: true, prepTime: "12 min", calories: 280, protein: 16 },
  { name: "Quinoa Protein Salad", basePrice: 249, isVeg: true, prepTime: "15 min", calories: 320, protein: 18 },
  { name: "Chickpea Salad Bowl", basePrice: 189, isVeg: true, prepTime: "12 min", calories: 340, protein: 16 },
  { name: "Edamame Crunch Salad", basePrice: 219, isVeg: true, prepTime: "12 min", calories: 280, protein: 20 },
  { name: "Lentil Power Salad", basePrice: 199, isVeg: true, prepTime: "15 min", calories: 350, protein: 18 },
  { name: "Tofu Asian Salad", basePrice: 229, isVeg: true, prepTime: "15 min", calories: 300, protein: 22 },
  { name: "Black Bean Salad", basePrice: 189, isVeg: true, prepTime: "12 min", calories: 320, protein: 16 },
  { name: "Sprouts Power Bowl", basePrice: 179, isVeg: true, prepTime: "10 min", calories: 240, protein: 18 },
  { name: "Cottage Cheese Salad", basePrice: 209, isVeg: true, prepTime: "12 min", calories: 280, protein: 22 },
  { name: "Mediterranean Protein Bowl", basePrice: 239, isVeg: true, prepTime: "15 min", calories: 360, protein: 20 },
  { name: "Soya Chunk Salad", basePrice: 179, isVeg: true, prepTime: "15 min", calories: 320, protein: 28 },
  { name: "Kidney Bean Salad", basePrice: 189, isVeg: true, prepTime: "12 min", calories: 340, protein: 18 },
  { name: "Hemp Seed Salad", basePrice: 259, isVeg: true, prepTime: "12 min", calories: 300, protein: 20 },
  { name: "Pumpkin Seed Power Bowl", basePrice: 229, isVeg: true, prepTime: "12 min", calories: 320, protein: 18 },
  { name: "Avocado Protein Salad", basePrice: 249, isVeg: true, prepTime: "12 min", calories: 380, protein: 16 },
  { name: "Tempeh Buddha Bowl", basePrice: 269, isVeg: true, prepTime: "18 min", calories: 400, protein: 26 },
  { name: "Mixed Bean Fiesta", basePrice: 199, isVeg: true, prepTime: "12 min", calories: 360, protein: 20 },
  { name: "Nutty Spinach Salad", basePrice: 219, isVeg: true, prepTime: "10 min", calories: 320, protein: 18 },
  { name: "Feta & Olive Salad", basePrice: 229, isVeg: true, prepTime: "12 min", calories: 300, protein: 16 },
  { name: "Hummus Power Bowl", basePrice: 209, isVeg: true, prepTime: "15 min", calories: 380, protein: 18 },
]

// Modifiers for variety
const modifiers = [
  "Special",
  "Classic",
  "Spicy",
  "Mild",
  "Extra Cheese",
  "Loaded",
  "Supreme",
  "Deluxe",
  "Homestyle",
  "Chef's",
  "Premium",
  "Crispy",
  "Grilled",
  "Fresh",
  "Signature",
]

// Category mapping - Added new categories
const cuisineCategoryMapping: Record<string, string[]> = {
  Gujarati: ["Appetizers", "Main Course", "Snacks", "Breakfast"],
  Punjabi: ["Main Course", "Bread & Naan", "Curries", "Beverages"],
  Italian: ["Pizzas", "Pasta", "Appetizers", "Desserts", "Salads"],
  Chinese: ["Appetizers", "Main Course", "Soups", "Rice & Biryani"],
  Mexican: ["Wraps", "Appetizers", "Main Course", "Desserts", "Snacks"],
  Thai: ["Curries", "Soups", "Main Course", "Desserts", "Beverages"],
  Japanese: ["Appetizers", "Main Course", "Soups", "Desserts"],
  American: ["Burgers", "Sandwiches", "Appetizers", "Desserts", "Breakfast", "Waffles"],
  Mediterranean: ["Wraps", "Salads", "Grills", "Appetizers", "Desserts"],
  Indian: ["Curries", "Rice & Biryani", "Bread & Naan", "Appetizers", "Desserts", "Beverages"],
  "South Indian": ["Breakfast", "Main Course", "Curries", "Snacks"],
  "Fast Food": ["Fried Chicken", "Burgers", "Snacks", "Combo Meals"],
}

// Generate unique Unsplash photo IDs for different food items
function getRandomUnsplashId(foodName: string, cuisine: string): string {
  const foodHash = foodName.toLowerCase().split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  const cuisineHash = cuisine.toLowerCase().split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  // Use a combination of food and cuisine hashes to get consistent but varied IDs
  const combinedHash = Math.abs(foodHash + cuisineHash);
  const photoIds = [
    '1601050690597-df0568f70950', '1504672305081-458ba335535', '1540420774-30c94e5b3c', '1484723095-5c4f5b5b5b', '1414234-abc123',
    '1607620314-5c4f5b5b5b', '1540420772-30c94e5b3c', '1484723094-5c4f5b5b5b', '1414235-abc123', '1607620315-5c4f5b5b5b',
    '1540420773-30c94e5b3c', '1484723096-5c4f5b5b5b', '1414236-abc123', '1607620316-5c4f5b5b5b', '1540420775-30c94e5b3c',
    '1484723097-5c4f5b5b5b', '1414237-abc123', '1607620317-5c4f5b5b5b', '1540420776-30c94e5b3c', '1484723098-5c4f5b5b5b',
    '1601050690597-df0568f70950', '1504672305081-458ba335535', '1540420774-30c94e5b3c', '1484723095-5c4f5b5b5b', '1414234-abc123',
    '1607620314-5c4f5b5b5b', '1540420772-30c94e5b3c', '1484723094-5c4f5b5b5b', '1414235-abc123', '1607620315-5c4f5b5b5b',
    '1540420773-30c94e5b3c', '1484723096-5c4f5b5b5b', '1414236-abc123', '1607620316-5c4f5b5b5b', '1540420775-30c94e5b3c',
    '1484723097-5c4f5b5b5b', '1414237-abc123', '1607620317-5c4f5b5b5b', '1540420776-30c94e5b3c', '1484723098-5c4f5b5b5b'
  ];

  return photoIds[combinedHash % photoIds.length];
}

// Generate 5000+ food items
export function generateFoodItems(): FoodItem[] {
  const items: FoodItem[] = []
  let id = 1

  // Generate multiple variations for each cuisine
  for (const [cuisine, templates] of Object.entries(foodTemplates)) {
    const cuisineCategories = cuisineCategoryMapping[cuisine] || ["Main Course"]

    for (const template of templates) {
      // Create multiple variations of each item
      for (let variation = 0; variation < 1; variation++) {
        const modifier = modifiers[variation % modifiers.length]
        const category = cuisineCategories[variation % cuisineCategories.length]
        const mealType = determineMealType(category, template.name)

        const item: FoodItem = {
          id: `food-${id++}`,
          name: variation === 0 ? template.name : `${modifier} ${template.name}`,
          category,
          cuisine,
          image: 'image' in template && template.image ? template.image : `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(template.name)}`,
          price: template.basePrice,
          isVeg: template.isVeg,
          mealType,
          description: generateDescription(template.name, cuisine, template.isVeg),
          rating: 4.0,
          prepTime: template.prepTime,
          calories: template.calories,
          protein:
            template.protein ||
            (template.isVeg ? Math.floor(Math.random() * 15 + 5) : Math.floor(Math.random() * 30 + 15)),
        }

        items.push(item)
      }
    }
  }

  for (const waffle of waffleItems) {
    for (let i = 0; i < 1; i++) {
      const modifier = i === 0 ? "" : modifiers[i % modifiers.length] + " "
      items.push({
        id: `waffle-${id++}`,
        name: `${modifier}${waffle.name}`,
        category: "Waffles",
        cuisine: "American",
        image: `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(waffle.name)}`,
        price: waffle.basePrice,
        isVeg: waffle.isVeg,
        mealType: "breakfast",
        description: `Fluffy ${waffle.name.toLowerCase()} made fresh to order. Perfect for breakfast or dessert.`,
        rating: 4.0,
        prepTime: waffle.prepTime,
        calories: waffle.calories,
        protein: waffle.protein,
      })
    }
  }

  for (const egg of eggItems) {
    for (let i = 0; i < 1; i++) {
      const modifier = i === 0 ? "" : modifiers[i % modifiers.length] + " "
      items.push({
        id: `egg-${id++}`,
        name: `${modifier}${egg.name}`,
        category: "Eggs",
        cuisine:
          egg.name.includes("Indian") ||
            egg.name.includes("Curry") ||
            egg.name.includes("Biryani") ||
            egg.name.includes("Bhurji") ||
            egg.name.includes("Masala") ||
            egg.name.includes("Paratha") ||
            egg.name.includes("Dosa") ||
            egg.name.includes("Kerala")
            ? "Indian"
            : "American",
        image: `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(egg.name)}`,
        price: egg.basePrice,
        isVeg: false,
        mealType: "breakfast",
        description: `Delicious ${egg.name.toLowerCase()} prepared with farm-fresh eggs.`,
        rating: 4.0,
        prepTime: egg.prepTime,
        calories: egg.calories,
        protein: egg.protein,
      })
    }
  }

  for (const combo of comboMeals) {
    for (let i = 0; i < 1; i++) {
      const modifier = i === 0 ? "" : modifiers[i % modifiers.length] + " "
      items.push({
        id: `combo-${id++}`,
        name: `${modifier}${combo.name}`,
        category: "Combo Meals",
        cuisine: combo.cuisine,
        image: combo.image || `https://images.unsplash.com/photo-${getRandomUnsplashId(combo.name, combo.cuisine)}?w=400&h=300&fit=crop&auto=format&q=80`,
        price: combo.basePrice + Math.floor(Math.random() * 50),
        isVeg: combo.isVeg,
        mealType: "all",
        description: `Complete ${combo.name.toLowerCase()} with all accompaniments. Great value meal!`,
        rating: 4.0,
        prepTime: combo.prepTime,
        calories: combo.calories,
        protein: combo.protein,
      })
    }
  }

  for (const paneer of paneerItems) {
    for (let i = 0; i < 1; i++) {
      const modifier = i === 0 ? "" : modifiers[i % modifiers.length] + " "
      items.push({
        id: `paneer-${id++}`,
        name: `${modifier}${paneer.name}`,
        category: "Main Course",
        cuisine: "Indian",
        image: `https://images.unsplash.com/photo-${getRandomUnsplashId(paneer.name, "Indian")}?w=400&h=300&fit=crop&auto=format&q=80`,
        price: paneer.basePrice + Math.floor(Math.random() * 30),
        isVeg: true,
        mealType: "all",
        description: `Rich and creamy ${paneer.name.toLowerCase()} made with fresh cottage cheese.`,
        rating: 4.0,
        prepTime: paneer.prepTime,
        calories: paneer.calories,
        protein: paneer.protein,
      })
    }
  }

  for (const salad of saladItems) {
    for (let i = 0; i < 1; i++) {
      const modifier = i === 0 ? "" : modifiers[i % modifiers.length] + " "
      items.push({
        id: `salad-${id++}`,
        name: `${modifier}${salad.name}`,
        category: "Salads",
        cuisine: "Mediterranean",
        image: `https://images.unsplash.com/photo-${getRandomUnsplashId(salad.name, "Mediterranean")}?w=400&h=300&fit=crop&auto=format&q=80`,
        price: salad.basePrice + Math.floor(Math.random() * 30),
        isVeg: true,
        mealType: "all",
        description: `Fresh and nutritious ${salad.name.toLowerCase()}. Packed with protein and vitamins.`,
        rating: 4.0,
        prepTime: salad.prepTime,
        calories: salad.calories,
        protein: salad.protein,
      })
    }
  }

  return items
}

function determineMealType(category: string, name: string): "breakfast" | "lunch" | "dinner" | "all" {
  const breakfastKeywords = [
    "pancake",
    "breakfast",
    "dosa",
    "paratha",
    "thepla",
    "dhokla",
    "waffle",
    "egg",
    "idli",
    "pongal",
  ]
  const dinnerKeywords = ["biryani", "curry", "tandoori", "grilled", "rib"]

  const lowerName = name.toLowerCase()

  if (category === "Breakfast" || breakfastKeywords.some((k) => lowerName.includes(k))) {
    return "breakfast"
  }
  if (dinnerKeywords.some((k) => lowerName.includes(k))) {
    return "dinner"
  }
  if (category === "Lunch") {
    return "lunch"
  }

  return "all"
}

function generateDescription(name: string, cuisine: string, isVeg: boolean): string {
  const vegDescriptions = [
    "Fresh and flavorful vegetarian delight",
    "A wholesome plant-based dish",
    "Garden-fresh ingredients in every bite",
    "Perfect for vegetarian food lovers",
    "Healthy and delicious vegetarian option",
  ]

  const nonVegDescriptions = [
    "Tender and juicy meat preparation",
    "Expertly cooked with premium ingredients",
    "A protein-rich delight",
    "Savory and satisfying",
    "Made with the finest quality meat",
  ]

  const baseDesc = isVeg
    ? vegDescriptions[Math.floor(Math.random() * vegDescriptions.length)]
    : nonVegDescriptions[Math.floor(Math.random() * nonVegDescriptions.length)]

  return `${baseDesc}. A ${cuisine} specialty featuring authentic flavors and traditional cooking techniques.`
}

// Cache the generated items
let cachedItems: FoodItem[] | null = null

export function getFoodItems(): FoodItem[] {
  if (!cachedItems) {
    cachedItems = generateFoodItems()
  }
  return cachedItems
}

// Get high protein items (over 20g protein) - Includes egg items
export function getHighProteinItems(): FoodItem[] {
  return getFoodItems().filter((item) => {
    // Must have at least 20g protein
    if ((item.protein || 0) < 20) return false

    // Exclude BBQ items
    if (item.cuisine?.toLowerCase().includes('bbq') ||
        item.name.toLowerCase().includes('bbq') ||
        item.name.toLowerCase().includes('barbecue') ||
        item.category?.toLowerCase().includes('bbq')) {
      return false
    }

    // Exclude Family Feast Bucket
    if (item.name.toLowerCase().includes('family feast bucket')) {
      return false
    }

    // Exclude Tandoori Chicken
    if (item.name.toLowerCase().includes('tandoori chicken')) {
      return false
    }

    return true
  }).map((item) => ({
    ...item,
    isVeg: true // Override to show veg symbol for all high protein items
  }))
}

export function getEggItems(): FoodItem[] {
  return getFoodItems().filter((item) => item.category === "Eggs" || item.name.toLowerCase().includes("egg"))
}

export function getFoodItemById(id: string): FoodItem | undefined {
  console.log("[v0] getFoodItemById called with id:", id)

  // First search in main food items
  const allItems = getFoodItems()
  const mainItem = allItems.find((item) => item.id === id)
  if (mainItem) {
    console.log("[v0] Found item in main food data:", mainItem.name)
    return mainItem
  }

  // If not found, search in offers data (offers have IDs like "offer-1", "offer-2", etc.)
  // We need to dynamically import to avoid circular dependency issues
  if (id.startsWith("offer-")) {
    console.log("[v0] Item ID starts with 'offer-', searching in offers data...")
    // Import offers data dynamically - this is a workaround for the data structure
    try {
      const { getOffers99Items } = require("@/lib/offers-data")
      const offerItems = getOffers99Items()
      const offerItem = offerItems.find((item: FoodItem) => item.id === id)
      if (offerItem) {
        console.log("[v0] Found item in offers data:", offerItem.name)
        return offerItem
      }
    } catch (error) {
      console.log("[v0] Error loading offers data:", error)
    }
  }

  console.log("[v0] Item not found for id:", id)
  return undefined
}
