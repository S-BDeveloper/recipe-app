/**
 * Deployment Script for Culinaria
 * Automates the deployment process
 *
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Add process to globals for Node.js environment
const { process } = globalThis;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("🚀 Starting Culinaria deployment process...\n");

// Check if .env file exists
const envPath = path.join(projectRoot, ".env");
if (!fs.existsSync(envPath)) {
  console.log("⚠️  .env file not found!");
  console.log("📝 Please create a .env file with your environment variables.");
  console.log("📋 Use env.example as a template.\n");
  process.exit(1);
}

// Check if Firebase config is properly set
const firebaseConfigPath = path.join(projectRoot, "src/firebase/config.js");
const firebaseConfig = fs.readFileSync(firebaseConfigPath, "utf8");

if (firebaseConfig.includes("your-api-key")) {
  console.log("⚠️  Firebase configuration not set!");
  console.log(
    "🔧 Please update src/firebase/config.js with your Firebase credentials.\n",
  );
  process.exit(1);
}

try {
  // Install dependencies
  console.log("📦 Installing dependencies...");
  execSync("npm install", { cwd: projectRoot, stdio: "inherit" });
  console.log("✅ Dependencies installed successfully!\n");

  // Run security checks
  console.log("🔒 Running security checks...");
  execSync("npm run security-check", { cwd: projectRoot, stdio: "inherit" });
  console.log("✅ Security checks passed!\n");

  // Run linting
  console.log("🔍 Running code linting...");
  execSync("npm run lint", { cwd: projectRoot, stdio: "inherit" });
  console.log("✅ Linting passed!\n");

  // Build for production
  console.log("🏗️  Building for production...");
  execSync("npm run build", { cwd: projectRoot, stdio: "inherit" });
  console.log("✅ Build completed successfully!\n");

  // Check if dist folder exists
  const distPath = path.join(projectRoot, "dist");
  if (!fs.existsSync(distPath)) {
    console.log("❌ Build failed! dist folder not found.");
    process.exit(1);
  }

  console.log("🎉 Build process completed successfully!");
  console.log("\n📁 Your production files are ready in the dist/ folder.");
  console.log("\n🌐 Deployment Options:");
  console.log("1. Vercel: vercel");
  console.log("2. Netlify: netlify deploy");
  console.log("3. Firebase: firebase deploy");
  console.log("\n📞 For support: begumsabina81193@gmail.com");
} catch (error) {
  console.error("❌ Deployment failed:", error.message);
  process.exit(1);
}
