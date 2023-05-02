import { useEffect, useState } from "react";
import Layout from "../component/layout/layout";
import CreateForm from "../component/prompt/create-form";
import SwitchA from "../component/ui/switch/switch";
import Generating from "./generating";

export default function Home() {
  const [generating, setGenerating] = useState(false)
  const [messages, setMessages] = useState([])
  const [continousMode, setContinousMode] = useState(false)
  const [cansel, setCancel] = useState(false)
  const [openAIKey, setOpenAIKey] = useState("");
  const [agents, setAgents] = useState([])
  useEffect(()=>{
    if(agents?.length){
      localStorage.setItem("agents", agents)
    }
  }, [agents])
  useEffect(()=>{
    console.log("useEffect in save");
    if(openAIKey){
      localStorage.setItem("openAIKey", openAIKey)
    }
  }, [openAIKey])
  useEffect(()=>{
    const key = localStorage.getItem("openAIKey");
    if(key){
      setOpenAIKey(key)
    }
    const agents = localStorage.getItem("agents");
    setAgents(agents)
  }, [])
  return (
    <Layout agents={agents} setGenerating = {setGenerating} openAIKey ={openAIKey} setOpenAIKey = {(value) => setOpenAIKey(value)}>
      {generating ? 
          <Generating setCancel = {setCancel} messages={messages} />
        :
        <div className="bg-dark-2 w-full h-layout rounded-3xl px-3 sm:px-6 py-4 text-white mt-2">
          <div className="flex flex-col sm:flex-row justify-between items-start w-full h-header border-b border-neutral-700 pb-4 md:py-0">
            <h1 className=" text-xl sm:text-2xl font-medium text-white ">
              Creating New AI
            </h1>
            <div className="flex items-center space-x-6 mt-3 sm:mt-2">
              <p className="text-sm sm:text-base">Continous mode:</p>
              <SwitchA continousMode={continousMode} setContinousMode={setContinousMode} />
            </div>
          </div>
          <CreateForm setAgents = {setAgents} openAIKey={openAIKey} cansel={cansel} continousMode={continousMode} setMessages={setMessages} setGenerating = {setGenerating}/>
        </div>
      }
      
    </Layout>
  );
}
