import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { glob } from 'glob';
import * as fs from 'fs';
import type { LibraryFormats } from 'vite';

// Parse exports from package.json to determine what to build
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));
const exportPaths = packageJson.exports || {};

// Create entry points object dynamically based on exports
const entryPoints = {};
// Track CSS files to copy them separately
const cssFiles = [];

// Process each export path
Object.entries(exportPaths).forEach(([exportPath, sourcePath]) => {
  // Handle literal file paths (direct references to specific files)
  if (typeof sourcePath === 'string' && !sourcePath.includes('*')) {
    const relativePath = sourcePath.replace(/^\.\//, '');

    // Handle CSS files separately
    if (relativePath.endsWith('.css')) {
      cssFiles.push(relativePath);
      return;
    }

    const entryKey = exportPath.replace(/^\.\//, '').replace(/\.\w+$/, '');
    entryPoints[entryKey] = path.resolve(__dirname, relativePath);
    return;
  }

  // Handle wildcard patterns
  if (typeof sourcePath === 'string' && sourcePath.includes('*')) {
    // Convert package export pattern to glob pattern
    const basePath = sourcePath.replace(/^\.\//, '').replace(/\*$/, '');

    // Find TS and TSX files (handle CSS separately)
    const globPattern = `${basePath}**/*.+(ts|tsx)`;

    const files = glob.sync(globPattern, { cwd: __dirname });

    files.forEach(file => {
      const extension = path.extname(file);
      const relativePath = file.replace(/^src\//, '').replace(extension, '');

      // Use the relative path to maintain nested structure
      const entryKey = relativePath;
      entryPoints[entryKey] = path.resolve(__dirname, file);
    });

    // Find and track CSS files separately
    const cssPattern = `${basePath}**/*.css`;
    const cssMatches = glob.sync(cssPattern, { cwd: __dirname });
    cssFiles.push(...cssMatches);
  }
});

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/ui',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      include: ['src/**/*'],
    }),
    // Custom plugin to copy CSS files since we can't include them in entry points
    {
      name: 'copy-css-files',
      writeBundle: async () => {
        // Make sure the output directory exists
        const outDir = path.resolve(__dirname, '../../dist/packages/ui');
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        // Copy each CSS file to the output directory
        for (const cssFile of cssFiles) {
          const srcPath = path.resolve(__dirname, cssFile);
          // Determine output path, preserving directory structure
          const relativePath = cssFile.replace(/^src\//, '');
          const outPath = path.join(outDir, relativePath);

          // Create directories if needed
          const outDir2 = path.dirname(outPath);
          if (!fs.existsSync(outDir2)) {
            fs.mkdirSync(outDir2, { recursive: true });
          }

          // Copy the file
          try {
            const content = await fs.promises.readFile(srcPath);
            await fs.promises.writeFile(outPath, content);
            console.log(`Copied ${cssFile} to ${outPath}`);
          } catch (error) {
            console.error(`Failed to copy ${cssFile}: ${error.message}`);
          }
        }
      }
    }
  ],
  build: {
    outDir: '../../dist/packages/ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    cssCodeSplit: true, // Enable CSS code splitting
    lib: {
      entry: entryPoints,
      formats: ['es' as const] as LibraryFormats[], // Fixed type here
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
}));
