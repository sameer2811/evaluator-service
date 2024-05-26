import Docker from "dockerode";

export default async function pullImage(imageName: string) {
  const docker = new Docker();
  return new Promise(function (resolve, reject) {
    docker.pull(
      imageName,
      function (err: Error, stream: NodeJS.ReadableStream) {
        if (err) {
          reject("Failure in fetching the Image " + imageName);
          return;
        }
        docker.modem.followProgress(stream, onFinished, onProgress);
        function onFinished(err: any) {
          if (err) {
            reject("Failure in fetching the Image " + imageName);
          } else {
            resolve("Image Fetched Successfully");
          }
        }
        function onProgress(event: any) {
          console.log(event.status);
        }
      }
    );
  });
}
