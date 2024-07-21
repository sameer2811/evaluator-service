import {
  CodeExecutorStrategy,
  ExecutionResponse,
} from "../types/codeExecutorStrategy";
import {
  ERROR,
  JAVA_IMAGE_NAME,
  SUCCESS,
  TIME_LIMIT_EXCEEDED,
} from "../util/constants";
import createContainer from "./containerFactory";
import { fetchDecodedStream } from "./dockerHelper";

class JavaExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    testCase: string,
    output: string
  ): Promise<ExecutionResponse> {
    console.log(output);
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

    try {
      const response: string = await fetchDecodedStream(
        loggerStream,
        outputBuffer
      );
      if (response.trim() === output.trim()) {
        return { output: response, status: SUCCESS };
      } else {
        return { output: response, status: "WA" };
      }
    } catch (error) {
      if (error === TIME_LIMIT_EXCEEDED) {
        return { output: error as string, status: TIME_LIMIT_EXCEEDED };
      }
      return { output: error as string, status: ERROR };
    } finally {
      await javaDockerContainer.kill();
      await javaDockerContainer.remove();
    }
  }
}

export default JavaExecutor;
