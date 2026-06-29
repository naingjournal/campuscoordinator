// Static dataset for every place on campus.
// Adding a new spot here will make it show up on the home page search,
// the directory, the detail page, and (if you add coordinates) the map.

const CATEGORIES = {
  academic:  { label: "Academic",  emoji: "🎓" },
  library:   { label: "Library",   emoji: "📚" },
  dining:    { label: "Dining",    emoji: "🍜" },
  sports:    { label: "Sports",    emoji: "🏟️" },
  dormitory: { label: "Dormitory", emoji: "🏠" },
  service:   { label: "Service",   emoji: "🛎️" },
  landmark:  { label: "Landmark",  emoji: "📍" },
};

const LOCATIONS = [
  {
    id: "c1-classroom",
    name: "C1 Classroom Building",
    thaiName: "อาคารเรียนรวม C1",
    category: "academic",
    shortCode: "C1",
    description:
      "The main lecture building hosting general education classes and large auditorium-style rooms used by most freshman cohorts.",
    hours: "07:00 – 21:00",
    zone: "Central",
    tips: [
      "Rooms numbered 100s are on the ground floor.",
      "Quiet study booths on the 3rd floor balcony."
    ]
  },
  {
    id: "e-park",
    name: "E-Park (Education Park)",
    category: "academic",
    description:
      "Cluster of buildings for the School of Information Technology, Liberal Arts, and Management lectures.",
    hours: "07:00 – 22:00",
    zone: "East",
    tips: ["Best Wi-Fi reception is on the second floor terrace."]
  },
  {
    id: "library",
    name: "Learning Resources & Educational Media Center",
    thaiName: "ศูนย์บรรณสารและสื่อการศึกษา",
    category: "library",
    shortCode: "AV",
    description:
      "The main university library — quiet study floors, group rooms, computer labs, and a 24-hour reading room during exam weeks.",
    hours: "08:00 – 24:00 (term)",
    zone: "Central",
    tips: ["Bring your student ID to borrow.", "Group rooms can be booked online."]
  },
  {
    id: "d1-canteen",
    name: "D1 Student Canteen",
    category: "dining",
    description:
      "Largest food court on campus with 20+ stalls — Thai, halal, vegetarian, and northern specialties at student prices.",
    hours: "06:30 – 19:00",
    zone: "South",
    tips: ["Khao soi at stall 12 is a must-try.", "Cash only at most stalls."]
  },
  {
    id: "mfu-square",
    name: "MFU Square",
    category: "dining",
    description:
      "Open-air commercial plaza with cafés, convenience stores, a pharmacy, and student-run shops.",
    hours: "07:00 – 22:00",
    zone: "West"
  },
  {
    id: "sports-complex",
    name: "Sports Complex & Stadium",
    category: "sports",
    description:
      "Athletics track, football pitch, indoor courts for badminton, basketball, and volleyball, plus a fitness gym.",
    hours: "06:00 – 21:00",
    zone: "North",
    tips: ["Free entry with student ID.", "Bring indoor shoes for the courts."]
  },
  {
    id: "swimming-pool",
    name: "MFU Swimming Pool",
    category: "sports",
    description: "Olympic-style outdoor pool open to students and staff.",
    hours: "10:00 – 19:00 (closed Mon)",
    zone: "North"
  },
  {
    id: "dorm-lamduan",
    name: "Lamduan Dormitory",
    category: "dormitory",
    description:
      "First-year female dormitory cluster — close to C1 and the main canteen, fan and air-conditioned rooms available.",
    zone: "South"
  },
  {
    id: "dorm-fahmui",
    name: "Fah Mui Dormitory",
    category: "dormitory",
    description: "Upper-year mixed dormitories with private rooms and study lounges.",
    zone: "East"
  },
  {
    id: "registrar",
    name: "Office of the Registrar",
    thaiName: "สำนักทะเบียนและประมวลผล",
    category: "service",
    description:
      "Course registration, transcripts, student status letters, and graduation services.",
    hours: "08:30 – 16:30 (Mon–Fri)",
    zone: "Central",
    tips: ["Bring printed forms — they don't accept photos of documents."]
  },
  {
    id: "health-center",
    name: "MFU Medical Center",
    category: "service",
    description:
      "On-campus clinic and teaching hospital — free basic care for students under the university health scheme.",
    hours: "24 hours (emergency)",
    zone: "West"
  },
  {
    id: "rajaprajanukroh",
    name: "Rajaprajanukroh Garden",
    category: "landmark",
    description:
      "The botanical garden walk leading to the Princess Mother memorial — a calm spot for an afternoon stroll.",
    zone: "North",
    tips: ["Sunset from the upper path is the best view on campus."]
  },
  {
    id: "admin-building",
    name: "Administration Building",
    thaiName: "อาคารสำนักงานอธิการบดี",
    category: "service",
    description:
      "Houses the President's Office, Finance, and International Affairs — visitor parking on the west side.",
    hours: "08:30 – 16:30 (Mon–Fri)",
    zone: "Central"
  }
];

// Coordinates inside the 600x420 SVG viewbox used on the map page.
const MAP_COORDS = {
  "c1-classroom":   { x: 300, y: 210 },
  "e-park":         { x: 430, y: 180 },
  "library":        { x: 320, y: 160 },
  "d1-canteen":     { x: 280, y: 290 },
  "mfu-square":     { x: 160, y: 230 },
  "sports-complex": { x: 310,  y: 80 },
  "swimming-pool":  { x: 380,  y: 80 },
  "dorm-lamduan":   { x: 230, y: 330 },
  "dorm-fahmui":    { x: 460, y: 250 },
  "registrar":      { x: 250, y: 180 },
  "health-center":  { x: 130, y: 170 },
  "rajaprajanukroh":{ x: 380,  y: 50 },
  "admin-building": { x: 350, y: 200 }
};

// Small helper used in several places.
function findLocation(id) {
  return LOCATIONS.find(function (l) { return l.id === id; });
}
