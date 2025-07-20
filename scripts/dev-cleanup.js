/**
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 *
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 *
 * This file contains proprietary and confidential information.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 *
 * For licensing inquiries: begumsabina81193@gmail.com
 *
 * Educational use only - Commercial use prohibited.
 */

const fs = require("fs");
const path = require("path");

// Development cleanup utility
const devCleanup = {
  // Clear Vite cache
  clearViteCache() {
    const viteCachePath = path.join(__dirname, "..", "node_modules", ".vite");

    if (fs.existsSync(viteCachePath)) {
      try {
        fs.rmSync(viteCachePath, { recursive: true, force: true });
        console.log("✅ Vite cache cleared");
        return true;
      } catch (error) {
        console.error("❌ Failed to clear Vite cache:", error.message);
        return false;
      }
    } else {
      console.log("ℹ️  Vite cache not found");
      return true;
    }
  },

  // Clear node_modules cache
  clearNodeModulesCache() {
    const nodeModulesPath = path.join(__dirname, "..", "node_modules");

    if (fs.existsSync(nodeModulesPath)) {
      try {
        // Remove cache directories
        const cacheDirs = [".cache", ".vite", ".parcel-cache"];
        cacheDirs.forEach((dir) => {
          const cachePath = path.join(nodeModulesPath, dir);
          if (fs.existsSync(cachePath)) {
            fs.rmSync(cachePath, { recursive: true, force: true });
            console.log(`✅ Cleared ${dir} cache`);
          }
        });
        return true;
      } catch (error) {
        console.error("❌ Failed to clear node_modules cache:", error.message);
        return false;
      }
    } else {
      console.log("ℹ️  node_modules not found");
      return true;
    }
  },

  // Clear package-lock.json and reinstall
  clearPackageLock() {
    const packageLockPath = path.join(__dirname, "..", "package-lock.json");

    if (fs.existsSync(packageLockPath)) {
      try {
        fs.unlinkSync(packageLockPath);
        console.log("✅ package-lock.json removed");
        console.log('💡 Run "npm install" to regenerate package-lock.json');
        return true;
      } catch (error) {
        console.error("❌ Failed to remove package-lock.json:", error.message);
        return false;
      }
    } else {
      console.log("ℹ️  package-lock.json not found");
      return true;
    }
  },

  // Check for common issues
  checkCommonIssues() {
    console.log("\n🔍 Checking for common issues...");

    const issues = [];

    // Check package.json
    const packageJsonPath = path.join(__dirname, "..", "package.json");
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf8"),
        );

        // Check for missing scripts
        if (!packageJson.scripts || !packageJson.scripts.dev) {
          issues.push('Missing "dev" script in package.json');
        }

        // Check for React version
        if (packageJson.dependencies && packageJson.dependencies.react) {
          console.log(`✅ React version: ${packageJson.dependencies.react}`);
        } else {
          issues.push("React not found in dependencies");
        }
      } catch (error) {
        issues.push(`Invalid package.json: ${error.message}`);
      }
    } else {
      issues.push("package.json not found");
    }

    // Check for node_modules
    const nodeModulesPath = path.join(__dirname, "..", "node_modules");
    if (!fs.existsSync(nodeModulesPath)) {
      issues.push('node_modules not found - run "npm install"');
    }

    // Check for .env file
    const envPath = path.join(__dirname, "..", ".env");
    if (!fs.existsSync(envPath)) {
      console.log("⚠️  .env file not found - check env.example");
    }

    if (issues.length === 0) {
      console.log("✅ No common issues found");
    } else {
      console.log("❌ Issues found:");
      issues.forEach((issue) => console.log(`  - ${issue}`));
    }

    return issues;
  },

  // Run all cleanup tasks
  runFullCleanup() {
    console.log("🧹 Starting development cleanup...\n");

    const results = {
      viteCache: this.clearViteCache(),
      nodeModulesCache: this.clearNodeModulesCache(),
      packageLock: this.clearPackageLock(),
      issues: this.checkCommonIssues(),
    };

    console.log("\n📊 Cleanup Summary:");
    console.log(`Vite Cache: ${results.viteCache ? "✅" : "❌"}`);
    console.log(
      `Node Modules Cache: ${results.nodeModulesCache ? "✅" : "❌"}`,
    );
    console.log(`Package Lock: ${results.packageLock ? "✅" : "❌"}`);
    console.log(`Issues Found: ${results.issues.length}`);

    if (results.issues.length === 0) {
      console.log("\n🎉 Cleanup completed successfully!");
      console.log("💡 Next steps:");
      console.log('  1. Run "npm install" (if package-lock.json was removed)');
      console.log('  2. Run "npm run dev" to start development server');
    } else {
      console.log(
        "\n⚠️  Cleanup completed with issues. Please address them before continuing.",
      );
    }

    return results;
  },

  // Quick cleanup (just cache)
  runQuickCleanup() {
    console.log("⚡ Running quick cleanup...\n");

    const results = {
      viteCache: this.clearViteCache(),
      nodeModulesCache: this.clearNodeModulesCache(),
    };

    console.log("\n📊 Quick Cleanup Summary:");
    console.log(`Vite Cache: ${results.viteCache ? "✅" : "❌"}`);
    console.log(
      `Node Modules Cache: ${results.nodeModulesCache ? "✅" : "❌"}`,
    );

    console.log("\n🎉 Quick cleanup completed!");
    console.log('💡 Run "npm run dev" to start development server');

    return results;
  },
};

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes("--full") || args.includes("-f")) {
    devCleanup.runFullCleanup();
  } else if (args.includes("--check") || args.includes("-c")) {
    devCleanup.checkCommonIssues();
  } else {
    devCleanup.runQuickCleanup();
  }
}

module.exports = devCleanup;
