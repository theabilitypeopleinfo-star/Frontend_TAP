const pdfModules = import.meta.glob('../assets/*.{pdf,PDF}', { eager: true, import: 'default' });
const imageModules = import.meta.glob('../assets/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: true, import: 'default' });

const excludePdfKeywords = ['report', 'Brochure', 'Flyer', 'ADCP ORDER', 'newsletter', 'news letter'];

const pressFiles = [];

for (const [path, url] of Object.entries(pdfModules)) {
  const fileName = path.split('/').pop();
  if (excludePdfKeywords.some(kw => fileName.toLowerCase().includes(kw.toLowerCase()))) {
    continue;
  }
  pressFiles.push({ path, url, fileName, fileType: 'pdf' });
}

// Explicit press images or known newspaper names
for (const [path, url] of Object.entries(imageModules)) {
  const fileName = path.split('/').pop();
  const lowerName = fileName.toLowerCase();
  
  // Try to grab only image files that are likely newspaper clippings
  if (
    lowerName.includes('eenadu') || 
    lowerName.includes('cronichle') || 
    lowerName.includes('sakshi') || 
    lowerName.includes('hindu') ||
    lowerName.includes('article')
  ) {
    if (!lowerName.includes('logo')) {
      pressFiles.push({ path, url, fileName, fileType: 'image' });
    }
  }
}

function cleanTitle(fileName) {
  // Remove extension
  let name = fileName.replace(/\.[^/.]+$/, "");
  
  // Replace underscores and hyphens with spaces for readability, 
  // but let's just do minimal cleanup so it remains recognizable as requested.
  // "Keep names close to the original file name so I can still recognize which physical file it maps to"
  // Example: sakhi-3-6-2012 → Sakhi - 3-6-2012
  
  // We'll just replace underscores with spaces, maybe uppercase first letter
  name = name.replace(/_/g, ' ');
  return name;
}

export const NEWS_ARTICLES = pressFiles.map(file => ({
  title: cleanTitle(file.fileName),
  fileName: file.fileName,
  fileType: file.fileType,
  filePath: file.url,
})).sort((a, b) => a.title.localeCompare(b.title));
