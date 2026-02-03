import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type MobilityStatus = "enquiry" | "planned" | "confirmed" | "in_progress" | "completed";
export type MobilityType = "student" | "staff";

/** Erasmus+ Key Action 1 mobility subtype */
export type KeyActionSubtype = "mobility_studies" | "traineeship" | "staff_teaching" | "staff_training";

export type Mobility = {
  id: string;
  title: string;
  /** Sending institution (home university/school) */
  school: string;
  type: MobilityType;
  startDate: string;
  endDate: string;
  status: MobilityStatus;
  studentIds: string[];
  /** Optional: host country */
  country?: string;
  /** Optional: programme name (e.g. Erasmus+ KA1) */
  programme?: string;
  /** Optional: coordinator at sending institution */
  coordinatorName?: string;
  /** Optional: coordinator email at sending institution */
  coordinatorEmail?: string;
  /** Optional: accommodation details */
  accommodation?: string;
  /** Optional: funding / grant code */
  fundingCode?: string;
  /** Optional: receiving / host institution (e.g. European Era) */
  hostInstitution?: string;
  /** Optional: Erasmus+ project or IIA reference */
  projectReference?: string;
  /** Optional: Key Action subtype */
  keyActionSubtype?: KeyActionSubtype;
  /** Optional: inter-institutional agreement start date */
  agreementStartDate?: string;
  /** Optional: inter-institutional agreement end date */
  agreementEndDate?: string;
  /** Optional: planned number of participants (for reporting) */
  plannedParticipantCount?: number;
  /** Optional: contact at host (European Era side) */
  contactAtHostName?: string;
  /** Optional: contact at host email */
  contactAtHostEmail?: string;
  /** Optional: country of sending institution */
  countryOfSendingInstitution?: string;
  notes?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const MOBILITIES_FILE = path.join(DATA_DIR, "mobilities.json");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readMobilities(): Mobility[] {
  try {
    if (!existsSync(MOBILITIES_FILE)) {
      ensureDataDir();
      writeFileSync(MOBILITIES_FILE, "[]", "utf-8");
      return [];
    }
    const raw = readFileSync(MOBILITIES_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Mobility[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMobilities(mobilities: Mobility[]): void {
  ensureDataDir();
  writeFileSync(MOBILITIES_FILE, JSON.stringify(mobilities, null, 2), "utf-8");
}

export function getMobilityById(id: string): Mobility | undefined {
  return readMobilities().find((m) => m.id === id);
}

export function createMobility(data: Omit<Mobility, "id" | "createdAt">): Mobility {
  const mobilities = readMobilities();
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const mobility: Mobility = { ...data, id, createdAt };
  mobilities.push(mobility);
  saveMobilities(mobilities);
  return mobility;
}

export function updateMobility(id: string, data: Partial<Omit<Mobility, "id" | "createdAt">>): Mobility | null {
  const mobilities = readMobilities();
  const index = mobilities.findIndex((m) => m.id === id);
  if (index === -1) return null;
  mobilities[index] = { ...mobilities[index], ...data };
  saveMobilities(mobilities);
  return mobilities[index];
}

export function deleteMobility(id: string): boolean {
  const mobilities = readMobilities().filter((m) => m.id !== id);
  if (mobilities.length === readMobilities().length) return false;
  saveMobilities(mobilities);
  return true;
}
