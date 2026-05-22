import { dayMapsByNumber } from "./dayMaps";

export type PlaceType = 'hotel' | 'viewpoint' | 'route' | 'town';

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

export type CoffeeStopRole =
  | 'departure'
  | 'mid_route'
  | 'arrival'
  | 'local_day';

export type PlaceGuideFields = {
  whySpecial: string;
  orderSuggestion: string;
  viewOrVibe: string;
  riderNote: string;
};

export type CoffeeStop = PlaceGuideFields & {
  role: CoffeeStopRole;
  name: string;
  query: string;
  note: string;
};

export type FoodPlace = PlaceGuideFields & {
  name: string;
  query: string;
};

export type FoodPlan = {
  primary: FoodPlace;
  backups: FoodPlace[];
};

export type DepartureCoffeeOption = PlaceGuideFields & {
  name: string;
  query: string;
  note: string;
};

export type MapPoint = {
  name: string;
  lat: number;
  lng: number;
};

export type DayMap = {
  start: MapPoint;
  end: MapPoint;
  routePolyline: [number, number][];
};

export type CoordinateStatus = "exact" | "approximate";

export type MapStopType =
  | "hotel"
  | "coffee"
  | "food"
  | "viewpoint"
  | "fuel"
  | "start"
  | "end";

export type RangeConcern = "low" | "medium" | "high";
export type DetourSeverity = "low" | "medium" | "high";

export type WeatherCheckpoint = {
  label: string;
  name: string;
  query: string;
  note: string;
};

export type DayWeather = {
  summary: string;
  checkpoints: WeatherCheckpoint[];
};

export type FuelStopSuggestion = {
  name: string;
  query: string;
  note: string;
};

export type FuelStrategy = {
  startFull: boolean;
  estimatedLiters: number;
  estimatedCost: number;
  rangeConcern: RangeConcern;
  plan: string;
  suggestedFuelStops: FuelStopSuggestion[];
  caution: string;
};

export type DayDifficulty = {
  rating: number;
  label: string;
  summary: string;
  factors: string[];
};

export type DoNotDetour = {
  severity: DetourSeverity;
  title: string;
  message: string;
  exceptions?: string;
};

export type MapStop = PlaceGuideFields & {
  id: string;
  type: MapStopType;
  role?: string;
  name: string;
  query: string;
  lat: number | null;
  lng: number | null;
  coordinateStatus: CoordinateStatus;
  mapsUrl: string;
  note?: string;
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
  food: FoodPlan;
  coffeeStops: CoffeeStop[];
  dayCoffeeNote?: string;
  departureOption?: DepartureCoffeeOption;
  places: TripPlace[];
};

export type TripDayEnriched = TripDay & {
  difficulty: DayDifficulty;
  weather: DayWeather;
  fuelStrategy: FuelStrategy;
  doNotDetour: DoNotDetour;
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
      food: {
        primary: {
          name: 'Ko Ti Khao Man Gai Uthai Thani',
          query: 'Ko Ti Khao Man Gai Uthai Thani',
          whySpecial: 'Cheap, fast, simple Thai road food.',
          orderSuggestion: 'Khao man gai with soup; extra chicken if hungry.',
          viewOrVibe: 'Local shop, practical rather than scenic.',
          riderNote: 'Good first-night meal when you want easy food and sleep.'
        },
        backups: [
          {
            name: 'Nok Noi Restaurant',
            query: 'Nok Noi Restaurant Uthai Thani',
            whySpecial: 'Useful backup for general Thai dishes.',
            orderSuggestion: 'Stir-fried rice dishes or noodles.',
            viewOrVibe: 'Local restaurant feel.',
            riderNote: 'Use if the chicken rice place is closed.'
          },
          {
            name: 'Pa Samran Restaurant',
            query: 'Pa Samran Restaurant Uthai Thani',
            whySpecial: 'Better if you want a fuller Thai meal.',
            orderSuggestion: 'Local fish or shared Thai dishes.',
            viewOrVibe: 'More of a sit-down restaurant.',
            riderNote: 'Use if you arrive early and want a slower dinner.'
          }
        ]
      },
      coffeeStops: [
        {
          role: 'mid_route',
          name: '39 Café by Arano',
          query: '39 Café by Arano Suphan Buri Highway 340',
          note: 'Good first proper coffee after leaving Bangkok.',
          whySpecial: 'Useful highway-side break before the ride becomes rural.',
          orderSuggestion: 'Iced Americano or Thai iced coffee.',
          viewOrVibe: 'Roadside garden café / easy stop-and-go energy.',
          riderNote: 'Use this as the first helmet-off stop after clearing Bangkok traffic.'
        },
        {
          role: 'arrival',
          name: 'Sakae Krang riverside café',
          query: 'Sakae Krang River cafe Uthai Thani',
          note: 'Arrival coffee near the river.',
          whySpecial: "Good decompression stop after the first day's ride.",
          orderSuggestion: 'Iced coffee, soft drink, or cold water.',
          viewOrVibe: 'Riverside / slow-town arrival feeling.',
          riderNote: 'Best used after check-in or just before finding dinner.'
        }
      ],
      places: [
        { id: 'd1-route', type: 'route', name: 'Bangkok to Uthai Thani route', query: 'Bangkok to Uthai Thani driving route' },
        { id: 'd1-hotel', type: 'hotel', name: 'C2U Hotel Uthai Thani', query: 'C2U Hotel Uthai Thani' },
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
      food: {
        primary: {
          name: 'Mai Klang Krung',
          query: 'Mai Klang Krung Sukhothai',
          whySpecial: 'Strong local choice for Sukhothai-style food.',
          orderSuggestion: 'Sukhothai noodles.',
          viewOrVibe: 'Local food stop with heritage-town character.',
          riderNote: 'Good dinner target if staying near Old Sukhothai.'
        },
        backups: [
          {
            name: 'Sukhothai Night Market / Wat Ratchathanee area',
            query: 'Sukhothai night market Wat Ratchathanee',
            whySpecial: 'Cheap, flexible, and easy if you want choices.',
            orderSuggestion: 'Noodles, pad Thai, khao man gai, grilled snacks.',
            viewOrVibe: 'Casual market energy.',
            riderNote: 'Best backup if you do not want to commit to a restaurant.'
          },
          {
            name: 'Poo Restaurant',
            query: 'Poo Restaurant Sukhothai',
            whySpecial: 'Easy tourist-town fallback with Thai food.',
            orderSuggestion: 'Thai rice dishes or curries.',
            viewOrVibe: 'Casual, convenient.',
            riderNote: 'Use if you want something simple and predictable.'
          }
        ]
      },
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Kamphaeng Phet riverside café',
          query: 'Kamphaeng Phet riverside cafe',
          note: 'Natural mid-route pause.',
          whySpecial: 'Good place to break the ride before continuing north.',
          orderSuggestion: 'Iced latte, iced Americano, or Thai tea.',
          viewOrVibe: 'Riverside / old-town pause if you choose the right café.',
          riderNote: 'Use as the main rest stop between Uthai Thani and Sukhothai.'
        },
        {
          role: 'arrival',
          name: 'Old City Landmark Café',
          query: 'Old City Landmark Cafe Sukhothai',
          note: 'Arrival café near the Old City.',
          whySpecial: 'Puts you close to the Historical Park atmosphere.',
          orderSuggestion: 'Iced coffee or smoothie.',
          viewOrVibe: 'Old Sukhothai / temple-town vibe.',
          riderNote: 'Good arrival stop before checking in or walking the old city area.'
        }
      ],
      places: [
        { id: 'd2-route', type: 'route', name: 'Uthai Thani to Sukhothai route', query: 'Uthai Thani to Sukhothai driving route' },
        { id: 'd2-hotel', type: 'hotel', name: 'Old City Guest House', query: 'Old City Guest House Sukhothai' },
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
      food: {
        primary: {
          name: 'Aroy One Baht',
          query: 'Aroy One Baht Lampang',
          whySpecial: 'Cheap local Thai food with road-trip practicality.',
          orderSuggestion: 'Rice plates, noodles, or simple stir-fried dishes.',
          viewOrVibe: 'Local, budget, no-fuss.',
          riderNote: 'Good if you want to keep the budget tight.'
        },
        backups: [
          {
            name: 'Jay Noy / ร้านเจ้น้อย',
            query: 'Jay Noy Lampang Thai food',
            whySpecial: 'Homestyle northern Thai option.',
            orderSuggestion: 'Northern curry, grilled items, or local soups.',
            viewOrVibe: 'Local northern Thai meal.',
            riderNote: 'Better if you want something more regional than a basic rice plate.'
          },
          {
            name: 'Chahom & Kenghom Bistro',
            query: 'Chahom Kenghom Bistro Lampang',
            whySpecial: 'More polished option for a nicer dinner.',
            orderSuggestion: 'Northern Thai dishes or house specials.',
            viewOrVibe: 'Bistro / relaxed dinner.',
            riderNote: 'Use if you want a comfort upgrade.'
          }
        ]
      },
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Uttaradit town coffee stop',
          query: 'Uttaradit coffee shop',
          note: 'Practical mid-route stop.',
          whySpecial: 'Breaks the ride before the northern approach into Lampang.',
          orderSuggestion: 'Iced Americano or espresso yen.',
          viewOrVibe: 'Functional town coffee stop.',
          riderNote: 'Choose based on parking and shade rather than brand name.'
        },
        {
          role: 'arrival',
          name: 'Wooden House Café',
          query: 'Wooden House Cafe Lampang',
          note: 'Arrival café in Lampang.',
          whySpecial: 'Atmospheric Lampang café stop after the riding day.',
          orderSuggestion: 'Iced coffee and cake if available.',
          viewOrVibe: 'Wooden house / riverside or old-town charm.',
          riderNote: 'Good arrival reward before the evening walk.'
        }
      ],
      places: [
        { id: 'd3-route', type: 'route', name: 'Sukhothai to Lampang route', query: 'Sukhothai to Lampang driving route' },
        { id: 'd3-hotel', type: 'hotel', name: 'Asia Lampang Hotel', query: 'Asia Lampang Hotel' },
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
      food: {
        primary: {
          name: 'Huen Muan Jai',
          query: 'Huen Muan Jai Chiang Mai',
          whySpecial: 'Good northern Thai dinner after reaching Chiang Mai.',
          orderSuggestion: 'Khao soi, sai ua, nam prik, northern curry.',
          viewOrVibe: 'Classic northern Thai restaurant feel.',
          riderNote: 'Go early if possible; it can be popular.'
        },
        backups: [
          {
            name: 'SP Chicken',
            query: 'SP Chicken Chiang Mai',
            whySpecial: 'Simple, protein-heavy, reliable Chiang Mai meal.',
            orderSuggestion: 'Roast chicken, som tam, sticky rice.',
            viewOrVibe: 'Casual local institution.',
            riderNote: 'Great when you want food that does not require decision-making.'
          },
          {
            name: 'Chang Phueak Gate food stalls',
            query: 'Chang Phueak Gate food stalls Chiang Mai',
            whySpecial: 'Cheap and flexible.',
            orderSuggestion: 'Rice plates, noodles, grilled pork, fruit shakes.',
            viewOrVibe: 'Street-food evening energy.',
            riderNote: 'Good if staying nearby and you want easy parking/walking.'
          }
        ]
      },
      dayCoffeeNote: 'Short ride: one true stop plus an arrival café is enough.',
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Thin Thai Coffee',
          query: 'Thin Thai Coffee Mae Tha Lampang',
          note: 'Best actual route stop on the short Lampang to Chiang Mai leg.',
          whySpecial: 'Proper coffee stop in the Mae Tha corridor.',
          orderSuggestion: 'Hot or iced espresso drink.',
          viewOrVibe: 'Green roadside café atmosphere.',
          riderNote: 'Since the ride is short, this can be the only real road stop.'
        },
        {
          role: 'arrival',
          name: 'Chiang Mai arrival café',
          query: 'Chiang Mai cafe near Santitham',
          note: 'Flexible arrival café near the hotel zone.',
          whySpecial: 'Lets you settle into Chiang Mai without crossing town for a famous café.',
          orderSuggestion: 'Iced coffee, water, snack.',
          viewOrVibe: 'Depends on hotel area; choose easy parking.',
          riderNote: 'Pick based on location, not Instagram sparkle.'
        }
      ],
      places: [
        { id: 'd4-route', type: 'route', name: 'Lampang to Chiang Mai route', query: 'Lampang to Chiang Mai driving route Mae Tha' },
        { id: 'd4-hotel', type: 'hotel', name: 'B2 Budget Hotel Chiang Mai', query: 'B2 Budget Hotel Chiang Mai' },
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
      food: {
        primary: {
          name: 'Mae Chaem Gate Restaurant',
          query: 'Mae Chaem Gate Restaurant',
          whySpecial: 'Practical small-town Thai food in Mae Chaem.',
          orderSuggestion: 'Fried rice, noodle soup, stir-fried pork/chicken with rice.',
          viewOrVibe: 'Simple local restaurant.',
          riderNote: 'Useful because Mae Chaem has fewer evening food choices.'
        },
        backups: [
          {
            name: 'Mae Chaem Hotel restaurant',
            query: 'Mae Chaem Hotel restaurant',
            whySpecial: 'Good wet-weather fallback if you want easy food near lodging.',
            orderSuggestion: 'Basic Thai dishes.',
            viewOrVibe: 'Practical hotel restaurant.',
            riderNote: 'Use if it is raining or restaurants close early.'
          },
          {
            name: 'Chaem Arom / tom yum noodle option',
            query: 'Chaem Arom Mae Chaem tom yum noodles',
            whySpecial: 'Local-style noodle option.',
            orderSuggestion: 'Tom yum noodles.',
            viewOrVibe: 'Casual noodle-shop feel.',
            riderNote: 'Good for a lighter meal.'
          }
        ]
      },
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Chom Thong / Doi Inthanon base café',
          query: 'Chom Thong Doi Inthanon cafe',
          note: 'Good first mountain-day stop before or near the Doi Inthanon climb.',
          whySpecial: 'Last easy café zone before the road becomes mountain-focused.',
          orderSuggestion: 'Iced coffee and water.',
          viewOrVibe: 'Foothill / pre-climb road energy.',
          riderNote: 'Use this to hydrate and reset before the climb.'
        },
        {
          role: 'arrival',
          name: 'Mae Chaem town coffee stop',
          query: 'Mae Chaem coffee shop',
          note: 'Arrival coffee in Mae Chaem after the descent.',
          whySpecial: 'Good place to cool down after the mountain descent.',
          orderSuggestion: 'Iced Thai coffee or soft drink.',
          viewOrVibe: 'Small-town mountain valley feel.',
          riderNote: 'Pick whichever café has shade and easy parking.'
        }
      ],
      places: [
        { id: 'd5-route', type: 'route', name: 'Chiang Mai to Mae Chaem via Doi Inthanon route', query: 'Chiang Mai Doi Inthanon Mae Chaem route' },
        { id: 'd5-hotel', type: 'hotel', name: 'The Nutthasin Mae Chaem', query: 'The Nutthasin Mae Chaem' },
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
      food: {
        primary: {
          name: 'Inthira / Intira Restaurant',
          query: 'Inthira Restaurant Mae Sariang',
          whySpecial: 'Strong local Thai choice in Mae Sariang.',
          orderSuggestion: 'Thai stir-fries, curries, or local dishes.',
          viewOrVibe: 'Local restaurant, good proper dinner.',
          riderNote: 'Good main dinner target after the quiet back-road day.'
        },
        backups: [
          {
            name: 'Cowboy Night',
            query: 'Cowboy Night Mae Sariang',
            whySpecial: 'Riverside-style Thai food and evening atmosphere.',
            orderSuggestion: 'Thai dishes, grilled food, cold drink.',
            viewOrVibe: 'Country-pub / riverside energy.',
            riderNote: 'Ask for less spicy if tired.'
          },
          {
            name: 'Coriander in Redwood',
            query: 'Coriander in Redwood Mae Sariang',
            whySpecial: 'More polished backup with Thai and western-style choices.',
            orderSuggestion: 'Thai dishes or steak-style comfort food.',
            viewOrVibe: 'Relaxed restaurant setting.',
            riderNote: 'Use if you want a less basic dinner.'
          }
        ]
      },
      dayCoffeeNote:
        'Rural leg: if the mid-route café is closed, use any safe roadside stop with shade, water, and parking.',
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Mae Na Chon / rural coffee stop if open',
          query: 'Mae Na Chon coffee',
          note: 'Rural mid-route stop. Flexible because small cafés may be closed.',
          whySpecial: 'Useful pause on a quiet rural leg.',
          orderSuggestion: 'Whatever coffee is available; prioritize water.',
          viewOrVibe: 'Rural roadside / village atmosphere.',
          riderNote: 'If it is closed, stop anywhere safe with shade and drinks.'
        },
        {
          role: 'arrival',
          name: 'Sook Coffee Mae Sariang',
          query: 'Sook Coffee Mae Sariang',
          note: 'Reliable arrival coffee in Mae Sariang.',
          whySpecial: 'Good motorcycle-traveler arrival stop.',
          orderSuggestion: 'Iced coffee or smoothie.',
          viewOrVibe: 'Small-town café, easy decompression.',
          riderNote: 'Use after check-in or before walking the riverside.'
        }
      ],
      places: [
        { id: 'd6-route', type: 'route', name: 'Mae Chaem to Mae Sariang route', query: 'Mae Chaem to Mae Sariang motorcycle route' },
        { id: 'd6-hotel', type: 'hotel', name: 'Riverbank Resort', query: 'Riverbank Resort Mae Sariang' },
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
      food: {
        primary: {
          name: 'Salween River Restaurant',
          query: 'Salween River Restaurant Mae Hong Son',
          whySpecial: 'Classic Mae Hong Son rider stop with Thai/Shan/Burmese-style food.',
          orderSuggestion: 'Shan-style dishes, curry, rice dishes.',
          viewOrVibe: 'Traveler-friendly, relaxed, borderland food feel.',
          riderNote: 'Good first choice after the longest mountain day.'
        },
        backups: [
          {
            name: 'Sang Tong Huts restaurant',
            query: 'Sang Tong Huts Mae Hong Son restaurant',
            whySpecial: 'Thai and Shan dishes in a garden-style setting.',
            orderSuggestion: 'Thai/Shan dishes or house recommendations.',
            viewOrVibe: 'Quiet garden atmosphere.',
            riderNote: 'Check if open before committing.'
          },
          {
            name: 'Jong Kham Lake night food area',
            query: 'Jong Kham Lake food Mae Hong Son',
            whySpecial: 'Easy evening food near the lake.',
            orderSuggestion: 'Noodles, rice dishes, snacks.',
            viewOrVibe: 'Lakeside evening walk energy.',
            riderNote: 'Best backup if you want to stay near the hotel/lake.'
          }
        ]
      },
      departureOption: {
        name: 'Screw and Brew',
        query: 'Screw and Brew Mae Sariang',
        note: 'Good departure coffee before leaving Mae Sariang, but not a true route split stop.',
        whySpecial: 'Nice way to start the day before the long mountain leg.',
        orderSuggestion: 'Espresso-based drink.',
        viewOrVibe: 'Mae Sariang café start.',
        riderNote: 'Only use if you are still leaving early.'
      },
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Khun Yuam coffee stop',
          query: 'Khun Yuam coffee',
          note: 'Proper mid-route coffee/fuel/rest stop between Mae Sariang and Mae Hong Son.',
          whySpecial: 'Best practical break on the longest mountain day.',
          orderSuggestion: 'Iced coffee, water, simple snack.',
          viewOrVibe: 'Mountain-town reset point.',
          riderNote: 'Treat this as a real rest, not a quick sip.'
        },
        {
          role: 'arrival',
          name: 'Mae Hong Son lake-area café',
          query: 'Jong Kham Lake cafe Mae Hong Son',
          note: 'Arrival café near Jong Kham Lake.',
          whySpecial: 'Good landing point after Highway 108.',
          orderSuggestion: 'Iced coffee or cold drink.',
          viewOrVibe: 'Lake-area / Mae Hong Son town atmosphere.',
          riderNote: 'Perfect before the evening lake walk.'
        }
      ],
      places: [
        { id: 'd7-route', type: 'route', name: 'Mae Sariang to Mae Hong Son via Highway 108', query: 'Highway 108 Mae Sariang Mae Hong Son' },
        { id: 'd7-hotel', type: 'hotel', name: 'Northern Hill Guesthouse', query: 'Northern Hill Guesthouse Mae Hong Son' },
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
      food: {
        primary: {
          name: "Na's Kitchen",
          query: "Na's Kitchen Pai",
          whySpecial: 'Reliable Thai food in touristy Pai.',
          orderSuggestion: 'Thai curry, stir-fried basil, fried rice, noodle dishes.',
          viewOrVibe: 'Casual, popular Thai restaurant.',
          riderNote: 'Good safe dinner choice when Pai has too many distracting options.'
        },
        backups: [
          {
            name: 'Charlie & Lek',
            query: 'Charlie and Lek Pai',
            whySpecial: 'Good Thai food backup with a strong local reputation.',
            orderSuggestion: 'Thai stir-fries, curries, vegetable dishes.',
            viewOrVibe: 'Casual Pai restaurant.',
            riderNote: 'Good for the second Pai night if you eat Na’s Kitchen first.'
          },
          {
            name: 'Pai Walking Street food stalls',
            query: 'Pai Walking Street food',
            whySpecial: 'Cheap, flexible, easy after check-in.',
            orderSuggestion: 'Grilled skewers, noodles, roti, rice dishes.',
            viewOrVibe: 'Tourist night-market energy.',
            riderNote: 'Best if you want to graze rather than sit down.'
          }
        ]
      },
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Pang Mapha / Soppong coffee stop',
          query: 'Pang Mapha Soppong coffee shop',
          note: 'Good true mid-route stop on Route 1095.',
          whySpecial: 'Natural break in the middle of the Mae Hong Son to Pai curves.',
          orderSuggestion: 'Iced coffee and water.',
          viewOrVibe: 'Mountain-road traveler stop.',
          riderNote: 'Use this to reset before the Pai side of the ride.'
        },
        {
          role: 'arrival',
          name: 'Coffee in Love',
          query: 'Coffee in Love Pai',
          note: 'Arrival / Pai approach coffee with valley views.',
          whySpecial: 'Famous Pai-side coffee stop with open valley views.',
          orderSuggestion: 'Iced coffee or smoothie.',
          viewOrVibe: 'Scenic Pai valley / touristy but photogenic.',
          riderNote: 'Stop if parking and weather are easy; otherwise go straight to the hotel.'
        }
      ],
      places: [
        { id: 'd8-route', type: 'route', name: 'Mae Hong Son to Pai via Route 1095', query: 'Route 1095 Mae Hong Son Pai' },
        { id: 'd8-hotel', type: 'hotel', name: 'Yotaka@Pai', query: 'Yotaka at Pai' },
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
      food: {
        primary: {
          name: 'Charlie & Lek',
          query: 'Charlie and Lek Pai',
          whySpecial: 'Strong Thai-food option for your second Pai night.',
          orderSuggestion: 'Thai stir-fries, curry, vegetables, rice dishes.',
          viewOrVibe: 'Casual and reliable.',
          riderNote: 'Good after a relaxed day when you still want real food.'
        },
        backups: [
          {
            name: "Na's Kitchen",
            query: "Na's Kitchen Pai",
            whySpecial: 'Reliable Thai food if you did not go on Day 8.',
            orderSuggestion: 'Curry, fried rice, basil chicken, noodles.',
            viewOrVibe: 'Popular casual restaurant.',
            riderNote: 'Repeat only if it worked well the first night.'
          },
          {
            name: 'Pai Walking Street food stalls',
            query: 'Pai Walking Street food',
            whySpecial: 'Cheap and flexible.',
            orderSuggestion: 'Snacks, noodles, grilled items, roti.',
            viewOrVibe: 'Night-market wandering.',
            riderNote: 'Best if you want a low-commitment dinner.'
          }
        ]
      },
      dayCoffeeNote: 'Local cafés only. Keep this as the recovery day.',
      coffeeStops: [
        {
          role: 'local_day',
          name: 'The Pedlar',
          query: 'The Pedlar Pai',
          note: 'Morning café for the relaxed Pai day.',
          whySpecial: 'Good slow-start café for the only recovery day.',
          orderSuggestion: 'Proper coffee and breakfast if available.',
          viewOrVibe: 'Comfortable Pai café vibe.',
          riderNote: 'Do not rush this stop; today is the pressure valve.'
        },
        {
          role: 'local_day',
          name: 'Carrot on the Moon',
          query: 'Carrot on the Moon Pai',
          note: 'Second local café option. No real riding required.',
          whySpecial: 'Quirky Pai café option for a lazy second stop.',
          orderSuggestion: 'Coffee, cake, or cold drink.',
          viewOrVibe: 'Relaxed, playful café atmosphere.',
          riderNote: 'Use as an afternoon café before Pai Canyon or White Buddha.'
        }
      ],
      places: [
        { id: 'd9-route', type: 'route', name: 'Pai local day', query: 'Pai Thailand' },
        { id: 'd9-hotel', type: 'hotel', name: 'Yotaka@Pai', query: 'Yotaka at Pai' },
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
      food: {
        primary: {
          name: 'SP Chicken',
          query: 'SP Chicken Chiang Mai',
          whySpecial: 'Simple, satisfying Chiang Mai dinner after the Pai road.',
          orderSuggestion: 'Roast chicken, som tam, sticky rice.',
          viewOrVibe: 'Casual local institution.',
          riderNote: 'Perfect when you want protein and no fuss.'
        },
        backups: [
          {
            name: 'Huen Muan Jai',
            query: 'Huen Muan Jai Chiang Mai',
            whySpecial: 'Northern Thai classic if you want a richer dinner.',
            orderSuggestion: 'Khao soi, sai ua, northern curry, nam prik.',
            viewOrVibe: 'More of a proper sit-down northern meal.',
            riderNote: 'Go early if possible.'
          },
          {
            name: 'Santitham local food stalls',
            query: 'Santitham food stalls Chiang Mai',
            whySpecial: 'Cheap and close if staying near Santitham.',
            orderSuggestion: 'Rice plates, noodles, grilled pork, fruit shakes.',
            viewOrVibe: 'Local neighborhood food.',
            riderNote: 'Best if you want to park the bike and walk.'
          }
        ]
      },
      coffeeStops: [
        {
          role: 'departure',
          name: 'Coffee in Love',
          query: 'Coffee in Love Pai',
          note: 'Early departure coffee on the Pai side before Route 1095.',
          whySpecial: 'Scenic start before the curve-heavy ride.',
          orderSuggestion: 'Iced coffee and water.',
          viewOrVibe: 'Pai valley views.',
          riderNote: 'Do not linger too long; the road still needs fresh attention.'
        },
        {
          role: 'mid_route',
          name: 'Pankled Coffee',
          query: 'Pankled Coffee Mae Taeng',
          note: 'Useful later stop on the Mae Taeng / Chiang Mai side.',
          whySpecial: 'Good reset after much of the mountain section is done.',
          orderSuggestion: 'Iced espresso drink or cold water.',
          viewOrVibe: 'Roadside café on the Chiang Mai approach.',
          riderNote: 'Use this before the final push into Chiang Mai traffic.'
        }
      ],
      places: [
        { id: 'd10-route', type: 'route', name: 'Pai to Chiang Mai via Route 1095', query: 'Route 1095 Pai Chiang Mai' },
        { id: 'd10-hotel', type: 'hotel', name: 'B2 Budget Hotel Chiang Mai', query: 'B2 Budget Hotel Chiang Mai' },
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
      food: {
        primary: {
          name: 'Bankhiangnam Restaurant',
          query: 'Bankhiangnam Restaurant Tak',
          whySpecial: 'Good Thai dinner target in Tak.',
          orderSuggestion: 'Thai dishes, fish or river-style dishes if available.',
          viewOrVibe: 'Riverside / local restaurant feel.',
          riderNote: 'Good way to turn a transit overnight into a proper stop.'
        },
        backups: [
          {
            name: 'Aiyara Wadi Restaurant',
            query: 'Aiyara Wadi Restaurant Tak',
            whySpecial: 'Useful Thai restaurant backup.',
            orderSuggestion: 'Rice dishes, stir-fries, soups.',
            viewOrVibe: 'Local sit-down restaurant.',
            riderNote: 'Use if Bankhiangnam is closed or inconvenient.'
          },
          {
            name: 'Chit Chon',
            query: 'Chit Chon Tak restaurant',
            whySpecial: 'Local option for an uncomplicated dinner.',
            orderSuggestion: 'Thai rice plates or noodle dishes.',
            viewOrVibe: 'Practical local food.',
            riderNote: 'Backup for tired-night simplicity.'
          }
        ]
      },
      dayCoffeeNote:
        'Long return day: keep stops practical and do not detour for café hunting.',
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Lampang / Mae Tha corridor coffee',
          query: 'Mae Tha Lampang coffee shop',
          note: 'First useful stop after leaving Chiang Mai.',
          whySpecial: 'Practical break before the ride settles into the southbound run.',
          orderSuggestion: 'Iced coffee and water.',
          viewOrVibe: 'Roadside northern corridor café.',
          riderNote: 'Choose based on easy parking and shade.'
        },
        {
          role: 'arrival',
          name: 'Tak approach café / Tieng Na Coffee if convenient',
          query: 'Tieng Na Coffee Tak',
          note: 'Use only if convenient to the route.',
          whySpecial: 'Good arrival/late-route stop if it does not require a detour.',
          orderSuggestion: 'Iced coffee, bakery snack, cold drink.',
          viewOrVibe: 'Café/farm-style stop depending on exact location.',
          riderNote: 'Do not hunt for it if tired; any safe Tak café works.'
        }
      ],
      places: [
        { id: 'd11-route', type: 'route', name: 'Chiang Mai to Tak route', query: 'Chiang Mai to Tak driving route' },
        { id: 'd11-hotel', type: 'hotel', name: 'Viangtak Riverside Hotel', query: 'Viangtak Riverside Hotel Tak' },
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
      food: {
        primary: {
          name: 'Bueng Boraphet / riverside fish restaurant area',
          query: 'Bueng Boraphet fish restaurant Nakhon Sawan',
          whySpecial: 'Good regional fit for a Nakhon Sawan dinner.',
          orderSuggestion: 'Fish dishes, tom yum pla, stir-fried fish, rice.',
          viewOrVibe: 'Lake/river food atmosphere depending on exact restaurant.',
          riderNote: 'Best if weather is clear and you have energy.'
        },
        backups: [
          {
            name: 'Nakhon Sawan riverside restaurants',
            query: 'Nakhon Sawan riverside restaurant',
            whySpecial: 'Easy Thai dinner zone near the river.',
            orderSuggestion: 'Thai shared dishes or rice plates.',
            viewOrVibe: 'River/city evening feel.',
            riderNote: 'Good if you want to stay central.'
          },
          {
            name: 'Big C / Central food court',
            query: 'Central Nakhon Sawan food court',
            whySpecial: 'Not romantic, but reliable in rain or fatigue.',
            orderSuggestion: 'Any Thai rice plate, noodles, or soup.',
            viewOrVibe: 'Air-conditioned practical fallback.',
            riderNote: 'Use if you are tired, wet, or done making decisions.'
          }
        ]
      },
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Kamphaeng Phet café stop',
          query: 'Kamphaeng Phet cafe',
          note: 'Natural mid-route stop on the way south.',
          whySpecial: 'Breaks the shorter return leg nicely.',
          orderSuggestion: 'Iced coffee or Thai tea.',
          viewOrVibe: 'Town café / historical town pause.',
          riderNote: 'Good place to stretch before the final run to Nakhon Sawan.'
        },
        {
          role: 'arrival',
          name: 'Nakhon Sawan arrival café',
          query: 'Nakhon Sawan cafe',
          note: 'Arrival café after the shorter return leg.',
          whySpecial: 'Lets you cool down before hotel check-in or dinner.',
          orderSuggestion: 'Iced drink and snack.',
          viewOrVibe: 'City café, choose parking first.',
          riderNote: 'Do not cross town for a famous café; pick a convenient one.'
        }
      ],
      places: [
        { id: 'd12-route', type: 'route', name: 'Tak to Nakhon Sawan route', query: 'Tak to Nakhon Sawan driving route' },
        { id: 'd12-hotel', type: 'hotel', name: 'B2 Nakhon Sawan Boutique & Budget Hotel', query: 'B2 Nakhon Sawan Boutique and Budget Hotel' },
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
      food: {
        primary: {
          name: 'Chainat local noodle / khao man gai shop',
          query: 'Chainat khao man gai noodle shop',
          whySpecial: 'Cheap final road meal before Bangkok.',
          orderSuggestion: 'Noodles or khao man gai.',
          viewOrVibe: 'Local quick-food stop.',
          riderNote: 'Eat light so the Bangkok approach does not feel heavy.'
        },
        backups: [
          {
            name: 'Suphan Buri local Thai restaurant',
            query: 'Suphan Buri Thai restaurant',
            whySpecial: 'Good backup before entering Bangkok.',
            orderSuggestion: 'Rice plate, noodle soup, stir-fry.',
            viewOrVibe: 'Local practical stop.',
            riderNote: 'Choose based on parking and easy exit.'
          },
          {
            name: 'Home / Sukhumvit Thai food',
            query: 'Sukhumvit Thai food',
            whySpecial: 'Trip is done; no need for ceremony unless wanted.',
            orderSuggestion: 'Whatever is close and comforting.',
            viewOrVibe: 'Home stretch.',
            riderNote: 'Shower first if you are cooked.'
          }
        ]
      },
      dayCoffeeNote:
        'Final day: use these as practical breaks before Bangkok traffic, not sightseeing stops.',
      coffeeStops: [
        {
          role: 'mid_route',
          name: 'Chainat café stop',
          query: 'Chainat cafe',
          note: 'First proper stop heading south.',
          whySpecial: 'Useful final-day break before the Bangkok approach builds.',
          orderSuggestion: 'Iced coffee, water, small snack.',
          viewOrVibe: 'Small-town stop.',
          riderNote: 'Good first reset on the final ride home.'
        },
        {
          role: 'mid_route',
          name: 'Suphan Buri café stop',
          query: 'Suphan Buri cafe',
          note: 'Second stop before final Bangkok approach.',
          whySpecial: 'Last calm pause before Bangkok traffic.',
          orderSuggestion: 'Iced coffee or soft drink.',
          viewOrVibe: 'Countryside / city-edge café depending on choice.',
          riderNote: 'This is the final sanity stop before the city goblin gate.'
        }
      ],
      places: [
        { id: 'd13-route', type: 'route', name: 'Nakhon Sawan to Bangkok route', query: 'Nakhon Sawan to Bangkok driving route' },
        { id: 'd13-view', type: 'viewpoint', name: 'Bangkok / Chao Phraya finish', query: 'Bangkok Chao Phraya skyline' }
      ]
    }
  ],
};

export function getDayMap(dayNumber: number): DayMap {
  return dayMapsByNumber[dayNumber];
}

function enrichDay(day: TripDay): TripDayEnriched {
  // Lazy require avoids circular module init issues in dev.
  const { mergeDayExtras } = require("./dayExtras") as typeof import("./dayExtras");
  return mergeDayExtras(day);
}

export function getDayByNumber(dayNumber: number): TripDayEnriched | undefined {
  const day = trip.days.find((d) => d.day === dayNumber);
  return day ? enrichDay(day) : undefined;
}

export function getTripDays(): TripDayEnriched[] {
  return trip.days.map(enrichDay);
}
