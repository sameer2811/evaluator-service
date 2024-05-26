import Docker from "dockerode";
import pullImage from "./pullImage";
async function createContainer(imageName: string, cmd: string[]) {
  // First Pulling the Image for the container
  await pullImage(imageName);
  // Creating a Docker Instance
  const docker = new Docker();
  const dockerContainer = await docker.createContainer({
    Image: imageName,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    Cmd: cmd,
    OpenStdin: true,
  });

  return dockerContainer;
}

export default createContainer;
