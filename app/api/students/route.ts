import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { readStudents, createStudent, type Student, type StudentStatus, type MobilityType, type ParticipantType, type LearningAgreementStatus } from "@/lib/students-data";

const statuses: StudentStatus[] = ["enquiry", "confirmed", "in_malaga", "completed"];
const types: MobilityType[] = ["student", "staff"];
const participantTypes: ParticipantType[] = ["student_studies", "student_traineeship", "staff_teaching", "staff_training"];
const learningAgreementStatuses: LearningAgreementStatus[] = ["not_required", "sent", "signed", "pending"];

function validateStudentBody(body: unknown): { error?: string; data?: Omit<Student, "id" | "createdAt"> } {
  if (!body || typeof body !== "object") return { error: "Invalid body" };
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const school = typeof b.school === "string" ? b.school.trim() : "";
  const country = typeof b.country === "string" ? b.country.trim() : "";
  const mobilityType = types.includes(b.mobilityType as MobilityType) ? (b.mobilityType as MobilityType) : "student";
  const status = statuses.includes(b.status as StudentStatus) ? (b.status as StudentStatus) : "enquiry";
  if (!name) return { error: "Name is required" };
  if (!email) return { error: "Email is required" };
  if (!school) return { error: "School is required" };
  if (!country) return { error: "Country is required" };
  return {
    data: {
      name,
      email,
      school,
      country,
      mobilityType,
      status,
      startDate: typeof b.startDate === "string" ? b.startDate.trim() || undefined : undefined,
      endDate: typeof b.endDate === "string" ? b.endDate.trim() || undefined : undefined,
      mobilityId: typeof b.mobilityId === "string" ? b.mobilityId.trim() || undefined : undefined,
      phone: typeof b.phone === "string" ? b.phone.trim() || undefined : undefined,
      programme: typeof b.programme === "string" ? b.programme.trim() || undefined : undefined,
      accommodation: typeof b.accommodation === "string" ? b.accommodation.trim() || undefined : undefined,
      emergencyContact: typeof b.emergencyContact === "string" ? b.emergencyContact.trim() || undefined : undefined,
      dietaryRequirements: typeof b.dietaryRequirements === "string" ? b.dietaryRequirements.trim() || undefined : undefined,
      arrivalDetails: typeof b.arrivalDetails === "string" ? b.arrivalDetails.trim() || undefined : undefined,
      departureDetails: typeof b.departureDetails === "string" ? b.departureDetails.trim() || undefined : undefined,
      fieldOfStudy: typeof b.fieldOfStudy === "string" ? b.fieldOfStudy.trim() || undefined : undefined,
      participantType: participantTypes.includes(b.participantType as ParticipantType) ? (b.participantType as ParticipantType) : undefined,
      learningAgreementStatus: learningAgreementStatuses.includes(b.learningAgreementStatus as LearningAgreementStatus) ? (b.learningAgreementStatus as LearningAgreementStatus) : undefined,
      durationWeeks: typeof b.durationWeeks === "number" && Number.isInteger(b.durationWeeks) && b.durationWeeks >= 0 ? b.durationWeeks : typeof b.durationWeeks === "string" ? (parseInt(b.durationWeeks, 10) || undefined) : undefined,
      preparationNotes: typeof b.preparationNotes === "string" ? b.preparationNotes.trim() || undefined : undefined,
      notes: typeof b.notes === "string" ? b.notes.trim() || undefined : undefined,
    },
  };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const students = readStudents().sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const result = validateStudentBody(body);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  if (!result.data) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
  const student = createStudent(result.data);
  return NextResponse.json(student, { status: 201 });
}
