import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Функция перевода строки в kebab-case
function toKebabCase(str) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Разделяет CamelCase
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')                // Заменяет пробелы и нижние подчеркивания
        .toLowerCase();
}

function processDirectory(targetDir) {
    if (!fs.existsSync(targetDir)) return;

    const items = fs.readdirSync(targetDir);

    for (const item of items) {
        // Пропускаем системные файлы Next.js, которые должны оставаться с нижним подчеркиванием
        if (['_app.tsx', '_document.tsx', '_error.tsx'].includes(item)) continue;

        const oldPath = path.join(targetDir, item);
        const stats = fs.statSync(oldPath);

        const ext = path.extname(item);
        const nameWithoutExt = path.basename(item, ext);

        // Формируем новое имя в kebab-case
        const newName = toKebabCase(nameWithoutExt) + ext.toLowerCase();
        const newPath = path.join(targetDir, newName);

        let finalPath = oldPath;
        if (item !== newName) {
            console.log(`Переименование: ${oldPath} -> ${newPath}`);
            fs.renameSync(oldPath, newPath);
            finalPath = newPath;
        }

        // Если это папка, идем вглубь
        if (stats.isDirectory()) {
            processDirectory(finalPath);
        }
    }
}

// Запускаем только для папки src, чтобы не сломать корневые конфиги
const srcPath = path.join(__dirname, 'src');
console.log('Начало приведения файлов к единому формату kebab-case...');
processDirectory(srcPath);
console.log('Готово!');
