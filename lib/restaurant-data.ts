// Restaurant types
export interface Restaurant {
  id: string
  name: string
  type: "Restaurant" | "Cafe" | "Hotel" | "Food Outlet"
  image: string
  location: string
  city: string
  state: string
  address: string
  rating: number
  reviews: number
  cuisines: string[]
  offer?: string
  openingTime: string
  closingTime: string
  description: string
  priceRange: "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹"
}

// Gujarat cities
const gujaratCities = [
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",
  "Jamnagar",
  "Junagadh",
  "Gandhinagar",
  "Anand",
  "Nadiad",
  "Morbi",
  "Mehsana",
  "Bharuch",
  "Vapi",
  "Navsari",
  "Veraval",
  "Porbandar",
  "Godhra",
  "Bhuj",
  "Palanpur",
  "Valsad",
  "Patan",
  "Dahod",
  "Botad",
  "Amreli",
  "Surendranagar",
  "Dwarka",
  "Somnath",
  "Daman",
  "Diu",
]

// Famous restaurant name templates
const restaurantNames = {
  Restaurant: [
    "The Grand",
    "Royal",
    "Shreeji",
    "Rajwadu",
    "Swagat",
    "Haveli",
    "Mirchi",
    "Tadka",
    "Spice Garden",
    "Khidki",
    "The Yellow Chilli",
    "Gordhan Thal",
    "Patang",
    "Agashiye",
    "Vishalla",
    "Gopi Dining Hall",
    "Das Khaman House",
    "Toran Dining",
    "Sankalp",
    "Honest",
    "Gwalia",
    "Khodiyar",
    "Neelkanth",
    "Tulsi",
    "Kathiyawadi Bhojanalaya",
    "Rasoi",
    "Bhagat Tarachand",
    "Jalaram",
    "Marwadi Bhojnalay",
    "Sagar Ratna",
    "Udipi",
    "Vasudev Adigas",
    "Chetana",
    "Garden View",
    "Riverside",
    "Lakeside",
    "Hilltop",
    "Heritage",
    "Paradise",
    "Green Leaf",
    "Golden",
    "Silver",
    "Diamond",
    "Pearl",
    "Sapphire",
    "Ruby",
    "Emerald",
    "Crystal",
    "Oasis",
    "Saffron",
  ],
  Cafe: [
    "Mocha",
    "Cafe Coffee Day",
    "Starbucks",
    "Barista",
    "Chai Point",
    "Chai Sutta Bar",
    "Social",
    "The Chocolate Room",
    "Third Wave",
    "Blue Tokai",
    "Kaffee House",
    "Brewberry's",
    "Cafe Mozaic",
    "Cafe Olala",
    "The Coffee Cup",
    "Bean There",
    "Grounds",
    "Urban Cafe",
    "Sunset Cafe",
    "Riverside Cafe",
    "Garden Cafe",
    "Book Cafe",
    "Art Cafe",
    "Music Cafe",
    "Poetry Cafe",
    "Writers Cafe",
    "The Loft",
    "Backyard Cafe",
    "Terrace Cafe",
    "Vintage Cafe",
    "Modern Cafe",
    "Retro Cafe",
    "Classic Cafe",
    "Fusion Cafe",
    "Organic Cafe",
    "Health Cafe",
    "Fitness Cafe",
    "Sports Cafe",
    "Game Cafe",
    "Tech Cafe",
  ],
  Hotel: [
    "Taj",
    "ITC",
    "Marriott",
    "Hyatt",
    "Radisson",
    "Holiday Inn",
    "Novotel",
    "Fortune",
    "Lemon Tree",
    "Pride",
    "Hotel Ritz",
    "Hotel Ambassador",
    "Hotel President",
    "Hotel Excellency",
    "Hotel Plaza",
    "Hotel Grand",
    "Hotel Royal",
    "Hotel Imperial",
    "Hotel Majestic",
    "Hotel Regency",
    "Lords Inn",
    "Fern",
    "Sterling",
    "Club Mahindra",
    "Best Western",
    "Clarks",
    "Sarovar",
    "Treebo",
    "OYO",
    "FabHotel",
    "Ginger",
    "Zone By Park",
    "Park Inn",
    "Country Inn",
    "Residency",
    "Heritage House",
    "Palace Hotel",
    "Lake View",
    "River View",
    "City Center",
  ],
  "Food Outlet": [
    "McDonald's",
    "KFC",
    "Domino's",
    "Pizza Hut",
    "Burger King",
    "Subway",
    "Taco Bell",
    "Barbeque Nation",
    "Mainland China",
    "Absolute Barbecues",
    "Faasos",
    "Behrouz Biryani",
    "Box8",
    "Wow! Momo",
    "Haldiram's",
    "Bikanervala",
    "Sagar Gaire",
    "Vadilal",
    "Naturals",
    "Amul",
    "Havmor",
    "Baskin Robbins",
    "Rolls Mania",
    "The Rolling Pin",
    "Thalassa",
    "China Town",
    "Thai Pavilion",
    "Sigree",
    "Coal Barbecue",
    "Pirates of Grill",
    "Copper Chimney",
    "Nando's",
    "Chili's",
    "TGI Friday's",
    "Hard Rock Cafe",
    "Wok Express",
    "Noodle Bar",
    "Curry House",
    "Biryani Blues",
    "Kebab Factory",
  ],
}

const cuisineTypes = [
  "Gujarati",
  "Punjabi",
  "South Indian",
  "North Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "Continental",
  "Multi-cuisine",
  "Fast Food",
  "Street Food",
  "Seafood",
  "Mughlai",
  "Rajasthani",
]

const offers = [
  "20% OFF",
  "Flat ₹100 OFF",
  "Buy 1 Get 1",
  "Free Delivery",
  "30% OFF up to ₹150",
  "50% OFF on first order",
  "₹99 Meal Deal",
  "Combo Offer",
  "Weekend Special",
  "Happy Hours",
  null,
  null,
  null,
  null,
] // Some have no offers

const areas: Record<string, string[]> = {
  Ahmedabad: [
    "SG Highway",
    "Prahlad Nagar",
    "Satellite",
    "Vastrapur",
    "CG Road",
    "Law Garden",
    "Ellis Bridge",
    "Navrangpura",
    "Bodakdev",
    "Thaltej",
    "Maninagar",
    "Ghatlodia",
    "Paldi",
    "Shahibaug",
    "Chandkheda",
  ],
  Surat: [
    "Adajan",
    "Vesu",
    "Athwa",
    "City Light",
    "Ring Road",
    "Pal",
    "Varachha",
    "Katargam",
    "Dumas Road",
    "Udhna",
    "Piplod",
    "Althan",
  ],
  Vadodara: [
    "Alkapuri",
    "Race Course",
    "Sayajigunj",
    "Fatehgunj",
    "Gotri",
    "Manjalpur",
    "Makarpura",
    "Akota",
    "Sama",
    "Karelibaug",
  ],
  Rajkot: [
    "Kalawad Road",
    "University Road",
    "150 Feet Ring Road",
    "Kalavad Road",
    "Yagnik Road",
    "Gondal Road",
    "Mavdi",
    "Trikon Baug",
  ],
  Gandhinagar: ["Sector 21", "Sector 16", "Gift City", "Infocity", "Kudasan", "Sargasan", "Adalaj", "Pethapur"],
  default: [
    "Main Road",
    "Station Road",
    "Market Area",
    "College Road",
    "Civil Lines",
    "Highway",
    "Bus Stand Area",
    "Industrial Area",
  ],
}

// Get restaurant image based on name and cuisines
// IMAGE MAPPING GUIDE:
// Premium Hotels: Taj, ITC, Marriott, Hyatt, Radisson → Luxury hotel images
// Budget Hotels: OYO, Treebo, FabHotel, Ginger → Budget hotel images
// Mid-range Hotels: Holiday Inn, Novotel, Fortune, Lemon Tree, Pride, Club Mahindra, Best Western, Sarovar, Fern, Sterling → Business hotel images
// Standard Hotels: Hotel Ritz, Ambassador, President, Excellency, Plaza, Grand, Royal, Imperial, Majestic, Regency, Lords Inn, Clarks, Zone By Park, Park Inn, Country Inn, Residency, Heritage House, Palace Hotel, Lake View, River View, City Center → Standard hotel images
// Fast Food: McDonald's, KFC, Domino's, Pizza Hut, Burger King, Subway, Taco Bell → Fast food images
// Indian Chains: Barbeque Nation, Mainland China, Faasos, Behrouz Biryani, Wow! Momo, Haldiram's, Havmor, Sagar Ratna, Udipi, Vasudev Adigas, Chetana, Absolute Barbecues, Box8, Bikanervala, Sagar Gaire, Copper Chimney, Curry House, Biryani Blues, Kebab Factory → Indian cuisine images
// Popular Restaurants: Bhagat Tarachand, Jalaram, Marwadi Bhojnalay, Kathiyawadi Bhojanalaya, Rasoi, Gwalia, Khodiyar, Neelkanth, Tulsi, The Grand, Royal, Shreeji, Rajwadu, Swagat, Haveli, Mirchi, Tadka, Spice Garden, Khidki, Yellow Chilli, Patang, Vishalla, Gopi Dining Hall, Toran Dining → Restaurant images
// Desserts & Ice Cream: Vadilal, Naturals, Amul, Baskin Robbins, Rolls Mania, The Rolling Pin → Desserts and ice cream images
// BBQ & Grills: Coal Barbecue, Pirates of Grill, Sigree → BBQ and grill images
// Asian Cuisine: Thalassa, Thai Pavilion, Wok Express, Noodle Bar → Asian food images
// International: Chili's, China Town, Nando's, TGI Friday's, Hard Rock Cafe → Western/International images
// Cafes: Starbucks, Cafe Coffee Day, Barista, Chai Point, Third Wave, Blue Tokai → Coffee/cafe images
// Local Gujarat: Gordhan Thal, Honest, Sankalp, Agashiye, Das Khaman House → Gujarati food images
// Cuisine Fallback: Gujarati, Punjabi, Italian, Chinese, Mexican, Thai, Japanese → Cuisine-specific images
function getRestaurantImage(name: string, cuisines: string[]): string {
  // Premium Hotels
  if (name.includes("Taj")) return "https://i.redd.it/ciszd3o0tj761.jpg" // Taj Hotels - Luxury hotel
  if (name.includes("ITC")) return "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels-listing/hotels-listing-card/itc-grand-bharat.png" // ITC Hotels - Luxury dining
  if (name.includes("Marriott")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-IL-9zHqSYe3W89Fw7_0BC3HcldjbvGSuQ&s" // Marriott - International hotel
  if (name.includes("Hyatt")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/c6/32/11/hyatt-regency-delhi.jpg?w=900&h=500&s=1" // Hyatt - Premium hotel
  if (name.includes("Radisson")) return "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/113809/photos/75154348_XL.jpg?tr=w-360%2Ch-379%2Cfo-auto" // Radisson - Business hotel
  
  // Popular Budget Hotels
  if (name.includes("OYO")) return "https://media.licdn.com/dms/image/v2/D5612AQFXgSoPOqEEpw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1689239332528?e=2147483647&v=beta&t=zkBZ_zCkuUkTaXfAAa8ZEtzQOoHCJIuf48v8GmDyyag" // OYO Rooms - Budget hotel chain
  if (name.includes("Treebo")) return "https://media.easemytrip.com/media/Hotel/SHL-23052399178289/Common/CommonJ9EVlx.jpg" // Treebo - Budget hotels
  if (name.includes("FabHotel")) return "https://media.easemytrip.com/media/Hotel/SHL-2203933612766/Common/CommonekHM1v.jpg" // FabHotel - Budget hotels
  if (name.includes("Ginger")) return "https://gos3.ibcdn.com/b49fc66eda8e11ed99380a58a9feac02.jpg" // Ginger Hotels - Business hotels
  
  // Mid-range Hotels
  if (name.includes("Holiday Inn")) return "https://ik.imgkit.net/3vlqs5axxjf/external/https://www.cfmedia.vfmleonardo.com/imageRepo/6/0/98/748/282/DELAP_3492358712_O.jpg?tr=w-1200%2Cfo-auto" // Holiday Inn - International chain
  if (name.includes("Novotel")) return "https://www.ahstatic.com/photos/6714_ho_00_p_1024x768.jpg" // Novotel - Accor hotels
  if (name.includes("Fortune")) return "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202508272220036202-0de2a75c-dacf-42e4-ad37-a8b386f7ccb6.jpg" // Fortune Hotels - Indian chain
  if (name.includes("Lemon Tree")) return "https://www.lemontreehotels.com/uploads/hotelslider/28_50_2023_07_50_03Reception-(2).jpg" // Lemon Tree Hotels
  if (name.includes("Pride")) return "https://cf.bstatic.com/xdata/images/hotel/max1024x768/95544077.jpg?k=6e27b5ab706fb568f9250842bf9c7c6897da0267488ada6f5e162cbaba70d1d9&o=" // Pride Hotels
  
  // Other Popular Hotel Chains
  if (name.includes("Club Mahindra")) return "https://www.clubmahindra.com/blog/media/section_images/shuttersto-e77d8a5c4c1e61e.jpg" // Club Mahindra - Resort chain
  if (name.includes("Best Western")) return "https://www.clubmahindra.com/blog/media/section_images/shuttersto-e77d8a5c4c1e61e.jpg" // Best Western - International chain
  if (name.includes("Sarovar")) return "https://gos3.ibcdn.com/90976724-0d42-4d20-bfa8-1fbb14effc8c.jpeg" // Sarovar Hotels
  if (name.includes("Fern")) return "https://www.fernhotels.com/_next/image?url=https%3A%2F%2Fwww.fernhotels.com%2Fapi%2Fuploads%2Fimages%2FHome_Banner-Image-Neha.png&w=3840&q=75" // Fern Hotels
  if (name.includes("Sterling")) return "https://cf.bstatic.com/xdata/images/hotel/max1024x768/514045586.jpg?k=f6b9dfbe5c98a3ac31dee85fee371cd37dec070dd0464c698881203910a22074&o=" // Sterling Hotels
  
  // Standard Hotels
  if (name.includes("Hotel Ritz")) return "https://cf.bstatic.com/xdata/images/hotel/max1024x768/477866385.jpg?k=897c97affa321a4cde969e20dedc8a8ff06af2d6f96bf2e729d5ec58ca04da2a&o=" // Hotel Ritz - Standard hotel
  if (name.includes("Hotel Ambassador")) return "https://ambassadorindia.com/wp-content/uploads/2020/07/4-Reception.jpg" // Hotel Ambassador - Business hotel
  if (name.includes("Hotel President")) return "https://gos3.ibcdn.com/8aeb059f-2660-404f-8517-4b0cee7729a5.JPG" // Hotel President - City hotel
  if (name.includes("Hotel Excellency")) return "https://r1imghtlak.mmtcdn.com/dc82d2343e6f11ea9c620242ac110002.png" // Hotel Excellency - Premium business hotel
  if (name.includes("Hotel Plaza")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/02/03/76/the-plaza-hotel.jpg?w=900&h=500&s=1" // Hotel Plaza - Plaza hotel
  if (name.includes("Hotel Grand")) return "https://content.jdmagicbox.com/comp/vadodara/m6/0265px265.x265.221021034102.n3m6/catalogue/hotel-grand-jetalpur-road-vadodara-hotels-yYLT7lSFNX.jpg" // Hotel Grand - Grand hotel
  if (name.includes("Hotel Royal")) return "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202310261439051237-69e1b70c73d811eea0b90a58a9feac02.jpg" // Hotel Royal - Royal hotel
  if (name.includes("Hotel Imperial")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/de/fb/7b/imperial-hotel.jpg?w=900&h=-1&s=1" // Hotel Imperial - Imperial hotel
  if (name.includes("Hotel Majestic")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/de/fb/7b/imperial-hotel.jpg?w=900&h=-1&s=1" // Hotel Majestic - Majestic hotel
  if (name.includes("Hotel Regency")) return "https://gos3.ibcdn.com/570ac15d-ce45-4d45-830f-f2de5ba41126.jpg" // Hotel Regency - Regency hotel
  if (name.includes("Lords Inn")) return "https://gos3.ibcdn.com/b0decf085fc511eaa73d0242ac110016.jpg" // Lords Inn - Boutique hotel
  if (name.includes("Clarks")) return "https://gos3.ibcdn.com/f423bd4d-157d-450f-8a47-07a2ba6ffec1.jpg" // Clarks Hotels - Business hotel
  if (name.includes("Zone By Park")) return "https://gos3.ibcdn.com/6832a8466b8111e7827b0a4cef95d023.jpg" // Zone By Park - Park Plaza hotels
  if (name.includes("Park Inn")) return "https://cf.bstatic.com/xdata/images/hotel/max1024x768/232838197.jpg?k=3d0504f9a6168402a98c683a39b4d1ff74db89c41745378a02323697c0d588b7&o=" // Park Inn - Park Inn hotels
  if (name.includes("Country Inn")) return "https://radissonhotels.iceportal.com/image/country-inn-suites-by-radisson-zirakpur/exterior/16256-118448-f85813675_3XL.jpg" // Country Inn - Country Inn & Suites
  if (name.includes("Residency")) return "https://cf.bstatic.com/xdata/images/hotel/max1024x768/72056032.jpg?k=dadb8226088afe59cb2d302bb757d5461f53821c96f46b5dd2fab6c0b8d6bffe&o=" // Residency - Residency hotels
  if (name.includes("Heritage House")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/6e/1b/ab/hotel-heritage-house.jpg?w=900&h=500&s=1" // Heritage House - Heritage hotel
  if (name.includes("Palace Hotel")) return "https://gos3.ibcdn.com/d2f0223b-48d3-4fec-9ef4-eb28f178bac4.jpeg" // Palace Hotel - Palace hotel
  if (name.includes("Lake View")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/f1/38/18/outdoor-pool.jpg?w=900&h=500&s=1" // Lake View - Lake view hotel
  if (name.includes("River View")) return "https://r1imghtlak.mmtcdn.com/c667ea4f-9abb-4413-a42c-2160f70afdfb.jpeg" // River View - River view hotel
  if (name.includes("City Center")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/fd/9b/50/city-hotel-luxembourg.jpg?w=900&h=500&s=1" // City Center - City center hotel
  
  // Famous Restaurants
  if (name.includes("McDonald")) return "https://static.wikia.nocookie.net/maters-drunk-tales/images/9/99/McDonald%E2%80%99s_Hotel.jpeg/revision/latest?cb=20190515105902" // McDonald's - Fast food burgers
  if (name.includes("KFC")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Zg8MVgc-CPWYUVpSUBR5Odx7sTHw4Hmr0A&s" // KFC - Fried chicken
  if (name.includes("Domino")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD_2tjAxQIKnP-qChiDW9vZiAxcFgSkBT42Q&s" // Domino's Pizza - Pizza delivery
  if (name.includes("Pizza Hut")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/1c/03/19/pizza-hut.jpg?w=900&h=-1&s=1" // Pizza Hut - Pizza restaurant
  if (name.includes("Burger King")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/e4/25/2a/burger-king.jpg?w=700&h=400&s=1" // Burger King - Fast food burgers
  if (name.includes("Subway")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFtxR2ECoSQ33BkmY9vsOcbP-sp6uJHVgPnQ&s" // Subway - Sandwiches
  if (name.includes("Barbeque Nation")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEeZlfE2inuQiz2IdkteaGN12nKtgkylQGdg&s" // Barbeque Nation - BBQ restaurant
  if (name.includes("Mainland China")) return "https://media-cdn.tripadvisor.com/media/photo-s/06/e4/7c/af/mainland-china.jpg" // Mainland China - Chinese cuisine
  if (name.includes("Faasos")) return "https://q-xx.bstatic.com/xdata/images/hotel/max500/654063289.jpg?k=1f0bd2cccc846f4b357b4e88607a1ab092f86998c367edce856b0621b3b755ab&o=" // Faasos - Indian wraps
  if (name.includes("Behrouz Biryani")) return "https://media-cdn.tripadvisor.com/media/photo-s/04/99/33/e9/behrouz.jpg" // Behrouz Biryani - Biryani restaurant
  if (name.includes("Wow! Momo")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/24/d3/14/caption.jpg?w=700&h=700&s=1" // Wow! Momo - Dumplings
  if (name.includes("Haldiram")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/dc/9d/10/caption.jpg?w=900&h=500&s=1" // Haldiram's - Indian sweets
  if (name.includes("Havmor")) return "https://content.jdmagicbox.com/comp/ahmedabad/a3/079pxx79.xx79.191112210046.t2a3/catalogue/hocco-eatery-ahmedabad-34qqnlwiw9.jpg" // Havmor - Ice cream and desserts
  if (name.includes("Chili")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/75/85/22/caption.jpg?w=500&h=-1&s=1" // Chili's - American restaurant
  if (name.includes("China Town")) return "https://content.jdmagicbox.com/v2/comp/mumbai/p3/022pxx22.xx22.180217075223.c4p3/catalogue/hotel-china-town-dharavi-mumbai-restaurants-kxt8n.jpg" // China Town - Chinese restaurant
  if (name.includes("Nando")) return "https://www.hotelierindia.com/cloud/2024/05/18/K-Hospitality-Corp-joins-the-Nandos-family-1-Copy-1.jpg" // Nando's - Peri-peri chicken
  if (name.includes("TGI Friday")) return "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2024-11/tgi-friday.jpg" // TGI Friday's - American casual dining
  if (name.includes("Hard Rock Cafe")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWQnGNRRmAhIPSgpvw5-kD4Nthn_3GQYYxuA&s" // Hard Rock Cafe - Rock-themed restaurant
  
  // Popular Indian Restaurant Chains
  if (name.includes("Sagar Ratna")) return "https://content.jdmagicbox.com/comp/jaipur/k4/0141px141.x141.181128155141.r7k4/catalogue/sagar-ratna-c-scheme-jaipur-restaurants-0ffqtvob7c.jpg" // Sagar Ratna - South Indian chain
  if (name.includes("Udipi")) return "https://udipijayarestaurant.com/wp-content/uploads/2025/05/HeroImg1-1.webp" // Udipi - South Indian restaurant
  if (name.includes("Vasudev Adigas")) return "https://adigas.in/wp-content/uploads/2023/03/HSR-LAYOUT_FRONT-300x225.jpeg" // Vasudev Adigas - South Indian
  if (name.includes("Chetana")) return "https://gos3.ibcdn.com/b463feae7fb011eaa7fc0242ac110002.jpeg" // Chetana - South Indian restaurant
  if (name.includes("Bhagat Tarachand")) return "https://gos3.ibcdn.com/b463feae7fb011eaa7fc0242ac110002.jpeg" // Bhagat Tarachand - Rajasthani cuisine
  if (name.includes("Jalaram")) return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop" // Jalaram - Gujarati restaurant
  if (name.includes("Marwadi Bhojnalay")) return "https://content.jdmagicbox.com/comp/kanpur/l1/0512px512.x512.190803191042.z6l1/catalogue/marwadi-bhojnalay-kanpur-1wcgkyx4vg.jpg" // Marwadi Bhojnalay - Rajasthani food
  if (name.includes("Kathiyawadi Bhojanalaya")) return "https://content3.jdmagicbox.com/comp/valsad/i9/9999p2632.2632.190815052921.d4i9/catalogue/giriraj-kathiyawadi-bhojanalay-bhilad-valsad-valsad-gujarati-restaurants-gd8tiscdy8.jpg" // Kathiyawadi Bhojanalaya - Kathiyawadi cuisine
  if (name.includes("Rasoi")) return "https://content.jdmagicbox.com/comp/jalgaon/x3/9999px257.x257.190926044915.u1x3/catalogue/hotel-rasoi-navi-peth-jalgaon-jalgaon-north-indian-delivery-restaurants-0i0ly5hazf.jpg" // Rasoi - Home-style cooking
  if (name.includes("Gwalia")) return "https://b.zmtcdn.com/data/pictures/2/20356102/b014e97c0ee6e71031f64c5375cb1c67.jpg" // Gwalia - Sweets and snacks
  if (name.includes("Khodiyar")) return "https://content.jdmagicbox.com/comp/rajkot/e5/0281px281.x281.220730222430.q5e5/catalogue/jay-khodiyar-hotel-rajkot-coffee-shops-8tzmle8xq6.jpg" // Khodiyar - Gujarati restaurant
  if (name.includes("Neelkanth")) return "https://content.jdmagicbox.com/v2/comp/ahmedabad/i6/079pxx79.xx79.181231210119.n1i6/catalogue/neelkanth-leaf-restaurant-sola-ahmedabad-restaurants-P0EBnur7Ql.jpg" // Neelkanth - Vegetarian restaurant
  if (name.includes("Tulsi")) return "https://content.jdmagicbox.com/comp/pune/n4/020pxx20.xx20.221120034102.l3n4/catalogue/tulsi-pure-veg-restaurant-pune-pure-veg-restaurants-d6528hz3j0-250.jpg" // Tulsi - Pure vegetarian
  
  // Famous Restaurant Names
  if (name.includes("The Grand")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/d6/41/b5/the-perfect-place-to.jpg?w=900&h=500&s=1" // The Grand - Fine dining
  if (name.includes("Royal")) return "https://content.jdmagicbox.com/comp/malappuram/i8/9999px483.x483.161224150254.v1i8/catalogue/royal-dine-hotel-malappuram-rtv60u6bil.jpg" // Royal - Royal dining
  if (name.includes("Shreeji")) return "https://content.jdmagicbox.com/v2/comp/bundi/a5/9999px747.x747.221229210356.u8a5/catalogue/hotel-shree-ji-ramganj-bundi-hotels-z80vwqfh6m.jpg" // Shreeji - Gujarati restaurant
  if (name.includes("Rajwadu")) return "https://rajwadu.com/wp-content/uploads/2015/01/indian_traditional_weddings_in_ahmedabad.jpg" // Rajwadu - Rajasthani cuisine
  if (name.includes("Swagat")) return "https://media-cdn.tripadvisor.com/media/photo-s/1a/b7/e3/03/hotel-exterior-image.jpg" // Swagat - Welcome restaurant
  if (name.includes("Haveli")) return "https://cf.bstatic.com/xdata/images/hotel/max1024x768/36201978.jpg?k=4dc5249cbc26980f9fb605f5da48a9d3bbdcccfb4a562b4f8171673559f3a7ee&o=" // Haveli - Traditional dining
  if (name.includes("Mirchi")) return "https://gos3.ibcdn.com/885419a201ea11eda1190a58a9feac02.png" // Mirchi - Spicy food
  if (name.includes("Tadka")) return "https://media-cdn.tripadvisor.com/media/photo-s/03/03/5e/28/tadka.jpg" //   - Indian spices
  if (name.includes("Spice Garden")) return "https://images.jdmagicbox.com/v2/comp/mumbai/y6/022pxx22.xx22.230304114750.w1y6/catalogue/the-spice-garden-family-restaurant-kamothe-navi-mumbai-restaurants-8qv4ru5vun.jpg" // Spice Garden - Spice restaurant
  if (name.includes("Khidki")) return "https://content.jdmagicbox.com/v2/comp/delhi/56/011p99456/catalogue/the-spice-route-the-imperial-janpath-delhi-restaurants-1g9ikiv.jpg" // Khidki - Window to flavors
  if (name.includes("The Yellow Chilli")) return "https://dt4l9bx31tioh.cloudfront.net/eazymedia/restaurant/674198/restaurant220211028060633.jpeg?width=818&height=450&mode=crop" // The Yellow Chilli - Indian cuisine
  if (name.includes("Patang")) return "https://b.zmtcdn.com/data/pictures/2/110502/5eee561c02a072adeaad9ee85df98da8.jpg?fit=around|750:500&crop=750:500;*,*" // Patang - Kite restaurant
  if (name.includes("Vishalla")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/9b/ba/c8/vishala.jpg?w=500&h=-1&s=1" // Vishalla - Gujarati restaurant
  if (name.includes("Gopi Dining Hall")) return "https://b.zmtcdn.com/data/pictures/0/18338820/84d936058e176829a64540044b4d120c.jpg " // Gopi Dining Hall - Traditional dining
  if (name.includes("Toran Dining")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJnL52fCJdjMge4SzndyFVwbsUzq0LE3sOGA&s" // Toran Dining - Gujarati restaurant
  
  // Famous Cafes
  if (name.includes("Starbucks")) return "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/9f/86/0f/caption.jpg" // Starbucks - Coffee chain
  if (name.includes("Cafe Coffee Day")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa-92b0mvgUmB6XWxi512V-qXwyR5CAVjaIA&s" // Cafe Coffee Day - Indian cafe chain
  if (name.includes("Barista")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhA3DieZQhZaBMyP6yciV6F-GXx_JPCY6hA&s" // Barista - Coffee shop
  if (name.includes("Chai Point")) return "https://www.equitypandit.com/wp-content/uploads/2022/11/Chai-Point-Targets-IPO-Within-18-24-Months-EP.jpg" // Chai Point - Tea cafe
  if (name.includes("Third Wave")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwFxrkg7dPBQpPRTZ7SuTS-F1m_uB0hmWGoQ&s" // Third Wave Coffee - Specialty coffee
  if (name.includes("Blue Tokai")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7N3XP5if2jzjA_NeRqZ7zmhZ_a4qEbls6BA&s" // Blue Tokai - Coffee roasters
  
  // Popular Food Outlets & Chains
  if (name.includes("Taco Bell")) return "https://img.buzzfeed.com/buzzfeed-static/static/2019-08/9/5/asset/3f6a47c10e34/sub-buzz-1321-1565330282-3.jpg?downsize=900:*&output-format=auto&output-quality=auto" // Taco Bell - Mexican fast food
  if (name.includes("Absolute Barbecues")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK85qWRWF1StotSRHpZmWtfs5PFvSFbLkYvA&s" // Absolute Barbecues - BBQ chain
  if (name.includes("Box8")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/44/f4/43/box8-counter.jpg?w=900&h=500&s=1" // Box8 - Pizza delivery
  if (name.includes("Bikanervala")) return "https://pix10.agoda.net/property/36767385/0/9844f926d76a35fb81893c87764c05b0.jpg?ce=0&s=414x232" // Bikanervala - Sweets and snacks
  if (name.includes("Sagar Gaire")) return "https://content.jdmagicbox.com/v2/comp/palghar/t7/022pxx22.xx22.171128153110.m4t7/catalogue/new-sagar-hotel-the-family-restaurant-nalasopara-west-palghar-home-delivery-restaurants-dhvo1vclmj.jpg" // Sagar Gaire - Nepali cuisine
  if (name.includes("Vadilal")) return "https://content.jdmagicbox.com/comp/raipur-chhattisgarh/g5/9999px771.x771.190829183631.m3g5/catalogue/icecream-point-raipur-chhattisgarh-xqtdpiab9c.jpg" // Vadilal - Ice cream
  if (name.includes("Naturals")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/d1/ab/d0/lovely-joint-lots-of.jpg?w=900&h=-1&s=1" // Naturals - Ice cream
  if (name.includes("Amul")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlabrOEBaB2vjs9d2eWnS8fwWJ-X2XrQ1vVw&s" // Amul - Dairy products
  if (name.includes("Baskin Robbins")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/82/c5/28/outer.jpg?w=900&h=500&s=1" // Baskin Robbins - Ice cream
  if (name.includes("Rolls Mania")) return "https://www.rollsmania.com/blog_img/B42.jpg" // Rolls Mania - Rolls and wraps
  if (name.includes("The Rolling Pin")) return "https://lh3.googleusercontent.com/KEDOIsuNMRKd69NFS5XhI8pzEL7W2vinfql_C_mV1ssuttKxhHvCoyPsj7RGxsXjTZfjL9LkjtFGZQN8Z-NKxl_-wwN4=w1200-rw" // The Rolling Pin - Bakery
  if (name.includes("Thalassa")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/37/5d/8c/exterior.jpg?w=900&h=500&s=1" // Thalassa - Seafood
  if (name.includes("Thai Pavilion")) return "https://content.jdmagicbox.com/comp/gurgaon/l3/011pxx11.xx11.131015154422.u9l3/catalogue/thai-pavilion-taj-city-centre-gurgaon-sector-44-gurgaon-thai-restaurants-s8jirtqlri.jpg" // Thai Pavilion - Thai cuisine
  
  // More Food Outlets & Chains
  if (name.includes("Sigree")) return "https://b.zmtcdn.com/data/pictures/9/47909/7cc035818e700827996568e4b58e1c2d.jpg?fit=around|750:500&crop=750:500;*,*" // Sigree - Global cuisine
  if (name.includes("Coal Barbecue")) return "https://crispyfriedopinions.com/wp-content/uploads/sites/105/coalbarbecues/0a.jpg" // Coal Barbecue - BBQ restaurant
  if (name.includes("Pirates of Grill")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/35/6d/7e/caption.jpg?w=900&h=500&s=1" // Pirates of Grill - BBQ chain
  if (name.includes("Copper Chimney")) return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop" // Copper Chimney - Indian cuisine
  if (name.includes("Wok Express")) return "https://content.jdmagicbox.com/v2/comp/ahmedabad/w9/079pxx79.xx79.220822133647.a6w9/catalogue/chinese-wok-express-bodakdev-ahmedabad-restaurants-sh92ea0f2d-250.jpg" // Wok Express - Asian cuisine
  if (name.includes("Noodle Bar")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPBxq9VnNqTa6XlTR003w5CvreLbDX6hPcPA&s" // Noodle Bar - Noodles
  if (name.includes("Curry House")) return "https://content3.jdmagicbox.com/v2/comp/bhubaneshwar/n7/0674px674.x674.231212220127.m1n7/catalogue/curry-house-bhubaneshwar-indian-restaurants-k11rtrpqdo.jpg" // Curry House - Indian curries
  if (name.includes("Biryani Blues")) return "https://images.jdmagicbox.com/v2/comp/delhi/c8/011pxx11.xx11.170921133132.a8c8/catalogue/biryani-blues-dlf-cyber-city-gurgaon-biryani-restaurants-9nmrvruqzk.jpg" // Biryani Blues - Biryani restaurant
  if (name.includes("Kebab Factory")) return "https://b.zmtcdn.com/data/pictures/5/20546995/4cf868e19f6552adcfd20995a067664e.jpg?fit=around|960:500&crop=960:500;*,*" // Kebab Factory - Kebabs
  
  // Local Famous Restaurants
  if (name.includes("Gordhan Thal")) return "https://b.zmtcdn.com/data/pictures/5/110145/f35062a7cb9d3c76e2dc5d10e027d831.jpg?fit=around|960:500&crop=960:500;*,*" // Gordhan Thal - Famous Ahmedabad restaurant
  if (name.includes("Honest")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/86/d0/bb/honest-restaurant.jpg?w=900&h=500&s=1" // Honest - Popular Gujarat restaurant
  if (name.includes("Sankalp")) return "https://content.jdmagicbox.com/comp/ahmedabad/v8/079pxx79.xx79.180921190343.p4v8/catalogue/sankalp-restaurant-ahmedabad-restaurants-1q1blteekq.jpg" // Sankalp - Gujarati thali restaurant
  if (name.includes("Agashiye")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/07/23/9c/agashiye-terrace-dining.jpg?w=900&h=500&s=1" // Agashiye - Traditional Gujarati food
  if (name.includes("Das Khaman House")) return "https://content.jdmagicbox.com/comp/ahmedabad/56/079p56356/catalogue/das-khaman-house-memnagar-ahmedabad-farsan-shops-ldvl5.jpg" // Das Khaman House - Khaman specialist
  
  // Cuisine-based images (fallback for restaurants without specific images)
  const primaryCuisine = cuisines[0]?.toLowerCase()
  if (primaryCuisine?.includes("gujarati")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNcooyWbpETB76DUuGsBBXSGEnGse0z7sadA&s" // Gujarati cuisine - Dhokla, Khaman
  if (primaryCuisine?.includes("punjabi")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/23/32/89/mini-punjabi-food-court.jpg?w=900&h=500&s=1" // Punjabi cuisine - Butter Chicken, Dal Makhani
  if (primaryCuisine?.includes("italian")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU3-dAOFzHYi7PRSZsvDNBfjgLqGaUHTxcIg&s" // Italian cuisine - Pizza, Pasta
  if (primaryCuisine?.includes("chinese")) return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/64/9e/13/getlstd-property-photo.jpg" // Chinese cuisine - Noodles, Dumplings
  if (primaryCuisine?.includes("mexican")) return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJGA5hPABdPVB8eZuhgrRa37in0Ctgl-qimQ&s" // Mexican cuisine - Tacos, Burritos
  if (primaryCuisine?.includes("thai")) return "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/hospibuz/media/media_files/2025/04/02/YzUUfpuIzVRh0lGqhqF5.jpgg" // Thai cuisine - Pad Thai, Tom Yum
  if (primaryCuisine?.includes("japanese")) return "https://www.okinawa.halekulani.com/lang_module2/aomi/images/img_aomi01.jpg" // Japanese cuisine - Sushi, Ramen
  
  // Default placeholder
  return `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(name + " restaurant")}`
}

// Generate restaurant description
function generateDescription(name: string, type: string, cuisines: string[]): string {
  const descriptions = [
    `${name} is a popular ${type.toLowerCase()} in Gujarat known for its authentic ${cuisines[0]} cuisine and warm hospitality.`,
    `Experience the finest ${cuisines.join(" and ")} dishes at ${name}. A perfect place for family dining and celebrations.`,
    `${name} offers a unique dining experience with its carefully curated menu featuring ${cuisines[0]} specialties.`,
    `Welcome to ${name}, where traditional flavors meet modern ambiance. Serving delicious ${cuisines.join(", ")} food.`,
    `Discover the taste of Gujarat at ${name}. We serve authentic ${cuisines[0]} cuisine prepared with love and care.`,
    `${name} is your go-to destination for mouth-watering ${cuisines.join(" and ")} dishes in a comfortable setting.`,
    `At ${name}, we believe in serving happiness on a plate. Try our signature ${cuisines[0]} dishes today.`,
    `${name} brings you the best of ${cuisines.join(", ")} flavors. Perfect for casual dining and special occasions.`,
  ]
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

// Generate all restaurants
function generateRestaurants(): Restaurant[] {
  const restaurants: Restaurant[] = []
  const types: ("Restaurant" | "Cafe" | "Hotel" | "Food Outlet")[] = ["Restaurant", "Cafe", "Hotel", "Food Outlet"]

  let id = 1

  // Distribute restaurants across cities
  for (let i = 0; i < 1550; i++) {
    const cityIndex = i % gujaratCities.length
    const city = gujaratCities[cityIndex]
    const type = types[Math.floor(Math.random() * types.length)]
    const names = restaurantNames[type]
    const baseName = names[Math.floor(Math.random() * names.length)]

    // Add variety to names
    const suffixes = ["", " " + city, " Express", " Kitchen", " House", " Point", " Corner", " Junction", " Hub"]
    const suffix = type === "Hotel" ? "" : suffixes[Math.floor(Math.random() * suffixes.length)]
    const name = baseName + suffix

    // Get random cuisines (1-3)
    const numCuisines = Math.floor(Math.random() * 3) + 1
    const shuffledCuisines = [...cuisineTypes].sort(() => Math.random() - 0.5)
    const cuisines = shuffledCuisines.slice(0, numCuisines)

    // Get area
    const cityAreas = areas[city] || areas["default"]
    const area = cityAreas[Math.floor(Math.random() * cityAreas.length)]

    // Generate opening/closing times
    const openHours = type === "Cafe" ? [6, 7, 8] : [10, 11, 12]
    const closeHours = type === "Cafe" ? [21, 22, 23] : type === "Hotel" ? [23, 24] : [22, 23]
    const openTime = `${openHours[Math.floor(Math.random() * openHours.length)]}:00 AM`
    const closeTime = `${closeHours[Math.floor(Math.random() * closeHours.length)] > 12 ? closeHours[Math.floor(Math.random() * closeHours.length)] - 12 : closeHours[Math.floor(Math.random() * closeHours.length)]}:00 PM`

    // Price range based on type
    const priceRanges: ("₹" | "₹₹" | "₹₹₹" | "₹₹₹₹")[] = ["₹", "₹₹", "₹₹₹", "₹₹₹₹"]
    const priceWeights =
      type === "Hotel" ? [0, 0.1, 0.4, 0.5] : type === "Cafe" ? [0.3, 0.5, 0.2, 0] : [0.2, 0.4, 0.3, 0.1]
    const rand = Math.random()
    let cumulative = 0
    let priceRange: "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹" = "₹₹"
    for (let j = 0; j < priceWeights.length; j++) {
      cumulative += priceWeights[j]
      if (rand <= cumulative) {
        priceRange = priceRanges[j]
        break
      }
    }

    restaurants.push({
      id: `rest-${id++}`,
      name,
      type,
      image: getRestaurantImage(name, cuisines),
      location: area,
      city,
      state: "Gujarat",
      address: `${Math.floor(Math.random() * 200) + 1}, ${area}, ${city}, Gujarat`,
      rating: 4.0,
      reviews: Math.floor(Math.random() * 5000) + 100,
      cuisines,
      offer: offers[Math.floor(Math.random() * offers.length)] || undefined,
      openingTime: openTime,
      closingTime: closeTime,
      description: generateDescription(name, type, cuisines),
      priceRange,
    })
  }

  return restaurants
}

// Cache for restaurants
// let cachedRestaurants: Restaurant[] | null = null

export function getRestaurants(): Restaurant[] {
  // if (!cachedRestaurants) {
  //   cachedRestaurants = generateRestaurants()
  // }
  // return cachedRestaurants
  return generateRestaurants()
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return getRestaurants().find((r) => r.id === id)
}

export function getRestaurantsByCity(city: string): Restaurant[] {
  return getRestaurants().filter((r) => r.city.toLowerCase() === city.toLowerCase())
}

export function getRestaurantsByType(type: "Restaurant" | "Cafe" | "Hotel" | "Food Outlet"): Restaurant[] {
  return getRestaurants().filter((r) => r.type === type)
}

export { gujaratCities }
