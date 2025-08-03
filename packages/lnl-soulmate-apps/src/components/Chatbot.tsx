import { AgentStatus, LnlAgent, LnlBubble, Role } from "@lnl-soulmate/lnl-soulmate-comps";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChatBotCtn } from "./style";
import { InputBox } from "./InputBox";

function useFetchAnswer(prompt:string, answerHistory:React.RefObject<string[]>, setLnlStatus:any,bottomRef:any){
    const [answer, setAnswer]=useState('')
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
      if(answer){
        answerHistory.current.push(answer)
      }
    },[answer])
    useEffect(()=>{
       setLnlStatus(loading?AgentStatus.THINK:AgentStatus.NORMAL)
    },[loading])
    useEffect(()=>{
        if(prompt){
            bottomRef.current.scrollIntoView()

            setLoading(true)
            fetch("/api/chat",{
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    question: prompt,
                    session_id: "s1",
                    model: "qwen-plus"
                })
            }).then(response=>response.json())
            .then((answerJson:any)=>{
                setLnlStatus(AgentStatus.IDLE)
                setAnswer(answerJson.answer||'出了点错x_x')        
                setLoading(false)
            })
        }
        
    },[prompt])
    return {loading,answer}
}


export function Chatbot(){
  const [prompt,setPrompt]=useState('')
  const [lnlStatus,setLnlStatus]=useState(AgentStatus.NORMAL)
  const inputBoxRef =useRef(null)
  const bottomRef = useRef<HTMLDivElement>(null as any)

  const promptHistory = useRef([] as string[])
  const answerHistory = useRef([] as string[])
  function promptCallback(prompt:string){
    promptHistory.current.push(prompt)
    setPrompt(prompt)
    bottomRef.current.scrollIntoView()
  }
  const {loading,answer} = useFetchAnswer(prompt, answerHistory, setLnlStatus, bottomRef)

  return <> 
            <ChatBotCtn>
            <div className="history">
            {
                promptHistory.current.map((his,i)=>{
                    return <Fragment key={i}>
                           <LnlBubble text={his} showSpeed={0} role={Role.USER}></LnlBubble>
                           {i!==promptHistory.current.length-1 &&<LnlBubble text={answerHistory.current[i]} showSpeed={0} role={Role.AI}></LnlBubble>}
                        </Fragment>
                })
            }
            </div>
            <LnlAgent text={loading?'正在思考':answer} showSpeed={100} status={lnlStatus} ></LnlAgent>
            <InputBox ref={inputBoxRef} promptCallback={promptCallback}></InputBox>
            </ChatBotCtn>
            <div ref={bottomRef}></div>
        </>
}