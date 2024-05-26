import { CPP_IMAGE_NAME } from "../util/constants";
import createContainer from "./containerFactory";
import decodeBufferStream from "./dockerHelper";
async function runCppDocker(code: string, testCase: string) {
  try {
    let outputBuffer: Buffer[] = [];
    // const cppDockerContainer = await createContainer(cpp_IMAGE_NAME, [ "cpp3", "-c", code, "ssty -echo"]);
    code = code.replace(/'/g, '"');
    testCase = testCase.replace(/'/g, '"');
    console.log(code);
    let runCommand = `echo '${code}' > main.cpp && g++ main.cpp -o main && echo '${testCase}' | ./main`;
    const cppDockerContainer = await createContainer(CPP_IMAGE_NAME, [
      "/bin/sh",
      "-c",
      runCommand,
    ]);

    // echo ${code} > test.py && echo testCase | cpp3 test.py

    // Booting up the container
    await cppDockerContainer.start();

    // Handling the loggerStream Part here
    const loggerStream = await cppDockerContainer.logs({
      stderr: true,
      stdout: true,
      timestamps: false,
      follow: true, // follow being set to true will return the data as stream otherwise will return complete string
    });

    //started listening the data and accumulating in the array
    loggerStream.on("data", function (chunk) {
      outputBuffer.push(chunk);
    });

    const response = await new Promise(function (resolve) {
      loggerStream.on("end", function () {
        const completeStreamBufferOutput = Buffer.concat(outputBuffer);
        const readableOutput = decodeBufferStream(completeStreamBufferOutput);
        resolve(readableOutput);
      });
    });
    await cppDockerContainer.remove();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default runCppDocker;
