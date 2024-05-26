export default interface IoJob {
  name: String;
  payLoad: Record<string, string>;
  handler: () => void;
  failure: () => void;
}
