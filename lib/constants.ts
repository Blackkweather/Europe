/**
 * Contact and site information – single source of truth (DRY).
 * Do not hardcode contact data elsewhere.
 */
export const phoneDisplay = "+34 952 60 12 21";
export const phoneHref = "tel:+34952601221";
export const email = "info@europeanera.eu";
export const whatsappUrl = "https://wa.me/34952601221";
export const orgId = "E10008095";

/** Physical address (for display and map link) – from europeanera.eu/contact */
export const address = "C/ Reding 5, Bajo (La Malagueta), 29016 Málaga, Spain";
/** Optional: full Google Maps embed iframe URL (Share → Embed a map). If set, this is used instead of OSM. */
export const mapEmbedUrl = "";
/** Map center for OpenStreetMap embed when mapEmbedUrl is not set. [lat, lng] – Calle Reding 5, Málaga */
export const mapCenter: [number, number] = [36.7187, -4.4198];
/** Google Maps link for "Open in Maps" (search query or place URL). */
export const mapLink = "https://www.google.com/maps?q=" + encodeURIComponent(address);
/** Erasmus+ internships brochure PDF (Dossier european-era) */
export const brochureUrl =
  "https://europeanera.eu/wp-content/uploads/2026/01/Dossier-european-era-7_11.pdf";
/** Hero background video (mp4). Set to your video URL for video + yellow cube; leave "" for image only. */
export const heroVideoUrl = "";
export const privacyPolicyUrl = "/privacy-policy";
export const legalUrl = "/aviso-legal";
