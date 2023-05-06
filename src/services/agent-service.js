import {
  createModel,
  startGoalPrompt,
  executeTaskPrompt,
  createTasksPrompt,
  createCritisimPrompt,
  testPrompt
} from "../utils/prompts";
// import type { ModelSettings } from "../utils/types";
import { LLMChain } from "langchain/chains";
import { extractTasks } from "../utils/utils";

async function startGoalAgent(modelSettings, goal, agent) {
  const completion = await new LLMChain({
    llm: createModel(modelSettings),
    prompt: startGoalPrompt,
  }).call({
    goal,
    agent
  });
  // console.log("Completion:" + (completion.text));
  try {
    console.log(JSON.parse(completion.text))
  } catch (e) {
    console.log(e)
  }
  return extractTasks(completion.text) ;
}

async function executeTaskAgent(
  modelSettings,
  goal,
  task
) {
  const completion = await new LLMChain({
    llm: createModel(modelSettings),
    prompt: executeTaskPrompt,
  }).call({
    goal,
    task,
  });

  return completion.text ;
}

async function createTasksAgent(
  modelSettings,
  goal,
  tasks,
  lastTask,
  result,
  completedTasks
) {
  const completion = await new LLMChain({
    llm: createModel(modelSettings),
    prompt: createTasksPrompt,
  }).call({
    goal,
    tasks,
    lastTask,
    result,
  });

  return extractTasks(completion.text, completedTasks);
}

async function createCritisizm (modelSettings, goal, role){
  const completion = await new LLMChain({
    llm:createModel(modelSettings),
    prompt:createCritisimPrompt
  }).call({
    goal,
    role
  })
  return completion.text
}

async function testAgent (modelSettings){
  const completion = await new LLMChain({
    llm:createModel(modelSettings),
    prompt:testPrompt
  }).call()
  return completion.text
}



const OpenAIAgentService = {
  startGoalAgent: startGoalAgent,
  executeTaskAgent: executeTaskAgent,
  createTasksAgent: createTasksAgent,
  createCritisizm: createCritisizm,
  testAgent:testAgent
};

// const MockAgentService: AgentService = {
//   startGoalAgent: async (modelSettings, goal) => {
//     return await new Promise((resolve) => resolve(["Task 1"]));
//   },

//   createTasksAgent: async (
//     modelSettings: ModelSettings,
//     goal: string,
//     tasks: string[],
//     lastTask: string,
//     result: string,
//     completedTasks: string[] | undefined
//   ) => {
//     return await new Promise((resolve) => resolve(["Task 4"]));
//   },

//   executeTaskAgent: async (
//     modelSettings: ModelSettings,
//     goal: string,
//     task: string
//   ) => {
//     return await new Promise((resolve) => resolve("Result: " + task));
//   },
// };

// export default env.NEXT_PUBLIC_FF_MOCK_MODE_ENABLED
//   ? MockAgentService
//   : OpenAIAgentService;
export default OpenAIAgentService
