import { PYTHON_IMAGE_NAME } from "../util/constants";
import createContainer from "./containerFactory";
import decodeBufferStream from "./dockerHelper";
async function runPythonDocker(code: string, testCase: string) {
  let outputBuffer: Buffer[] = [];
  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE_NAME, [ "python3", "-c", code, "ssty -echo"]);
  code = code.replace(/'/g, '"');
  testCase = testCase.replace(/'/g, '"');
  console.log(code);
  let runCommand = `echo '${code}' > test.py && echo '${testCase}' | python3 test.py`;
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE_NAME, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);

  // echo ${code} > test.py && echo testCase | python3 test.py

  // Booting up the container
  await pythonDockerContainer.start();

  // Handling the loggerStream Part here
  const loggerStream = await pythonDockerContainer.logs({
    stderr: true,
    stdout: true,
    timestamps: false,
    follow: true, // follow being set to true will return the data as stream otherwise will return complete string
  });

  //started listening the data and accumulating in the array
  loggerStream.on("data", function (chunk) {
    outputBuffer.push(chunk);
  });

  await new Promise(function (resolve) {
    loggerStream.on("end", function () {
      const completeStreamBufferOutput = Buffer.concat(outputBuffer);
      const readableOutput = decodeBufferStream(completeStreamBufferOutput);
      console.log(readableOutput);
      console.log("Coming here for the sucess call");
      resolve("Success");
    });
  });
  await pythonDockerContainer.remove();
}

export default runPythonDocker;
