import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { readMobilities, createMobility, type Mobility, type MobilityStatus, type MobilityType, type KeyActionSubtype } from "@/lib/mobilities-data";

const statuses: MobilityStatus[] = ["enquiry", "planned", "confirmed", "in_progress", "completed"];
const types: MobilityType[] = ["student", "staff"];
const keyActionSubtypes: KeyActionSubtype[] = ["mobility_studies", "traineeship", "staff_teaching", "staff_training"];

function validateMobilityBody(body: unknown): { error?: string; data?: Omit<Mobility, "id" | "createdAt"> } {
  if (!body || typeof body !== "object") return { error: "Invalid body" };
  const b = body as Record<string, unknown>;
  const title = typeof b.title === "string" ? b.title.trim() : "";
  const school = typeof b.school === "string" ? b.school.trim() : "";
  const type = types.includes(b.type as MobilityType) ? (b.type as MobilityType) : "student";
  const startDate = typeof b.startDate === "string" ? b.startDate.trim() : "";
  const endDate = typeof b.endDate === "string" ? b.endDate.trim() : "";
  const status = statuses.includes(b.status as MobilityStatus) ? (b.status as MobilityStatus) : "enquiry";
  const studentIds = Array.isArray(b.studentIds)
    ? (b.studentIds as unknown[]).filter((id): id is string => typeof id === "string")
    : [];
  if (!title) return { error: "Title is required" };
  if (!school) return { error: "School is required" };
  if (!startDate) return { error: "Start date is required" };
  if (!endDate) return { error: "End date is required" };
  return {
    data: {
      title,
      school,
      type,
      startDate,
      endDate,
      status,
      studentIds,
      country: typeof b.country === "string" ? b.country.trim() || undefined : undefined,
      programme: typeof b.programme === "string" ? b.programme.trim() || undefined : undefined,
      coordinatorName: typeof b.coordinatorName === "string" ? b.coordinatorName.trim() || undefined : undefined,
      coordinatorEmail: typeof b.coordinatorEmail === "string" ? b.coordinatorEmail.trim() || undefined : undefined,
      accommodation: typeof b.accommodation === "string" ? b.accommodation.trim() || undefined : undefined,
      fundingCode: typeof b.fundingCode === "string" ? b.fundingCode.trim() || undefined : undefined,
      hostInstitution: typeof b.hostInstitution === "string" ? b.hostInstitution.trim() || undefined : undefined,
      projectReference: typeof b.projectReference === "string" ? b.projectReference.trim() || undefined : undefined,
      keyActionSubtype: keyActionSubtypes.includes(b.keyActionSubtype as KeyActionSubtype) ? (b.keyActionSubtype as KeyActionSubtype) : undefined,
      agreementStartDate: typeof b.agreementStartDate === "string" ? b.agreementStartDate.trim() || undefined : undefined,
      agreementEndDate: typeof b.agreementEndDate === "string" ? b.agreementEndDate.trim() || undefined : undefined,
      plannedParticipantCount: typeof b.plannedParticipantCount === "number" && Number.isInteger(b.plannedParticipantCount) && b.plannedParticipantCount >= 0 ? b.plannedParticipantCount : typeof b.plannedParticipantCount === "string" ? (parseInt(b.plannedParticipantCount, 10) || undefined) : undefined,
      contactAtHostName: typeof b.contactAtHostName === "string" ? b.contactAtHostName.trim() || undefined : undefined,
      contactAtHostEmail: typeof b.contactAtHostEmail === "string" ? b.contactAtHostEmail.trim() || undefined : undefined,
      countryOfSendingInstitution: typeof b.countryOfSendingInstitution === "string" ? b.countryOfSendingInstitution.trim() || undefined : undefined,
      notes: typeof b.notes === "string" ? b.notes.trim() || undefined : undefined,
    },
  };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const mobilities = readMobilities().sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  return NextResponse.json(mobilities);
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
  const result = validateMobilityBody(body);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  if (!result.data) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
  const mobility = createMobility(result.data);
  return NextResponse.json(mobility, { status: 201 });
}
