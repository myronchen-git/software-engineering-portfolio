// ==================================================

const imageFiles = import.meta.glob(
  ['/repositories/*/readme_files/*', '!/repositories/*/readme_files/*.json'],
  {
    import: 'default',
  }
);

// --------------------------------------------------

/**
 * Helper function for getting Vite to see image files.
 *
 * @param {String} imagePath - Path from root to image.
 * @returns Imported image, image location String, or image location URL.
 */
async function importProjectImage(imagePath) {
  return await imageFiles[imagePath]();
}

// ==================================================

export { importProjectImage };
