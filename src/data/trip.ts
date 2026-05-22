export type PlaceType = 'hotel' | 'coffee' | 'food' | 'viewpoint' | 'route' | 'town';

export type TripPlace = {
  id: string;
  type: PlaceType;
  name: string;
  query: string;
  notes?: string;
  mapsUrl?: string;
  priority?: number;
  manualImageUrl?: string;
};

export type TripDay = {
  day: number;
  date: string;
  title: string;
  route: string;
  distanceKm: number;
  overnight: string;
  departureTarget?: string;
  arrivalTarget?: string;
  stay: string;
  costs: {
    fuel: number;
    food: number;
    hotel: number;
    total: number;
  };
  highlights: string[];
  ridingNotes: string[];
  foodTarget: string;
  foodBackups: string[];
  places: TripPlace[];
};

export type TripData = {
  title: string;
  subtitle: string;
  bike: string;
  dates: string;
  startDate: string;
  endDate: string;
  assumptions: {
    fuelEconomyKmL: number;
    fuelPriceBahtPerL: number;
    mealsPerDay: number;
    snacksPerDayBaht: number;
  };
  totals: {
    distanceKm: number;
    fuelUsedL: number;
    fuelCost: number;
    food: number;
    accommodation: number;
    estimatedTotal: number;
    contingency: number;
    budgetEnvelope: number;
  };
  phases: {
    title: string;
    days: string;
    route: string;
  }[];
  days: TripDay[];
};

export const trip: TripData = {
  title: 'Bangkok to Mae Hong Son Loop',
  subtitle: '13-Day Honda NC750X Ride Plan',
  bike: 'Honda NC750X',
  dates: '21 June – 3 July 2026',
  startDate: '2026-06-21',
  endDate: '2026-07-03',
  assumptions: {
    fuelEconomyKmL: 30,
    fuelPriceBahtPerL: 40,
    mealsPerDay: 2,
    snacksPerDayBaht: 100
  },
  totals: {
    distanceKm: 2163,
    fuelUsedL: 72.1,
    fuelCost: 2883,
    food: 3260,
    accommodation: 5800,
    estimatedTotal: 11943,
    contingency: 1500,
    budgetEnvelope: 13500
  },
  phases: [
    {
      title: 'Northbound',
      days: 'Days 1–4',
      route: 'Bangkok → Uthai Thani → Sukhothai → Lampang → Chiang Mai'
    },
    {
      title: 'Mountain Core',
      days: 'Days 5–10',
      route: 'Chiang Mai → Doi Inthanon → Mae Chaem → Mae Sariang → Mae Hong Son → Pai → Chiang Mai'
    },
    {
      title: 'Southbound',
      days: 'Days 11–13',
      route: 'Chiang Mai → Tak → Nakhon Sawan → Bangkok'
    }
  ],
  days: [
    {
      day: 1,
      date: 'Sun 21 Jun',
      title: 'Bangkok to Uthai Thani',
      route: 'Bangkok → Uthai Thani',
      distanceKm: 220,
      overnight: 'Uthai Thani',
      departureTarget: '06:00',
      arrivalTarget: 'Lunch / early afternoon',
      stay: 'C2U Hotel Uthai Thani',
      costs: { fuel: 293, food: 240, hotel: 450, total: 983 },
      highlights: ['Bangkok dawn departure', 'Chao Phraya / Chainat riverside', 'Sakae Krang River'],
      ridingNotes: ['Escape Bangkok early.', 'Keep the first day easy.', 'Arrive with energy rather than pride.'],
      foodTarget: 'Ko Ti Khao Man Gai Uthai Thani',
      foodBackups: ['Nok Noi Restaurant', 'Pa Samran Restaurant'],
      places: [
        { id: 'd1-route', type: 'route', name: 'Bangkok to Uthai Thani route', query: 'Bangkok to Uthai Thani driving route' },
        { id: 'd1-hotel', type: 'hotel', name: 'C2U Hotel Uthai Thani', query: 'C2U Hotel Uthai Thani' },
        { id: 'd1-coffee-1', type: 'coffee', name: '39 Café by Arano', query: '39 Café by Arano Suphan Buri Highway 340' },
        { id: 'd1-coffee-2', type: 'coffee', name: 'Sakae Krang riverside café', query: 'Sakae Krang River cafe Uthai Thani' },
        { id: 'd1-food', type: 'food', name: 'Ko Ti Khao Man Gai Uthai Thani', query: 'Ko Ti Khao Man Gai Uthai Thani' },
        { id: 'd1-view', type: 'viewpoint', name: 'Sakae Krang River', query: 'Sakae Krang River Uthai Thani' }
      ]
    },
    {
      day: 2,
      date: 'Mon 22 Jun',
      title: 'Uthai Thani to Sukhothai',
      route: 'Uthai Thani → Sukhothai',
      distanceKm: 225,
      overnight: 'Sukhothai',
      departureTarget: '07:00',
      arrivalTarget: 'Early afternoon',
      stay: 'Old City Guest House',
      costs: { fuel: 300, food: 240, hotel: 450, total: 990 },
      highlights: ['Kamphaeng Phet stop', 'Sukhothai Historical Park'],
      ridingNotes: ['Comfortable cultural riding day.', 'Use Kamphaeng Phet as a natural pause.'],
      foodTarget: 'Mai Klang Krung',
      foodBackups: ['Sukhothai Night Market', 'Poo Restaurant'],
      places: [
        { id: 'd2-route', type: 'route', name: 'Uthai Thani to Sukhothai route', query: 'Uthai Thani to Sukhothai driving route' },
        { id: 'd2-hotel', type: 'hotel', name: 'Old City Guest House', query: 'Old City Guest House Sukhothai' },
        { id: 'd2-coffee-1', type: 'coffee', name: 'Kamphaeng Phet riverside café', query: 'Kamphaeng Phet riverside cafe' },
        { id: 'd2-coffee-2', type: 'coffee', name: 'Old City Landmark Café', query: 'Old City Landmark Cafe Sukhothai' },
        { id: 'd2-food', type: 'food', name: 'Mai Klang Krung', query: 'Mai Klang Krung Sukhothai' },
        { id: 'd2-view', type: 'viewpoint', name: 'Sukhothai Historical Park', query: 'Sukhothai Historical Park' }
      ]
    },
    {
      day: 3,
      date: 'Tue 23 Jun',
      title: 'Sukhothai to Lampang',
      route: 'Sukhothai → Lampang',
      distanceKm: 198,
      overnight: 'Lampang',
      departureTarget: '07:00',
      arrivalTarget: 'Early afternoon',
      stay: 'Asia Lampang Hotel',
      costs: { fuel: 264, food: 240, hotel: 400, total: 904 },
      highlights: ['Northern approach', 'Lampang riverside', 'Old town atmosphere'],
      ridingNotes: ['The road begins to feel more northern.', 'Keep this day relaxed.'],
      foodTarget: 'Aroy One Baht',
      foodBackups: ['Jay Noy', 'Chahom & Kenghom Bistro'],
      places: [
        { id: 'd3-route', type: 'route', name: 'Sukhothai to Lampang route', query: 'Sukhothai to Lampang driving route' },
        { id: 'd3-hotel', type: 'hotel', name: 'Asia Lampang Hotel', query: 'Asia Lampang Hotel' },
        { id: 'd3-coffee-1', type: 'coffee', name: 'Uttaradit coffee stop', query: 'Uttaradit coffee shop' },
        { id: 'd3-coffee-2', type: 'coffee', name: 'Wooden House Café', query: 'Wooden House Cafe Lampang' },
        { id: 'd3-food', type: 'food', name: 'Aroy One Baht', query: 'Aroy One Baht Lampang' },
        { id: 'd3-view', type: 'viewpoint', name: 'Lampang riverside / old bridge', query: 'Ratsadaphisek Bridge Lampang' }
      ]
    },
    {
      day: 4,
      date: 'Wed 24 Jun',
      title: 'Lampang to Chiang Mai',
      route: 'Lampang → Chiang Mai',
      distanceKm: 100,
      overnight: 'Chiang Mai',
      departureTarget: '08:00',
      arrivalTarget: 'Before lunch',
      stay: 'B2 Budget Hotel Chiang Mai',
      costs: { fuel: 133, food: 260, hotel: 550, total: 943 },
      highlights: ['Mae Tha corridor', 'Easy arrival', 'Chiang Mai city'],
      ridingNotes: ['Short positioning day.', 'Use the afternoon for laundry, bike checks, and rain gear reset.'],
      foodTarget: 'Huen Muan Jai',
      foodBackups: ['SP Chicken', 'Chang Phueak Gate food stalls', 'Santitham local food stalls'],
      places: [
        { id: 'd4-route', type: 'route', name: 'Lampang to Chiang Mai route', query: 'Lampang to Chiang Mai driving route Mae Tha' },
        { id: 'd4-hotel', type: 'hotel', name: 'B2 Budget Hotel Chiang Mai', query: 'B2 Budget Hotel Chiang Mai' },
        { id: 'd4-coffee-1', type: 'coffee', name: 'Thin Thai Coffee', query: 'Thin Thai Coffee Mae Tha Lampang' },
        { id: 'd4-coffee-2', type: 'coffee', name: 'Chiang Mai arrival café', query: 'Chiang Mai cafe Santitham' },
        { id: 'd4-food', type: 'food', name: 'Huen Muan Jai', query: 'Huen Muan Jai Chiang Mai' },
        { id: 'd4-view', type: 'viewpoint', name: 'Chiang Mai old city moat', query: 'Chiang Mai old city moat' }
      ]
    },
    {
      day: 5,
      date: 'Thu 25 Jun',
      title: 'Chiang Mai to Mae Chaem',
      route: 'Chiang Mai → Doi Inthanon → Mae Chaem',
      distanceKm: 140,
      overnight: 'Mae Chaem',
      departureTarget: '07:00',
      arrivalTarget: 'Early afternoon',
      stay: 'The Nutthasin Mae Chaem',
      costs: { fuel: 187, food: 240, hotel: 350, total: 777 },
      highlights: ['Doi Inthanon summit', 'Mountain descent', 'Mae Chaem valley'],
      ridingNotes: ['Rainy-season mountain day.', 'Watch for wet leaves, fog, gravel, and slippery paint.'],
      foodTarget: 'Mae Chaem Gate Restaurant',
      foodBackups: ['Mae Chaem Hotel restaurant', 'Chaem Arom / tom yum noodle option'],
      places: [
        { id: 'd5-route', type: 'route', name: 'Chiang Mai to Mae Chaem via Doi Inthanon route', query: 'Chiang Mai Doi Inthanon Mae Chaem route' },
        { id: 'd5-hotel', type: 'hotel', name: 'The Nutthasin Mae Chaem', query: 'The Nutthasin Mae Chaem' },
        { id: 'd5-coffee-1', type: 'coffee', name: 'Young Folk Bean and Brew', query: 'Young Folk Bean and Brew Doi Inthanon' },
        { id: 'd5-coffee-2', type: 'coffee', name: 'Mae Chaem town coffee stop', query: 'Mae Chaem coffee shop' },
        { id: 'd5-food', type: 'food', name: 'Mae Chaem Gate Restaurant', query: 'Mae Chaem Gate Restaurant' },
        { id: 'd5-view', type: 'viewpoint', name: 'Doi Inthanon Twin Pagodas', query: 'Doi Inthanon Twin Pagodas' }
      ]
    },
    {
      day: 6,
      date: 'Fri 26 Jun',
      title: 'Mae Chaem to Mae Sariang',
      route: 'Mae Chaem → Mae Sariang',
      distanceKm: 130,
      overnight: 'Mae Sariang',
      departureTarget: '07:30',
      arrivalTarget: 'Early afternoon',
      stay: 'Riverbank Resort',
      costs: { fuel: 173, food: 240, hotel: 500, total: 913 },
      highlights: ['Terraced hills', 'Quiet back roads', 'Mae Sariang riverside'],
      ridingNotes: ['Quiet rural road texture day.', 'Stop only at safe shoulders with real views.'],
      foodTarget: 'Inthira / Intira Restaurant',
      foodBackups: ['Cowboy Night', 'Coriander in Redwood'],
      places: [
        { id: 'd6-route', type: 'route', name: 'Mae Chaem to Mae Sariang route', query: 'Mae Chaem to Mae Sariang motorcycle route' },
        { id: 'd6-hotel', type: 'hotel', name: 'Riverbank Resort', query: 'Riverbank Resort Mae Sariang' },
        { id: 'd6-coffee-1', type: 'coffee', name: 'Mae Na Chon coffee stop', query: 'Mae Na Chon coffee Mae Chaem' },
        { id: 'd6-coffee-2', type: 'coffee', name: 'Sook Coffee Mae Sariang', query: 'Sook Coffee Mae Sariang' },
        { id: 'd6-food', type: 'food', name: 'Inthira / Intira Restaurant', query: 'Inthira Restaurant Mae Sariang' },
        { id: 'd6-view', type: 'viewpoint', name: 'Mae Sariang riverside', query: 'Mae Sariang riverside' }
      ]
    },
    {
      day: 7,
      date: 'Sat 27 Jun',
      title: 'Mae Sariang to Mae Hong Son',
      route: 'Mae Sariang → Mae Hong Son',
      distanceKm: 160,
      overnight: 'Mae Hong Son',
      departureTarget: '07:00',
      arrivalTarget: '14:00–15:00',
      stay: 'Northern Hill Guesthouse',
      costs: { fuel: 213, food: 260, hotel: 500, total: 973 },
      highlights: ['Highway 108 curves', 'Khun Yuam valley', 'Jong Kham Lake'],
      ridingNotes: ['Longest mountain day.', 'Do not chase speed. Keep braking smooth and arrive early.'],
      foodTarget: 'Salween River Restaurant',
      foodBackups: ['Sang Tong Huts restaurant', 'Jong Kham Lake night food area'],
      places: [
        { id: 'd7-route', type: 'route', name: 'Mae Sariang to Mae Hong Son via Highway 108', query: 'Highway 108 Mae Sariang Mae Hong Son' },
        { id: 'd7-hotel', type: 'hotel', name: 'Northern Hill Guesthouse', query: 'Northern Hill Guesthouse Mae Hong Son' },
        { id: 'd7-coffee-1', type: 'coffee', name: 'Screw and Brew', query: 'Screw and Brew Mae Sariang' },
        { id: 'd7-coffee-2', type: 'coffee', name: 'Khun Yuam coffee stop', query: 'Khun Yuam coffee' },
        { id: 'd7-food', type: 'food', name: 'Salween River Restaurant', query: 'Salween River Restaurant Mae Hong Son' },
        { id: 'd7-view', type: 'viewpoint', name: 'Jong Kham Lake', query: 'Jong Kham Lake Mae Hong Son' }
      ]
    },
    {
      day: 8,
      date: 'Sun 28 Jun',
      title: 'Mae Hong Son to Pai',
      route: 'Mae Hong Son → Pai',
      distanceKm: 115,
      overnight: 'Pai',
      departureTarget: '07:00',
      arrivalTarget: 'Lunch / early afternoon',
      stay: 'Yotaka@Pai',
      costs: { fuel: 153, food: 280, hotel: 500, total: 933 },
      highlights: ['Route 1095', 'Doi Kiew Lom', 'Pai valley'],
      ridingNotes: ['Short distance, serious attention.', 'Expect blind bends, tourist vans, rental scooters, gravel, and rain patches.'],
      foodTarget: "Na's Kitchen",
      foodBackups: ['Charlie & Lek', 'Pai Walking Street food stalls'],
      places: [
        { id: 'd8-route', type: 'route', name: 'Mae Hong Son to Pai via Route 1095', query: 'Route 1095 Mae Hong Son Pai' },
        { id: 'd8-hotel', type: 'hotel', name: 'Yotaka@Pai', query: 'Yotaka at Pai' },
        { id: 'd8-coffee-1', type: 'coffee', name: 'Pang Mapha / Soppong coffee stop', query: 'Pang Mapha Soppong coffee shop' },
        { id: 'd8-coffee-2', type: 'coffee', name: 'Coffee in Love', query: 'Coffee in Love Pai' },
        { id: 'd8-food', type: 'food', name: "Na's Kitchen", query: "Na's Kitchen Pai" },
        { id: 'd8-view', type: 'viewpoint', name: 'Doi Kiew Lom Viewpoint', query: 'Doi Kiew Lom Viewpoint' }
      ]
    },
    {
      day: 9,
      date: 'Mon 29 Jun',
      title: 'Pai Full Day',
      route: 'Pai local loop / rest day',
      distanceKm: 40,
      overnight: 'Pai',
      departureTarget: 'No early start required',
      arrivalTarget: 'Stay in Pai',
      stay: 'Yotaka@Pai',
      costs: { fuel: 53, food: 280, hotel: 500, total: 833 },
      highlights: ['Pai Canyon', 'White Buddha', 'Relaxed Pai day'],
      ridingNotes: ['Do not turn Pai day into a riding day.', 'Use this as the pressure valve between mountain sections.'],
      foodTarget: 'Charlie & Lek',
      foodBackups: ["Na's Kitchen", 'Pai Walking Street food stalls'],
      places: [
        { id: 'd9-route', type: 'route', name: 'Pai local day', query: 'Pai Thailand' },
        { id: 'd9-hotel', type: 'hotel', name: 'Yotaka@Pai', query: 'Yotaka at Pai' },
        { id: 'd9-coffee-1', type: 'coffee', name: 'The Pedlar', query: 'The Pedlar Pai' },
        { id: 'd9-coffee-2', type: 'coffee', name: 'Carrot on the Moon', query: 'Carrot on the Moon Pai' },
        { id: 'd9-food', type: 'food', name: 'Charlie & Lek', query: 'Charlie and Lek Pai' },
        { id: 'd9-view', type: 'viewpoint', name: 'Pai Canyon', query: 'Pai Canyon Thailand' },
        { id: 'd9-view-2', type: 'viewpoint', name: 'White Buddha / Wat Phra That Mae Yen', query: 'Wat Phra That Mae Yen Pai White Buddha' }
      ]
    },
    {
      day: 10,
      date: 'Tue 30 Jun',
      title: 'Pai to Chiang Mai',
      route: 'Pai → Chiang Mai',
      distanceKm: 135,
      overnight: 'Chiang Mai',
      departureTarget: '07:00',
      arrivalTarget: 'Lunch / early afternoon',
      stay: 'B2 Budget Hotel Chiang Mai',
      costs: { fuel: 180, food: 260, hotel: 550, total: 990 },
      highlights: ['Route 1095', 'Mae Taeng corridor', 'Chiang Mai arrival'],
      ridingNotes: ['Final mountain curve day.', 'Expect tourist traffic and unpredictable scooters.'],
      foodTarget: 'SP Chicken',
      foodBackups: ['Huen Muan Jai', 'Santitham local food stalls'],
      places: [
        { id: 'd10-route', type: 'route', name: 'Pai to Chiang Mai via Route 1095', query: 'Route 1095 Pai Chiang Mai' },
        { id: 'd10-hotel', type: 'hotel', name: 'B2 Budget Hotel Chiang Mai', query: 'B2 Budget Hotel Chiang Mai' },
        { id: 'd10-coffee-1', type: 'coffee', name: 'Coffee in Love', query: 'Coffee in Love Pai' },
        { id: 'd10-coffee-2', type: 'coffee', name: 'Pankled Coffee', query: 'Pankled Coffee Mae Taeng' },
        { id: 'd10-food', type: 'food', name: 'SP Chicken', query: 'SP Chicken Chiang Mai' },
        { id: 'd10-view', type: 'viewpoint', name: 'Chiang Mai old city moat', query: 'Chiang Mai old city moat sunset' }
      ]
    },
    {
      day: 11,
      date: 'Wed 1 Jul',
      title: 'Chiang Mai to Tak',
      route: 'Chiang Mai → Tak',
      distanceKm: 270,
      overnight: 'Tak',
      departureTarget: '06:30',
      arrivalTarget: 'Early / mid-afternoon',
      stay: 'Budget hotel in Tak / Viangtak Riverside Hotel fallback',
      costs: { fuel: 360, food: 240, hotel: 500, total: 1100 },
      highlights: ['Southbound sweep', 'Lampang corridor', 'Tak riverside'],
      ridingNotes: ['Longest return day.', 'Flowing road after the mountain section.'],
      foodTarget: 'Bankhiangnam Restaurant',
      foodBackups: ['Aiyara Wadi Restaurant', 'Chit Chon'],
      places: [
        { id: 'd11-route', type: 'route', name: 'Chiang Mai to Tak route', query: 'Chiang Mai to Tak driving route' },
        { id: 'd11-hotel', type: 'hotel', name: 'Viangtak Riverside Hotel', query: 'Viangtak Riverside Hotel Tak' },
        { id: 'd11-coffee-1', type: 'coffee', name: 'Thin Thai Coffee', query: 'Thin Thai Coffee Mae Tha' },
        { id: 'd11-coffee-2', type: 'coffee', name: 'Tieng Na Coffee', query: 'Tieng Na Coffee Tak' },
        { id: 'd11-food', type: 'food', name: 'Bankhiangnam Restaurant', query: 'Bankhiangnam Restaurant Tak' },
        { id: 'd11-view', type: 'viewpoint', name: 'Tak riverside / Ping River', query: 'Tak Ping River riverside' }
      ]
    },
    {
      day: 12,
      date: 'Thu 2 Jul',
      title: 'Tak to Nakhon Sawan',
      route: 'Tak → Nakhon Sawan',
      distanceKm: 185,
      overnight: 'Nakhon Sawan',
      departureTarget: '07:00',
      arrivalTarget: 'Lunch / early afternoon',
      stay: 'B2 Nakhon Sawan Boutique & Budget Hotel',
      costs: { fuel: 247, food: 240, hotel: 550, total: 1037 },
      highlights: ['Ping River', 'Kamphaeng Phet stop', 'Nakhon Sawan arrival'],
      ridingNotes: ['Deliberately easier than Day 11.', 'Decompression transit day.'],
      foodTarget: 'Bueng Boraphet / riverside fish restaurant area',
      foodBackups: ['Nakhon Sawan riverside restaurants', 'Big C / Central food court'],
      places: [
        { id: 'd12-route', type: 'route', name: 'Tak to Nakhon Sawan route', query: 'Tak to Nakhon Sawan driving route' },
        { id: 'd12-hotel', type: 'hotel', name: 'B2 Nakhon Sawan Boutique & Budget Hotel', query: 'B2 Nakhon Sawan Boutique and Budget Hotel' },
        { id: 'd12-coffee-1', type: 'coffee', name: 'Kamphaeng Phet café stop', query: 'Kamphaeng Phet cafe' },
        { id: 'd12-coffee-2', type: 'coffee', name: 'Nakhon Sawan arrival café', query: 'Nakhon Sawan cafe river' },
        { id: 'd12-food', type: 'food', name: 'Bueng Boraphet fish restaurant area', query: 'Bueng Boraphet fish restaurant' },
        { id: 'd12-view', type: 'viewpoint', name: 'Nakhon Sawan river viewpoint', query: 'Nakhon Sawan river viewpoint' }
      ]
    },
    {
      day: 13,
      date: 'Fri 3 Jul',
      title: 'Nakhon Sawan to Bangkok',
      route: 'Nakhon Sawan → Bangkok',
      distanceKm: 245,
      overnight: 'Bangkok',
      departureTarget: '06:00',
      arrivalTarget: 'Early afternoon',
      stay: 'Home',
      costs: { fuel: 327, food: 240, hotel: 0, total: 567 },
      highlights: ['Chainat river stop', 'Suphan Buri coffee break', 'Bangkok finish'],
      ridingNotes: ['Final day.', 'The last part is Bangkok doing Bangkok things.'],
      foodTarget: 'Chainat or Suphan Buri local Thai shop',
      foodBackups: ['Home', 'Sukhumvit Thai food after arrival'],
      places: [
        { id: 'd13-route', type: 'route', name: 'Nakhon Sawan to Bangkok route', query: 'Nakhon Sawan to Bangkok driving route' },
        { id: 'd13-coffee-1', type: 'coffee', name: 'Chainat café stop', query: 'Chainat riverside cafe' },
        { id: 'd13-coffee-2', type: 'coffee', name: 'Suphan Buri café stop', query: 'Suphan Buri countryside cafe' },
        { id: 'd13-food', type: 'food', name: 'Final road meal', query: 'Chainat local noodle shop' },
        { id: 'd13-view', type: 'viewpoint', name: 'Bangkok / Chao Phraya finish', query: 'Bangkok Chao Phraya skyline' }
      ]
    }
  ]
};

export function getDayByNumber(dayNumber: number): TripDay | undefined {
  return trip.days.find((d) => d.day === dayNumber);
}
