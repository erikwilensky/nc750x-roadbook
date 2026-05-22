import type {
  DayDifficulty,
  DayWeather,
  DoNotDetour,
  FuelStrategy,
  TripDay,
  TripDayEnriched,
} from "./trip";

export type DayExtras = {
  difficulty: DayDifficulty;
  weather: DayWeather;
  fuelStrategy: FuelStrategy;
  doNotDetour: DoNotDetour;
};

const flatWeather = (summary: string, start: string, mid: string, dest: string): DayWeather => ({
  summary,
  checkpoints: [
    { label: "Start", name: start, query: `${start} weather`, note: "Check morning conditions before departure." },
    { label: "Mid-route", name: mid, query: `${mid} weather`, note: "Useful mid-ride weather check." },
    { label: "Destination", name: dest, query: `${dest} weather`, note: "Check before arrival and check-in." },
  ],
});

export const dayExtrasByNumber: Record<number, DayExtras> = {
  1: {
    difficulty: {
      rating: 2,
      label: "Easy transit / Bangkok escape",
      summary: "Moderate first day mainly because of Bangkok departure, not road difficulty.",
      factors: ["Bangkok exit traffic", "Flat roads", "First-day setup", "Heat"],
    },
    weather: flatWeather(
      "Check heat, rain, and afternoon storms. Leave early to avoid traffic and heat.",
      "Bangkok",
      "Suphan Buri",
      "Uthai Thani"
    ),
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 7.3,
      estimatedCost: 293,
      rangeConcern: "low",
      plan: "Start with a full tank from Bangkok. No range issue. Use this as an easy first-day fuel rhythm.",
      suggestedFuelStops: [
        { name: "Suphan Buri / Chainat corridor", query: "PTT Suphan Buri gas station", note: "Optional corridor stop." },
        { name: "Uthai Thani arrival", query: "PTT Uthai Thani gas station", note: "Top up on arrival if needed." },
      ],
      caution: "Do not delay departure just to fuel later. Start full and keep the first morning simple.",
    },
    doNotDetour: {
      severity: "low",
      title: "Do not overbuild the first day",
      message: "The goal is to escape Bangkok cleanly and arrive fresh. Do not add sightseeing before Uthai Thani.",
      exceptions: "Only add a short river walk after check-in.",
    },
  },
  2: {
    difficulty: {
      rating: 2,
      label: "Easy cultural transit",
      summary: "Comfortable northbound ride with a useful Kamphaeng Phet break.",
      factors: ["Mostly manageable roads", "Cultural stop temptation", "Arrival into Sukhothai"],
    },
    weather: flatWeather(
      "Check heat, rain, and afternoon storms. Leave early to avoid traffic and heat.",
      "Uthai Thani",
      "Kamphaeng Phet",
      "Sukhothai"
    ),
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 7.5,
      estimatedCost: 300,
      rangeConcern: "low",
      plan: "Start full from Uthai Thani. Refuel if convenient near Kamphaeng Phet or on arrival in Sukhothai.",
      suggestedFuelStops: [
        { name: "Kamphaeng Phet", query: "PTT Kamphaeng Phet gas station", note: "Convenient mid-route stop." },
        { name: "Sukhothai arrival", query: "PTT Sukhothai gas station", note: "Arrive with fuel for tomorrow." },
      ],
      caution: "No range concern, but arrive with enough fuel for the next morning.",
    },
    doNotDetour: {
      severity: "medium",
      title: "Do not turn Kamphaeng Phet into a full sightseeing day",
      message: "Kamphaeng Phet is a useful pause, not the main destination today. Keep moving toward Sukhothai.",
      exceptions: "A short stop is fine if weather and timing are good.",
    },
  },
  3: {
    difficulty: {
      rating: 2,
      label: "Easy northern transition",
      summary: "Smooth transition toward the north with no major technical riding.",
      factors: ["Moderate distance", "Town navigation", "Northern approach"],
    },
    weather: flatWeather(
      "Check heat, rain, and afternoon storms. Leave early to avoid traffic and heat.",
      "Sukhothai",
      "Uttaradit",
      "Lampang"
    ),
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 6.6,
      estimatedCost: 264,
      rangeConcern: "low",
      plan: "Start full from Sukhothai. Check fuel around Uttaradit if stopping for coffee. Refill on arrival in Lampang if needed.",
      suggestedFuelStops: [
        { name: "Uttaradit", query: "PTT Uttaradit gas station", note: "Coffee + fuel check stop." },
        { name: "Lampang arrival", query: "PTT Lampang gas station", note: "Arrival top-up." },
      ],
      caution: "This is still a normal transit day. Keep it simple.",
    },
    doNotDetour: {
      severity: "low",
      title: "Do not chase extra temples before Lampang",
      message: "This is a transition day. Save energy for the northern and mountain sections.",
      exceptions: "Lampang riverside after check-in is fine.",
    },
  },
  4: {
    difficulty: {
      rating: 1,
      label: "Short positioning ride",
      summary: "Very short ride designed to arrive fresh in Chiang Mai.",
      factors: ["Short distance", "Easy arrival", "Use afternoon for bike/admin tasks"],
    },
    weather: flatWeather(
      "Check heat, rain, and afternoon storms. Leave early to avoid traffic and heat.",
      "Lampang",
      "Chiang Mai outskirts",
      "Chiang Mai"
    ),
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 3.3,
      estimatedCost: 133,
      rangeConcern: "low",
      plan: "Short ride. Start with enough fuel from Lampang and fill in Chiang Mai before the mountain section.",
      suggestedFuelStops: [
        { name: "Chiang Mai arrival", query: "PTT Chiang Mai gas station", note: "Prepare for mountain days." },
        { name: "Chom Thong next morning", query: "PTT Chom Thong gas station", note: "Optional before Day 5." },
      ],
      caution: "The important fuel task is not this day. The important task is preparing for Day 5.",
    },
    doNotDetour: {
      severity: "low",
      title: "Do not waste the short Chiang Mai positioning day",
      message: "This day is for arriving fresh, bike checks, laundry, fuel, and early sleep.",
      exceptions: "Simple dinner or a short old-city walk only.",
    },
  },
  5: {
    difficulty: {
      rating: 4,
      label: "Mountain scenic",
      summary: "First real mountain day with Doi Inthanon climb/descent and rainy-season caution.",
      factors: ["Mountain climb", "Descent into Mae Chaem", "Fog/rain possible", "Slow technical corners"],
    },
    weather: {
      summary: "Check rain and fog before leaving. Avoid late-afternoon mountain riding.",
      checkpoints: [
        { label: "Start", name: "Chiang Mai", query: "Chiang Mai weather", note: "Check morning rain before departure." },
        { label: "Mid-route", name: "Doi Inthanon", query: "Doi Inthanon weather", note: "Mountain fog and rain risk." },
        { label: "Destination", name: "Mae Chaem", query: "Mae Chaem weather", note: "Avoid arriving late in storms." },
      ],
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 4.7,
      estimatedCost: 187,
      rangeConcern: "medium",
      plan: "Start full from Chiang Mai. Top up near Chom Thong if convenient before climbing toward Doi Inthanon and Mae Chaem.",
      suggestedFuelStops: [
        { name: "Chiang Mai", query: "PTT Chiang Mai gas station", note: "Start full." },
        { name: "Chom Thong", query: "PTT Chom Thong gas station", note: "Last practical stop before climb." },
      ],
      caution: "Mountain riding uses more attention and may use more fuel than flat riding. Do not start the climb low.",
    },
    doNotDetour: {
      severity: "medium",
      title: "Do not make Doi Inthanon a full sightseeing festival",
      message: "The goal is to cross through Doi Inthanon and reach Mae Chaem early. Too many stops will push you into afternoon mountain weather.",
      exceptions: "Summit / pagodas are fine if weather and timing are good.",
    },
  },
  6: {
    difficulty: {
      rating: 4,
      label: "Rural mountain/back-road",
      summary: "Shorter distance but more remote and slower, with rural road uncertainty.",
      factors: ["Rural roads", "Limited services", "Mountain terrain", "Rain/gravel possible"],
    },
    weather: {
      summary: "Check rain and fog before leaving. Avoid late-afternoon mountain riding.",
      checkpoints: [
        { label: "Start", name: "Mae Chaem", query: "Mae Chaem weather", note: "Check morning conditions." },
        { label: "Mid-route", name: "Rural mountain corridor", query: "Mae Chaem Mae Sariang weather", note: "Remote section weather check." },
        { label: "Destination", name: "Mae Sariang", query: "Mae Sariang weather", note: "Arrive before afternoon storms." },
      ],
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 4.3,
      estimatedCost: 173,
      rangeConcern: "medium",
      plan: "Start full or near full from Mae Chaem. Treat rural stops as uncertain. Refuel in Mae Sariang on arrival.",
      suggestedFuelStops: [
        { name: "Mae Chaem before departure", query: "Mae Chaem gas station", note: "Do not leave low." },
        { name: "Mae Sariang arrival", query: "PTT Mae Sariang gas station", note: "Main refuel for Day 7." },
      ],
      caution: "This is a rural mountain/back-road day. Do not rely on random small stations being open.",
    },
    doNotDetour: {
      severity: "medium",
      title: "Do not chase unnamed rural viewpoints",
      message: "This is a quiet road day with limited services. Stop when the road naturally offers a view, but do not hunt detours.",
      exceptions: "Safe roadside pullouts only.",
    },
  },
  7: {
    difficulty: {
      rating: 4,
      label: "Long mountain day",
      summary: "Longest mountain leg with Highway 108 curves and a needed Khun Yuam reset.",
      factors: ["160 km mountain day", "Curves", "Weather risk", "Fatigue management"],
    },
    weather: {
      summary: "Check rain and fog before leaving. Avoid late-afternoon mountain riding.",
      checkpoints: [
        { label: "Start", name: "Mae Sariang", query: "Mae Sariang weather", note: "Check morning rain before departure." },
        { label: "Mid-route", name: "Khun Yuam", query: "Khun Yuam weather", note: "Useful for mountain weather before the second half." },
        { label: "Destination", name: "Mae Hong Son", query: "Mae Hong Son weather", note: "Avoid arriving late if storms build." },
      ],
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 5.3,
      estimatedCost: 213,
      rangeConcern: "medium",
      plan: "Start full from Mae Sariang. Use Khun Yuam as the main fuel/check/rest stop. Arrive Mae Hong Son with margin.",
      suggestedFuelStops: [
        { name: "Mae Sariang before departure", query: "PTT Mae Sariang gas station", note: "Start full." },
        { name: "Khun Yuam", query: "PTT Khun Yuam gas station", note: "Best mid-route fuel/check stop." },
        { name: "Mae Hong Son arrival", query: "PTT Mae Hong Son gas station", note: "Arrive with margin." },
      ],
      caution: "Longest mountain day. Fuel is not scary on an NC750X, but fatigue and rain are. Use the fuel stop as a real rest.",
    },
    doNotDetour: {
      severity: "high",
      title: "Do not add Ban Rak Thai or Pang Oung",
      message: "This version has only one Mae Hong Son night. Ban Rak Thai and Pang Oung require an extra Mae Hong Son day.",
      exceptions: "Only consider them if the itinerary is changed to add another Mae Hong Son night.",
    },
  },
  8: {
    difficulty: {
      rating: 5,
      label: "Route 1095 attention day",
      summary: "Short but highly attention-heavy due to curves, vans, scooters, and blind corners.",
      factors: ["Route 1095", "Blind corners", "Tourist traffic", "Wet-road risk", "High concentration required"],
    },
    weather: {
      summary: "Check rain and fog before leaving. Avoid late-afternoon mountain riding.",
      checkpoints: [
        { label: "Start", name: "Mae Hong Son", query: "Mae Hong Son weather", note: "Check before Route 1095." },
        { label: "Mid-route", name: "Pang Mapha / Soppong", query: "Pang Mapha weather", note: "Mountain weather on 1095." },
        { label: "Destination", name: "Pai", query: "Pai weather", note: "Check afternoon rain before arrival." },
      ],
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 3.8,
      estimatedCost: 153,
      rangeConcern: "medium",
      plan: "Start full from Mae Hong Son. Do not leave low for Route 1095. Fuel again in Pai if needed.",
      suggestedFuelStops: [
        { name: "Mae Hong Son before departure", query: "PTT Mae Hong Son gas station", note: "Start full." },
        { name: "Pang Mapha / Soppong", query: "PTT Pang Mapha gas station", note: "Optional mid-route." },
        { name: "Pai arrival", query: "PTT Pai gas station", note: "Arrival top-up." },
      ],
      caution: "Short distance but twisty. Fuel is less important than concentration, but start full anyway.",
    },
    doNotDetour: {
      severity: "high",
      title: "Do not add Tham Lod Cave on this version",
      message: "Mae Hong Son to Pai is short but attention-heavy. Tham Lod Cave turns the day into a side-trip day and increases fatigue.",
      exceptions: "Only consider it if you leave very early, weather is clear, and you deliberately accept a longer day.",
    },
  },
  9: {
    difficulty: {
      rating: 1,
      label: "Recovery / local day",
      summary: "Local Pai day only. Keep it easy and avoid turning it into a riding day.",
      factors: ["Local cafés", "Optional viewpoints", "Recovery day"],
    },
    weather: {
      summary: "Check afternoon rain before local viewpoints. Keep the day flexible.",
      checkpoints: [
        { label: "Start", name: "Pai", query: "Pai weather", note: "Morning check." },
        { label: "Mid-route", name: "Pai Canyon area", query: "Pai Canyon weather", note: "Afternoon rain risk for viewpoints." },
        { label: "Destination", name: "Pai", query: "Pai weather tonight", note: "Evening flexibility." },
      ],
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 1.3,
      estimatedCost: 53,
      rangeConcern: "low",
      plan: "Minimal riding. Use this day to top up fuel before the Pai to Chiang Mai ride if convenient.",
      suggestedFuelStops: [
        { name: "Pai town", query: "PTT Pai gas station", note: "Optional top-up for Day 10." },
      ],
      caution: "Do not turn the recovery day into a riding day.",
    },
    doNotDetour: {
      severity: "medium",
      title: "Do not turn Pai recovery day into a riding day",
      message: "This is the only full rest/local day. Keep it local: cafés, massage, Pai Canyon or White Buddha.",
      exceptions: "Very short local ride only.",
    },
  },
  10: {
    difficulty: {
      rating: 5,
      label: "Route 1095 return",
      summary: "Short distance but heavy attention due to Pai to Chiang Mai curves and traffic.",
      factors: ["Route 1095", "Vans and scooters", "Blind curves", "Chiang Mai arrival traffic"],
    },
    weather: {
      summary: "Check rain and fog before leaving. Avoid late-afternoon mountain riding.",
      checkpoints: [
        { label: "Start", name: "Pai", query: "Pai weather", note: "Leave early — check rain." },
        { label: "Mid-route", name: "Mae Taeng", query: "Mae Taeng weather", note: "Descent weather check." },
        { label: "Destination", name: "Chiang Mai", query: "Chiang Mai weather", note: "Arrival traffic and heat." },
      ],
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 4.5,
      estimatedCost: 180,
      rangeConcern: "medium",
      plan: "Start full from Pai. Use Mae Taeng side fuel if needed. Arrive Chiang Mai ready for the return south.",
      suggestedFuelStops: [
        { name: "Pai before departure", query: "PTT Pai gas station", note: "Start full." },
        { name: "Mae Taeng", query: "PTT Mae Taeng gas station", note: "Mid-route option." },
        { name: "Chiang Mai arrival", query: "PTT Chiang Mai gas station", note: "Arrival margin." },
      ],
      caution: "Route 1095 is attention-heavy. Do not combine low fuel, wet roads, and traffic.",
    },
    doNotDetour: {
      severity: "high",
      title: "Do not start late from Pai",
      message: "Pai to Chiang Mai is short but busy and twisty. Late starts increase traffic, heat, and afternoon rain risk.",
      exceptions: "None. Start early.",
    },
  },
  11: {
    difficulty: {
      rating: 3,
      label: "Long return transit",
      summary: "Longest return day, but more flowing than the mountain core.",
      factors: ["270 km distance", "Southbound highway", "Fatigue after mountain section", "Heat"],
    },
    weather: flatWeather(
      "Check heat, rain, and afternoon storms. Leave early to avoid traffic and heat.",
      "Chiang Mai",
      "Lampang",
      "Tak"
    ),
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 9.0,
      estimatedCost: 360,
      rangeConcern: "low",
      plan: "Start full from Chiang Mai. Top up around Lampang / Thoen corridor if convenient. Arrive Tak with margin.",
      suggestedFuelStops: [
        { name: "Chiang Mai before departure", query: "PTT Chiang Mai gas station", note: "Start full." },
        { name: "Lampang / Thoen corridor", query: "PTT Lampang gas station", note: "Hydration + fuel stop." },
        { name: "Tak arrival", query: "PTT Tak gas station", note: "Arrive with margin." },
      ],
      caution: "This is the longest return day. Use fuel stops as hydration and stretch stops.",
    },
    doNotDetour: {
      severity: "medium",
      title: "Do not add scenic detours on the southbound run",
      message: "This is the longest return transit day. Keep it efficient and use stops for hydration and rest.",
      exceptions: "Coffee/fuel stops only.",
    },
  },
  12: {
    difficulty: {
      rating: 2,
      label: "Easy return transit",
      summary: "Shorter return day designed to decompress.",
      factors: ["Moderate distance", "Easier roads", "Useful recovery rhythm"],
    },
    weather: flatWeather(
      "Check heat, rain, and afternoon storms. Leave early to avoid traffic and heat.",
      "Tak",
      "Kamphaeng Phet",
      "Nakhon Sawan"
    ),
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 6.2,
      estimatedCost: 247,
      rangeConcern: "low",
      plan: "Start full from Tak. Stop around Kamphaeng Phet if needed. Refill in Nakhon Sawan for the final day.",
      suggestedFuelStops: [
        { name: "Tak", query: "PTT Tak gas station", note: "Morning check." },
        { name: "Kamphaeng Phet", query: "PTT Kamphaeng Phet gas station", note: "Mid-route pause." },
        { name: "Nakhon Sawan arrival", query: "PTT Nakhon Sawan gas station", note: "Fuel for final day." },
      ],
      caution: "Easy fuel day. Use the stop more for rest than range.",
    },
    doNotDetour: {
      severity: "low",
      title: "Do not overthink the easy day",
      message: "This is a recovery transit day. Keep it simple and arrive with energy.",
      exceptions: "Short Kamphaeng Phet café pause is fine.",
    },
  },
  13: {
    difficulty: {
      rating: 3,
      label: "Final return / Bangkok entry",
      summary: "Road distance is manageable, but Bangkok entry makes the day more tiring.",
      factors: ["Final-day fatigue", "Bangkok traffic", "Heat", "Urban concentration"],
    },
    weather: {
      summary: "Check rain near Bangkok and leave early to avoid afternoon traffic buildup.",
      checkpoints: [
        { label: "Start", name: "Nakhon Sawan", query: "Nakhon Sawan weather", note: "Leave early." },
        { label: "Mid-route", name: "Chainat", query: "Chainat weather", note: "Final countryside check." },
        { label: "Destination", name: "Bangkok", query: "Bangkok weather", note: "Heat and storms near the city." },
      ],
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 8.2,
      estimatedCost: 327,
      rangeConcern: "low",
      plan: "Start full from Nakhon Sawan. Use Chainat or Suphan Buri as a practical final stop before Bangkok.",
      suggestedFuelStops: [
        { name: "Nakhon Sawan", query: "PTT Nakhon Sawan gas station", note: "Start full." },
        { name: "Chainat", query: "PTT Chainat gas station", note: "Practical final stop." },
        { name: "Suphan Buri", query: "PTT Suphan Buri gas station", note: "Before Bangkok traffic." },
      ],
      caution: "Bangkok entry is the issue, not range. Do not arrive tired, dehydrated, and low on patience.",
    },
    doNotDetour: {
      severity: "medium",
      title: "Do not arrive in Bangkok tired and late",
      message: "Bangkok entry is the final boss. Leave early, stop before the city, hydrate, and keep the final approach calm.",
      exceptions: "None. Finish clean.",
    },
  },
};

export function mergeDayExtras(day: TripDay): TripDayEnriched {
  const extras = dayExtrasByNumber[day.day];
  if (!extras) {
    throw new Error(`Missing day extras for day ${day.day}`);
  }
  return { ...day, ...extras };
}
