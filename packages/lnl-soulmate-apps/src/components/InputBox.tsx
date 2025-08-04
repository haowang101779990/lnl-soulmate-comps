import { forwardRef, useRef, useState } from "react"
import { TextInputContainer } from "./style"



export const InputBox = function ({promptCallback}:any){
   
   const [prompt,setPrompt]=useState('')
   const textareaRef=useRef(null as any)

   function textareaChange(){
      setPrompt(textareaRef.current.value)
   }

   function emitPrompt(){
      if(!prompt){
        return
      }
      promptCallback(prompt)
      textareaRef.current.value=''
   }

   return <>
   <TextInputContainer>
           <textarea className="form__field" ref={textareaRef} onChange={textareaChange}/>
            <button onClick={emitPrompt} className="btn btn--primary btn--inside uppercase">问问它？</button>
    </TextInputContainer>
   
   </>
}