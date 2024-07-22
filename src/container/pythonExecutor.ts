import {
  CodeExecutorStrategy,
  ExecutionResponse,
} from "../types/codeExecutorStrategy";
import {
  ERROR,
  PYTHON_IMAGE_NAME,
  SUCCESS,
  TIME_LIMIT_EXCEEDED,
} from "../util/constants";
import createContainer from "./containerFactory";
import { fetchDecodedStream } from "./dockerHelper";

class PythonExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    testCase: string,
    output: string
  ): Promise<ExecutionResponse> {
    console.log(output);
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
      const response: string = await fetchDecodedStream(
        loggerStream,
        outputBuffer
      );
      return { output: response, status: SUCCESS };
    } catch (error) {
      if (error === TIME_LIMIT_EXCEEDED) {
        await pythonDockerContainer.kill();
        return { output: error as string, status: TIME_LIMIT_EXCEEDED };
      }
      return { output: error as string, status: ERROR };
    } finally {
      await pythonDockerContainer.remove();
    }
  }
}

export default PythonExecutor;
