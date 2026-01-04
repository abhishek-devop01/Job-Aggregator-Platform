import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
const logFile = path.join(logDir, "scraper.log");

// Ensure logs folder exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const formatMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
};

const writeLog = (level, message) => {
  const logMessage = formatMessage(level, message);

  // Console log
  if (level === "error") {
    console.error(logMessage.trim());
  } else {
    console.log(logMessage.trim());
  }

  // File log
  fs.appendFileSync(logFile, logMessage);
};

const logger = {
  info: (msg) => writeLog("info", msg),
  warn: (msg) => writeLog("warn", msg),
  error: (msg) => writeLog("error", msg)
};

export default logger;
