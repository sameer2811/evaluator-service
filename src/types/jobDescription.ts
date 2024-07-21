export default interface IoJob {
  name: String;
  payLoad: Record<string, unknown>;
  handler: () => void;
}
