/**
 * Security Monitoring Script for Culinaria
 * Monitors for potential unauthorized use of the application
 *
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 */

const fs = require("fs");
const path = require("path");

class SecurityMonitor {
  constructor() {
    this.securityEvents = [];
    this.suspiciousActivities = [];
    this.monitoringActive = true;
  }

  // Log security events
  logEvent(event, details = {}) {
    const securityEvent = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: process.env.USER_AGENT || "Unknown",
      ip: process.env.IP || "Unknown",
      sessionId: this.generateSessionId(),
    };

    this.securityEvents.push(securityEvent);

    // Log to file
    this.writeToLog(securityEvent);

    // Console warning
    console.warn(`🔒 SECURITY EVENT: ${event}`, details);
  }

  // Detect suspicious activities
  detectSuspiciousActivity(activity) {
    const suspiciousPatterns = [
      "reverse engineering",
      "deobfuscation",
      "code extraction",
      "unauthorized copying",
      "commercial use",
      "removing copyright",
      "license violation",
    ];

    const isSuspicious = suspiciousPatterns.some((pattern) =>
      activity.toLowerCase().includes(pattern),
    );

    if (isSuspicious) {
      this.suspiciousActivities.push({
        timestamp: new Date().toISOString(),
        activity,
        severity: "HIGH",
      });

      this.logEvent("SUSPICIOUS_ACTIVITY_DETECTED", {
        activity,
        severity: "HIGH",
      });
    }
  }

  // Monitor file access
  monitorFileAccess(filePath) {
    this.logEvent("FILE_ACCESS", { filePath, timestamp: Date.now() });
  }

  // Check for copyright violations
  checkCopyrightCompliance() {
    const sourceFiles = this.getAllSourceFiles("./src");
    let violations = 0;

    sourceFiles.forEach((file) => {
      const content = fs.readFileSync(file, "utf8");
      if (!content.includes("Copyright (c) 2024 Sabina Begum")) {
        violations++;
        this.logEvent("COPYRIGHT_HEADER_MISSING", { file });
      }
    });

    if (violations > 0) {
      console.error(`❌ ${violations} files missing copyright headers!`);
    } else {
      console.log("✅ All files have copyright headers");
    }
  }

  // Generate unique session ID
  generateSessionId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Write to security log
  writeToLog(event) {
    const logEntry = JSON.stringify(event) + "\n";
    fs.appendFileSync("./security.log", logEntry);
  }

  // Get all source files
  getAllSourceFiles(dir) {
    const files = [];

    function traverse(currentDir) {
      const items = fs.readdirSync(currentDir);

      items.forEach((item) => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);

        if (
          stat.isDirectory() &&
          !item.startsWith(".") &&
          item !== "node_modules"
        ) {
          traverse(fullPath);
        } else if (stat.isFile() && /\.(js|jsx|ts|tsx)$/.test(item)) {
          files.push(fullPath);
        }
      });
    }

    traverse(dir);
    return files;
  }

  // Generate security report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalEvents: this.securityEvents.length,
      suspiciousActivities: this.suspiciousActivities.length,
      securityScore: this.calculateSecurityScore(),
      recommendations: this.generateRecommendations(),
    };

    fs.writeFileSync("./security-report.json", JSON.stringify(report, null, 2));
    return report;
  }

  // Calculate security score
  calculateSecurityScore() {
    let score = 100;

    // Deduct points for suspicious activities
    score -= this.suspiciousActivities.length * 10;

    // Deduct points for missing copyright headers
    const sourceFiles = this.getAllSourceFiles("./src");
    const missingHeaders = sourceFiles.filter((file) => {
      const content = fs.readFileSync(file, "utf8");
      return !content.includes("Copyright (c) 2024 Sabina Begum");
    }).length;

    score -= missingHeaders * 5;

    return Math.max(0, score);
  }

  // Generate security recommendations
  generateRecommendations() {
    const recommendations = [];

    if (this.suspiciousActivities.length > 0) {
      recommendations.push("Investigate suspicious activities detected");
    }

    const sourceFiles = this.getAllSourceFiles("./src");
    const missingHeaders = sourceFiles.filter((file) => {
      const content = fs.readFileSync(file, "utf8");
      return !content.includes("Copyright (c) 2024 Sabina Begum");
    }).length;

    if (missingHeaders > 0) {
      recommendations.push(`Add copyright headers to ${missingHeaders} files`);
    }

    if (recommendations.length === 0) {
      recommendations.push("Security status: EXCELLENT");
    }

    return recommendations;
  }

  // Start monitoring
  start() {
    console.log("🔒 Security monitoring started...");
    console.log("📊 Monitoring for unauthorized use and copyright violations");

    // Check copyright compliance
    this.checkCopyrightCompliance();

    // Set up periodic checks
    setInterval(() => {
      this.checkCopyrightCompliance();
      this.generateReport();
    }, 300000); // Every 5 minutes
  }
}

// Export for use
module.exports = SecurityMonitor;

// Run if called directly
if (require.main === module) {
  const monitor = new SecurityMonitor();
  monitor.start();
}
