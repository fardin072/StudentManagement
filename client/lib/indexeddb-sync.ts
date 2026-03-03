import {
  clearDatabase,
  addBatches,
  addStudents,
  addCourses,
  addStudentCourses,
  type IBatch,
  type IStudent,
  type ICourse,
  type IStudentCourse,
} from "./indexeddb";

interface BatchResponse {
  batches: IBatch[];
}

interface StudentResponse {
  students: IStudent[];
}

interface CourseResponse {
  courses: ICourse[];
}

interface StudentCourseData {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
}

/**
 * Sync all data from server to IndexedDB
 */
export async function syncDatabaseFromServer(): Promise<void> {
  try {
    console.log("Starting database sync from server...");

    // Fetch all data in parallel with proper error handling
    const fetchBatches = fetch("/api/batches")
      .then((res) => {
        console.log("Batches response status:", res.status, res.ok);
        if (!res.ok) throw new Error(`Batches API failed: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.warn("Failed to fetch batches:", err);
        return { batches: [] };
      });

    const fetchStudents = fetch("/api/students")
      .then((res) => {
        console.log("Students response status:", res.status, res.ok);
        if (!res.ok) throw new Error(`Students API failed: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.warn("Failed to fetch students:", err);
        return { students: [] };
      });

    const fetchCourses = fetch("/api/courses")
      .then((res) => {
        console.log("Courses response status:", res.status, res.ok);
        if (!res.ok) throw new Error(`Courses API failed: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.warn("Failed to fetch courses:", err);
        return { courses: [] };
      });

    const [batchesRes, studentsRes, coursesRes] = await Promise.all([
      fetchBatches,
      fetchStudents,
      fetchCourses,
    ]);

    const batches: IBatch[] = batchesRes.batches || [];
    const students: IStudent[] = studentsRes.students || [];
    const courses: ICourse[] = coursesRes.courses || [];

    console.log(`Fetched ${batches.length} batches, ${students.length} students, ${courses.length} courses`);

    // Clear existing data
    await clearDatabase();

    // Populate IndexedDB
    await Promise.all([
      batches.length > 0 ? addBatches(batches) : Promise.resolve(),
      students.length > 0 ? addStudents(students) : Promise.resolve(),
      courses.length > 0 ? addCourses(courses) : Promise.resolve(),
    ]);

    console.log("Batches, students, and courses synced to IndexedDB");

    // Now fetch and sync student course enrollments
    await syncStudentCourseEnrollments();

    console.log("Database sync completed successfully!");
  } catch (error) {
    console.error("Error syncing database from server:", error);
    throw error;
  }
}

/**
 * Sync student course enrollments from the database
 * This is a bit tricky since we need to query the sqlite junction table
 * For now, we'll fetch a list of all student-course pairs
 */
async function syncStudentCourseEnrollments(): Promise<void> {
  try {
    // Fetch the raw database query result for all student courses
    // Since we don't have a direct endpoint, we'll need to create one or fetch from localStorage/cache
    const response = await fetch("/api/student-enrollments");

    if (!response.ok) {
      console.warn("Student enrollments endpoint not available, skipping enrollment sync");
      return;
    }

    const data = await response.json();
    const enrollments: IStudentCourse[] = data.enrollments || [];

    if (enrollments.length > 0) {
      await addStudentCourses(enrollments);
      console.log(`Synced ${enrollments.length} student course enrollments`);
    }
  } catch (error) {
    console.warn("Could not sync student enrollments:", error);
    // This is optional, so we don't throw
  }
}

/**
 * Check if database is already synced
 */
export async function isDatabaseSynced(): Promise<boolean> {
  try {
    const response = await fetch("/api/batches");
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Sync a single student from server to IndexedDB
 */
export async function syncStudent(studentId: string): Promise<IStudent | null> {
  try {
    const response = await fetch(`/api/students/${studentId}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const student: IStudent = data.student;

    await addStudents([student]);
    return student;
  } catch (error) {
    console.error("Error syncing student:", error);
    return null;
  }
}

/**
 * Sync a single batch from server to IndexedDB
 */
export async function syncBatch(batchId: number): Promise<IBatch | null> {
  try {
    const response = await fetch(`/api/batches/${batchId}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const batch: IBatch = data.batch;

    await addBatches([batch]);
    return batch;
  } catch (error) {
    console.error("Error syncing batch:", error);
    return null;
  }
}

/**
 * Sync a single course from server to IndexedDB
 */
export async function syncCourse(courseId: string): Promise<ICourse | null> {
  try {
    const response = await fetch(`/api/courses/${courseId}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const course: ICourse = data.course;

    await addCourses([course]);
    return course;
  } catch (error) {
    console.error("Error syncing course:", error);
    return null;
  }
}
