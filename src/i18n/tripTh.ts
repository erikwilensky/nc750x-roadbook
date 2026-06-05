import type { TripData, TripDay } from "@/data/trip";

export const tripMetaTh: Pick<TripData, "title" | "subtitle" | "phases"> = {
  title: "วนลูปกรุงเทพฯ–แม่ฮ่องสอน",
  subtitle: "แผนทริป 14 วันด้วย Honda NC750X",
  phases: [
    {
      title: "ขึ้นเหนือ",
      days: "วัน 1–4",
      route: "กรุงเทพฯ → นครสวรรค์ → สุโขทัย → ลำพูน → แม่แจ่ม",
    },
    {
      title: "ภูเขาหลัก",
      days: "วัน 5–9",
      route: "แม่แจ่ม → ขุนยวม → แม่ฮ่องสอน → ปาย (วันพัก)",
    },
    {
      title: "กลับใต้",
      days: "วัน 10–14",
      route:
        "ปาย → ลำพูน → อุตรดิตถ์ → พิษณุโลก (แวะ) → พิจิตร → นครสวรรค์ → กรุงเทพฯ",
    },
  ],
};

type DayTranslation = Pick<
  TripDay,
  | "title"
  | "route"
  | "overnight"
  | "stay"
  | "departureTarget"
  | "arrivalTarget"
  | "highlights"
  | "ridingNotes"
  | "dayCoffeeNote"
>;

export const dayContentTh: Record<number, DayTranslation> = {
  1: {
    title: "กรุงเทพฯ ไปนครสวรรค์",
    route: "กรุงเทพฯ → นครสวรรค์",
    overnight: "นครสวรรค์",
    stay: "Hop Inn Nakhon Sawan",
    departureTarget: "06:00",
    arrivalTarget: "มื้อกลางวัน / บ่ายต้น",
    highlights: ["ออกจากกรุงเทพฯ ตอนรุ่งสาง", "แม่น้ำเจ้าพระยา / ฝั่งแม่น้ำชัยนาท", "ถึงนครสวรรค์"],
    ridingNotes: [
      "ออกจากกรุงเทพฯ ให้เร็ว",
      "วันแรกให้เบาๆ",
      "มาถึงพร้อมพลัง ไม่ใช่พร้อม ego",
    ],
  },
  2: {
    title: "นครสวรรค์ ไปสุโขทัย",
    route: "นครสวรรค์ → สุโขทัย",
    overnight: "สุโขทัย",
    stay: "Old City Guest House",
    departureTarget: "07:00",
    arrivalTarget: "บ่ายต้น",
    highlights: ["แวะกำแพงเพชร", "อุทยานประวัติศาสตร์สุโขทัย"],
    ridingNotes: ["วันขี่สบายๆ เน้นวัฒนธรรม", "ใช้กำแพงเพชรเป็นจุดพักตามธรรมชาติ"],
  },
  3: {
    title: "สุโขทัย ไปลำพูน",
    route: "สุโขทัย → ลำพูน",
    overnight: "ลำพูน",
    stay: "โรงแรมลำพูน (TBD)",
    departureTarget: "07:00",
    arrivalTarget: "บ่ายต้น",
    highlights: ["เข้าสู่ภาคเหนือ", "บรรยากาศเมืองเก่าลำพูน"],
    ridingNotes: ["ถนนเริ่มรู้สึกเหนือขึ้น", "วันนี้ให้ผ่อนคลาย"],
  },
  4: {
    title: "ลำพูน ไปแม่แจ่ม (ผ่านดอยอินทนนท์)",
    route: "ลำพูน → ดอยอินทนนท์ → แม่แจ่ม",
    overnight: "แม่แจ่ม",
    stay: "The Nutthasin Mae Chaem",
    departureTarget: "07:00",
    arrivalTarget: "บ่ายต้น",
    highlights: ["ยอดดอยอินทนนท์", "ลงเขาสู่แม่แจ่ม", "หุบเขาแม่แจ่ม"],
    ridingNotes: [
      "วันภูเขาช่วงฝน",
      "ระวังใบไม้เปียก หมอก กรวด และสีถนนลื่น",
    ],
  },
  5: {
    title: "แม่แจ่ม ไปขุนยวม",
    route: "แม่แจ่ม → ขุนยวม",
    overnight: "ขุนยวม",
    stay: "โรงแรมขุนยวม (TBD)",
    departureTarget: "07:00",
    arrivalTarget: "บ่ายต้น",
    highlights: ["ถนนชนบทเงียบ", "ถึงขุนยวม"],
    ridingNotes: ["วันถนนชนบท", "หยุดเฉพาะไหล่ทางที่ปลอดภัยและมีวิวจริง"],
    dayCoffeeNote:
      "ถนนชนบท: ถ้าร้านกาแฟปิด ใช้จุดจอดที่ปลอดภัยมีร่มเงา น้ำ และที่จอด",
  },
  6: {
    title: "ขุนยวม ไปแม่ฮ่องสอน",
    route: "ขุนยวม → แม่ฮ่องสอน",
    overnight: "แม่ฮ่องสอน",
    stay: "Northern Hill Guesthouse",
    departureTarget: "07:30",
    arrivalTarget: "บ่ายต้น",
    highlights: ["ช่วงภูเขาสั้น", "ถึงแม่ฮ่องสอน"],
    ridingNotes: ["ระยะสั้นแต่ยังเน้นภูเขา", "มาถึงเร็วและใช้บ่ายพักฟื้น"],
    dayCoffeeNote: "ช่วงสั้น: จุดกาแฟหนึ่งจุดและกาแฟถึงเมืองก็พอ",
  },
  7: {
    title: "วันพักที่แม่ฮ่องสอน",
    route: "วันพักในแม่ฮ่องสอน",
    overnight: "แม่ฮ่องสอน",
    stay: "Northern Hill Guesthouse",
    departureTarget: "ไม่ต้องตื่นเช้า",
    arrivalTarget: "พักที่แม่ฮ่องสอน",
    highlights: ["วันพักฟื้น", "ทะเลสาบจองกำ", "รีเซ็ตในเมือง"],
    ridingNotes: ["ขี่เฉพาะในเมืองและเบาๆ", "ใช้วันนี้พักฟื้น ไม่สะสมไมล์"],
    dayCoffeeNote: "กาแฟในเมืองเท่านั้น วันนี้คือวันพัก",
  },
  8: {
    title: "แม่ฮ่องสอน ไปปาย",
    route: "แม่ฮ่องสอน → ปาย",
    overnight: "ปาย",
    stay: "Yotaka@Pai",
    departureTarget: "07:00",
    arrivalTarget: "มื้อกลางวัน / บ่ายต้น",
    highlights: ["ทาง 1095", "ดอยกิ่วลóm", "หุบเขาปาย"],
    ridingNotes: [
      "ระยะสั้นแต่ต้องตั้งใจมาก",
      "ระวังโค้งมองไม่เห็น รถตู้ท่องเที่ยว สกู๊ตเตอร์เช่า กรวด และแอ่งน้ำฝน",
    ],
  },
  9: {
    title: "วันเต็มที่ปาย",
    route: "ปายวนในเมือง / วันพัก",
    overnight: "ปาย",
    stay: "Yotaka@Pai",
    departureTarget: "ไม่ต้องตื่นเช้า",
    arrivalTarget: "พักที่ปาย",
    highlights: ["ปายแคนยอน", "พระพุทธสีขาว", "วันพักผ่อนที่ปาย"],
    ridingNotes: [
      "อย่าเปลี่ยนวันปายให้เป็นวันขี่ยาว",
      "ใช้วันนี้เป็นช่องระบายความดันระหว่างช่วงภูเขา",
    ],
    dayCoffeeNote: "กาแฟในเมืองเท่านั้น วันนี้คือวันพัก",
  },
  10: {
    title: "ปาย ไปลำพูน",
    route: "ปาย → ลำพูน",
    overnight: "ลำพูน",
    stay: "โรงแรมงบประมาณลำพูน",
    departureTarget: "07:00",
    arrivalTarget: "มื้อกลางวัน / บ่ายต้น",
    highlights: ["ทาง 1095", "ช่วงแม่แตง", "ถึงลำพูน"],
    ridingNotes: [
      "ทาง 1095 ยังต้องตั้งใจมาก",
      "หลังเชียงใหม่ ขี่ต่อไปลำพูน ไม่ค้างในเชียงใหม่",
    ],
  },
  11: {
    title: "ลำพูน ไปอุตรดิตถ์",
    route: "ลำพูน → อุตรดิตถ์",
    overnight: "อุตรดิตถ์",
    stay: "โรงแรมงบประมาณอุตรดิตถ์",
    departureTarget: "07:00",
    arrivalTarget: "บ่ายต้น / กลาง",
    highlights: ["เส้นทางลงใต้", "ช่วงลำปาง", "ถึงอุตรดิตถ์"],
    ridingNotes: ["วันขนส่งปานกลาง", "ให้เส้นทางไหล ไม่เน้นชมเมือง"],
    dayCoffeeNote: "วันกลับ: จุดพักให้ practical อย่าไล่ล่ากาแฟ",
  },
  12: {
    title: "อุตรดิตถ์ ไปพิจิตร (แวะพิษณุโลก)",
    route: "อุตรดิตถ์ → แวะพิษณุโลก → พิจิตร",
    overnight: "พิจิตร",
    stay: "โรงแรมงบประมาณพิจิตร",
    departureTarget: "07:00",
    arrivalTarget: "มื้อกลางวัน / บ่ายต้น",
    highlights: ["เส้นทางวัฒนธรรม", "แวะพิษณุโลกตามแผน", "ถึงพิจิตร"],
    ridingNotes: [
      "ขนส่งวัฒนธรรมเบาๆ พร้อมแวะพิษณุโลก",
      "เผื่อเวลาให้ถึงพิจิตรก่อนบ่ายแก่",
    ],
  },
  13: {
    title: "พิจิตร ไปนครสวรรค์",
    route: "พิจิตร → นครสวรรค์",
    overnight: "นครสวรรค์",
    stay: "Hop Inn Nakhon Sawan",
    departureTarget: "07:00",
    arrivalTarget: "สายปลาย / บ่ายต้น",
    highlights: ["ขนส่งสั้นพักฟื้น", "ฝั่งแม่น้ำนครสวรรค์", "เตรียมวันสุดท้าย"],
    ridingNotes: [
      "ขนส่งสั้นพักฟื้นหลังช่วงวัฒนธรรม",
      "อย่าเพิ่ม detour เพราะไมล์น้อย",
    ],
    dayCoffeeNote: "วันสั้น: จุดกลางทางหนึ่งจุดและกาแฟถึงเมืองก็พอ",
  },
  14: {
    title: "นครสวรรค์ ไปกรุงเทพฯ",
    route: "นครสวรรค์ → กรุงเทพฯ",
    overnight: "กรุงเทพฯ",
    stay: "บ้าน",
    departureTarget: "06:00",
    arrivalTarget: "บ่ายต้น",
    highlights: ["แวะชัยนาท", "กาแฟสุพรรณบุรี", "จบที่กรุงเทพฯ"],
    ridingNotes: ["วันสุดท้าย", "ช่วงท้ายคือกรุงเทพฯ ตามแบบกรุงเทพฯ"],
    dayCoffeeNote:
      "วันสุดท้าย: ใช้เป็นจุดพัก practical ก่อนเข้ากรุงเทพฯ ไม่ใช่แวะชมเมือง",
  },
};

export const rangeConcernTh: Record<"low" | "medium" | "high", string> = {
  low: "ต่ำ",
  medium: "ปานกลาง",
  high: "สูง",
};

export const weatherLabelTh: Record<string, string> = {
  Start: "ต้นทาง",
  "Mid-route": "กลางทาง",
  Destination: "ปลายทาง",
};
