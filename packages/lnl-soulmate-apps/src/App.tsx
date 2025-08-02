
import {AgentStatus, LnlAgent} from '@lnl-soulmate/lnl-soulmate-comps'

function App() {
  return <>
        <LnlAgent text={"hello to you my pal!!"} showSpeed={500} status={AgentStatus.NORMAL}></LnlAgent>
  </>
}

export default App
