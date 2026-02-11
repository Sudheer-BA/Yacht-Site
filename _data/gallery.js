const folder = "images/gallery";
const gallery = Array.from({ length: 121 }, (_, i) => `${i + 1}-yacht.jpg`);

module.exports = {
  urls: gallery.map((f) => `/${folder}/${f}`),
};
