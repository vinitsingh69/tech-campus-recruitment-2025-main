const fs = require('fs');
const path = require('path');

class LogExtractor {
    constructor(logFilePath) {
        if (!fs.existsSync(logFilePath)) {
            throw new Error(`Log file not found: ${logFilePath}`);
        }
        this.logFilePath = logFilePath;
    }

    extractLogsForDate(targetDate) {
        // Create output directory
        const outputDir = '../output';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const outputFile = path.join(outputDir, `output_${targetDate}.txt`);
        const logContents = fs.readFileSync(this.logFilePath, 'utf-8');
        
        const filteredLogs = logContents
            .split('\n')
            .filter(line => line.startsWith(targetDate))
            .join('\n');

        fs.writeFileSync(outputFile, filteredLogs);
        
        return filteredLogs.split('\n').filter(Boolean);
    }
}

function main() {
    if (process.argv.length !== 4) {
        console.error('Usage: node extract_logs.js <log_file_path> <date>');
        process.exit(1);
    }

    const logFilePath = process.argv[2];
    const targetDate = process.argv[3];

    try {
        const extractor = new LogExtractor(logFilePath);
        const logs = extractor.extractLogsForDate(targetDate);
        
        console.log(`Extracted ${logs.length} logs for ${targetDate}`);
        console.log(`Logs saved to output/output_${targetDate}.txt`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

main();