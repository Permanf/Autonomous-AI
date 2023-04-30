import AgentService from "../services/agent-service"
class AutonomousAgent {
    name;
    goal;
    tasks = [];
    completedTasks = [];
    cancel; 
    agent;
    renderMessage;
    shutdown;
    openAIKey;
    numLoops = 0;
    
    constructor ( goal, agent, role, renderMessage, shutdown, openAIKey){
        this.goal = goal;
        this.agent = agent;
        this.role = role
        this.renderMessage = renderMessage;
        this.shutdown = shutdown;
        this.openAIKey = openAIKey
    }

    async run (){
        console.log(this.openAIKey)
        this.sendGoalMessage()
        try {
            const result = await AgentService.startGoalAgent(this.openAIKey, this.goal, this.agent)
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    sendGoalMessage () {
        this.senddMessage({type:"goal", value:"We start this goals"})
    }

    async getInitialTasks (){

    }

    senddMessage(message){
        this.renderMessage(message)
    }

}

export default AutonomousAgent;
