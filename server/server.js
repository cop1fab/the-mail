import http from "http";
import app from "./app";

const port=process.env.PORT || 500;

//@setting port
app.set("port",port);

//@server
const server=http.createServer(app);

//@server listening
server.listen(port,()=>{
    console.log(`Server started on port ${port}.`);
})