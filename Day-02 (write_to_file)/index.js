
const fs = require('fs');
const path = require('path');


function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Error writing to file: ENOENT: no such file or directory...");
            return;
        }
        const filename = path.basename(filePath);
        console.log(`Data written to ${filename}`);
    });
}

writeToFile('test-files/output1.txt', 'Sample content.');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');