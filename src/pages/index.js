import { useEffect, useState } from "react";
import Layout from "../component/layout/layout";
import CreateForm from "../component/prompt/create-form";
import SwitchA from "../component/ui/switch/switch";
import Generating from "../component/generating";

export default function Home() {
  const [generating, setGenerating] = useState(false)
  const [messages, setMessages] = useState([])
  const [continousMode, setContinousMode] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [openAIKey, setOpenAIKey] = useState("");
  const [agents, setAgents] = useState([]);
  const [agentData, setAgentData] = useState()
  const [agentData2, setAgentData2] = useState()
  useEffect(()=>{
    // console.log("useEffect in save");
    if(openAIKey){
      localStorage.setItem("openAIKey", openAIKey)
    }
  }, [openAIKey])
  useEffect(()=>{
    const key = localStorage.getItem("openAIKey");
    if(key){
      setOpenAIKey(key)
    }
    const storedAgents = localStorage.getItem("agents");
    if(storedAgents){
      try {
        const parsed_agents = JSON.parse(storedAgents);
        setAgents(parsed_agents);
      } catch (e) {
        console.log(e)
      }
    }
  }, [])
  useEffect(()=>{
    console.log(agents);

  }, [agents])
  const [agent, setAgent] = useState(null)
  return (
    <Layout agent={agent} agents={agents} setAgentData={setAgentData}  setGenerating = {setGenerating} openAIKey ={openAIKey} setOpenAIKey = {(value) => setOpenAIKey(value)}>
      {generating &&
          <Generating generating={generating} agentData2={agentData2} setAgent={setAgent} agent={agent} setCancel = {setCancel} cancel={cancel} messages={messages} />
      }
        <div className={`${generating && "hidden "} bg-dark-2 w-full h-layout rounded-3xl px-3 sm:px-6 py-4 text-white mt-2`}>
          <div className="flex flex-col sm:flex-row justify-between items-start w-full h-header border-b border-neutral-700 pb-4 md:py-0">
            <h1 className=" text-xl sm:text-2xl font-medium text-white ">
              Creating New AI
            </h1>
            <div className="flex items-center space-x-6 mt-3 sm:mt-2">
              <p className="text-sm sm:text-base">Continous mode:</p>
              <SwitchA continousMode={continousMode} setContinousMode={setContinousMode} />
            </div>
          </div>
          <CreateForm agents={agents} setAgents = {setAgents} setAgentData2={setAgentData2} agentData={agentData} setAgentData={setAgentData} setAgent={setAgent} agent={agent}  cancel={cancel} setCancel={setCancel} openAIKey={openAIKey} continousMode={continousMode} setMessages={setMessages} setGenerating = {setGenerating}/>
        </div>
      
    </Layout>
  );
}
