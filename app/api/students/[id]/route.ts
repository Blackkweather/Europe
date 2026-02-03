import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  getStudentById,
  updateStudent,
  deleteStudent,
  type StudentStatus,
  type MobilityType,
  type ParticipantType,
  type LearningAgreementStatus,
} from "@/lib/students-data";

const statuses: StudentStatus[] = ["enquiry", "confirmed", "in_malaga", "completed"];
const types: MobilityType[] = ["student", "staff"];
const participantTypes: ParticipantType[] = ["student_studies", "student_traineeship", "staff_teaching", "staff_training"];
const learningAgreementStatuses: LearningAgreementStatus[] = ["not_required", "sent", "signed", "pending"];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const student = getStudentById(id);
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }
  return NextResponse.json(student);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const updates: Parameters<typeof updateStudent>[1] = {};
  if (typeof b.name === "string" && b.name.trim()) updates.name = b.name.trim();
  if (typeof b.email === "string" && b.email.trim()) updates.email = b.email.trim();
  if (typeof b.school === "string") updates.school = b.school.trim();
  if (typeof b.country === "string") updates.country = b.country.trim();
  if (types.includes(b.mobilityType as MobilityType)) updates.mobilityType = b.mobilityType as MobilityType;
  if (statuses.includes(b.status as StudentStatus)) updates.status = b.status as StudentStatus;
  if (typeof b.startDate === "string") updates.startDate = b.startDate.trim() || undefined;
  if (typeof b.endDate === "string") updates.endDate = b.endDate.trim() || undefined;
  if (typeof b.mobilityId === "string") updates.mobilityId = b.mobilityId.trim() || undefined;
  if (typeof b.phone === "string") updates.phone = b.phone.trim() || undefined;
  if (typeof b.programme === "string") updates.programme = b.programme.trim() || undefined;
  if (typeof b.accommodation === "string") updates.accommodation = b.accommodation.trim() || undefined;
  if (typeof b.emergencyContact === "string") updates.emergencyContact = b.emergencyContact.trim() || undefined;
  if (typeof b.dietaryRequirements === "string") updates.dietaryRequirements = b.dietaryRequirements.trim() || undefined;
  if (typeof b.arrivalDetails === "string") updates.arrivalDetails = b.arrivalDetails.trim() || undefined;
  if (typeof b.departureDetails === "string") updates.departureDetails = b.departureDetails.trim() || undefined;
  if (typeof b.fieldOfStudy === "string") updates.fieldOfStudy = b.fieldOfStudy.trim() || undefined;
  if (participantTypes.includes(b.participantType as ParticipantType)) updates.participantType = b.participantType as ParticipantType;
  if (learningAgreementStatuses.includes(b.learningAgreementStatus as LearningAgreementStatus)) updates.learningAgreementStatus = b.learningAgreementStatus as LearningAgreementStatus;
  if (typeof b.durationWeeks === "number" && Number.isInteger(b.durationWeeks) && b.durationWeeks >= 0) updates.durationWeeks = b.durationWeeks;
  if (typeof b.durationWeeks === "string") {
    const n = parseInt(b.durationWeeks, 10);
    if (!Number.isNaN(n) && n >= 0) updates.durationWeeks = n;
  }
  if (typeof b.preparationNotes === "string") updates.preparationNotes = b.preparationNotes.trim() || undefined;
  if (typeof b.notes === "string") updates.notes = b.notes.trim() || undefined;

  const student = updateStudent(id, updates);
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }
  return NextResponse.json(student);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const ok = deleteStudent(id);
  if (!ok) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
