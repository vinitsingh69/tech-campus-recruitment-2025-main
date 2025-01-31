
# Steps to Run 

Note
The sample log file provided in the repository might not work. Use the test_logs.log file with sample log data.

## Installation
```bash
npm init node 
```

## Usage
```bash
node extract_logs.js <log_file_path> <date>
```

### Example
```bash
node extract_logs.js sample_logs.log 2024-12-01
```

## Output
- Filtered logs saved in `output/output_YYYY-MM-DD.txt`
- Console displays number of logs extracted