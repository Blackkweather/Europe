/**
 * Image URLs from the original europeanera.eu website.
 * Base: https://europeanera.eu/wp-content/uploads/2026/01/
 */
const BASE = "https://europeanera.eu/wp-content/uploads/2026/01";

export const images = {
  /** Hero – internships / Málaga (different from student mobility image) */
  hero: `${BASE}/Internships-Malaga.jpg`,
  /** Student mobility section */
  studentMobility: `${BASE}/Erasmus-Malaga.jpg`,
  /** Staff mobility / internships */
  staffMobility: `${BASE}/Internships-Malaga.jpg`,
  /** About – European Era staff */
  about: `${BASE}/European-Era-Staff-1024x683-1.jpg`,
  /** Testimonial – Lucinda Dillo (Nenagh College) */
  testimonialLucinda: `${BASE}/WhatsApp-Image-2022-04-22-at-5.19.54-PM.jpg`,
  /** Testimonial – Anna Kowalska (University of Agriculture in Kraków) */
  testimonialAnna: `${BASE}/WhatsApp-Image-2022-10-27-at-14.19.14.jpeg`,
  /** Testimonial – Marco Bianchi (ALMA Italy) */
  testimonialMarco: `${BASE}/DSC6925-javipicon-EUROPEANERA.jpg`,
} as const;
