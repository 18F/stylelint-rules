var execSync = require('child_process').execSync;

try {
  execSync('npm publish --access=public');
} catch(e) {
  console.warn(e.message);
  process.exit(0);
}
