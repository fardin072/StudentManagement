// IndexedDB database schema and helpers

export interface IBatch {
  id: number;
  name: string;
  program: string;
  fee: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  fatherName: string;
  address: string;
  batchId: number;
  program: string;
  enrollmentId: string;
  admissionId?: string;
  status: string;
  joinDate: string;
  createdAt: string;
}

export interface ICourse {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
}

export interface IStudentCourse {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
}

const DB_NAME = "BiologyCareHub";
const DB_VERSION = 1;

let dbInstance: IDBDatabase | null = null;

export async function initializeIndexedDB(): Promise<IDBDatabase> {
  if (dbInstance) {
    return dbInstance;
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create Batches object store
      if (!db.objectStoreNames.contains("batches")) {
        db.createObjectStore("batches", { keyPath: "id" });
      }

      // Create Students object store
      if (!db.objectStoreNames.contains("students")) {
        const studentStore = db.createObjectStore("students", { keyPath: "id" });
        studentStore.createIndex("batchId", "batchId", { unique: false });
        studentStore.createIndex("email", "email", { unique: true });
        studentStore.createIndex("enrollmentId", "enrollmentId", { unique: true });
      }

      // Create Courses object store
      if (!db.objectStoreNames.contains("courses")) {
        const courseStore = db.createObjectStore("courses", { keyPath: "id" });
        courseStore.createIndex("code", "code", { unique: true });
      }

      // Create StudentCourses (junction table)
      if (!db.objectStoreNames.contains("studentCourses")) {
        const scStore = db.createObjectStore("studentCourses", { keyPath: "id" });
        scStore.createIndex("studentId", "studentId", { unique: false });
        scStore.createIndex("courseId", "courseId", { unique: false });
        scStore.createIndex("studentCourse", ["studentId", "courseId"], { unique: true });
      }
    };
  });
}

export async function getDB(): Promise<IDBDatabase> {
  if (dbInstance) {
    return dbInstance;
  }
  return initializeIndexedDB();
}

// Batch operations
export async function getAllBatches(): Promise<IBatch[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("batches", "readonly");
    const store = transaction.objectStore("batches");
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getBatch(id: number): Promise<IBatch | undefined> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("batches", "readonly");
    const store = transaction.objectStore("batches");
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function addBatch(batch: IBatch): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("batches", "readwrite");
    const store = transaction.objectStore("batches");
    const request = store.add(batch);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function addBatches(batches: IBatch[]): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("batches", "readwrite");
    const store = transaction.objectStore("batches");

    batches.forEach((batch) => {
      store.put(batch); // Using put to allow overwrites
    });

    transaction.onerror = () => reject(transaction.error);
    transaction.oncomplete = () => resolve();
  });
}

// Student operations
export async function getAllStudents(): Promise<IStudent[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("students", "readonly");
    const store = transaction.objectStore("students");
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getStudent(id: string): Promise<IStudent | undefined> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("students", "readonly");
    const store = transaction.objectStore("students");
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getStudentsByBatch(batchId: number): Promise<IStudent[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("students", "readonly");
    const store = transaction.objectStore("students");
    const index = store.index("batchId");
    const request = index.getAll(batchId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function addStudent(student: IStudent): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("students", "readwrite");
    const store = transaction.objectStore("students");
    const request = store.add(student);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function addStudents(students: IStudent[]): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("students", "readwrite");
    const store = transaction.objectStore("students");

    students.forEach((student) => {
      store.put(student); // Using put to allow overwrites
    });

    transaction.onerror = () => reject(transaction.error);
    transaction.oncomplete = () => resolve();
  });
}

// Course operations
export async function getAllCourses(): Promise<ICourse[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("courses", "readonly");
    const store = transaction.objectStore("courses");
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getCourse(id: string): Promise<ICourse | undefined> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("courses", "readonly");
    const store = transaction.objectStore("courses");
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function addCourse(course: ICourse): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("courses", "readwrite");
    const store = transaction.objectStore("courses");
    const request = store.add(course);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function addCourses(courses: ICourse[]): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("courses", "readwrite");
    const store = transaction.objectStore("courses");

    courses.forEach((course) => {
      store.put(course);
    });

    transaction.onerror = () => reject(transaction.error);
    transaction.oncomplete = () => resolve();
  });
}

// Student Course operations
export async function getStudentCourses(studentId: string): Promise<ICourse[]> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["studentCourses", "courses"], "readonly");
    const scStore = transaction.objectStore("studentCourses");
    const courseStore = transaction.objectStore("courses");
    const index = scStore.index("studentId");
    const request = index.getAll(studentId);

    const courses: ICourse[] = [];

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const studentCourses = request.result;
      let completed = 0;

      if (studentCourses.length === 0) {
        resolve([]);
        return;
      }

      studentCourses.forEach((sc) => {
        const courseRequest = courseStore.get(sc.courseId);
        courseRequest.onsuccess = () => {
          if (courseRequest.result) {
            courses.push(courseRequest.result);
          }
          completed++;
          if (completed === studentCourses.length) {
            resolve(courses);
          }
        };
      });
    };
  });
}

export async function addStudentCourse(studentCourse: IStudentCourse): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("studentCourses", "readwrite");
    const store = transaction.objectStore("studentCourses");
    const request = store.add(studentCourse);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function addStudentCourses(studentCourses: IStudentCourse[]): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("studentCourses", "readwrite");
    const store = transaction.objectStore("studentCourses");

    studentCourses.forEach((sc) => {
      store.put(sc);
    });

    transaction.onerror = () => reject(transaction.error);
    transaction.oncomplete = () => resolve();
  });
}

// Utility: Clear all data
export async function clearDatabase(): Promise<void> {
  const db = await getDB();
  const stores = ["batches", "students", "courses", "studentCourses"];
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(stores, "readwrite");

    stores.forEach((storeName) => {
      transaction.objectStore(storeName).clear();
    });

    transaction.onerror = () => reject(transaction.error);
    transaction.oncomplete = () => resolve();
  });
}
