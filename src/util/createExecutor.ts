import CppExecutor from "../container/cppExecutor";
import JavaExecutor from "../container/javaExecutor";
import PythonExecutor from "../container/pythonExecutor";
import { CodeExecutorStrategy } from "../types/codeExecutorStrategy";

export default function createExecutor(
  language: string
): CodeExecutorStrategy | null {
  if (language.toLowerCase() === "Java".toLowerCase()) {
    return new JavaExecutor();
  } else if (language.toLowerCase() === "Cpp".toLowerCase()) {
    return new CppExecutor();
  } else if (language.toLowerCase() === "python".toLowerCase()) {
    return new PythonExecutor();
  } else {
    return null;
  }
}
