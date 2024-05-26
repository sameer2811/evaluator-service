import express from "express";
import bodyParser from "body-parser";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
import runCppDocker from "./container/runCppDocker";
// import runPythonDocker from "./container/runPythonDocker";
// import runJavaDocker from "./container/runJavaDocker";

// import { addSampleProducer } from "./producers/sampleProducer";
// import { sampleQueueWorker } from "./workers/sampleWorker";
const server = express();

server.use(bodyParser.text());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/api", apiRouter);
server.listen(serverConfig.PORT, function () {
  console.log("Server is up and running at ", serverConfig.PORT);

  //   let pythonCode = `
  // x = input()
  // y = input()
  // print("Value of x is", x)
  // print("Value of y is", y)
  //   `;

  // let javaCode = `
  // import java.util.*;
  // public class Main {
  //   public static void main(String args[]) {
  //     Scanner scn = new Scanner(System.in);
  //     int x = scn.nextInt();
  //     int y = scn.nextInt();
  //     System.out.println("Value of the corresponding x and y is " + x + "--->" + y);
  //   }
  // }
  // `;

  let cppCode = `
  #include<bits/stdc++.h>
  #include<iostream>
  using namespace std;
  int main() {
    int t,x;
    cin>>t>>x;
    for(int i=0; i < t ; i++){
      cout<< "Value of x is " << x <<endl;
    }
    return 0;
  }

  `;

  let testCase = `100
  200`;
  // runPythonDocker(pythonCode, testCase);
  // runJavaDocker(javaCode, testCase);
  runCppDocker(cppCode, testCase);
  // Registering Sample Queue
  // sampleQueueWorker("SampleQueue");

  // Addition in sample Producer
  // addSampleProducer("sampleJob", {
  //   name: "Sameer singh",
  //   age: "23",
  //   company: "PlaySimple Games",
  // });
});
