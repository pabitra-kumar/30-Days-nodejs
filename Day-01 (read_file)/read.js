const fs = require('fs');
const path = require('path');

const file_path = path.join(__dirname, "test-files", 'file1.txt');

const empty_file_path = path.join(__dirname, "test-files", 'empty.txt');

const readFileContent = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file: ENOENT: no such file or directory...');
            return;
        }

        console.log(data);
    });
}

readFileContent(file_path);
readFileContent(empty_file_path);
readFileContent('./test-files/nonexistent-file.txt');

