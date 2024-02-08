
const exec = require('child_process').exec;


function executeCommand(command) {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        if (stderr) {
            console.error(stderr);
            return;
        }
        console.log('Command Output:', '\n');
        console.log(stdout);
    });
}


executeCommand('ls -la');
executeCommand('echo "Hello, Node.js!"');