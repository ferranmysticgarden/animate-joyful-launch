// scripts/android/prepare-android-release.mjs
// Prepares Android release signing for Capacitor projects and bumps versionCode.
// - Writes android/keystore.properties based on env vars
// - Ensures android/app/build.gradle uses signingConfigs.release
// - Increments versionCode (default +1; set BUMP_VERSION_CODE=0 to disable)
// - Adds BILLING permission to AndroidManifest.xml for Google Play In-App Purchases

import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const androidDir = path.join(projectRoot, "android");
const androidAppDir = path.join(androidDir, "app");
const manifestPath = path.join(androidAppDir, "src", "main", "AndroidManifest.xml");

const gradleGroovyPath = path.join(androidDir, "app", "build.gradle");
const gradleKtsPath = path.join(androidDir, "app", "build.gradle.kts");

function fail(message) {
  console.error(`[android-signing] ${message}`);
  process.exit(1);
}

// Add BILLING permission to AndroidManifest.xml
function ensureBillingPermission() {
  if (!fs.existsSync(manifestPath)) {
    console.log("[android-signing] AndroidManifest.xml not found, skipping BILLING permission.");
    return;
  }

  let manifest = fs.readFileSync(manifestPath, "utf8");
  const billingPermission = 'android.name="com.android.vending.BILLING"';
  const billingPermissionFull = '<uses-permission android:name="com.android.vending.BILLING" />';

  if (manifest.includes("com.android.vending.BILLING")) {
    console.log("[android-signing] BILLING permission already present.");
    return;
  }

  // Insert after <manifest ...> opening tag
  const manifestTagEnd = manifest.indexOf(">", manifest.indexOf("<manifest"));
  if (manifestTagEnd === -1) {
    console.log("[android-signing] Could not find <manifest> tag, skipping BILLING permission.");
    return;
  }

  manifest = 
    manifest.slice(0, manifestTagEnd + 1) + 
    "\n    " + billingPermissionFull + 
    manifest.slice(manifestTagEnd + 1);

  fs.writeFileSync(manifestPath, manifest, "utf8");
  console.log("[android-signing] ✅ Added BILLING permission to AndroidManifest.xml");
}

function normalizeToForwardSlashes(p) {
  return p.split(path.sep).join("/");
}

function findBracedBlock(text, headerRegex) {
  const m = text.match(headerRegex);
  if (!m || m.index == null) return null;
  const start = m.index;
  const openIdx = text.indexOf("{", start);
  if (openIdx === -1) return null;
  let depth = 0;
  for (let i = openIdx; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        return {
          start,
          openIdx,
          end: i + 1,
          block: text.slice(start, i + 1),
        };
      }
    }
  }
  return null;
}

function upsertGradlePropLine(blockText, propName, valueLine, indent) {
  const lineRegex = new RegExp(`^\\s*${propName}\\s+.*$`, "m");
  if (lineRegex.test(blockText)) {
    return blockText.replace(lineRegex, `${indent}${valueLine}`);
  }
  // Insert right after opening brace
  const braceIdx = blockText.indexOf("{");
  if (braceIdx === -1) return blockText;
  return (
    blockText.slice(0, braceIdx + 1) +
    `\n${indent}${valueLine}` +
    blockText.slice(braceIdx + 1)
  );
}

function ensureReleaseSigningConfigUsesKeystoreProperties(gradleText) {
  const signingConfigs = findBracedBlock(gradleText, /\bsigningConfigs\s*\{/);
  if (!signingConfigs) return gradleText;

  const releaseBlock = findBracedBlock(signingConfigs.block, /\brelease\s*\{/);
  if (!releaseBlock) return gradleText;

  const headerMatch = releaseBlock.block.match(/^(\s*)release\s*\{/m);
  const releaseIndent = headerMatch?.[1] ?? "        ";
  const innerIndent = releaseIndent + "    ";

  let patchedRelease = releaseBlock.block;
  patchedRelease = upsertGradlePropLine(
    patchedRelease,
    "storeFile",
    "storeFile file(keystoreProperties['storeFile'])",
    innerIndent
  );
  patchedRelease = upsertGradlePropLine(
    patchedRelease,
    "storePassword",
    "storePassword keystoreProperties['storePassword']",
    innerIndent
  );
  patchedRelease = upsertGradlePropLine(
    patchedRelease,
    "keyAlias",
    "keyAlias keystoreProperties['keyAlias']",
    innerIndent
  );
  patchedRelease = upsertGradlePropLine(
    patchedRelease,
    "keyPassword",
    "keyPassword keystoreProperties['keyPassword']",
    innerIndent
  );

  const patchedSigningConfigsBlock =
    signingConfigs.block.slice(0, releaseBlock.start) +
    patchedRelease +
    signingConfigs.block.slice(releaseBlock.end);

  return (
    gradleText.slice(0, signingConfigs.start) +
    patchedSigningConfigsBlock +
    gradleText.slice(signingConfigs.end)
  );
}

if (!fs.existsSync(androidDir)) {
  fail('Missing "android" folder. Run "npx cap sync android" (or "npx cap add android") first.');
}

// 0) Add BILLING permission for Google Play In-App Purchases
ensureBillingPermission();

// 1) Write keystore.properties (NO logging of secret values)
const keystorePathFromRoot = process.env.KEYSTORE_PATH || "release-key.jks";
const keystoreAbsolute = path.isAbsolute(keystorePathFromRoot)
  ? keystorePathFromRoot
  : path.join(projectRoot, keystorePathFromRoot);

if (!fs.existsSync(keystoreAbsolute)) {
  fail(`Keystore file not found at: ${keystoreAbsolute}. Ensure it exists before building.`);
}

// Use absolute path - most reliable across all environments
const storeFilePath = normalizeToForwardSlashes(keystoreAbsolute);
console.log(`[android-signing] Keystore path: ${storeFilePath}`);

const keystorePassword = process.env.KEYSTORE_PASSWORD;
const keyAliasPassword = process.env.KEYSTORE_ALIAS_PASSWORD;
const keyAlias = process.env.KEYSTORE_ALIAS || "luxury-life";

if (!keystorePassword) fail("Missing env var KEYSTORE_PASSWORD.");
if (!keyAliasPassword) fail("Missing env var KEYSTORE_ALIAS_PASSWORD.");

const keystorePropsPath = path.join(androidDir, "keystore.properties");
const keystoreProps = [
  `storeFile=${storeFilePath}`,
  `storePassword=${keystorePassword}`,
  `keyAlias=${keyAlias}`,
  `keyPassword=${keyAliasPassword}`,
  "",
].join("\n");

fs.writeFileSync(keystorePropsPath, keystoreProps, "utf8");

// 2) Patch build.gradle (Groovy). Kotlin DSL not supported here.
const gradlePath = fs.existsSync(gradleGroovyPath)
  ? gradleGroovyPath
  : fs.existsSync(gradleKtsPath)
    ? gradleKtsPath
    : null;

if (!gradlePath) {
  fail('Could not find android/app/build.gradle (or build.gradle.kts).');
}

if (gradlePath.endsWith(".kts")) {
  fail(
    "Found build.gradle.kts (Kotlin DSL). This script currently patches Groovy build.gradle only. " +
      "Open android/app/build.gradle.kts and add a release signingConfig, or tell me and I’ll update this script to support .kts."
  );
}

let gradle = fs.readFileSync(gradlePath, "utf8");

const needsPropsLoader = !gradle.includes("keystorePropertiesFile") && !gradle.includes("keystoreProperties.load");
if (needsPropsLoader) {
  const loader = `// ---- Release signing (auto-generated by android-build script) ----\n` +
    `def keystoreProperties = new Properties()\n` +
    `def keystorePropertiesFile = rootProject.file(\"keystore.properties\")\n` +
    `keystoreProperties.load(new FileInputStream(keystorePropertiesFile))\n` +
    `// --------------------------------------------------------------------\n\n`;
  gradle = loader + gradle;
}

const hasSigningConfigs = gradle.includes("signingConfigs") && gradle.includes("signingConfigs.release");
const hasReleaseSigningLine = gradle.includes("signingConfig signingConfigs.release");

function insertAfterAndroidOpen(text, insert) {
  const match = text.match(/\bandroid\s*\{/);
  if (!match || match.index == null) return null;
  const idx = match.index + match[0].length;
  return text.slice(0, idx) + "\n" + insert + text.slice(idx);
}

function ensureBuildTypesReleaseSigning(text) {
  // Insert signingConfig line inside buildTypes { release { ... } }
  if (text.includes("signingConfig signingConfigs.release")) return text;

  const buildTypesIdx = text.search(/\bbuildTypes\s*\{/);
  if (buildTypesIdx === -1) {
    // No buildTypes block, inject one near top of android block.
    const injected = `\n    buildTypes {\n        release {\n            signingConfig signingConfigs.release\n        }\n    }\n`;
    const out = insertAfterAndroidOpen(text, injected);
    return out ?? text;
  }

  // Find the first "release {" after buildTypes
  const afterBuildTypes = text.slice(buildTypesIdx);
  const releaseMatch = afterBuildTypes.match(/\brelease\s*\{/);
  if (!releaseMatch || releaseMatch.index == null) return text;

  const releaseOpenIdx = buildTypesIdx + releaseMatch.index + releaseMatch[0].length;
  return text.slice(0, releaseOpenIdx) + "\n            signingConfig signingConfigs.release" + text.slice(releaseOpenIdx);
}

if (!hasSigningConfigs) {
  const signingBlock =
    `\n    signingConfigs {\n` +
    `        release {\n` +
    `            storeFile file(keystoreProperties['storeFile'])\n` +
    `            storePassword keystoreProperties['storePassword']\n` +
    `            keyAlias keystoreProperties['keyAlias']\n` +
    `            keyPassword keystoreProperties['keyPassword']\n` +
    `        }\n` +
    `    }\n`;

  const out = insertAfterAndroidOpen(gradle, signingBlock);
  if (out) gradle = out;
}

// If a release signingConfig already exists, force it to use keystore.properties
// (some templates hardcode storeFile file('release-key.jks'), which breaks CI/local setups)
gradle = ensureReleaseSigningConfigUsesKeystoreProperties(gradle);

if (!hasReleaseSigningLine) {
  gradle = ensureBuildTypesReleaseSigning(gradle);
}

// 3) Bump versionCode
const bump = Number.parseInt(process.env.BUMP_VERSION_CODE ?? "1", 10);
if (!Number.isNaN(bump) && bump > 0) {
  const versionCodeRegex = /\bversionCode\s+(\d+)\b/;
  const m = gradle.match(versionCodeRegex);
  if (m?.[1]) {
    const current = Number.parseInt(m[1], 10);
    if (!Number.isNaN(current)) {
      const next = current + bump;
      gradle = gradle.replace(versionCodeRegex, `versionCode ${next}`);
      console.log(`[android-signing] versionCode: ${current} -> ${next}`);
    }
  } else {
    console.log("[android-signing] versionCode not found; skipped bump.");
  }
} else {
  console.log("[android-signing] BUMP_VERSION_CODE=0; skipped versionCode bump.");
}

fs.writeFileSync(gradlePath, gradle, "utf8");
console.log("[android-signing] keystore.properties written + build.gradle patched for release signing.");
