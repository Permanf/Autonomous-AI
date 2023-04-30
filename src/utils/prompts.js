import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
// import type { ModelSettings } from "./types";
import { GPT_4 } from "./constants";

export const _settings = {
  customApiKey:"",
  customModelName: "string",
  customTemperature : 0.9,
  customMaxLoops: 25,
  maxTokens: 450
};

export const createModel = (customApiKey) => {

  return new OpenAI({
    openAIApiKey: customApiKey,
    temperature: 0.9,
    modelName: GPT_4,
    maxTokens: 400,
  });
};

export const startGoalPrompt = new PromptTemplate({
  template:
    "You are an autonomous task creation AI called `{agent}`. You have the following objective `{goal}`. Create a list of zero to three tasks to be completed by your AI system such that your goal is more closely reached or completely reached. Return the response as an array of strings that can be used in JSON.parse()",
  inputVariables: ["goal", "agent"],
});

export const executeTaskPrompt = new PromptTemplate({
  template:
    "You are an autonomous task execution AI called AgentGPT. You have the following objective `{goal}`. You have the following tasks `{task}`. Execute the task and return the response as a string.",
  inputVariables: ["goal", "task"],
});

export const createTasksPrompt = new PromptTemplate({
  template:
    "You are an AI task creation agent. You have the following objective `{goal}`. You have the following incomplete tasks `{tasks}` and have just executed the following task `{lastTask}` and received the following result `{result}`. Based on this, create a new task to be completed by your AI system ONLY IF NEEDED such that your goal is more closely reached or completely reached. Return the response as an array of strings that can be used in JSON.parse() and NOTHING ELSE",
  inputVariables: ["goal", "tasks", "lastTask", "result"],
});
