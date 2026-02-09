const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Location = require('../models/Location');
const Property = require('../models/Property');

// Load env vars
dotenv.config({ path: './backend/.env' });

const locations = [
    {
        id: "galle",
        name: "Galle",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1559648941-6e3e52f5567c?q=80&w=2062&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1559648941-6e3e52f5567c?q=80&w=2062&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1588258219511-64eb629cb833?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586616424369-1ee73838cce8?q=80&w=2070&auto=format&fit=crop"
        ],
        rating: 4.8,
        reviewCount: 2450,
        propertyCount: 110,
        category: "Beach & Historical",
        lat: 6.0535,
        lng: 80.2197,
        description: "Historic coastal city famous for its Dutch colonial architecture and UNESCO World Heritage Fort",
        longDescription: "Galle is a jewel in Sri Lanka's southern coast, where history seamlessly blends with breathtaking ocean views. The Galle Fort, a UNESCO World Heritage Site, stands as a testament to Dutch colonial architecture, with its ramparts overlooking the Indian Ocean. Walking through the cobblestone streets, visitors encounter charming cafes, boutique hotels, art galleries, and museums housed in colonial-era buildings. Beyond the fort, Galle offers pristine beaches, vibrant markets, and a thriving cultural scene. The city serves as a perfect base for exploring the southern coast, with easy access to beaches like Unawatuna and Mirissa, famous for whale watching.",
        bestTimeToVisit: "December to March (dry season with pleasant weather)",
        attractions: [
            "Galle Fort - UNESCO World Heritage Site with Dutch colonial architecture",
            "National Maritime Museum - showcasing maritime history",
            "Dutch Reformed Church - historic 18th-century church",
            "Galle Lighthouse - iconic landmark offering panoramic views",
            "Old Gate - historic entrance to the fort with Dutch coat of arms",
            "Flag Rock - popular spot for watching sunsets",
            "Japanese Peace Pagoda - Buddhist temple in nearby Unawatuna"
        ],
        tips: [
            "Walk the fort ramparts during sunset for spectacular ocean views",
            "Visit on weekdays to avoid crowds, especially during festivals",
            "Bring comfortable walking shoes - lots of cobblestone streets",
            "Don't miss the street food vendors for authentic Sri Lankan snacks",
            "Book heritage hotels inside the fort for a unique experience",
            "Explore the boutique shops for handmade crafts and jewelry"
        ],
        activities: [
            "Walking tour of Galle Fort",
            "Surfing and swimming at Unawatuna Beach (15 minutes away)",
            "Whale watching from Mirissa (40 minutes away)",
            "Snorkeling and diving in coral reefs",
            "Shopping for gems, spices, and handicrafts",
            "Enjoying fresh seafood at beachfront restaurants"
        ],
        gettingThere: "Located 119km south of Colombo. Accessible by train (scenic 2.5-hour journey), bus (3 hours), or private car/taxi (2 hours via Southern Expressway). The train journey along the coast is highly recommended for stunning views."
    },
    {
        id: "sigiriya",
        name: "Sigiriya",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1588258219511-64eb629cb833?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1588258219511-64eb629cb833?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580910051074-3eb6948d3ea4?q=80&w=2070&auto=format&fit=crop"
        ],
        rating: 4.9,
        reviewCount: 1850,
        propertyCount: 85,
        category: "Cultural Heritage",
        lat: 7.9571,
        lng: 80.7603,
        description: "Ancient rock fortress and UNESCO World Heritage Site, one of Sri Lanka's most iconic landmarks",
        longDescription: "Sigiriya, also known as Lion Rock, is an ancient fortress built atop a massive 200-meter high rock formation. Dating back to the 5th century AD, this UNESCO World Heritage Site showcases remarkable ancient urban planning, engineering, and art. The site features impressive water gardens, frescoes of celestial maidens, the famous Mirror Wall with ancient graffiti, and the lion's paw gateway. The climb to the summit rewards visitors with panoramic views of the surrounding forests and countryside. Sigiriya represents one of the most valuable historical monuments of Sri Lanka and is considered one of the best-preserved examples of ancient urban planning in Asia.",
        bestTimeToVisit: "January to April (dry season with clear skies for best views)",
        attractions: [
            "Sigiriya Rock Fortress - 5th-century royal citadel",
            "Ancient Frescoes - stunning paintings of celestial maidens",
            "Mirror Wall - polished wall with ancient inscriptions",
            "Water Gardens - sophisticated hydraulic engineering",
            "Lion's Paw Gate - monumental gateway carved from rock",
            "Summit Palace Ruins - remains of King Kashyapa's palace",
            "Pidurangala Rock - nearby viewpoint for sunrise over Sigiriya"
        ],
        tips: [
            "Start climbing early (6:30 AM) to avoid heat and crowds",
            "Bring plenty of water - there are no shops once you start climbing",
            "Wear comfortable walking shoes with good grip",
            "Allow 3-4 hours for the complete visit including climbing",
            "Beware of wasps - they're harmless if you don't disturb them",
            "Hire a guide for fascinating historical insights",
            "Visit Pidurangala Rock for a view OF Sigiriya at sunset"
        ],
        activities: [
            "Climbing the ancient rock fortress",
            "Exploring the water gardens and boulder gardens",
            "Photography of ancient frescoes",
            "Village tours and traditional cooking classes",
            "Hot air balloon rides over the countryside",
            "Wildlife safaris at nearby Minneriya National Park"
        ],
        gettingThere: "Located 169km northeast of Colombo in the Central Province. Best reached by private car/taxi (4 hours), bus from Colombo or Kandy (5-6 hours), or organized tour. Nearest major town is Dambulla (20km away)."
    },
    {
        id: "ella",
        name: "Ella",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1579768656186-b4130a08e562?q=80&w=1974&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1579768656186-b4130a08e562?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1588258219511-64eb629cb833?q=80&w=2070&auto=format&fit=crop"
        ],
        rating: 4.9,
        reviewCount: 2250,
        propertyCount: 95,
        category: "Mountain",
        lat: 6.8667,
        lng: 81.0456,
        description: "Charming mountain village surrounded by tea plantations and offering stunning hill country views",
        longDescription: "Ella is a small mountain village nestled in Sri Lanka's hill country, offering some of the most spectacular views in the island. Surrounded by tea plantations, waterfalls, and green hills, Ella has become a favorite destination for travelers seeking natural beauty and outdoor adventures. The town is famous for the Nine Arch Bridge, a stunning colonial-era railway bridge, Little Adam's Peak with its panoramic views, and Ravana Falls. The train journey to Ella through tea plantations is considered one of the most scenic train rides in the world. Despite its growing popularity, Ella maintains a laid-back atmosphere with charming guesthouses, cafes, and friendly locals.",
        bestTimeToVisit: "January to March (dry season with clear mountain views)",
        attractions: [
            "Nine Arch Bridge - architectural marvel and photo spot",
            "Little Adam's Peak - easy hike with stunning 360° views",
            "Ella Rock - challenging hike offering panoramic vistas",
            "Ravana Falls - impressive waterfall with swimming pool",
            "Ella Gap - dramatic gorge with tea plantation views",
            "Tea Factory Tours - learn about Ceylon tea production",
            "Demodara Loop - unique railway loop engineering"
        ],
        tips: [
            "Take the train from Kandy or Nuwara Eliya for scenic journey",
            "Wake up early for sunrise at Little Adam's Peak",
            "Book accommodations in advance during peak season",
            "Try authentic Sri Lankan food at local eateries",
            "Rent a tuk-tuk or bicycle to explore the area",
            "Visit tea factories for fresh tea tastings",
            "Bring warm clothes - temperatures drop at night"
        ],
        activities: [
            "Hiking to Little Adam's Peak and Ella Rock",
            "Watching trains cross Nine Arch Bridge",
            "Tea plantation tours and tastings",
            "Zip-lining in Flying Ravana Adventure Park",
            "Waterfall swimming at Ravana Falls",
            "Yoga and wellness retreats",
            "Scenic train rides through tea country"
        ],
        gettingThere: "Located 200km east of Colombo in the Uva Province. The most popular way is by train from Kandy (7 hours, very scenic) or Nuwara Eliya (3 hours). Also accessible by bus (7-8 hours from Colombo) or private car/taxi (6 hours)."
    },
    {
        id: "mirissa",
        name: "Mirissa",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1586616424369-1ee73838cce8?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1586616424369-1ee73838cce8?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559648941-6e3e52f5567c?q=80&w=2062&auto=format&fit=crop"
        ],
        rating: 4.8,
        reviewCount: 2100,
        propertyCount: 120,
        category: "Beach Paradise",
        lat: 5.9479,
        lng: 80.4713,
        description: "Beautiful beach town famous for whale watching, surfing, and stunning coastal sunsets",
        longDescription: "Mirissa is a small coastal town on Sri Lanka's southern coast, known for its crescent-shaped golden beach, turquoise waters, and relaxed atmosphere. It's one of the best places in the world for blue whale watching (November to April), with high chances of spotting these magnificent creatures along with dolphins. The beach is perfect for swimming, surfing, and simply relaxing under palm trees. Mirissa's sunset views are legendary, particularly from the beach bars and restaurants. The town offers excellent seafood, vibrant nightlife, and a variety of water sports. Despite tourism growth, Mirissa retains its laid-back charm and remains less crowded than other beach destinations.",
        bestTimeToVisit: "November to April (dry season, best for whale watching)",
        attractions: [
            "Mirissa Beach - pristine crescent-shaped sandy beach",
            "Whale Watching Tours - spot blue whales and dolphins",
            "Coconut Tree Hill - iconic photo spot with panoramic views",
            "Secret Beach - secluded cove accessible via a short hike",
            "Parrot Rock - small island accessible during low tide",
            "Weligama Bay - nearby surfing hotspot for beginners",
            "Turtle Hatchery - conservation project for sea turtles"
        ],
        tips: [
            "Book whale watching tours early (best time 6:30 AM departure)",
            "Visit Coconut Tree Hill at sunset for Instagram photos",
            "Try fresh seafood at beachfront restaurants",
            "Rent a scooter to explore nearby beaches",
            "Bring sunscreen and hat - strong sun on the beach",
            "Learn to surf at nearby Weligama Beach",
            "Visit during weekdays for a quieter experience"
        ],
        activities: [
            "Whale and dolphin watching tours",
            "Surfing and stand-up paddleboarding",
            "Snorkeling and scuba diving",
            "Beach hopping along the south coast",
            "Sunset watching from beach bars",
            "Yoga classes on the beach",
            "Deep-sea fishing trips"
        ],
        gettingThere: "Located 150km south of Colombo on the southern coast. Accessible by train to Weligama (2.5 hours), then tuk-tuk (10 minutes), or by bus (4 hours), or private car/taxi via Southern Expressway (2.5 hours)."
    },
    {
        id: "kandy",
        name: "Kandy",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1580910051074-3eb6948d3ea4?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1580910051074-3eb6948d3ea4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1588258219511-64eb629cb833?q=80&w=2070&auto=format&fit=crop"
        ],
        rating: 4.7,
        reviewCount: 2700,
        propertyCount: 150,
        category: "Cultural",
        lat: 7.2906,
        lng: 80.6337,
        description: "Sacred city and last capital of Sri Lankan kings, home to the Temple of the Tooth Relic",
        longDescription: "Kandy, a UNESCO World Heritage Site, is Sri Lanka's spiritual and cultural capital, nestled among misty hills in the Central Province. The city is most famous for the Temple of the Sacred Tooth Relic, one of Buddhism's most sacred sites, housing a relic of Buddha's tooth. Kandy's picturesque lake, colonial architecture, vibrant markets, and traditional Kandyan dancing make it a must-visit destination. The annual Esala Perahera festival (July/August) is one of Asia's most spectacular cultural processions. The city serves as a gateway to the hill country and offers botanical gardens, spice gardens, tea plantations, and elephant sanctuaries. Kandy perfectly blances cultural heritage with natural beauty.",
        bestTimeToVisit: "December to April (dry season) or July/August for Esala Perahera festival",
        attractions: [
            "Temple of the Sacred Tooth Relic - most sacred Buddhist temple",
            "Kandy Lake - scenic man-made lake in city center",
            "Royal Botanical Gardens Peradeniya - 147-acre tropical gardens",
            "Bahiravokanda Vihara Buddha Statue - giant white Buddha statue",
            "Kandy Cultural Dance Show - traditional Kandyan dancing",
            "Ceylon Tea Museum - learn about tea history",
            "Udawattakele Forest Reserve - forested sanctuary"
        ],
        tips: [
            "Visit Temple of Tooth during evening puja ceremony (6:30 PM)",
            "Dress modestly when visiting temples (cover shoulders/knees)",
            "Walk around Kandy Lake at sunset",
            "Attend a traditional Kandyan dance performance",
            "Try to visit during Esala Perahera festival if possible",
            "Explore local markets for spices, gems, and handicrafts",
            "Stay 2-3 days to fully experience the city"
        ],
        activities: [
            "Visiting sacred Buddhist temples",
            "Watching traditional Kandyan dance performances",
            "Exploring Royal Botanical Gardens",
            "Shopping for gems, spices, and silk",
            "Taking a scenic train ride to Ella or Nuwara Eliya",
            "Visiting tea plantations and factories",
            "Trekking in Knuckles Mountain Range"
        ],
        gettingThere: "Located 115km northeast of Colombo in the Central Highlands. Accessible by train (2.5 hours scenic journey), bus (3 hours), or private car/taxi (2.5 hours). The train from Colombo to Kandy is a popular and scenic option."
    },
    {
        id: "polonnaruwa",
        name: "Polonnaruwa",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1625736300986-19364b638a5b?q=80&w=1974&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1625736300986-19364b638a5b?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1588258219511-64eb629cb833?q=80&w=2070&auto=format&fit=crop"
        ],
        rating: 4.8,
        reviewCount: 1650,
        propertyCount: 72,
        category: "Cultural Heritage",
        lat: 7.9403,
        lng: 81.0002,
        description: "Ancient city and UNESCO World Heritage Site with well-preserved ruins and Buddha statues",
        longDescription: "Polonnaruwa served as Sri Lanka's medieval capital from the 11th to 13th centuries and is now a UNESCO World Heritage Site showcasing remarkably preserved ancient ruins. The archaeological park contains palace ruins, Buddhist temples, and impressive stone carvings, including the famous Gal Vihara with its four magnificent Buddha statues carved from a single granite rock face. The ancient city was meticulously planned with sophisticated irrigation systems, including the massive Parakrama Samudra reservoir. Exploring Polonnaruwa by bicycle is a popular way to cover the extensive site. The ruins offer fascinating insights into ancient Sinhalese civilization and Buddhist culture.",
        bestTimeToVisit: "February to September (dry season with moderate temperatures)",
        attractions: [
            "Gal Vihara - four stunning Buddha statues carved in rock",
            "Royal Palace of King Parakramabahu - ancient palace ruins",
            "Parakrama Samudra - massive ancient reservoir",
            "Vatadage - circular relic house with intricate carvings",
            "Lankatilaka Temple - towering brick shrine",
            "Rankoth Vehera - large stupa in Sri Lankan style",
            "Polonnaruwa Museum - artifacts and historical exhibits"
        ],
        tips: [
            "Rent a bicycle to explore the vast archaeological site",
            "Start early morning to avoid heat",
            "Bring plenty of water and sunscreen",
            "Hire a guide for detailed historical information",
            "Allow at least half a day for the main sites",
            "Wear modest clothing for temple visits",
            "Combine with safari at nearby Minneriya National Park"
        ],
        activities: [
            "Cycling through ancient ruins",
            "Photography of historical monuments",
            "Wildlife safaris at Minneriya or Kaudulla National Parks",
            "Visit ing archaeological museums",
            "Bird watching around ancient reservoirs",
            "Exploring less-visited ruins on the outskirts"
        ],
        gettingThere: "Located 216km northeast of Colombo. Best reached by private car/taxi (5-6 hours), bus from Colombo or Kandy (6-7 hours), or as part of the Cultural Triangle tour. Often combined with Sigiriya in multi-day tours."
    },
    {
        id: "jaffna",
        name: "Jaffna",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1620063231301-8b2111d954e3?q=80&w=1935&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1620063231301-8b2111d954e3?q=80&w=1935&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559648941-6e3e52f5567c?q=80&w=2062&auto=format&fit=crop"
        ],
        rating: 4.6,
        reviewCount: 1320,
        propertyCount: 65,
        category: "Beach & Cultural",
        lat: 9.6615,
        lng: 80.0255,
        description: "Cultural capital of Northern Sri Lanka with unique Tamil culture, Hindu temples, and pristine islands",
        longDescription: "Jaffna, the cultural capital of Northern Sri Lanka, offers a unique experience distinct from the rest of the island. The city showcases vibrant Tamil Hindu culture, with colorful temples, traditional cuisine, and warm hospitality. Jaffna Fort, built by the Portuguese and later expanded by the Dutch, overlooks the lagoon. The city is a gateway to pristine islands accessible by causeway or boat, including Delft Island with wild ponies and Nainativu Island's sacred shrines. After years of conflict, Jaffna has undergone remarkable recovery and now welcomes visitors to experience its rich cultural heritage, unique cuisine, and unspoiled beaches.",
        bestTimeToVisit: "December to March (dry season with pleasant weather)",
        attractions: [
            "Jaffna Fort - Dutch colonial fortress on the lagoon",
            "Nall ur Kandaswamy Temple - ornate Hindu temple",
            "Jaffna Public Library - reconstructed architectural gem",
            "Delft Island - remote island with wild ponies",
            "Nainativu Island - sacred Buddhist and Hindu shrines",
            "Casuarina Beach - pristine beach with shallow waters",
            "Point Pedro - northernmost point of Sri Lanka"
        ],
        tips: [
            "Try authentic Jaffna crab curry and other local delicacies",
            "Rent a bicycle or scooter to explore the city",
            "Take a boat trip to explore offshore islands",
            "Visit temples early morning for peaceful atmosphere",
            "Respect local customs and dress modestly",
            "Learn basic Tamil phrases - locals appreciate the effort",
            "Allow 2-3 days to explore city and nearby islands"
        ],
        activities: [
            "Exploring colonial-era architecture and forts",
            "Visiting colorful Hindu temples",
            "Island hopping to Delft and Nainativu",
            "Beach relaxation at Casuarina Beach",
            "Trying authentic Tamil cuisine",
            "Shopping for traditional handicrafts",
            "Cycling through palmyra palm groves"
        ],
        gettingThere: "Located 400km north of Colombo. Accessible by train (8-9 hours on Yal Devi Express), bus (9-10 hours), private car/taxi (7-8 hours), or domestic flight to Palaly Airport (45 minutes)."
    }
];

const properties = [
    {
        id: "98-acres-resort",
        name: "98 Acres Resort & Spa",
        location: "Ella, Sri Lanka",
        locationId: "ella",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
        price: 450,
        rating: 4.9,
        reviewCount: 1250,
        type: "hotel",
        amenities: ["wifi", "pool", "spa", "restaurant"],
        description: "A luxury resort in Ella, Sri Lanka, surrounded by tea plantations and mountains."
    },
    {
        id: "cape-weligama",
        name: "Cape Weligama",
        location: "Weligama, Sri Lanka",
        locationId: "mirissa",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
        price: 680,
        rating: 4.9,
        reviewCount: 890,
        type: "hotel",
        amenities: ["wifi", "pool", "spa", "beach access"],
        description: "A cliffside resort with panoramic views of the Indian Ocean."
    },
    {
        id: "water-garden-sigiriya",
        name: "Water Garden Sigiriya",
        location: "Sigiriya, Sri Lanka",
        locationId: "sigiriya",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
        price: 320,
        rating: 4.8,
        reviewCount: 450,
        type: "hotel",
        amenities: ["wifi", "pool", "view"],
        description: "Luxury villas with views of the Sigiriya Rock Fortress."
    },
    {
        id: "amangalla",
        name: "Amangalla",
        location: "Galle Fort, Sri Lanka",
        locationId: "galle",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop",
        price: 550,
        rating: 4.8,
        reviewCount: 320,
        type: "hotel",
        amenities: ["wifi", "pool", "spa", "historical"],
        description: "A historic hotel located within the UNESCO World Heritage site of Galle Fort."
    },
    {
        id: "jetwing-jaffna",
        name: "Jetwing Jaffna",
        location: "Jaffna, Sri Lanka",
        locationId: "jaffna",
        image: "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1964&auto=format&fit=crop",
        price: 180,
        rating: 4.6,
        reviewCount: 210,
        type: "hotel",
        amenities: ["wifi", "restaurant", "roof top bar"],
        description: "A modern hotel in the heart of Jaffna city."
    },
    {
        id: "hotel-sigiriya",
        name: "Hotel Sigiriya",
        location: "Sigiriya, Sri Lanka",
        locationId: "sigiriya",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
        price: 150,
        rating: 4.5,
        reviewCount: 560,
        type: "hotel",
        amenities: ["wifi", "pool", "view"],
        description: "Offering a prime view of the Sigiriya Rock Fortress."
    },
    {
        id: "ella-jungle-resort",
        name: "Ella Jungle Resort",
        location: "Ella, Sri Lanka",
        locationId: "ella",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
        price: 120,
        rating: 4.4,
        reviewCount: 300,
        type: "villa",
        amenities: ["wifi", "nature", "adventure"],
        description: "An eco-friendly resort nestled in the jungle near Ella."
    },
    {
        id: "araliya-green-city",
        name: "Araliya Green City",
        location: "Nuwara Eliya, Sri Lanka",
        locationId: "nuwara-eliya",
        image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?q=80&w=2070&auto=format&fit=crop",
        price: 220,
        rating: 4.7,
        reviewCount: 400,
        type: "hotel",
        amenities: ["wifi", "pool", "spa", "heated pool"],
        description: "Luxury hotel in the cool climate of Nuwara Eliya."
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database...');

        // Clear existing data
        await Location.deleteMany({});
        await Property.deleteMany({});
        console.log('Cleared existing data...');

        // Insert new data
        await Location.insertMany(locations);
        await Property.insertMany(properties);
        console.log('Data seeded successfully!');

        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
