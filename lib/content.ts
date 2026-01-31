/**
 * Shared content for services – used on home preview and full pages.
 */
export const studentMobility = {
  title: "Student mobility",
  slug: "student-mobilities",
  content:
    "Streamlining International Opportunities in Málaga. Based in the vibrant city of **Málaga, Spain,** we actively collaborate with Erasmus+ coordinators and VET college administrators to streamline the arrangement of relevant internships across various sectors. Our comprehensive services **simplify the process for both coordinators and students**, covering every detail from accommodation and transport to the management of student placements. To ensure a well-rounded experience, we also offer engaging cultural activities, ensuring that students fully enjoy their time in Málaga.",
};

export const staffMobility = {
  title: "Staff Mobility",
  slug: "staff-mobility",
  content:
    "Enhancing Professional Development. We are dedicated to supporting **educators and professionals** through tailored training courses designed to meet diverse needs. Our flexible learning options foster **skill development and career growth,** ensuring continuous professional advancement. Additionally, we provide valuable job shadowing opportunities and preparatory visits as part of our comprehensive services.",
};

export const services = [studentMobility, staffMobility] as const;

/** Image URLs from original europeanera.eu */
const testimonialImages = {
  lucinda: "https://europeanera.eu/wp-content/uploads/2026/01/WhatsApp-Image-2022-04-22-at-5.19.54-PM.jpg",
  anna: "https://europeanera.eu/wp-content/uploads/2026/01/WhatsApp-Image-2022-10-27-at-14.19.14.jpeg",
  marco: "https://europeanera.eu/wp-content/uploads/2026/01/DSC6925-javipicon-EUROPEANERA.jpg",
};

export const testimonialsData = [
  {
    quote:
      "My colleagues and I spent five happy days undertaking continuous professional development in Málaga. I highly recommend European Era. We came home energized by our experiences, with many happy memories and with a plan to further our professional lives.",
    author: "Lucinda Dillo",
    org: "Nenagh College",
    image: testimonialImages.lucinda,
  },
  {
    quote:
      "My colleagues and I spent five happy days undertaking continuous professional development in Málaga. I highly recommend European Era. We came home energized by our experiences, with many happy memories and with a plan to further our professional lives.",
    author: "Anna Kowalska",
    org: "University of Agriculture in Kraków",
    image: testimonialImages.anna,
  },
  {
    quote:
      "My Erasmus+ traineeship in Málaga was both professionally and personally rewarding. European Era supported me throughout the entire process, allowing me to focus on learning and enjoying the experience. I returned home with new skills, great memories, and a clearer vision of my professional future. I would highly recommend European Era to other students.",
    author: "Marco Bianchi",
    org: "ALMA – The International School of Italian Cuisine (Italy)",
    image: testimonialImages.marco,
  },
] as const;

/** Parse **bold** markers into React nodes */
export function parseBold(text: string): (string | { bold: string })[] {
  const parts: (string | { bold: string })[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    const start = remaining.indexOf("**");
    if (start === -1) {
      parts.push(remaining);
      break;
    }
    const end = remaining.indexOf("**", start + 2);
    if (end === -1) {
      parts.push(remaining);
      break;
    }
    parts.push(remaining.slice(0, start));
    parts.push({ bold: remaining.slice(start + 2, end) });
    remaining = remaining.slice(end + 2);
  }
  return parts;
}
