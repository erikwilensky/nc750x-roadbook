# NC750X Roadbook App Upgrade: Today Mode, Weather, Fuel Strategy, Difficulty, and Do-Not-Detour Notes

## Purpose

Upgrade the NC750X Roadbook app from a static trip planner into a more useful motorcycle roadbook companion.

This upgrade adds five high-value features:

1. Today Mode
2. Weather links per day
3. Fuel strategy per day
4. Road difficulty rating
5. Do-not-detour notes

These features should make the app more useful on the actual ride without turning it into a full navigation app.

## Important Scope Rules

Do not build full turn-by-turn navigation.

Do not build voice guidance.

Do not build rerouting.

Do not scrape Google Maps.

Do not add fake photos.

Do not add login/accounts.

Do not require a backend for this upgrade.

Keep the app static-data driven and deployable to Vercel / GitHub Pages.

Use localStorage only for simple app state such as selected day, completed status, checklist state, or visited stops.

---

# 1. Feature: Today Mode

## Goal

Add a mobile-friendly “Today Mode” screen that shows the most useful information for the current riding day.

This should be the screen I would open at a fuel stop or in the morning before leaving.

## Today Mode Should Show

- Current selected day
- Date
- Route
- Distance
- Ride difficulty
- Start / destination
- Next planned stop
- Coffee strategy
- Fuel strategy
- Weather links
- Do-not-detour warning
- Daily budget
- Buttons:
  - Open day route in Google Maps
  - Open next stop in Google Maps
  - Mark day completed
  - Show full day details

## Today Mode UI Requirements

On mobile, Today Mode should be extremely readable.

Use:

- large route title
- big buttons
- short cards
- no tiny links
- no horizontal scrolling
- sticky top section with selected day
- bottom navigation should include “Today”

Recommended mobile layout:

```text
TODAY
Day 7 • Sat 27 Jun

Mae Sariang → Mae Hong Son
160 km • Difficulty 4/5

Next stop:
Khun Yuam coffee stop

[Open Next Stop]
[Open Day Route]

Fuel:
Start full from Mae Sariang.
Check/refuel at Khun Yuam.

Weather:
[Mae Sariang] [Khun Yuam] [Mae Hong Son]

Do not add:
Do not add Ban Rak Thai or Pang Oung.
This version has only one Mae Hong Son night.

Daily budget:
฿973
Today Mode Logic

Create a helper function:

function getTodayTripDay(days, currentDate = new Date()) {
  // Match by trip date if current date falls within the trip.
  // If outside trip dates, return:
  // - first incomplete day if any
  // - otherwise Day 1
}

Trip dates are in 2026. If the real current date is outside the trip period, Today Mode should still work by showing the selected day or the first incomplete day.

Add localStorage keys:

roadbook_selected_day
roadbook_completed_days

Functions:

getSelectedDay()
setSelectedDay(dayNumber)
markDayCompleted(dayNumber)
unmarkDayCompleted(dayNumber)
getFirstIncompleteDay()
Components to Create
src/components/TodayMode.jsx
src/components/TodayHeroCard.jsx
src/components/NextStopMiniCard.jsx
src/utils/today.js

If existing structure differs, adapt cleanly.

2. Feature: Weather Links Per Day
Goal

Add weather information links for each day’s start, mid-route, and destination locations.

Do not build a weather API yet. Start with reliable external weather links.

Weather Data Structure

Add to each day:

weather: {
  summary: "Rainy-season riding: leave early and avoid late-afternoon mountain weather.",
  checkpoints: [
    {
      label: "Start",
      name: "Mae Sariang",
      query: "Mae Sariang weather",
      note: "Check morning rain before departure."
    },
    {
      label: "Mid-route",
      name: "Khun Yuam",
      query: "Khun Yuam weather",
      note: "Useful for mountain weather before the second half."
    },
    {
      label: "Destination",
      name: "Mae Hong Son",
      query: "Mae Hong Son weather",
      note: "Avoid arriving late if storms build."
    }
  ]
}
Weather Link Helper

Create:

function makeWeatherSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

Each weather checkpoint should have a button:

Check weather

This opens a Google weather search.

Weather UI

Create component:

src/components/WeatherPanel.jsx

Show:

weather summary
checkpoint buttons
caution note

Mobile style:

Weather check
Rainy-season riding: leave early.

[Start: Mae Sariang]
[Mid-route: Khun Yuam]
[Destination: Mae Hong Son]
General Weather Notes by Day Type

Use these patterns:

Flat transit days
Check heat, rain, and afternoon storms. Leave early to avoid traffic and heat.
Mountain days
Check rain and fog before leaving. Avoid late-afternoon mountain riding.
Pai local day
Check afternoon rain before local viewpoints. Keep the day flexible.
Final Bangkok return
Check rain near Bangkok and leave early to avoid afternoon traffic buildup.
3. Feature: Fuel Strategy Per Day
Goal

Add a practical fuel strategy card per day.

This is not only about fuel cost. It should tell me where to start full, when to refuel, and which days require extra caution.

Fuel Data Structure

Add to each day:

fuelStrategy: {
  startFull: true,
  estimatedLiters: 5.3,
  estimatedCost: 213,
  rangeConcern: "low" | "medium" | "high",
  plan: "Start full from Mae Sariang. Check/refuel at Khun Yuam. Arrive Mae Hong Son with margin.",
  suggestedFuelStops: [
    {
      name: "Khun Yuam",
      query: "PTT Khun Yuam gas station",
      note: "Best mid-route fuel/check stop."
    }
  ],
  caution: "Do not leave Mae Sariang low on fuel. Mountain fuel stops are less convenient than plains towns."
}
Fuel Strategy UI

Create component:

src/components/FuelStrategyCard.jsx

Show:

estimated liters
estimated cost
range concern badge
plan
suggested fuel stops
caution

Badge colors:

low = green
medium = gold
high = red/orange
General Fuel Rule

Add a global note somewhere in dashboard or settings:

Fuel rule: fill every morning before leaving town, especially before mountain legs.
Fuel Strategy Content for Each Day

Use the data below.

Day 1 Fuel Strategy

Route: Bangkok → Uthai Thani
Estimated liters: 7.3
Estimated cost: ฿293
Range concern: low

Plan:
Start with a full tank from Bangkok. No range issue. Use this as an easy first-day fuel rhythm.

Suggested fuel stops:

Suphan Buri / Chainat corridor
Uthai Thani arrival

Caution:
Do not delay departure just to fuel later. Start full and keep the first morning simple.

Day 2 Fuel Strategy

Route: Uthai Thani → Sukhothai
Estimated liters: 7.5
Estimated cost: ฿300
Range concern: low

Plan:
Start full from Uthai Thani. Refuel if convenient near Kamphaeng Phet or on arrival in Sukhothai.

Suggested fuel stops:

Kamphaeng Phet
Sukhothai arrival

Caution:
No range concern, but arrive with enough fuel for the next morning.

Day 3 Fuel Strategy

Route: Sukhothai → Lampang
Estimated liters: 6.6
Estimated cost: ฿264
Range concern: low

Plan:
Start full from Sukhothai. Check fuel around Uttaradit if stopping for coffee. Refill on arrival in Lampang if needed.

Suggested fuel stops:

Uttaradit
Lampang arrival

Caution:
This is still a normal transit day. Keep it simple.

Day 4 Fuel Strategy

Route: Lampang → Chiang Mai
Estimated liters: 3.3
Estimated cost: ฿133
Range concern: low

Plan:
Short ride. Start with enough fuel from Lampang and fill in Chiang Mai before the mountain section.

Suggested fuel stops:

Chiang Mai arrival
Chom Thong next morning if needed

Caution:
The important fuel task is not this day. The important task is preparing for Day 5.

Day 5 Fuel Strategy

Route: Chiang Mai → Doi Inthanon → Mae Chaem
Estimated liters: 4.7
Estimated cost: ฿187
Range concern: medium

Plan:
Start full from Chiang Mai. Top up near Chom Thong if convenient before climbing toward Doi Inthanon and Mae Chaem.

Suggested fuel stops:

Chiang Mai
Chom Thong

Caution:
Mountain riding uses more attention and may use more fuel than flat riding. Do not start the climb low.

Day 6 Fuel Strategy

Route: Mae Chaem → Mae Sariang
Estimated liters: 4.3
Estimated cost: ฿173
Range concern: medium

Plan:
Start full or near full from Mae Chaem. Treat rural stops as uncertain. Refuel in Mae Sariang on arrival.

Suggested fuel stops:

Mae Chaem before departure
Mae Sariang arrival

Caution:
This is a rural mountain/back-road day. Do not rely on random small stations being open.

Day 7 Fuel Strategy

Route: Mae Sariang → Mae Hong Son
Estimated liters: 5.3
Estimated cost: ฿213
Range concern: medium

Plan:
Start full from Mae Sariang. Use Khun Yuam as the main fuel/check/rest stop. Arrive Mae Hong Son with margin.

Suggested fuel stops:

Mae Sariang before departure
Khun Yuam
Mae Hong Son arrival

Caution:
Longest mountain day. Fuel is not scary on an NC750X, but fatigue and rain are. Use the fuel stop as a real rest.

Day 8 Fuel Strategy

Route: Mae Hong Son → Pai
Estimated liters: 3.8
Estimated cost: ฿153
Range concern: medium

Plan:
Start full from Mae Hong Son. Do not leave low for Route 1095. Fuel again in Pai if needed.

Suggested fuel stops:

Mae Hong Son before departure
Pang Mapha / Soppong if needed
Pai arrival

Caution:
Short distance but twisty. Fuel is less important than concentration, but start full anyway.

Day 9 Fuel Strategy

Route: Pai local day
Estimated liters: 1.3
Estimated cost: ฿53
Range concern: low

Plan:
Minimal riding. Use this day to top up fuel before the Pai to Chiang Mai ride if convenient.

Suggested fuel stops:

Pai town

Caution:
Do not turn the recovery day into a riding day.

Day 10 Fuel Strategy

Route: Pai → Chiang Mai
Estimated liters: 4.5
Estimated cost: ฿180
Range concern: medium

Plan:
Start full from Pai. Use Mae Taeng side fuel if needed. Arrive Chiang Mai ready for the return south.

Suggested fuel stops:

Pai before departure
Mae Taeng
Chiang Mai arrival

Caution:
Route 1095 is attention-heavy. Do not combine low fuel, wet roads, and traffic.

Day 11 Fuel Strategy

Route: Chiang Mai → Tak
Estimated liters: 9.0
Estimated cost: ฿360
Range concern: low

Plan:
Start full from Chiang Mai. Top up around Lampang / Thoen corridor if convenient. Arrive Tak with margin.

Suggested fuel stops:

Chiang Mai before departure
Lampang / Thoen corridor
Tak arrival

Caution:
This is the longest return day. Use fuel stops as hydration and stretch stops.

Day 12 Fuel Strategy

Route: Tak → Nakhon Sawan
Estimated liters: 6.2
Estimated cost: ฿247
Range concern: low

Plan:
Start full from Tak. Stop around Kamphaeng Phet if needed. Refill in Nakhon Sawan for the final day.

Suggested fuel stops:

Tak
Kamphaeng Phet
Nakhon Sawan arrival

Caution:
Easy fuel day. Use the stop more for rest than range.

Day 13 Fuel Strategy

Route: Nakhon Sawan → Bangkok
Estimated liters: 8.2
Estimated cost: ฿327
Range concern: low

Plan:
Start full from Nakhon Sawan. Use Chainat or Suphan Buri as a practical final stop before Bangkok.

Suggested fuel stops:

Nakhon Sawan
Chainat
Suphan Buri

Caution:
Bangkok entry is the issue, not range. Do not arrive tired, dehydrated, and low on patience.

4. Feature: Road Difficulty Rating
Goal

Each day should show a simple road difficulty rating and explanation.

This helps distinguish easy distance from hard distance.

Difficulty Data Structure

Add to each day:

difficulty: {
  rating: 4,
  label: "Mountain scenic",
  summary: "Shorter distance but higher attention due to mountain roads, rain risk, and descent sections.",
  factors: [
    "Mountain climb/descent",
    "Rain/fog possible",
    "Slow corners",
    "Viewpoint/photo temptation"
  ]
}

Rating scale:

1/5 = very easy
2/5 = easy transit
3/5 = moderate transit / city entry
4/5 = mountain or long attention day
5/5 = most attention-heavy / technical day
Difficulty UI

Create component:

src/components/DifficultyBadge.jsx

Show:

Difficulty 4/5
Mountain scenic
Shorter distance but higher attention due to mountain roads.

Optional visual:

5 small dots
filled based on rating
color changes:
1–2 green
3 gold
4 orange
5 red
Difficulty Data by Day

Use this:

Day 1

Rating: 2
Label: Easy transit / Bangkok escape
Summary: Moderate first day mainly because of Bangkok departure, not road difficulty.
Factors:

Bangkok exit traffic
Flat roads
First-day setup
Heat
Day 2

Rating: 2
Label: Easy cultural transit
Summary: Comfortable northbound ride with a useful Kamphaeng Phet break.
Factors:

Mostly manageable roads
Cultural stop temptation
Arrival into Sukhothai
Day 3

Rating: 2
Label: Easy northern transition
Summary: Smooth transition toward the north with no major technical riding.
Factors:

Moderate distance
Town navigation
Northern approach
Day 4

Rating: 1
Label: Short positioning ride
Summary: Very short ride designed to arrive fresh in Chiang Mai.
Factors:

Short distance
Easy arrival
Use afternoon for bike/admin tasks
Day 5

Rating: 4
Label: Mountain scenic
Summary: First real mountain day with Doi Inthanon climb/descent and rainy-season caution.
Factors:

Mountain climb
Descent into Mae Chaem
Fog/rain possible
Slow technical corners
Day 6

Rating: 4
Label: Rural mountain/back-road
Summary: Shorter distance but more remote and slower, with rural road uncertainty.
Factors:

Rural roads
Limited services
Mountain terrain
Rain/gravel possible
Day 7

Rating: 4
Label: Long mountain day
Summary: Longest mountain leg with Highway 108 curves and a needed Khun Yuam reset.
Factors:

160 km mountain day
Curves
Weather risk
Fatigue management
Day 8

Rating: 5
Label: Route 1095 attention day
Summary: Short but highly attention-heavy due to curves, vans, scooters, and blind corners.
Factors:

Route 1095
Blind corners
Tourist traffic
Wet-road risk
High concentration required
Day 9

Rating: 1
Label: Recovery / local day
Summary: Local Pai day only. Keep it easy and avoid turning it into a riding day.
Factors:

Local cafés
Optional viewpoints
Recovery day
Day 10

Rating: 5
Label: Route 1095 return
Summary: Short distance but heavy attention due to Pai to Chiang Mai curves and traffic.
Factors:

Route 1095
Vans and scooters
Blind curves
Chiang Mai arrival traffic
Day 11

Rating: 3
Label: Long return transit
Summary: Longest return day, but more flowing than the mountain core.
Factors:

270 km distance
Southbound highway
Fatigue after mountain section
Heat
Day 12

Rating: 2
Label: Easy return transit
Summary: Shorter return day designed to decompress.
Factors:

Moderate distance
Easier roads
Useful recovery rhythm
Day 13

Rating: 3
Label: Final return / Bangkok entry
Summary: Road distance is manageable, but Bangkok entry makes the day more tiring.
Factors:

Final-day fatigue
Bangkok traffic
Heat
Urban concentration
5. Feature: Do-Not-Detour Notes
Goal

Add warnings that protect the lean trip plan.

These are not general travel tips. They are explicit reminders not to bloat the day.

Data Structure

Add to each day:

doNotDetour: {
  severity: "low" | "medium" | "high",
  title: "Do not add Ban Rak Thai today",
  message: "This version only has one Mae Hong Son night. Ban Rak Thai / Pang Oung require an extra day.",
  exceptions: "Only consider it if you add another Mae Hong Son night."
}
UI

Create component:

src/components/DoNotDetourCard.jsx

Show:

warning title
message
exception if any

Use visual style:

cream background
gold/red accent
small warning icon
compact card

In Today Mode, this should appear prominently for mountain days.

Do-Not-Detour Data by Day
Day 1

Severity: low
Title: Do not overbuild the first day
Message: The goal is to escape Bangkok cleanly and arrive fresh. Do not add sightseeing before Uthai Thani.
Exceptions: Only add a short river walk after check-in.

Day 2

Severity: medium
Title: Do not turn Kamphaeng Phet into a full sightseeing day
Message: Kamphaeng Phet is a useful pause, not the main destination today. Keep moving toward Sukhothai.
Exceptions: A short stop is fine if weather and timing are good.

Day 3

Severity: low
Title: Do not chase extra temples before Lampang
Message: This is a transition day. Save energy for the northern and mountain sections.
Exceptions: Lampang riverside after check-in is fine.

Day 4

Severity: low
Title: Do not waste the short Chiang Mai positioning day
Message: This day is for arriving fresh, bike checks, laundry, fuel, and early sleep.
Exceptions: Simple dinner or a short old-city walk only.

Day 5

Severity: medium
Title: Do not make Doi Inthanon a full sightseeing festival
Message: The goal is to cross through Doi Inthanon and reach Mae Chaem early. Too many stops will push you into afternoon mountain weather.
Exceptions: Summit / pagodas are fine if weather and timing are good.

Day 6

Severity: medium
Title: Do not chase unnamed rural viewpoints
Message: This is a quiet road day with limited services. Stop when the road naturally offers a view, but do not hunt detours.
Exceptions: Safe roadside pullouts only.

Day 7

Severity: high
Title: Do not add Ban Rak Thai or Pang Oung
Message: This version has only one Mae Hong Son night. Ban Rak Thai and Pang Oung require an extra Mae Hong Son day.
Exceptions: Only consider them if the itinerary is changed to add another Mae Hong Son night.

Day 8

Severity: high
Title: Do not add Tham Lod Cave on this version
Message: Mae Hong Son to Pai is short but attention-heavy. Tham Lod Cave turns the day into a side-trip day and increases fatigue.
Exceptions: Only consider it if you leave very early, weather is clear, and you deliberately accept a longer day.

Day 9

Severity: medium
Title: Do not turn Pai recovery day into a riding day
Message: This is the only full rest/local day. Keep it local: cafés, massage, Pai Canyon or White Buddha.
Exceptions: Very short local ride only.

Day 10

Severity: high
Title: Do not start late from Pai
Message: Pai to Chiang Mai is short but busy and twisty. Late starts increase traffic, heat, and afternoon rain risk.
Exceptions: None. Start early.

Day 11

Severity: medium
Title: Do not add scenic detours on the southbound run
Message: This is the longest return transit day. Keep it efficient and use stops for hydration and rest.
Exceptions: Coffee/fuel stops only.

Day 12

Severity: low
Title: Do not overthink the easy day
Message: This is a recovery transit day. Keep it simple and arrive with energy.
Exceptions: Short Kamphaeng Phet café pause is fine.

Day 13

Severity: medium
Title: Do not arrive in Bangkok tired and late
Message: Bangkok entry is the final boss. Leave early, stop before the city, hydrate, and keep the final approach calm.
Exceptions: None. Finish clean.

6. Data Integration Requirements

Update tripData.js so each day includes:

{
  day: 7,
  date: "Sat 27 Jun",
  title: "Mae Sariang to Mae Hong Son",
  route: "Mae Sariang → Mae Hong Son",
  distanceKm: 160,

  difficulty: {...},

  weather: {...},

  fuelStrategy: {...},

  doNotDetour: {...}
}

Do not remove existing fields.

Do not break:

coffeeStops
food
map links
budget display
print mode
map mode

If the app currently has older data names, migrate safely.

7. Components to Create or Update

Create:

src/components/TodayMode.jsx
src/components/TodayHeroCard.jsx
src/components/WeatherPanel.jsx
src/components/FuelStrategyCard.jsx
src/components/DifficultyBadge.jsx
src/components/DoNotDetourCard.jsx
src/utils/weatherLinks.js
src/utils/today.js

Update:

src/App.jsx
src/data/tripData.js
src/components/DayCard.jsx
src/components/MapMode.jsx
src/components/PrintRoadbook.jsx
src/styles/main.css

If files differ, adapt to the existing structure.

8. Navigation Update

Add Today to the main navigation.

If using state-based tabs:

activeView = "today" | "dashboard" | "days" | "map" | "budget" | "print"

Mobile bottom nav should show:

Today | Days | Map | Budget | Print

Dashboard can remain accessible from a top button or inside Days/Budget.

On desktop, show:

Today
Dashboard
Days
Map
Budget
Print
9. Styling Requirements

Keep the existing visual identity:

cream background
deep forest green
muted gold
rounded cards
roadbook feel
mobile-first
readable at fuel-stop distance
no tiny dense tables on mobile

Use CSS variables if not already present:

:root {
  --cream: #f7f1e5;
  --card: #fffaf0;
  --green: #173f35;
  --green-soft: #2f5d50;
  --gold: #c59b45;
  --gold-soft: #ead8a8;
  --text: #1f2a24;
  --muted: #6f766f;
  --danger: #b4533c;
  --warning: #d08a28;
  --blue: #3b82a0;
}

Badge styles:

Difficulty 1–2: green
Difficulty 3: gold
Difficulty 4: orange
Difficulty 5: red
Do-not-detour high: red/gold
Fuel low: green
Fuel medium: gold
Fuel high: red
10. Mobile Requirements

The app must work well on a phone.

Check:

no horizontal scroll
large tap targets
Today Mode usable one-handed
bottom nav fixed or sticky
cards are stacked
map does not crush the page
text is readable outdoors
buttons are at least 44px tall
Google Maps buttons are easy to hit

For Today Mode, make the first screen useful without scrolling too much.

Priority order on mobile Today Mode:

Day route
Open route / open next stop buttons
Difficulty
Fuel strategy
Weather links
Do-not-detour note
Budget
Coffee / food details
11. Print Mode Requirements

Update print mode to include:

difficulty label
fuel strategy
do-not-detour note
weather links as plain text
keep content concise

Do not let Today Mode or interactive components break print layout.

If necessary, hide interactive controls in print:

@media print {
  .mobile-bottom-nav,
  .interactive-controls,
  .today-actions {
    display: none !important;
  }
}
12. Acceptance Checklist

After building, verify:

npm run dev works.
App loads with no console errors.
Today tab appears.
Today Mode displays a sensible selected day.
User can change selected day.
User can mark a day completed.
Completed day state persists in localStorage.
Weather panels show working Google weather search links.
Fuel strategy appears for every day.
Difficulty rating appears for every day.
Do-not-detour card appears for every day.
Existing day cards still show route, costs, coffee, food, and maps.
Existing map mode still works.
Existing print mode still works.
Mobile layout has no horizontal scrolling.
Bottom nav works on phone width.
Google Maps buttons still work.
No fake photos were added.
No scraping was added.
No full turn-by-turn navigation was attempted.
13. Final Cursor Task

Build this upgrade now.

Work carefully in small steps:

Add data fields to tripData.js.
Add utility functions.
Add new components.
Wire Today Mode into App navigation.
Update DayCard.
Update PrintRoadbook.
Improve mobile CSS.
Run through the acceptance checklist.
Fix any errors.

Keep the app clean, practical, and road-focused. This is a motorcycle roadbook companion, not a generic travel blog.


Then after Cursor finishes, paste this follow-up prompt:

```text
Review the new Today Mode and mobile layout. Make it better for actual phone use during the trip. I want the selected day, next stop, route button, fuel strategy, weather buttons, difficulty, and do-not-detour note to be immediately clear. Fix any cramped cards, tiny buttons, horizontal scrolling, or print-mode problems.