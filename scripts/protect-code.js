/**
 * Code Protection Script
 * Automatically adds copyright headers to all source files
 *
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyrightHeader = `/**
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 * 
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 * 
 * This file contains proprietary and confidential information for Culinaria.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 * 
 * For licensing inquiries: begumsabina81193@gmail.com
 * 
 * Educational use only - Commercial use prohibited.
 */

`;

const fileExtensions = [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"];

function addCopyrightHeader(filePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return;
    }

    const content = fs.readFileSync(filePath, "utf8");

    // Check if copyright header already exists
    if (content.includes("Copyright (c) 2024 Sabina Begum")) {
      console.log(
        `✅ Copyright header already exists: ${path.basename(filePath)}`,
      );
      return;
    }

    // Add copyright header
    const newContent = copyrightHeader + content;
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`✅ Added copyright header: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  try {
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  Directory not found: ${dirPath}`);
      return;
    }

    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const fullPath = path.join(dirPath, item);

      try {
        const stat = fs.statSync(fullPath);

        if (
          stat.isDirectory() &&
          !item.startsWith(".") &&
          item !== "node_modules"
        ) {
          processDirectory(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item);
          if (fileExtensions.includes(ext)) {
            addCopyrightHeader(fullPath);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing ${fullPath}:`, error.message);
      }
    });
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
  }
}

// Get the project root directory (two levels up from scripts)
const projectRoot = path.resolve(__dirname, "..");
console.log(`🔒 Starting copyright protection from: ${projectRoot}`);

// Process src directory
const srcPath = path.join(projectRoot, "src");
console.log(`📁 Processing source files in: ${srcPath}`);

if (fs.existsSync(srcPath)) {
  processDirectory(srcPath);
  console.log("✅ Copyright protection complete!");
} else {
  console.log("⚠️  src directory not found. Checking current directory...");
  processDirectory(projectRoot);
  console.log("✅ Copyright protection complete!");
}
