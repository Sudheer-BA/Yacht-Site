const folder = "images/gallery";
const hero = ["1-yacht.jpg", "2-yacht.jpg", "3-yacht.jpg"];

module.exports = {
  folder,
  hero,
  heroUrls: hero.map((f) => `/${folder}/${f}`),
  list: [],
};
