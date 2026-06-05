import type { DayExtras } from "@/data/dayExtras";

type DayExtrasTranslation = Partial<DayExtras>;

export const dayExtrasTh: Record<number, DayExtrasTranslation> = {
  1: {
    difficulty: {
      rating: 2,
      label: "ขนส่งเบา / ออกจากกรุงเทพฯ",
      summary: "วันแรกปานกลาง เพราะการออกจากกรุงเทพฯ มากกว่าความยากของถนน",
      factors: ["รถติดออกกรุงเทพฯ", "ถนนราบ", "วันแรกของทริป", "ความร้อน"],
    },
    doNotDetour: {
      severity: "low",
      title: "อย่าทำให้วันแรกยาวเกินไป",
      message: "เป้าหมายคือออกจากกรุงเทพฯ ให้เรียบร้อยและมาถึงสด อย่าเพิ่มแวะชมก่อนถึงนครสวรรค์",
      exceptions: "เดินริมแม่น้ำสั้นๆ หลังเช็คอินได้",
    },
  },
  2: {
    difficulty: {
      rating: 2,
      label: "ขนส่งวัฒนธรรมเบา",
      summary: "ขี่ขึ้นเหนือสบายๆ มีจุดพักกำแพงเพชรที่เหมาะสม",
      factors: ["ถนนส่วนใหญ่ไม่ยาก", "แวะวัฒนธรรม", "ถึงสุโขทัย"],
    },
    doNotDetour: {
      severity: "medium",
      title: "อย่าเปลี่ยนกำแพงเพชรเป็นวันชมเมืองเต็มวัน",
      message: "กำแพงเพชรเป็นจุดพัก ไม่ใช่ปลายทางหลัก มุ่งไปสุโขทัยต่อ",
      exceptions: "แวะสั้นๆ ได้ถ้าอากาศและเวลาเหมาะ",
    },
  },
  3: {
    difficulty: {
      rating: 2,
      label: "เปลี่ยนสู่ภาคเหนือเบาๆ",
      summary: "ขี่ไหลสู่เหนือ ไม่มีเทคนิคยาก",
      factors: ["ระยะปานกลาง", "นำทางในเมือง", "เข้าสู่เหนือ"],
    },
  },
  4: {
    difficulty: {
      rating: 4,
      label: "ภูเขาและวิว",
      summary: "วันภูเขาแรก ขึ้น-ลงดอยอินทนนท์ ระวังฝนฤดูกาล",
      factors: ["ขึ้นเขา", "ลงสู่แม่แจ่ม", "หมอก/ฝน", "โค้งช้า"],
    },
    doNotDetour: {
      severity: "medium",
      title: "อย่าทำดอยอินทนนท์เป็นวันชมเต็มวัน",
      message: "เป้าหมายคือผ่านดอยอินทนนท์และถึงแม่แจ่มเร็ว แวะมากจะเจอฝนบ่ายบนภูเขา",
      exceptions: "ยอด/เจดีย์คู่ได้ถ้าอากาศและเวลาเหมาะ",
    },
  },
  5: {
    difficulty: {
      rating: 4,
      label: "ถนนชนบท/ภูเขา",
      summary: "ระยะไม่ยาวแต่ห่างไกลและช้า บริการจำกัด",
      factors: ["ถนนชนบท", "บริการน้อย", "ภูเขา", "ฝน/กรวด"],
    },
  },
  6: {
    difficulty: {
      rating: 3,
      label: "ภูเขาสั้น",
      summary: "ระยะสั้นแต่ยังเน้นภูเขา มาถึงแม่ฮ่องสอนเร็ว",
      factors: ["65 กม.", "ถนนภูเขา", "มาถึงเร็ว"],
    },
  },
  7: {
    difficulty: {
      rating: 1,
      label: "วันพัก / ในเมือง",
      summary: "วันพักในแม่ฮ่องสอน อย่าทำให้เป็นวันขี่",
      factors: ["กาแฟในเมือง", "จุดชมวิวเบาๆ", "วันพัก"],
    },
    doNotDetour: {
      severity: "medium",
      title: "อย่าเปลี่ยนวันพักเป็นวันขี่",
      message: "นี่คือวันพักเต็มวัน ใช้พักในเมือง กาแฟ นวด เดินริมทะเลสาบ",
      exceptions: "ขี่สั้นๆ ในเมืองเท่านั้น",
    },
  },
  8: {
    difficulty: {
      rating: 5,
      label: "ทาง 1095 ต้องตั้งใจ",
      summary: "ระยะสั้นแต่ต้องสมาธิสูง โค้ง รถตู้ สกู๊ตเตอร์",
      factors: ["ทาง 1095", "โค้งมองไม่เห็น", "รถท่องเที่ยว", "ถนนเปียก"],
    },
    doNotDetour: {
      severity: "high",
      title: "อย่าเพิ่ม Tham Lod Cave ในทริปนี้",
      message: "แม่ฮ่องสอน-ปาย สั้นแต่ต้องตั้งใจ Tham Lod ทำให้วันยาวและเหนื่อย",
      exceptions: "พิจารณาได้ถ้าออกเช้ามากและอากาศดี",
    },
  },
  9: {
    difficulty: {
      rating: 1,
      label: "วันพัก / ในเมือง",
      summary: "วันปาย ขี่เฉพาะในเมืองและพัก",
      factors: ["กาแฟในเมือง", "จุดชมวิว", "วันพัก"],
    },
    doNotDetour: {
      severity: "medium",
      title: "อย่าเปลี่ยนวันปายเป็นวันขี่",
      message: "วันพักเต็มวันเดียวของทริป ใช้พัก กาแฟ ปายแคนยอน หรือพระใหญ่",
      exceptions: "ขี่สั้นๆ ในเมืองเท่านั้น",
    },
  },
  10: {
    difficulty: {
      rating: 4,
      label: "ทาง 1095 แล้วดันต่อลำพูน",
      summary: "โค้งจากปาย แล้วขี่ต่อผ่านเชียงใหม่ไปลำพูน",
      factors: ["ทาง 1095", "รถตู้และสกู๊ตเตอร์", "ทางเชียงใหม่", "วันยาวถึงลำพูน"],
    },
    doNotDetour: {
      severity: "high",
      title: "อย่าค้างคืนที่เชียงใหม่",
      message: "เป้าหมายคือผ่านทาง 1095 และเชียงใหม่ แล้วไปลำพูน อย่าเปลี่ยนเป็นค้างเชียงใหม่",
      exceptions: "ค้างเชียงใหม่ได้เฉพาะกรณีอากาศหรือความเหนื่อยไม่ปลอดภัย",
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 6.2,
      estimatedCost: 247,
      rangeConcern: "medium",
      plan: "เริ่มเต็มจากปาย เติมแวะแม่แตงหรือเชียงใหม่ถ้าจำเป็น มาถึงลำพูนพร้อมสำรอง",
      suggestedFuelStops: [],
      caution: "ทาง 1095 ต้องตั้งใจ อย่ารวมถังว่าง ถนนเปียก และรถติดเชียงใหม่",
    },
  },
  11: {
    difficulty: {
      rating: 3,
      label: "ขนส่งลงใต้ปานกลาง",
      summary: "ขี่ยาวแต่ไหล จากลำพูนไปอุตรดิตถ์",
      factors: ["200 กม.", "ทางลงใต้", "เหนื่อยหลังภูเขา", "ความร้อน"],
    },
    doNotDetour: {
      severity: "medium",
      title: "อย่าเพิ่มชมลำปางเต็มวัน",
      message: "ลำปางเป็นช่วงทาง เป้าหมายคือไปอุตรดิตถ์ให้ทัน",
      exceptions: "กาแฟหรือเติมน้ำมันสั้นๆ เท่านั้น",
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 6.7,
      estimatedCost: 267,
      rangeConcern: "low",
      plan: "เริ่มเต็มจากลำพูน ลำปาง/แม่ทาเป็นจุดเติมและเช็ค มาถึงอุตรดิตถ์พร้อมพรุ่งนี้",
      suggestedFuelStops: [],
      caution: "ใช้จุดเติมน้ำมันเป็นจุดพักและดื่มน้ำ",
    },
  },
  12: {
    difficulty: {
      rating: 2,
      label: "ขนส่งวัฒนธรรมเบา",
      summary: "ขี่สั้นกว่า มีแวะพิษณุโลกตามแผนก่อนพิจิตร",
      factors: ["180 กม.", "แวะพิษณุโลก", "ถนนจังหวัด", "จังหวะเบา"],
    },
    doNotDetour: {
      severity: "low",
      title: "พิษณุโลกเป็นแวะ ไม่ใช่ค้างคืน",
      message: "พิษณุโลกเป็นแวะตามแผน ต้องมีเวลาไปพิจิตรก่อนบ่ายแก่",
      exceptions: "พักกาแฟหรือมื้อกลางวันที่พิษณุโลกได้ถ้าเวลาและอากาศดี",
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 6.0,
      estimatedCost: 240,
      rangeConcern: "low",
      plan: "เริ่มเต็มจากอุตรดิตถ์ เติมที่พิษณุโลกกลางทาง มาถึงพิจิตรพร้อมวันถัดไป",
      suggestedFuelStops: [],
      caution: "วันน้ำมันง่าย ใช้จุดพักมากกว่ากังวลระยะ",
    },
  },
  13: {
    difficulty: {
      rating: 1,
      label: "ขนส่งสั้นพักฟื้น",
      summary: "ขี่ง่ายจากพิจิตรไปนครสวรรค์",
      factors: ["135 กม.", "วันสั้น", "เตรียมวันสุดท้าย", "พักฟื้น"],
    },
    doNotDetour: {
      severity: "low",
      title: "อย่าเพิ่ม detour เพราะไมล์น้อย",
      message: "วันนี้ตั้งใจให้เบา มาถึงนครสวรรค์พร้อมพลังสำหรับวันสุดท้าย",
      exceptions: "พักริมแม่น้ำหรือกาแฟสั้นๆ ได้ถ้ายังสด",
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 4.5,
      estimatedCost: 180,
      rangeConcern: "low",
      plan: "เริ่มพอจากพิจิตร เติมนครสวรรค์เมื่อถึงเพื่อวันสุดท้าย",
      suggestedFuelStops: [],
      caution: "ระยะง่าย ใช้เติมน้ำมันเป็นการเช็คสถานะ",
    },
  },
  14: {
    difficulty: {
      rating: 3,
      label: "วันกลับ / เข้ากรุงเทพฯ",
      summary: "ระยะจัดการได้ แต่เข้ากรุงเทพฯ ต้องตั้งใจ",
      factors: ["เหนื่อยวันสุดท้าย", "รถติดกรุงเทพฯ", "ความร้อน", "เมือง"],
    },
    doNotDetour: {
      severity: "medium",
      title: "อย่ามาถึงกรุงเทพฯ เหนื่อยและสาย",
      message: "เข้ากรุงเทพฯ คือบอสสุดท้าย ออกเช้า หยุดก่อนเข้าเมือง ดื่มน้ำ ใจเย็น",
      exceptions: "ไม่มี จบให้เรียบร้อย",
    },
    fuelStrategy: {
      startFull: true,
      estimatedLiters: 8.2,
      estimatedCost: 327,
      rangeConcern: "low",
      plan: "เริ่มเต็มจากนครสวรรค์ ใช้ชัยนาทหรือสุพรรณบุรีเป็นจุดเติม/พักสุดท้ายก่อนกรุงเทพฯ",
      suggestedFuelStops: [],
      caution: "ปัญหาคือการเข้ากรุงเทพฯ ไม่ใช่ถัง อย่ามาเหนื่อย ขาดน้ำ และหงุดหงิด",
    },
  },
};

function mergeExtras(base: DayExtras, tr: DayExtrasTranslation | undefined): DayExtras {
  if (!tr) return base;
  return {
    difficulty: tr.difficulty ? { ...base.difficulty, ...tr.difficulty } : base.difficulty,
    weather: tr.weather
      ? {
          ...base.weather,
          ...tr.weather,
          checkpoints: tr.weather.checkpoints ?? base.weather.checkpoints,
        }
      : base.weather,
    fuelStrategy: tr.fuelStrategy
      ? {
          ...base.fuelStrategy,
          ...tr.fuelStrategy,
          suggestedFuelStops:
            tr.fuelStrategy.suggestedFuelStops?.length
              ? tr.fuelStrategy.suggestedFuelStops
              : base.fuelStrategy.suggestedFuelStops,
        }
      : base.fuelStrategy,
    doNotDetour: tr.doNotDetour ? { ...base.doNotDetour, ...tr.doNotDetour } : base.doNotDetour,
  };
}

export function localizeDayExtras(base: DayExtras, dayNumber: number): DayExtras {
  return mergeExtras(base, dayExtrasTh[dayNumber]);
}
