import express  from "express";
import serverConfig from "./config/serverConfig";

const server = express();

server.listen(serverConfig.PORT,function(){
    console.log("Server is up and running at " , serverConfig.PORT);
});