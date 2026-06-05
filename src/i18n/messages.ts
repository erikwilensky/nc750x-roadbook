import type { Locale } from "./locale";

export type Messages = {
  appName: string;
  nav: {
    today: string;
    dashboard: string;
    days: string;
    map: string;
    print: string;
    budget: string;
  };
  language: {
    switchToThai: string;
    switchToEnglish: string;
    current: string;
  };
  common: {
    day: string;
    fuel: string;
    food: string;
    hotel: string;
    stay: string;
    dayTotal: string;
    overnight: string;
    route: string;
    depart: string;
    arrive: string;
    difficulty: string;
    exception: string;
    range: string;
    startFull: string;
    estimated: string;
    loading: string;
    backToDashboard: string;
    viewDay: string;
    accommodation: string;
    highlights: string;
    ridingNotes: string;
    fuelStrategy: string;
    coffeeStrategy: string;
    totalDistance: string;
    daysOnRoad: string;
    budgetEnvelope: string;
    estimatedTotal: string;
    contingency: string;
    tripBudget: string;
  };
  dashboard: {
    openToday: string;
    fuelRule: string;
    fuelRuleBody: string;
    routePhases: string;
    dayByDay: string;
    openMapMode: string;
    viewPrint: string;
  };
  day: {
    openGoogleMaps: string;
    roadbookMap: string;
    todayMode: string;
  };
  today: {
    title: string;
    subtitle: string;
    selectDay: string;
    openRoute: string;
    fullDetails: string;
    locating: string;
    useLocation: string;
    markComplete: string;
    unmarkComplete: string;
    fuelRule: string;
  };
  map: {
    title: string;
    subtitle: string;
    viewDayMap: string;
  };
  print: {
    title: string;
    subtitle: string;
    options: string;
    hint: string;
    withPhotos: string;
    textOnly: string;
    printPdf: string;
    loading: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
  };
};

const en: Messages = {
  appName: "NC750X Roadbook",
  nav: {
    today: "Today",
    dashboard: "Dashboard",
    days: "Days",
    map: "Map",
    print: "Print",
    budget: "Budget",
  },
  language: {
    switchToThai: "ไทย",
    switchToEnglish: "English",
    current: "Language",
  },
  common: {
    day: "Day",
    fuel: "Fuel",
    food: "Food",
    hotel: "Hotel",
    stay: "Stay",
    dayTotal: "Day total",
    overnight: "Overnight",
    route: "Route",
    depart: "Depart",
    arrive: "Arrive",
    difficulty: "Difficulty",
    exception: "Exception",
    range: "Range",
    startFull: "Start full",
    estimated: "Est.",
    loading: "Loading…",
    backToDashboard: "← Back to dashboard",
    viewDay: "View day",
    accommodation: "Accommodation",
    highlights: "Highlights",
    ridingNotes: "Riding notes",
    fuelStrategy: "Fuel strategy",
    coffeeStrategy: "Coffee strategy",
    totalDistance: "Total distance",
    daysOnRoad: "Days on the road",
    budgetEnvelope: "Budget envelope",
    estimatedTotal: "Estimated total",
    contingency: "Contingency",
    tripBudget: "Trip budget",
  },
  dashboard: {
    openToday: "Open Today Mode",
    fuelRule: "Fuel rule:",
    fuelRuleBody:
      "fill every morning before leaving town, especially before mountain legs.",
    routePhases: "Route phases",
    dayByDay: "Day-by-day roadbook",
    openMapMode: "Open map mode",
    viewPrint: "View print roadbook",
  },
  day: {
    openGoogleMaps: "Open route in Google Maps",
    roadbookMap: "Roadbook map (Day {day})",
    todayMode: "Today Mode (Day {day})",
  },
  today: {
    title: "Today",
    subtitle: "What matters right now on the road",
    selectDay: "Select day",
    openRoute: "Open day route in Google Maps",
    fullDetails: "Show full day details",
    locating: "Locating…",
    useLocation: "Use current location",
    markComplete: "Mark day completed",
    unmarkComplete: "Unmark day completed",
    fuelRule:
      "Fuel rule: fill every morning before leaving town, especially before mountain legs.",
  },
  map: {
    title: "Map mode",
    subtitle: "Roadbook companion — not turn-by-turn",
    viewDayMap: "View day map",
  },
  print: {
    title: "Print roadbook",
    subtitle: "Save or print the full trip",
    options: "Print options",
    hint: "Use your browser's Print → Save as PDF",
    withPhotos: "Print with photos",
    textOnly: "Print text only",
    printPdf: "Print / Save PDF",
    loading: "Loading print view…",
  },
  notFound: {
    title: "Page not found",
    body: "That roadbook page does not exist.",
    home: "Back to dashboard",
  },
};

const th: Messages = {
  appName: "NC750X โรดบุ๊ก",
  nav: {
    today: "วันนี้",
    dashboard: "หน้าหลัก",
    days: "รายวัน",
    map: "แผนที่",
    print: "พิมพ์",
    budget: "งบประมาณ",
  },
  language: {
    switchToThai: "ไทย",
    switchToEnglish: "English",
    current: "ภาษา",
  },
  common: {
    day: "วัน",
    fuel: "น้ำมัน",
    food: "อาหาร",
    hotel: "ที่พัก",
    stay: "พักที่",
    dayTotal: "รวมวัน",
    overnight: "ค้างคืน",
    route: "เส้นทาง",
    depart: "ออก",
    arrive: "ถึง",
    difficulty: "ความยาก",
    exception: "ข้อยกเว้น",
    range: "ระยะถัง",
    startFull: "เติมเต็มก่อนออก",
    estimated: "ประมาณ",
    loading: "กำลังโหลด…",
    backToDashboard: "← กลับหน้าหลัก",
    viewDay: "ดูรายวัน",
    accommodation: "ที่พัก",
    highlights: "ไฮไลต์",
    ridingNotes: "โน้ตการขับ",
    fuelStrategy: "แผนน้ำมัน",
    coffeeStrategy: "แผนกาแฟ",
    totalDistance: "ระยะทางรวม",
    daysOnRoad: "จำนวนวันบนท้องถนน",
    budgetEnvelope: "งบรวมสูงสุด",
    estimatedTotal: "ค่าใช้จ่ายโดยประมาณ",
    contingency: "สำรอง",
    tripBudget: "งบทริป",
  },
  dashboard: {
    openToday: "เปิดโหมดวันนี้",
    fuelRule: "กฎน้ำมัน:",
    fuelRuleBody: "เติมเต็มทุกเช้าก่อนออกจากเมือง โดยเฉพาะก่อนขึ้นภูเขา",
    routePhases: "ช่วงเส้นทาง",
    dayByDay: "โรดบุ๊กรายวัน",
    openMapMode: "เปิดโหมดแผนที่",
    viewPrint: "ดูโรดบุ๊กสำหรับพิมพ์",
  },
  day: {
    openGoogleMaps: "เปิดเส้นทางใน Google Maps",
    roadbookMap: "แผนที่โรดบุ๊ก (วัน {day})",
    todayMode: "โหมดวันนี้ (วัน {day})",
  },
  today: {
    title: "วันนี้",
    subtitle: "สิ่งที่สำคัญตอนนี้บนท้องถนน",
    selectDay: "เลือกวัน",
    openRoute: "เปิดเส้นทางวันนี้ใน Google Maps",
    fullDetails: "ดูรายละเอียดวันเต็ม",
    locating: "กำลังหาตำแหน่ง…",
    useLocation: "ใช้ตำแหน่งปัจจุบัน",
    markComplete: "ทำเครื่องหมายว่าเสร็จวันนี้",
    unmarkComplete: "ยกเลิกเครื่องหมายเสร็จ",
    fuelRule:
      "กฎน้ำมัน: เติมเต็มทุกเช้าก่อนออกจากเมือง โดยเฉพาะก่อนขึ้นภูเขา",
  },
  map: {
    title: "โหมดแผนที่",
    subtitle: "คู่มือโรดบุ๊ก — ไม่ใช่นำทางเลี้ยวต่อเลี้ยว",
    viewDayMap: "ดูแผนที่วัน",
  },
  print: {
    title: "พิมพ์โรดบุ๊ก",
    subtitle: "บันทึกหรือพิมพ์ทริปทั้งหมด",
    options: "ตัวเลือกการพิมพ์",
    hint: "ใช้ Print → Save as PDF ในเบราว์เซอร์",
    withPhotos: "พิมพ์พร้อมรูป",
    textOnly: "พิมพ์เฉพาะข้อความ",
    printPdf: "พิมพ์ / บันทึก PDF",
    loading: "กำลังโหลดหน้าพิมพ์…",
  },
  notFound: {
    title: "ไม่พบหน้า",
    body: "ไม่มีหน้าโรดบุ๊กนี้",
    home: "กลับหน้าหลัก",
  },
};

export const messagesByLocale: Record<Locale, Messages> = { en, th };

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale];
}

export function formatMessage(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}
