import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
  content: string;
  category?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "blog-posts.json");

const initialPosts: BlogPost[] = [
  {
    slug: "erasmus-plus-malaga-guide",
    title: "Erasmus+ in Málaga: A Complete Guide for Coordinators",
    excerpt:
      "Everything you need to know about organising Erasmus+ mobilities in Málaga, from accommodation to cultural activities.",
    date: "2024-11-15",
    author: "European Era Team",
    image: "https://europeanera.eu/wp-content/uploads/2026/01/Erasmus-Malaga.jpg",
    category: "Student Mobility",
    content: `Málaga is one of the most popular destinations for Erasmus+ student and staff mobilities. With its rich culture, excellent transport links, and year-round sunshine, it offers an ideal environment for learning and professional development.

## Why Málaga?

The city combines a vibrant international atmosphere with authentic Andalusian culture. Students and staff benefit from:

- **Quality placements** across a wide range of sectors
- **Safe, well-connected accommodation** close to placements and city centre
- **Cultural activities** that enrich the mobility experience
- **Support in English and Spanish** throughout the stay

Málaga is well connected by air and rail, making it easy for groups to arrive from across Europe. The compact city centre means that accommodation, placements, and cultural sites are within reach without long commutes. Many of our partners return year after year, drawn by the combination of professional quality and the quality of life that Málaga offers.

## What a Typical Mobility Looks Like

From the moment you get in touch, we work with you to define learning objectives, match students or staff to suitable placements, and arrange accommodation and transport. We handle the practical details so that coordinators can focus on pedagogy and participants can focus on learning. During the stay, our team is on hand for any questions or adjustments. The final evaluation and documentation are completed together, ensuring that your organisation has everything needed for reporting and future applications.

## How We Support You

European Era manages every detail of your mobility: from the first enquiry to the final evaluation. We work with Erasmus+ coordinators and VET administrators to ensure a seamless process for both groups and individuals.

We specialise in **student internships** across sectors such as hospitality, education, health, and business, as well as **teacher training** and job shadowing. Whether you are planning a short preparatory visit or a longer mobility, we tailor the programme to your goals and your participants' needs.

Contact us to start planning your next mobility in Málaga.`,
  },
  {
    slug: "teacher-training-courses-malaga",
    title: "Teacher Training Courses in Málaga: What to Expect",
    excerpt:
      "Discover how our tailored teacher training courses support professional development and career growth.",
    date: "2024-10-20",
    author: "European Era Team",
    image: "https://europeanera.eu/wp-content/uploads/2026/01/Internships-Malaga.jpg",
    category: "Staff Mobility",
    content: `Our teacher training courses in Málaga are designed to meet the diverse needs of educators and professionals. Whether you are looking to develop new skills, explore innovative methodologies, or connect with peers from across Europe, we offer flexible learning options that fit your goals.

## Course Highlights

- **Tailored programmes** aligned with Erasmus+ priorities
- **Job shadowing and preparatory visits** to support your planning
- **Cultural immersion** in one of Spain's most dynamic cities
- **Ongoing support** before, during, and after your stay

Programmes can focus on language teaching, school leadership, inclusive education, digital tools, or other themes that match your institution's development plan. We work with local schools and training providers to ensure that the content is relevant, practical, and aligned with European frameworks.

## Who It's For

Our teacher training and staff mobility options are ideal for **school and VET staff**, **Erasmus+ coordinators** planning a preparatory visit, and **teams** looking for shared professional development. Group sizes can vary; we adapt the programme and accommodation to your needs. Many of our partners use these mobilities to strengthen their Erasmus+ applications and to build long-term links with organisations in Málaga.

## Inclusivity and Sustainability

We are committed to empowering personal growth and promoting inclusivity and sustainability through exceptional mobility management. Our high rate of repeat educational centres reflects the quality and care we put into every programme.

We take care of logistics, accommodation, and local coordination so that you can concentrate on learning and networking. From the first enquiry to the final report, we support you at every step.

Get in touch to find out how we can support your next staff mobility.`,
  },
  {
    slug: "why-choose-european-era",
    title: "Why Educational Centres Choose European Era",
    excerpt:
      "What sets us apart: our commitment to personalised attention, quality placements, and a seamless Erasmus+ experience.",
    date: "2024-09-08",
    author: "European Era Team",
    image: "https://europeanera.eu/wp-content/uploads/2026/01/European-Era-Staff-1024x683-1.jpg",
    category: "About",
    content: `European Era specialises in arranging student internships and teacher training courses in Málaga, Spain. We manage every detail—from accommodation and transport to tailored placements and educational programmes—so that coordinators and participants can focus on what matters most: learning and growth.

## Our Approach

We bring enthusiasm and a personal touch to supporting **Erasmus+ coordinators**. Our expertise in education and international mobility, combined with genuine dedication, ensures top-quality services. We take pride in our commitment to personalised attention: every group has unique needs, and we work to meet them with thoughtful, end-to-end management.

We work with **VET colleges**, **schools**, and **universities** across Europe. Our role is to simplify the practical side of mobility: finding the right placements, securing accommodation, organising cultural activities, and supporting participants and coordinators throughout the stay. That way, your institution can concentrate on learning outcomes and reporting, while we handle the logistics on the ground in Málaga.

## A Partner You Can Trust

With us, you will find not just a professional partner, but a friendly, energetic team eager to support your success and make every interaction enjoyable. We provide comprehensive support for Erasmus+ applications, ensuring a seamless and effective process.

Our high rate of **repeat educational centres** reflects the trust that coordinators place in us. Once a group has experienced a mobility with European Era, many return for future projects or recommend us to colleagues. We see our work as a long-term partnership: we invest in understanding your goals and your participants, so that each mobility builds on the last.

## Next Steps

Whether you are at the early stages of planning or ready to fix dates and placements, we are here to help. Get in touch to discuss your objectives, ask questions about Málaga and our services, or request a tailored proposal for your next Erasmus+ mobility.

Contact us to learn more about working with European Era.`,
  },
];

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readPosts(): BlogPost[] {
  try {
    if (!existsSync(POSTS_FILE)) {
      ensureDataDir();
      writeFileSync(POSTS_FILE, JSON.stringify(initialPosts, null, 2), "utf-8");
      return initialPosts;
    }
    const raw = readFileSync(POSTS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as BlogPost[];
    return Array.isArray(parsed) ? parsed : initialPosts;
  } catch {
    return initialPosts;
  }
}

export function savePosts(posts: BlogPost[]): void {
  ensureDataDir();
  writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

/** Generate URL-safe slug from title */
export function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
