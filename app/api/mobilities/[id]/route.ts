import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  getMobilityById,
  updateMobility,
  deleteMobility,
  type MobilityStatus,
  type MobilityType,
  type KeyActionSubtype,
} from "@/lib/mobilities-data";

const statuses: MobilityStatus[] = ["enquiry", "planned", "confirmed", "in_progress", "completed"];
const types: MobilityType[] = ["student", "staff"];
const keyActionSubtypes: KeyActionSubtype[] = ["mobility_studies", "traineeship", "staff_teaching", "staff_training"];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const mobility = getMobilityById(id);
  if (!mobility) {
    return NextResponse.json({ error: "Mobility not found" }, { status: 404 });
  }
  return NextResponse.json(mobility);
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
  const updates: Parameters<typeof updateMobility>[1] = {};
  if (typeof b.title === "string" && b.title.trim()) updates.title = b.title.trim();
  if (typeof b.school === "string") updates.school = b.school.trim();
  if (types.includes(b.type as MobilityType)) updates.type = b.type as MobilityType;
  if (typeof b.startDate === "string") updates.startDate = b.startDate.trim();
  if (typeof b.endDate === "string") updates.endDate = b.endDate.trim();
  if (statuses.includes(b.status as MobilityStatus)) updates.status = b.status as MobilityStatus;
  if (Array.isArray(b.studentIds)) {
    updates.studentIds = (b.studentIds as unknown[]).filter((id): id is string => typeof id === "string");
  }
  if (typeof b.country === "string") updates.country = b.country.trim() || undefined;
  if (typeof b.programme === "string") updates.programme = b.programme.trim() || undefined;
  if (typeof b.coordinatorName === "string") updates.coordinatorName = b.coordinatorName.trim() || undefined;
  if (typeof b.coordinatorEmail === "string") updates.coordinatorEmail = b.coordinatorEmail.trim() || undefined;
  if (typeof b.accommodation === "string") updates.accommodation = b.accommodation.trim() || undefined;
  if (typeof b.fundingCode === "string") updates.fundingCode = b.fundingCode.trim() || undefined;
  if (typeof b.hostInstitution === "string") updates.hostInstitution = b.hostInstitution.trim() || undefined;
  if (typeof b.projectReference === "string") updates.projectReference = b.projectReference.trim() || undefined;
  if (keyActionSubtypes.includes(b.keyActionSubtype as KeyActionSubtype)) updates.keyActionSubtype = b.keyActionSubtype as KeyActionSubtype;
  if (typeof b.agreementStartDate === "string") updates.agreementStartDate = b.agreementStartDate.trim() || undefined;
  if (typeof b.agreementEndDate === "string") updates.agreementEndDate = b.agreementEndDate.trim() || undefined;
  if (typeof b.plannedParticipantCount === "number" && Number.isInteger(b.plannedParticipantCount) && b.plannedParticipantCount >= 0) updates.plannedParticipantCount = b.plannedParticipantCount;
  if (typeof b.plannedParticipantCount === "string") {
    const n = parseInt(b.plannedParticipantCount, 10);
    if (!Number.isNaN(n) && n >= 0) updates.plannedParticipantCount = n;
  }
  if (typeof b.contactAtHostName === "string") updates.contactAtHostName = b.contactAtHostName.trim() || undefined;
  if (typeof b.contactAtHostEmail === "string") updates.contactAtHostEmail = b.contactAtHostEmail.trim() || undefined;
  if (typeof b.countryOfSendingInstitution === "string") updates.countryOfSendingInstitution = b.countryOfSendingInstitution.trim() || undefined;
  if (typeof b.notes === "string") updates.notes = b.notes.trim() || undefined;

  const mobility = updateMobility(id, updates);
  if (!mobility) {
    return NextResponse.json({ error: "Mobility not found" }, { status: 404 });
  }
  return NextResponse.json(mobility);
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
  const ok = deleteMobility(id);
  if (!ok) {
    return NextResponse.json({ error: "Mobility not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
