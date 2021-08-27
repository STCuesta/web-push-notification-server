// const express = require('express');
import express from "express";
import cookieParser from "cookie-parser"

import AvailableModules from './src/modules';
import cors from "cors";


const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())

AvailableModules.forEach(controller=>{
    const instance = new controller(app);
    instance.init()
})
app.listen(Number(process.argv[2]),'0.0.0.0',511,()=>{console.log("Listening on port: ",process.argv[2])})
