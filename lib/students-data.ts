import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type StudentStatus = "enquiry" | "confirmed" | "in_malaga" | "completed";
export type MobilityType = "student" | "staff";

/** Erasmus+ participant type (Key Action 1) */
export type ParticipantType = "student_studies" | "student_traineeship" | "staff_teaching" | "staff_training";

/** Learning agreement status */
export type LearningAgreementStatus = "not_required" | "sent" | "signed" | "pending";

export type Student = {
  id: string;
  name: string;
  email: string;
  /** Sending institution (home university/school) */
  school: string;
  country: string;
  mobilityType: MobilityType;
  status: StudentStatus;
  startDate?: string;
  endDate?: string;
  mobilityId?: string;
  /** Optional: phone number */
  phone?: string;
  /** Optional: programme name (e.g. Erasmus+ KA1) */
  programme?: string;
  /** Optional: accommodation details */
  accommodation?: string;
  /** Optional: emergency contact */
  emergencyContact?: string;
  /** Optional: dietary requirements */
  dietaryRequirements?: string;
  /** Optional: arrival flight / travel details */
  arrivalDetails?: string;
  /** Optional: departure flight / travel details */
  departureDetails?: string;
  /** Optional: field of study or teaching area */
  fieldOfStudy?: string;
  /** Optional: Erasmus+ participant type */
  participantType?: ParticipantType;
  /** Optional: learning agreement status */
  learningAgreementStatus?: LearningAgreementStatus;
  /** Optional: duration of stay in weeks */
  durationWeeks?: number;
  /** Optional: visa / insurance / preparation notes */
  preparationNotes?: string;
  notes?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const STUDENTS_FILE = path.join(DATA_DIR, "students.json");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readStudents(): Student[] {
  try {
    if (!existsSync(STUDENTS_FILE)) {
      ensureDataDir();
      writeFileSync(STUDENTS_FILE, "[]", "utf-8");
      return [];
    }
    const raw = readFileSync(STUDENTS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Student[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStudents(students: Student[]): void {
  ensureDataDir();
  writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2), "utf-8");
}

export function getStudentById(id: string): Student | undefined {
  return readStudents().find((s) => s.id === id);
}

export function createStudent(data: Omit<Student, "id" | "createdAt">): Student {
  const students = readStudents();
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const student: Student = { ...data, id, createdAt };
  students.push(student);
  saveStudents(students);
  return student;
}

export function updateStudent(id: string, data: Partial<Omit<Student, "id" | "createdAt">>): Student | null {
  const students = readStudents();
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return null;
  students[index] = { ...students[index], ...data };
  saveStudents(students);
  return students[index];
}

export function deleteStudent(id: string): boolean {
  const students = readStudents().filter((s) => s.id !== id);
  if (students.length === readStudents().length) return false;
  saveStudents(students);
  return true;
}
