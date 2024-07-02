export interface CodeExecutorStrategy {
  execute(code: string, testCase: string , output : string): Promise<ExecutionResponse>;
}

export type ExecutionResponse = {
    output : string,
    status : string
}
