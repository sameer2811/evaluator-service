import Docker from "dockerode";
async function createContainer(imageName: string, cmd: string[]) {
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

  return dockerContainer
}

export default createContainer;
