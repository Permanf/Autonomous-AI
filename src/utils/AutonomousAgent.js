import AgentService from "../services/agent-service"
const TIMOUT_SHORT = 300;

class AutonomousAgent {
    name;
    goal;
    tasks = [];
    completedTasks = [];
    cancel; 
    agent;
    isRunning = true;
    renderMessage;
    openAIKey;
    maxLoops = 25;
    numLoops = 0;
    cancel;
    setCancel;
    continousMode;
    
    constructor ( goal, agent, role, renderMessage,  openAIKey, cancel, setCancel, continousMode){
        this.goal = goal;
        this.agent = agent;
        this.role = role
        this.renderMessage = renderMessage;
        this.openAIKey = openAIKey;
        this.isRunning = !cancel;
        this.setCancel = setCancel;
        this.continousMode = continousMode;
    }
    async run (){
        // console.log(this.openAIKey)
        this.sendGoalMessage()
        this.sendThinkingMessage()
        // try {
        //     await testConnection(this.openAIKey)
        // } catch (e) {
        //     this.sendErrorMessage
        // }

        const critism = await AgentService.createCritisizm(this.openAIKey, this.goal, this.role)
        // console.log(critism)
        this.sendCriticismMessage(critism)
        
        try {
            const result = await AgentService.startGoalAgent(this.openAIKey, this.goal, this.agent)
            console.log(result, "I am here")
            this.tasks = result;
            for (const task of this.tasks) {
                await new Promise((r) => setTimeout(r, TIMOUT_SHORT));
                this.sendTaskMessage(task);
            }
        } catch (e) {
            console.log(e)
            this.shutdown("Error was occured and agent was stopped")
            return 1;
        }
        if(this.continousMode){
            await this.loop()
        }

    }   
    sendCriticismMessage(critisizm){
        this.senddMessage({type:"criticism", value:critisizm})
    }
    shutdown(message){
        this.setCancel(true);
        this.senddMessage({type:"system", value:message})
    }
    async loop (){
        console.log(this.numLoops)
        console.log(this.tasks)
        console.log(this.isRunning)
        if (!this.isRunning) {
            this.shutdown("Agent has been stopped ")
            return;
        }
      
        if (this.tasks.length === 0) {
            // this.sendCompletedMessage();
            this.shutdown("Tasks was ended and agent did his job");
            console.log("shut down")
            return;
        }
        this.numLoops += 1;
        if (this.numLoops > this.maxLoops) {
            this.sendLoopMessage();
            console.log("shut down")
            this.shutdown("This agent has maxed out on loops. To save your wallet, this agent is shutting down. You can configure the number of loops in the advanced settings.");
            return;
        }
        this.completedTasks.push(this.tasks[0] || "");
        const currentTask = this.tasks.shift();
        this.sendThinkingMessage();
        
        const result = await this.executeTask(currentTask)
        console.log(result);
        this.sendExecutionMessage(currentTask, result)
        const newTasks = await this.getAdditionalTasks(currentTask, result)
        console.log(newTasks)
        this.tasks = this.tasks.concat(newTasks)
        for (const task of newTasks) {
            await new Promise((r) => setTimeout(r, TIMOUT_SHORT));
            this.sendTaskMessage(task);
        }
        if(this.isRunning){
            await this.loop()
        }
    }
    async getAdditionalTasks (lastTask, result){
        return await AgentService.createTasksAgent(
            this.openAIKey,
            this.goal,
            this.tasks,
            lastTask,
            result,
            this.completedTasks
        )
    }
    sendExecutionMessage(task, result){
        this.senddMessage({type:"action", task, value:result})
    }
    async executeTask (task){
        return await AgentService.executeTaskAgent(
            this.openAIKey,
            this.goal,
            task
          );
    }
    sendLoopMessage (){
        this.senddMessage({type:"loop", value:"This agent has maxed out on loops. To save your wallet, this agent is shutting down. You can configure the number of loops in the advanced settings."})
    }
    sendGoalMessage () {
        this.senddMessage({type:"goal", value:"We start this goals"})
    }

    async getInitialTasks (){

    }
    async sendTaskMessage(task) {
        this.senddMessage({type:"task", value:task})
    }
    senddMessage(message){
        this.renderMessage(message)
    }
    sendThinkingMessage(){
        this.senddMessage({type:"think", value:"Thinking"})
    }
    stopAgent() {
        // this.sendManualShutdownMessage();
        console.log("hello")
        this.isRunning = false;
        const message= "You stoped agent"
        this.shutdown(message);
        return;
      }
}

export const testConnection = async (modelSettings) => {
    // A dummy connection to see if the key is valid
    // Can't use LangChain / OpenAI libraries to test because they have retries in place
    return await AgentService.testAgent(modelSettings)
  };

export default AutonomousAgent;
