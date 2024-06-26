import {
  CodeExecutorStrategy,
  ExecutionResponse,
} from "../types/codeExecutorStrategy";
import { PYTHON_IMAGE_NAME } from "../util/constants";
import createContainer from "./containerFactory";
import decodeBufferStream from "./dockerHelper";

class PythonExecutor implements CodeExecutorStrategy {
  async execute(code: string, testCase: string): Promise<ExecutionResponse> {
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

    try {
      const response: string = await this.fetchDecodedStream(
        loggerStream,
        outputBuffer
      );
      return { output: response, status: "COMPLETED" };
    } catch (error) {
      return { output: error as string, status: "ERROR" };
    } finally {
      await pythonDockerContainer.remove();
    }
  }

  async fetchDecodedStream(
    loggerStream: NodeJS.ReadableStream,
    outputBuffer: Buffer[]
  ): Promise<string> {
    return new Promise(function (resolve, reject) {
      loggerStream.on("end", function () {
        const completeStreamBufferOutput = Buffer.concat(outputBuffer);
        const readableOutput = decodeBufferStream(completeStreamBufferOutput);
        console.log(readableOutput);
        if (readableOutput.stdOut != "") {
          resolve(readableOutput.stdOut);
        } else {
          reject(readableOutput.stderr);
        }
      });
    });
  }
}

export default PythonExecutor;
