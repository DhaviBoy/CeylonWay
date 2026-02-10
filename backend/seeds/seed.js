const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Location = require('../models/Location');
const Property = require('../models/Property');

// Load env vars
dotenv.config({ path: './.env' });

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
    },
    {
        id: "nuwara-eliya",
        name: "Nuwara Eliya",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579768656186-b4130a08e562?q=80&w=1974&auto=format&fit=crop"
        ],
        rating: 4.7,
        reviewCount: 1890,
        propertyCount: 88,
        category: "Mountain",
        lat: 6.9497,
        lng: 80.7851,
        description: "Alpine town in the misty mountains famous for tea plantations, golf courses, and cool climate",
        longDescription: "Nuwara Eliya, the highest town in Sri Lanka at 1,868 meters, offers a refreshing escape with its cool climate, stunning mountain scenery, and lush tea plantations. The town has a distinct colonial charm with Victorian-era buildings, manicured gardens, and a charming town center. Visitors can explore working tea factories, trek through tea-covered hillsides, and enjoy outdoor activities like golfing at the historic course. Gregory Lake offers scenic walks, and nearby Pidurutalagala is the highest peak. The town serves as a base for exploring the central highlands and is an ideal destination for those seeking cooler temperatures and relaxation.",
        bestTimeToVisit: "January to March (dry season with clearest views)",
        attractions: [
            "Grand Hotel - iconic Victorian-era hotel on town square",
            "Gregory Lake - scenic man-made lake with paddle boats",
            "Pidurutalagala Peak - highest point with panoramic views",
            "Tea Factory Tours - visit working tea plantations",
            "Nuwara Eliya Golf Club - historic golf course since 1889",
            "Post Office - beautiful Victorian building in town center",
            "Hakgala Botanical Gardens - scenic gardens on hillside"
        ],
        tips: [
            "Bring warm clothes - temperatures drop significantly at night",
            "Visit tea factories early morning for best experience",
            "Take a scenic drive to view tea-covered hillsides",
            "Stay 1-2 days to adjust to high altitude",
            "Book golf tee times in advance",
            "Walk around Gregory Lake for sunset views",
            "Try tea and local pastries at cafes in town"
        ],
        activities: [
            "Tea plantation tours and tastings",
            "Trekking to Pidurutalagala Peak",
            "Golfing at historic course",
            "Walking around Gregory Lake",
            "Bird watching in botanical gardens",
            "Train rides to Ella through tea country",
            "Photography of misty mountain scenery"
        ],
        gettingThere: "Located 185km from Colombo in the Central Highlands. Best reached by train from Kandy (4 hours, scenic journey), bus (6 hours), or private car/taxi (4-5 hours). Often visited as part of tea country tour."
    },
    {
        id: "anuradhapura",
        name: "Anuradhapura",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1625736300986-19364b638a5b?q=80&w=1974&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1625736300986-19364b638a5b?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1624490904599-fb87a0a7ae23?q=80&w=2070&auto=format&fit=crop"
        ],
        rating: 4.8,
        reviewCount: 1720,
        propertyCount: 76,
        category: "Cultural Heritage",
        lat: 8.3142,
        lng: 80.4168,
        description: "Ancient capital and UNESCO World Heritage Site with sacred shrines dating back 2,300 years",
        longDescription: "Anuradhapura is one of the oldest continuously inhabited cities in the world and a major pilgrimage site for Buddhists. As the first capital of Sri Lanka from 380 BC to 1017 AD, it contains some of the oldest and most revered Buddhist monuments. The city features massive dagobas (stupas), including the famous Ruwanwella Maha Vihara and Jetavanaramaya, ancient Buddhist temples, and the sacred Bodhi tree said to be a cutting from the original tree in India under which Buddha attained Enlightenment. The entire ancient city is designated a UNESCO World Heritage Site. Exploring by bicycle is recommended to cover the vast archaeological area.",
        bestTimeToVisit: "February to September (dry season, ideal for cycling)",
        attractions: [
            "Sacred Bodhi Tree - cutting from Buddha's original tree",
            "Ruwanwella Maha Vihara - massive 2nd-century dagoba",
            "Jetavanaramaya - one of the tallest ancient structures",
            "Thuparama Vihara - oldest dagoba in Sri Lanka",
            "Lankarama Vihara - shrine with impressive remains",
            "Imadambaramaya Temple - ancient brick temple",
            "Mirisavetiya Vihara - dagoba with scenic settings"
        ],
        tips: [
            "Rent a bicycle to explore the extensive site efficiently",
            "Start early morning to avoid heat and crowds",
            "Dress appropriately for temple visits (modest clothing)",
            "Bring water, sunscreen, and hat",
            "Hire a guide for detailed historical explanations",
            "Allow 1-2 days for thorough exploration",
            "Visit during Bodhi Puja ceremonies for spiritual experience"
        ],
        activities: [
            "Cycling through ancient ruins",
            "Photography of dagobas and temple ruins",
            "Meditating at sacred Bodhi Tree",
            "Attending Puja ceremonies",
            "Bird watching around reservoirs",
            "Visiting Anuradhapura Museum",
            "Exploring nearby Mihintale sacred mountain"
        ],
        gettingThere: "Located 209km north of Colombo in the North Central Province. Accessible by train (book Orient Express for luxury journey, 5 hours), bus (5-6 hours), or private car/taxi (5 hours). Often combined with Polonnaruwa in Cultural Triangle tours."
    },
    {
        id: "yala",
        name: "Yala National Park",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1576514634419-fcdb5b085d02?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1576514634419-fcdb5b085d02?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1593224901657-e6a37f53b72a?q=80&w=2070&auto=format&fit=crop"
        ],
        rating: 4.9,
        reviewCount: 2340,
        propertyCount: 82,
        category: "Wildlife Safari",
        lat: 6.3717,
        lng: 81.5142,
        description: "Sri Lanka's premier wildlife sanctuary with highest concentration of leopards and diverse wildlife",
        longDescription: "Yala National Park is Sri Lanka's most visited national park and one of the best wildlife destinations in Asia, known for its exceptional biodiversity and high concentration of leopards. Spanning 1,260 square kilometers across five blocks, Yala is home to Asian elephants, sloth bears, crocodiles, peacocks, and numerous bird species. The park consists of dry forests, wetlands, and coastal areas, providing diverse habitats for wildlife. Early morning safari drives offer the best chances of spotting leopards and other elusive animals. Despite being a wildlife reserve, Yala has remained relatively undisturbed, making it an ideal destination for wildlife enthusiasts and photographers.",
        bestTimeToVisit: "December to April (dry season with best wildlife sightings)",
        attractions: [
            "Leopard spotting - best place in Asia for leopard sightings",
            "Wild elephants - large herds in morning hours",
            "Crocodiles and monitor lizards",
            "Peacocks and 215+ bird species",
            "Saltwater lagoons with diverse ecosystems",
            "Ancient Buddhist temples within park boundaries",
            "Pristine beaches at coastal sections"
        ],
        tips: [
            "Book safari drives with experienced guides well in advance",
            "Arrive at park entrance by 6 AM for best wildlife sightings",
            "Bring binoculars, camera, and zoom lens for photography",
            "Wear neutral-colored clothing (avoid bright colors)",
            "Bring sunscreen, hat, and water",
            "Be patient - wildlife viewing requires waiting",
            "Visit on weekdays for quieter experience"
        ],
        activities: [
            "Jeep safaris for wildlife spotting",
            "Photography of leopards and elephants",
            "Bird watching (215+ species)",
            "Visiting ancient temples",
            "Visiting coastal beaches",
            "Nature walks in designated areas",
            "Sunset viewing at designated spots"
        ],
        gettingThere: "Located 260km southeast of Colombo near Tissamaharama. Best reached by private car/taxi (5-6 hours) or organized safari tours. Arugambe is nearest beach town for accommodation (20 minutes away)."
    },
    {
        id: "dambulla",
        name: "Dambulla",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1624490904599-fb87a0a7ae23?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1624490904599-fb87a0a7ae23?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1625736300986-19364b638a5b?q=80&w=1974&auto=format&fit=crop"
        ],
        rating: 4.8,
        reviewCount: 1950,
        propertyCount: 79,
        category: "Cultural Heritage",
        lat: 7.8667,
        lng: 80.6667,
        description: "Home to the Golden Rock Temple and UNESCO World Heritage cave temple complex",
        longDescription: "Dambulla is famous for its spectacular Rock Temple (Golden Rock), a UNESCO World Heritage Site containing five magnificent caves with thousands of Buddha statues and intricate murals. The largest cave stretches 52 meters in length and contains a 14-meter reclining Buddha image. Dating back to the 1st century BC, these caves served as a refuge during times of invasion and are considered one of Sri Lanka's most sacred Buddhist sites. The golden dome visible from kilometers away crowns the summit rock. Dambulla also serves as a gateway to the Cultural Triangle, featuring nearby attractions like Sigiriya, Polonnaruwa, and Kandy.",
        bestTimeToVisit: "January to April (dry season, ideal for climbing)",
        attractions: [
            "Golden Rock Temple - massive gilded rock with five caves",
            "Ancient Buddha Statues - 153 statues within caves",
            "Intricate Murals - centuries-old wall paintings",
            "Dambulla Underground Cave Temple - lower temple complex",
            "Panoramic views from temple summit",
            "Dambulla Spice Garden - learn about local spices",
            "Rangiri Dambulla Sanctuary - geological formation"
        ],
        tips: [
            "Start climbing at dawn for cool temperature and fewer crowds",
            "Wear comfortable shoes with good grip for steep climb",
            "Bring plenty of water for the 140-meter climb",
            "Dress modestly before entering the temple caves",
            "Remove shoes before entering inner sanct ums",
            "Allow 2-3 hours to explore all five caves",
            "Photography allowed in outer areas, restricted in inner caves"
        ],
        activities: [
            "Climbing the sacred rock to temple",
            "Exploring five caves with Buddha statues",
            "Photography of golden dome and views",
            "Visiting spice gardens",
            "Meditation in peaceful caves",
            "Day trips to nearby Sigiriya or Kandy",
            "Watching sunrise from temple summit"
        ],
        gettingThere: "Located 148km northeast of Colombo, 20km from Sigiriya. Accessible by bus (4 hours from Colombo), private car/taxi (4 hours), or as stop on Cultural Triangle tour. Train to Dambulla station (3 hours from Colombo)."
    },
    {
        id: "adams-peak",
        name: "Adam's Peak",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579768656186-b4130a08e562?q=80&w=1974&auto=format&fit=crop"
        ],
        rating: 4.9,
        reviewCount: 2100,
        propertyCount: 71,
        category: "Mountain Hiking",
        lat: 6.8094,
        lng: 80.7997,
        description: "Sacred mountain peak with 5,243 steps, pilgrimage site with spectacular sunrise views",
        longDescription: "Adam's Peak (also called Sri Pada) is Sri Lanka's most sacred mountain and one of the world's most important pilgrimage sites revered by Buddhists, Hindus, Christians, and Muslims. The mountain is named for the sacred footprint believed to be at its summit. Standing at 2,243 meters, climbing the 5,243 steps to reach the summit has been a pilgrimage for centuries. The climb is challenging but manageable for most fitness levels, taking 2-3 hours upward. The reward is breathtaking sunrise views from the summit, seeing the mountain's shadow cast on clouds below. The pilgrimage season runs from December to May, attracting thousands of devotees.",
        bestTimeToVisit: "December to May (pilgrimage season with dry weather)",
        attractions: [
            "Sacred Footprint - believed to be Buddha's footprint",
            "Summit Platform - pilgrimage site with temple",
            "Sunrise Views - spectacular views from 2,243 meters",
            "Mountain's Shadow - photogenic phenomenon at sunrise",
            "Prayer Flags and Spiritual Atmosphere",
            "Nearby Waterfalls - scenic water features on mountain",
            "Nallathanniya Sanctuary - wildlife refuge on slopes"
        ],
        tips: [
            "Start climbing between midnight and 3 AM for sunrise",
            "Wear comfortable hiking shoes with ankle support",
            "Bring headlamp or flashlight for night climb",
            "Carry plenty of water and energy snacks",
            "Dress in layers - it's cold at summit",
            "Steps can be slippery - use the rope guides",
            "Expect crowds during peak pilgrimage season"
        ],
        activities: [
            "Climbing the 5,243 sacred steps",
            "Watching sunrise from summit",
            "Photography of mountain landscape",
            "Spiritual pilgrimage and meditation",
            "Bird watching on mountain slopes",
            "Exploring surrounding tea plantations",
            "Visiting nearby towns like Dalhousie"
        ],
        gettingThere: "Located 230km from Colombo near Dalhousie in Sabaragamuwa Province. Best accessed from Kandy (3 hours) or Nuwara Eliya (2 hours). Dalhousie is the main town at the base with most accommodations. Accessible by bus or private car/taxi."
    },
    {
        id: "hikkaduwa",
        name: "Hikkaduwa",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559648941-6e3e52f5567c?q=80&w=2062&auto=format&fit=crop"
        ],
        rating: 4.7,
        reviewCount: 1650,
        propertyCount: 95,
        category: "Beach & Diving",
        lat: 6.1456,
        lng: 80.1234,
        description: "Popular beach destination famous for coral reefs, diving, and vibrant nightlife",
        longDescription: "Hikkaduwa is one of Sri Lanka's most popular beach destinations, renowned for its excellent diving and snorkeling opportunities among vibrant coral reefs. The beach offers a perfect blend of water sports, relaxation, and entertainment. The Hikkaduwa Coral Sanctuary protects diverse marine life including coral gardens teeming with tropical fish. Beyond water activities, the town offers a lively atmosphere with beachfront restaurants, bars, and shops. The nearby Tsunami Museum and Ceylonese Cultural Centre provide cultural insight. Hikkaduwa has transformed into a backpacker hub while maintaining its natural beauty, making it suitable for various travelers.",
        bestTimeToVisit: "November to April (dry season, best for diving)",
        attractions: [
            "Coral Sanctuary - protected coral gardens with marine life",
            "Diving and Snorkeling Sites - tropical reefs and wrecks",
            "Tsunami Museum - learning from 2004 tsunami",
            "Turtle Conservation Projects",
            "Hikkaduwa Beach - long sandy beach for swimming",
            "Ceylonese Cultural Centre - local art and culture",
            "Narigama Beach - quieter alternative beach nearby"
        ],
        tips: [
            "Book diving courses with certified operators",
            "Snorkel with turtles and tropical fish",
            "Bring reef-safe sunscreen (harmful to corals)",
            "Wear water shoes to protect from coral",
            "Try fresh seafood at beachfront restaurants",
            "Rent scooters or surfboards if interested",
            "Visit cultural centre to learn about local culture"
        ],
        activities: [
            "Scuba diving and snorkeling",
            "Swimming and sunbathing",
            "Turtle watching tours",
            "Surfing on nearby breaks",
            "Glass-bottom boat tours over reefs",
            "Restaurant and bar hopping",
            "Shopping at local markets"
        ],
        gettingThere: "Located 96km south of Colombo on the south coast. Easily reached by train (2 hours), bus (2.5 hours), or private car/taxi via Southern Expressway (1.5 hours). Close to Galle Fort (45 minutes)."
    },
    {
        id: "bentota",
        name: "Bentota",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586616424369-1ee73838cce8?q=80&w=2070&auto=format&fit=crop"
        ],
        rating: 4.6,
        reviewCount: 1420,
        propertyCount: 86,
        category: "Beach Resort",
        lat: 6.4269,
        lng: 80.0032,
        description: "Luxurious beach resort town with water sports, lagoons, and tropical gardens",
        longDescription: "Bentota is an upscale beach destination famous for its long sandy beach, crystal-clear waters, and luxury resort facilities. The town is a hub for water sports including speed boating, scuba diving, windsurfing, and jet skiing. Bentota is also home to beautiful botanical gardens on the banks of the scenic Bentota River. The town attracts affluent travelers seeking comfort and relaxation, with numerous five-star hotels and beach clubs. The calm lagoons are perfect for families, while the offshore reefs offer diving opportunities. Bentota maintains a more tranquil atmosphere compared to other beach towns while offering excellent facilities.",
        bestTimeToVisit: "November to April (dry season with best weather)",
        attractions: [
            "Bentota Beach - pristine golden sand and calm waters",
            "Bentota Lagoon - scenic river with boat tours",
            "Galapata Temple - historic Buddhist temple",
            "Bentota Lagoon's Mangrove Sanctua ry",
            "Water Sports Centre - comprehensive outdoor activities",
            "Brief Garden - historic tropical garden",
            "Turtle Hatchery - sea turtle conservation center"
        ],
        tips: [
            "Book water sports activities at hotel or local operators",
            "Take a scenic boat tour of the lagoon at sunset",
            "Visit Brief Garden for botanical photography",
            "Relax at the well-maintained beach clubs",
            "Try authentic Sri Lankan cuisine at restaurants",
            "Book diving trips to nearby reefs",
            "Enjoy sunset walks along the beach"
        ],
        activities: [
            "Speed boating on the lagoon",
            "Scuba diving and snorkeling",
            "Windsurfing and water skiing",
            "Jet skiing and banana boat rides",
            "Lagoon tours with mangrove sightseeing",
            "Beach relaxation and water sports",
            "Cultural excursions to nearby temples"
        ],
        gettingThere: "Located 65km south of Colombo on the south coast. Accessible by train (1.5 hours from Colombo), bus (2 hours), or private car/taxi via Southern Expressway (1 hour). Between Colombo and Galle."
    },
    {
        id: "negombo",
        name: "Negombo",
        country: "Sri Lanka",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
        ],
        rating: 4.5,
        reviewCount: 1280,
        propertyCount: 72,
        category: "Beach Town",
        lat: 7.2089,
        lng: 79.8362,
        description: "Charming beach town with fishing lagoon, colonial heritage, and easy airport access",
        longDescription: "Negombo is Sri Lanka's closest beach destination to Colombo International Airport, making it ideal for arrivals and departures. The town is famous for its picturesque fishing lagoon filled with traditional outrigger boats, Dutch colonial architecture, and peaceful beach atmosphere. Negombo Lagoon is a pristine bird sanctuary attracting numerous species and is perfect for boat tours. The town blends tourism with authentic fishing village culture, offering fresh seafood, laid-back vibes, and access to uncrowded beaches. The nearby Negombo Sanctuary marine protected area offers excellent snorkeling opportunities.",
        bestTimeToVisit: "November to March (dry season, ideal beach weather)",
        attractions: [
            "Negombo Lagoon - scenic fishing lagoon with traditional boats",
            "Lagoon Boat Tours - guided tours of fishing village",
            "Negombo Beach - long sandy beach for swimming",
            "St. Mary's Church - historic colonial-era church",
            "Negombo Sanctuary - marine protected area",
            "Fish Market - authentic morning fish auction",
            "Negombo Sanctuary Reef - excellent snorkeling spot"
        ],
        tips: [
            "Take a lagoon boat tour at sunrise for magical experience",
            "Watch the traditional fishing boats at work",
            "Visit fish market early morning for activity",
            "Snorkel at the marine sanctuary during dry season",
            "Try fresh seafood at local restaurants",
            "Rent a scooter to explore area",
            "Perfect for layover before/after flights"
        ],
        activities: [
            "Lagoon boat tours and fishing village visits",
            "Snorkeling in Negombo Sanctuary",
            "Beach swimming and relaxation",
            "Photography of fishing boats and sunsets",
            "Bird watching in lagoon",
            "Shopping at local markets",
            "Fresh seafood dining experiences"
        ],
        gettingThere: "Located 32km north of Colombo, just 15 minutes from Colombo International Airport. Easily accessible by car/taxi from airport (20 minutes), bus, or train (40 minutes from Colombo). Ideal first/last stop."
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
        description: "A luxury resort in Ella, Sri Lanka, surrounded by tea plantations and mountains.",
        lat: 6.8710,
        lng: 81.0456
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
        description: "A cliffside resort with panoramic views of the Indian Ocean.",
        lat: 5.9632,
        lng: 80.4768
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
        description: "Luxury villas with views of the Sigiriya Rock Fortress.",
        lat: 7.9571,
        lng: 80.7603
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
        description: "A historic hotel located within the UNESCO World Heritage site of Galle Fort.",
        lat: 6.0535,
        lng: 80.2197
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
        description: "A modern hotel in the heart of Jaffna city.",
        lat: 9.6615,
        lng: 80.0255
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
        description: "Offering a prime view of the Sigiriya Rock Fortress.",
        lat: 7.9538,
        lng: 80.7584
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
        description: "An eco-friendly resort nestled in the jungle near Ella.",
        lat: 6.8624,
        lng: 81.0352
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
        description: "Luxury hotel in the cool climate of Nuwara Eliya.",
        lat: 6.9497,
        lng: 80.7851
    },
    {
        id: "heritance-kandalama",
        name: "Heritance Kandalama",
        location: "Dambulla, Sri Lanka",
        locationId: "dambulla",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
        price: 380,
        rating: 4.8,
        reviewCount: 620,
        type: "hotel",
        amenities: ["wifi", "pool", "spa", "restaurant", "cultural"],
        description: "Luxury resort in Cultural Triangle with views of Kandalama Lake.",
        lat: 7.8650,
        lng: 80.6750
    },
    {
        id: "watergarden-anuradhapura",
        name: "Nuwarawatta Sanctuary",
        location: "Anuradhapura, Sri Lanka",
        locationId: "anuradhapura",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
        price: 195,
        rating: 4.6,
        reviewCount: 340,
        type: "hotel",
        amenities: ["wifi", "restaurant", "gardens"],
        description: "Peaceful hotel near ancient Buddhist temples and ruins.",
        lat: 8.3150,
        lng: 80.4200
    },
    {
        id: "leopard-safari-lodge",
        name: "Leopard Safari Lodge",
        location: "Yala National Park, Sri Lanka",
        locationId: "yala",
        image: "https://images.unsplash.com/photo-1426604966848-d7bcdd5735df?q=80&w=2070&auto=format&fit=crop",
        price: 520,
        rating: 4.9,
        reviewCount: 890,
        type: "hotel",
        amenities: ["wifi", "safari", "all-inclusive", "restaurant"],
        description: "Premium safari hotel with expert guides for wildlife spotting.",
        lat: 6.3700,
        lng: 81.5200
    },
    {
        id: "adams-peak-retreat",
        name: "Adam's Peak Retreat",
        location: "Dalhousie, Sri Lanka",
        locationId: "adams-peak",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
        price: 160,
        rating: 4.5,
        reviewCount: 420,
        type: "villa",
        amenities: ["wifi", "mountain views", "restaurant"],
        description: "Comfortable villa at the base of Adam's Peak pilgrimage mountain.",
        lat: 6.8100,
        lng: 80.8000
    },
    {
        id: "blue-coral-hikkaduwa",
        name: "Blue Coral Resort",
        location: "Hikkaduwa, Sri Lanka",
        locationId: "hikkaduwa",
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2070&auto=format&fit=crop",
        price: 210,
        rating: 4.6,
        reviewCount: 650,
        type: "hotel",
        amenities: ["wifi", "beach", "diving", "restaurant"],
        description: "Beachfront hotel with excellent diving packages and coral reef access.",
        lat: 6.1450,
        lng: 80.1250
    },
    {
        id: "bentota-beach-resort",
        name: "Bentota Beach Resort",
        location: "Bentota, Sri Lanka",
        locationId: "bentota",
        image: "https://images.unsplash.com/photo-1566756675627-c86b57348e0d?q=80&w=2070&auto=format&fit=crop",
        price: 480,
        rating: 4.8,
        reviewCount: 780,
        type: "hotel",
        amenities: ["wifi", "pool", "beach", "water sports", "spa"],
        description: "Luxury beach resort with all water sports and beach club amenities.",
        lat: 6.4300,
        lng: 80.0050
    },
    {
        id: "palm-lagoon-negombo",
        name: "Palm Lagoon Hotel",
        location: "Negombo, Sri Lanka",
        locationId: "negombo",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop",
        price: 140,
        rating: 4.4,
        reviewCount: 510,
        type: "hotel",
        amenities: ["wifi", "beach", "lagoon access", "restaurant"],
        description: "Perfect for transit travelers with easy airport access and lagoon views.",
        lat: 7.2100,
        lng: 79.8400
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
