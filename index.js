import express from "express";
import { PythonShell } from "python-shell"
PythonShell.defaultOptions = { scriptPath: './python-scripts' };
let pyshell = new PythonShell('hello.py');
const app = express();

app.get("/", (req, res) => {
    console.log("server is responding...")
    const { fname, lname } = req.query;

    let options = {
        args: [fname, lname]
    }

    PythonShell.run("main.py", options).then((data) => {
        if (data) {
            console.log('data loading...');
            console.log(data[0]);
        }
    })

})

app.get("/io-from-single-py-file", () => {
    // sends a message to the Python script via stdin
    pyshell.send('hello');

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err, code, signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
    });
})

app.listen(8000, () => {
    console.log("server is running on port 8000...");
})