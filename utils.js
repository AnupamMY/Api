const { faker } = require('@faker-js/faker');
const moment = require("moment");
const {v4 : uuidv4} = require('uuid')


let callType = ["dispose","Missed","autoFailed","autoDrop"];
// let disposeType = ["callBack","DNC","etx"];
let reason = ["decline","not reachable"];
let disposeName = ["followUp","do not call","external transfer"];
let noAgentFound = "no AgentFound"


let callData = {}
function callTypeFunction(calls){
    if(calls == callType[0]){
        callData.disposeName = faker.helpers.arrayElement(disposeName);
        if(callData.disposeName = "followUp"){
            callData.type = callType[0];
            callData.disposeType = "callBack"
        }
        else if (callData.disposeName = "do not call"){
            callData.disposeType = "DNC"
        }
        else if (callData.disposeName = "external transfer"){
            callData.disposeType = "etx"
            }
    }else if (calls == callType[1]){
        callData.type = callType[1];
        callData.disposeName = noAgentFound
    }
    else if (calls == callType[3]){
        callData.type = callType[3];
        callData.disposeName = noAgentFound
    }
    else{
        callData.type = calls
        callData.disposeName = faker.helpers.arrayElement(reason);
    }
} 
let typeofCall = faker.helpers.arrayElement(callType)

//console.log(typeofCall);
callTypeFunction(typeofCall)

 

//console.log(callData); 
let state= ["hold","mute","transfer","conference"]
let randomStatus = ["call","ringing"];
randomStatus.push(faker.helpers.arrayElement(state));
// console.log(randomStatus);

function randomState(){
callData.ringing = Math.trunc((Math.random()*30)+1);    
if(randomStatus[2] == "hold"){
   callData.hold = Math.trunc((Math.random()*60)+ 1);
   callData.mute = 0
   callData.transfer = 0
   callData.conference = 0 
}
else if(randomStatus[2] == "mute"){
   callData.mute = Math.trunc((Math.random()*30)+1)
   callData.hold = 0
   callData.transfer = 0
   callData.conference = 0
}
else if(randomStatus[2] == "transfer"){
   callData.transfer = Math.trunc((Math.random()*60)+1)
   callData.mute = 0
   callData.hold = 0
   callData.conference = 0
}
else{
    callData.conference = Math.trunc((Math.random()*60)+1)
    callData.mute = 0
    callData.transfer = 0
    callData.hold = 0
}
callData.call = Math.trunc((Math.random()*99)+1);
}


if(callData.disposeName == "followUp" || callData.disposeName == "do not call" || callData.disposeName == "external transfer"){
    randomState(faker.helpers.arrayElement(state));
    
}

console.log(callData.disposeName)
console.log(callData)
let {call,transfer,hold,mute,ringing,duration,conference,disposeTime,disposeType} = callData
console.log(call,transfer,hold,mute,ringing,duration,conference,disposeTime,disposeType)
callData.duration = call+transfer+hold+mute;
const data = async ()=>{
    
    let data = [] 
    for(let i=0;i<=5;i++){
        let agent_name = faker.helpers.arrayElement(["Anupam","Ajay","Sahil","Vikas","Rohit","Laksha","Pradeep","Ayaan","Kuldeep","Harish","Akash"]);
        let campaign_name = faker.helpers.arrayElement(["sales","marketing","support","insurance","camp5"]);
        let process_name = faker.helpers.arrayElement(["process1","process2","process3","process4","process5"]);
        let leadset = Math.floor((Math.random() * 10) + 1);
        let customerUUID = uuidv4();
        let referenceUUID = uuidv4();
        let call_time = call
        let hold_time = hold
        let mute_time = mute
        let ringing_time = ringing
        let transfer_time = transfer
        let conference_time = conference;
        let duration_time = duration
        let disposeTime = faker.date.recent(30).getTime();
        let disposeType = "" 
        let datetime = Date.now();
    }
}