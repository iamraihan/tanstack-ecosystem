import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to watch for barrel generation
const WATCH_DIRECTORIES = [
  'src/components/ui',
  'src/components/features',
  'src/services',
  'src/hooks',
  'src/utils',
  'src/lib',
  'src/types',
];

// File extensions to include
const INCLUDED_EXTENSIONS = ['.ts', '.tsx'];

// Files to exclude
const EXCLUDED_FILES = ['index.ts', 'index.tsx'];

function generateBarrelFile(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    const exportStatements = [];
    const typeExportStatements = [];

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Check if directory has an index file
        const indexPath = path.join(filePath, 'index.ts');
        if (fs.existsSync(indexPath)) {
          exportStatements.push(`export * from './${file}';`);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);

        if (
          INCLUDED_EXTENSIONS.includes(ext) &&
          !EXCLUDED_FILES.includes(file)
        ) {
          // Check if file has default export
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('export default')) {
            exportStatements.push(
              `export { default as ${name} } from './${name}';`
            );
          }

          // Check for named exports (functions, classes, const)
          const namedExports = content.match(
            /export\s+(?:const|function|class)\s+(\w+)/g
          );
          if (namedExports) {
            namedExports.forEach(exportStatement => {
              const match = exportStatement.match(
                /export\s+(?:const|function|class)\s+(\w+)/
              );
              if (match) {
                exportStatements.push(
                  `export { ${match[1]} } from './${name}';`
                );
              }
            });
          }

          // Check for type/interface exports
          const typeExports = content.match(
            /export\s+(?:interface|type)\s+(\w+)/g
          );
          if (typeExports) {
            typeExports.forEach(exportStatement => {
              const match = exportStatement.match(
                /export\s+(?:interface|type)\s+(\w+)/
              );
              if (match) {
                typeExportStatements.push(
                  `export type { ${match[1]} } from './${name}';`
                );
              }
            });
          }
        }
      }
    });

    const allExports = [...typeExportStatements, ...exportStatements];

    if (allExports.length > 0) {
      const barrelContent = allExports.join('\n') + '\n';
      const indexPath = path.join(directoryPath, 'index.ts');
      fs.writeFileSync(indexPath, barrelContent);
      console.log(`✅ Generated barrel file: ${indexPath}`);
    }
  } catch (error) {
    console.error(
      `❌ Error generating barrel for ${directoryPath}:`,
      error.message
    );
  }
}

function generateBarrelFilesRecursively(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return;
  }

  // Generate barrel for current directory
  generateBarrelFile(directoryPath);

  // Recursively generate barrels for subdirectories
  const files = fs.readdirSync(directoryPath);
  files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      generateBarrelFilesRecursively(filePath);
    }
  });
}

function updateParentBarrels(changedFilePath) {
  // Get the directory where the file was changed
  const changedDir = path.dirname(changedFilePath);

  // Update barrel for the changed directory
  generateBarrelFile(changedDir);

  // Update all parent directories that are in our watch list
  let currentDir = changedDir;
  while (currentDir !== path.dirname(currentDir)) {
    // Stop at root
    const parentDir = path.dirname(currentDir);

    // Check if parent directory is in our watch list
    const isWatchedParent = WATCH_DIRECTORIES.some(watchDir => {
      const fullWatchPath = path.resolve(watchDir);
      return (
        parentDir === fullWatchPath ||
        parentDir.startsWith(fullWatchPath + path.sep)
      );
    });

    if (isWatchedParent) {
      generateBarrelFile(parentDir);
      console.log(`🔄 Updated parent barrel: ${parentDir}`);
    }

    currentDir = parentDir;
  }
}

function watchDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return;
  }

  console.log(`👀 Watching directory: ${directoryPath}`);

  fs.watch(directoryPath, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.includes('index.ts')) {
      console.log(
        `📁 Detected change in ${directoryPath}: ${eventType} - ${filename}`
      );
      setTimeout(() => {
        // Get the full path of the changed file
        const changedFilePath = path.join(directoryPath, filename);

        // Update barrels for the changed directory and all parent directories
        updateParentBarrels(changedFilePath);
      }, 100);
    }
  });
}

// Generate barrel files for all directories recursively
WATCH_DIRECTORIES.forEach(dir => {
  if (fs.existsSync(dir)) {
    generateBarrelFilesRecursively(dir);
  }
});

// Watch directories for changes
WATCH_DIRECTORIES.forEach(dir => {
  watchDirectory(dir);
});

console.log('🚀 Auto Barrel is running... Press Ctrl+C to stop');
