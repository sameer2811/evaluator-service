import { JAVA_IMAGE_NAME } from "../util/constants";
import createContainer from "./containerFactory";
import decodeBufferStream from "./dockerHelper";
async function runJavaDocker(code: string, testCase: string) {
  try {
    let outputBuffer: Buffer[] = [];
    // const javaDockerContainer = await createContainer(java_IMAGE_NAME, [ "java3", "-c", code, "ssty -echo"]);
    code = code.replace(/'/g, '"');
    testCase = testCase.replace(/'/g, '"');
    console.log(code);
    let runCommand = `echo '${code}' > Main.java && javac Main.java && echo '${testCase}' | java Main.java`;
    const javaDockerContainer = await createContainer(JAVA_IMAGE_NAME, [
      "/bin/sh",
      "-c",
      runCommand,
    ]);

    // Booting up the container
    await javaDockerContainer.start();

    // Handling the loggerStream Part here
    const loggerStream = await javaDockerContainer.logs({
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
    await javaDockerContainer.remove();
  } catch (error) {
    console.log(error);
  }
}

export default runJavaDocker;
