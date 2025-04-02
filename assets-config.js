export const assetDir = "assets"; // Папка для разработки
export const entryFileNames = "js/[name].js";
export const chunkFileNames = "js/[name]-[hash]-chunk.js";

const assets = [
  {
    output: "img/[hash][extname]", // Изображения
    regex: /\.(png|jpe?g|gif|svg|webp|avif)$/,
  },
  {
    output: "[name][extname]", // CSS в корне директории
    regex: /\.css$/,
  },
  {
    output: "js/[name][extname]", // JS файлы
    regex: /\.jsx?$/,
  },
  {
    output: "fonts/[name][extname]", // Шрифты
    regex: /\.(ttf|otf|fnt|woff|woff2)$/,
  },
];

export function processAssetFileNames(info) {
  if (info && info.name) {
    const name = info.name;
    const result = assets.find((a) => a.regex.test(name));
    if (result) {
      return result.output; // Возвращаем правильный путь для файла
    }
  }
  // Если не нашли соответствие, возвращаем имя файла по умолчанию
  return "[name][extname]";
}
