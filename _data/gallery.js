const folder = "images/gallery";

function imageUrl(n) {
  return `/${folder}/${n}-yacht.jpg`;
}

function toImages(numbers, captionIndex = null, caption = "") {
  return numbers.map((n, i) => ({
    url: imageUrl(n),
    ...(captionIndex === i && caption ? { caption } : {}),
  }));
}

const sectionsRaw = [
  {
    id: "presence-approach",
    title: "Presence & Approach",
    sectionCaption: "Profile at rest. A study in proportion and poise.",
    images: toImages([1, 2, 3, 4, 17, 18, 19, 20]),
  },
  {
    id: "underway",
    title: "Underway",
    sectionCaption: "Measured power across open water.",
    images: toImages([5, 6, 9, 10, 21, 22, 109, 110]),
  },
  {
    id: "outdoor-flybridge",
    title: "Outdoor Living & Flybridge",
    sectionCaption: "Open decks designed for horizon views and unhurried gathering.",
    images: toImages([25, 26, 29, 30, 31, 33, 34, 36, 37, 38, 39, 41, 42, 43, 45, 46, 61, 63]),
  },
  {
    id: "interior-living",
    title: "Interior Living Spaces",
    sectionCaption: "Crafted finishes, natural light, and quiet comfort within.",
    images: toImages([49, 50, 51, 52, 53, 55, 56, 57, 58, 59, 60, 77, 78, 80, 81, 82, 83, 84]),
  },
  {
    id: "staterooms",
    title: "Staterooms & Private Retreat",
    sectionCaption: "Private accommodations designed for extended cruising.",
    images: toImages([85, 86, 88, 89, 90, 91, 92, 94, 95, 96, 97, 98, 100, 101, 102, 103, 105, 106, 107, 108]),
  },
  {
    id: "closing-horizon",
    title: "Closing Horizon",
    sectionCaption: "Endless water. Enduring presence.",
    images: toImages([111, 112, 114, 116, 118, 120]),
  },
];

let idx = 0;
const sections = sectionsRaw.map((s) => {
  const startIndex = idx;
  idx += s.images.length;
  return { ...s, startIndex };
});

const urls = sections.flatMap((s) => s.images.map((img) => img.url));

module.exports = {
  urls,
  sections,
};
