import { dbRun, dbGet, dbAll, randomUUID } from "./db";

const firstNames = [
  "Ahmed", "Fatima", "Ali", "Zahra", "Karim", "Noor", "Hassan", "Aisha", "Ibrahim", "Maryam",
  "Khalid", "Layla", "Omar", "Hana", "Youssef", "Dina", "Tariq", "Leila", "Samir", "Reem",
  "Bahir", "Samira", "Rashid", "Amira", "Waleed", "Salma", "Amin", "Ranya", "Jamal", "Yasmin",
  "Karim", "Nadira", "Saad", "Rana", "Nasser", "Nadia", "Haider", "Huda", "Faisal", "Farida",
  "Jalal", "Jamila", "Majid", "Janan", "Nasir", "Nana", "Rasheed", "Rabia", "Saleh", "Sana"
];

const lastNames = [
  "Hassan", "Khan", "Ali", "Ahmed", "Abdullah", "Amin", "Rahman", "Hossain", "Malik", "Hussain",
  "Ibrahim", "Yusuf", "Ismail", "Karim", "Farah", "Rashid", "Anwar", "Samir", "Tariq", "Walid",
  "Aziz", "Hamid", "Habib", "Hakim", "Jalil", "Javed", "Kamal", "Karim", "Khalil", "Latif",
  "Mansur", "Masood", "Mazhar", "Mehdi", "Moin", "Moosa", "Mujib", "Mukhtar", "Mumtaz", "Munir",
  "Nabil", "Nadir", "Nafis", "Naim", "Najib", "Nasim", "Nasir", "Nasser", "Nawab", "Nazim"
];

const streets = [
  "Main Street", "Oak Avenue", "Pine Road", "Elm Street", "Maple Lane", "Birch Drive",
  "Cedar Way", "Willow Court", "Ash Boulevard", "Spruce Road", "Poplar Street", "Alder Avenue"
];

const cities = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Barisal", "Rajshahi"];

function generateName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName };
}

function generateEmail(firstName: string, lastName: string, index: number) {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@student.edu`.substring(0, 50);
}

function generatePhone() {
  return `+880 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 900000) + 100000}`;
}

function generateDOB() {
  const year = Math.floor(Math.random() * 10) + 2000; // 2000-2009
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function generateAddress() {
  const streetNum = Math.floor(Math.random() * 999) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  return `${streetNum} ${street}, ${city}`;
}

function getEnrollmentPrefix(batchId: number): string {
  const prefixes: { [key: number]: string } = {
    1: "HSC",
    2: "MED",
    3: "SSC",
    4: "CEX",
    5: "ADV",
    6: "BAS",
  };
  return prefixes[batchId] || "GEN";
}

async function seedDatabase() {
  try {
    // Check if data already exists
    const existingBatches = await dbAll("SELECT COUNT(*) as count FROM batches");
    if (existingBatches[0]?.count > 0) {
      console.log("Database already seeded. Skipping...");
      return;
    }

    console.log("Starting database seeding...");

    // Create 6 batches
    const batchData = [
      {
        name: "HSC Biology (XI-XII)",
        program: "Advanced",
        fee: "₹15,000/month",
      },
      {
        name: "Medical Entrance Prep",
        program: "Professional",
        fee: "₹20,000/month",
      },
      {
        name: "SSC Biology (IX-X)",
        program: "Standard",
        fee: "₹10,000/month",
      },
      {
        name: "Competitive Exam Coaching",
        program: "Advanced",
        fee: "₹8,000/month",
      },
      {
        name: "Advanced Biology Research",
        program: "Professional",
        fee: "₹25,000/month",
      },
      {
        name: "Basic Science Foundation",
        program: "Standard",
        fee: "₹5,000/month",
      },
    ];

    const batchIds: number[] = [];
    for (const batch of batchData) {
      await dbRun(
        `INSERT INTO batches (name, program, fee, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?)`,
        [batch.name, batch.program, batch.fee, new Date().toISOString(), new Date().toISOString()]
      );
    }

    // Get batch IDs
    const batches = await dbAll<{ id: number }>("SELECT id FROM batches ORDER BY id");
    batches.forEach((b) => batchIds.push(b.id));

    console.log(`Created ${batchIds.length} batches`);

    // Create courses
    const courses = [
      { name: "Human Anatomy", code: "BIO101" },
      { name: "Cell Biology", code: "BIO102" },
      { name: "Genetics", code: "BIO103" },
      { name: "Ecology", code: "BIO104" },
      { name: "Biochemistry", code: "BIO105" },
      { name: "Molecular Biology", code: "BIO106" },
      { name: "Physiology", code: "BIO107" },
      { name: "Botany", code: "BIO108" },
    ];

    const courseIds: { id: string; code: string }[] = [];
    for (const course of courses) {
      const id = randomUUID();
      await dbRun(
        `INSERT INTO courses (id, name, code, description, createdAt) 
         VALUES (?, ?, ?, ?, ?)`,
        [id, course.name, course.code, `${course.name} course`, new Date().toISOString()]
      );
      courseIds.push({ id, code: course.code });
    }

    console.log(`Created ${courseIds.length} courses`);

    // Create 50 students per batch (300 total)
    let studentCount = 0;
    const studentIds: string[] = [];

    for (let batchIdx = 0; batchIdx < batchIds.length; batchIdx++) {
      const batchId = batchIds[batchIdx];
      const prefix = getEnrollmentPrefix(batchIdx + 1);

      for (let i = 0; i < 50; i++) {
        const studentId = randomUUID();
        const { firstName, lastName } = generateName();
        const email = generateEmail(firstName, lastName, studentCount);
        const enrollmentId = `${prefix}${String(studentCount + 1).padStart(5, "0")}`;

        await dbRun(
          `INSERT INTO students (
            id, firstName, lastName, email, phone, dateOfBirth, fatherName, address,
            batchId, program, enrollmentId, status, joinDate, createdAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            studentId,
            firstName,
            lastName,
            email,
            generatePhone(),
            generateDOB(),
            generateName().firstName + " " + generateName().lastName,
            generateAddress(),
            batchId,
            batchData[batchIdx].program,
            enrollmentId,
            "active",
            new Date().toISOString().split("T")[0],
            new Date().toISOString(),
          ]
        );

        studentIds.push(studentId);
        studentCount++;
      }
    }

    console.log(`Created ${studentCount} students`);

    // Enroll 15 random students in 2+ courses
    const selectedStudents = studentIds
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);

    for (const studentId of selectedStudents) {
      // Enroll in 2-3 random courses
      const numCourses = Math.floor(Math.random() * 2) + 2; // 2 or 3
      const selectedCourses = courseIds
        .sort(() => Math.random() - 0.5)
        .slice(0, numCourses);

      for (const course of selectedCourses) {
        const enrollmentId = randomUUID();
        await dbRun(
          `INSERT INTO student_courses (id, studentId, courseId, enrollmentDate) 
           VALUES (?, ?, ?, ?)`,
          [enrollmentId, studentId, course.id, new Date().toISOString()]
        );
      }
    }

    console.log(`Enrolled 15 students in multiple courses`);
    console.log("Database seeding completed successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

export { seedDatabase };
