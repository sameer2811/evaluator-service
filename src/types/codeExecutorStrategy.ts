export interface CodeExecutorStrategy {
  execute(code: string, testCase: string): Promise<ExecutionResponse>;
}

export type ExecutionResponse = {
    output : string,
    status : string
}
