import { dockerStreamOutput } from "../types/dockerStreamOutput";
import { BYTE_HEADER_SIZE, TIME_LIMIT_EXCEEDED } from "../util/constants";

export default function decodeBufferStream(buffer: Buffer): dockerStreamOutput {
  let offset = 0;

  let output: dockerStreamOutput = {
    stderr: "",
    stdOut: "",
  };
  // trversing through the whole input
  while (offset < buffer.length) {
    // Reading the streamOutput at the current offset
    const streamOutput = buffer[offset];

    // Reading the length of the chunk by moving the cursor to the 4th offset.
    const chunkLength = buffer.readUInt32BE(offset + 4);

    // incrementing the offset to the Byte header size for reading the chunk of specified length.
    offset = offset + BYTE_HEADER_SIZE;

    if (streamOutput === 1) {
      // this means this is the output stream

      // Reading of output stream of specified chunk length is done.
      output.stdOut =
        output.stdOut + buffer.toString("utf-8", offset, offset + chunkLength);
    } else if (streamOutput === 2) {
      // this means this is the error stream

      // Reading of the error stream of specified chunk length is done
      output.stderr =
        output.stderr + buffer.toString("utf-8", offset, offset + chunkLength);
    } else {
    }
    offset = offset + chunkLength;
  }

  return output;
}

export async function fetchDecodedStream(
  loggerStream: NodeJS.ReadableStream,
  outputBuffer: Buffer[]
): Promise<string> {
  return new Promise(function (resolve, reject) {
    const timeout: NodeJS.Timeout = setTimeout(function () {
      reject(TIME_LIMIT_EXCEEDED);
    }, 1500);
    loggerStream.on("end", function () {
      clearTimeout(timeout);
      const completeStreamBufferOutput = Buffer.concat(outputBuffer);
      const readableOutput = decodeBufferStream(completeStreamBufferOutput);
      if (readableOutput.stdOut != "") {
        resolve(readableOutput.stdOut);
      } else {
        reject(readableOutput.stderr);
      }
    });
  });
}
