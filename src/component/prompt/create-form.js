import { Button, ScrollArea, TextInput, createStyles } from "@mantine/core";
import { IconCheck, IconFlare, IconPlus } from "@tabler/icons-react";
// import GoalItem from "../goal/goal-item";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@mantine/form";
import * as Yup from "yup"
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import Generating from "../../pages/generating";
import AutonomousAgent from "../../utils/AutonomousAgent"

const useStyles = createStyles((theme) => ({
  goal: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
  },
}));

const CreateForm = ({setGenerating, openAIKey, setMessages}) => {
  const { classes } = useStyles();
  console.log(openAIKey)
  // const theme = useMantineTheme();
  const schema = Yup.object({
    agent:Yup.string("String required").min(3).required(),
    role:Yup.string("String required").min(3).required(),
    goals: Yup.array().of(
      Yup.object({
        goal:Yup.string("String required").min(3).required()
      })
      ).min(1)
  })
  const {control, setValues, getValues, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      role:"",
      agent:"",
      goals:[{goal:""}]
    },
    // resolver: yupResolver(schema)
  })

  const {fields, append, remove, update} = useFieldArray({
    control,
    name:"goals",
    key:"id"
  })

  const titles = {
    1:"First Goal",
    2:"Second Goal",
    3:"Third Goal",
    4:"Fourth Goal",
    5:"Fifth Goal"
  }
  console.log(errors)
  // const [generating, setGenerating] = useState(true)
  const onSubmit = (data) =>{
    console.log(data)
    const agent = new AutonomousAgent (
      data.goals?.map(item => item.goal?.trim()).join("\n"), 
      data.agent.trim(), 
      data.role.trim(),
      (value) => setMessages(prev => [...prev, value]),
      ()=>console.log("hell oworld"),
      openAIKey
      )
    agent.run().then(console.log).catch(console.error)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-create-form p-0 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-center h-inputs my-5 md:my-0">
        <div className="w-full md:w-1/2 mr-0 md:mr-7 mb-5 md:mb-0">
          <Controller
            control={control}
            name = {"agent"}
            render={({field:{onChange, value}})=>(
              <TextInput
                color="indigo"
                onChange={onChange}
                value={value}
                placeholder="Chef-GPT"
                label="Name your AI"
                withAsterisk
                radius="md"
              />
            )}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Controller
            name = {"role"}
            control={control}
            render={({field:{onChange, value}})=>(
              <TextInput
                color="indigo"
                placeholder="An AI designed to autonomously develop and run businesses with the sole goal of
                increasing your net worth."
                label="Describe your AI’s role"
                withAsterisk
                onChange={onChange}
                value={value}
                radius="md"
              />
            )}
          
          />
          
         
        </div>
      </div>
      <div
        className={`${classes.goal} w-full h-goal rounded-3xl py-4 text-white border border-neutral-700 flex flex-col my-5 md:my-0`}
      >
        <p className="font-medium text-base sm:text-xl px-3 sm:px-6">
          Enter up to 5 goals for your AI
        </p>
        <ScrollArea
          className="p-3 sm:p-6 py-2"
          scrollbarSize={8}
          styles={(theme) => ({
            scrollbar: {
              '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                backgroundColor: theme.colors.violet[6],
              },
            },
          })}
        >
          {fields.map((item, index)=>(
            <div className="pt-2 flex flex-col" key={index}>
            <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-neutral-800 flex justify-center items-center rounded-md text-xs">
                  {index+1}
                </div>
                <p className="text-neutral-400 text-sm">{titles[index+1]}</p>
                <IconCheck size={20} className="text-neutral-400" />
              </div>
              <div className="flex justify-between items-center">
                <div className="w-full mt-2 border-b border-neutral-700">
                  <Controller
                    name={`goals.${index}.goal`}
                    control={control}
                    render= {({field: {onChange, value}})=>(
                      <TextInput
                        color="indigo"
                        placeholder="Type here ..."
                        radius="md"
                        variant="unstyled"
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  
                  />
                </div>
                <div className="w-8 h-8 bg-neutral-800 text-neutral-400 flex justify-center items-center rounded-md cursor-pointer hover:text-red-600">
                  <IconTrash onClick={()=>{
                      if(fields.length!==1){
                        remove(index)
                      }
                    }} size={19} />
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="px-3 sm:px-6 flex flex-col">
          <Button disabled = {fields.length >= 5 } onClick={()=>{append({goal:""})}} size="xs" color="gray" className="w-full mt-4 bg-neutral-800">
            <IconPlus size={22} className="mr-2" />
            Add new goal
          </Button>
        </div>
      </div>
      <div className="w-full h-generating-button  flex items-end">
        <Button
          // type = "submit"
          // onClick={()=>setGenerating(true)}
          color="indigo"
          type="submit"
          className="w-full bg-gradient-to-r from-violet-400 to-violet-500"
        >
          <IconFlare size={22} className="mr-2" />
          Start generating magic
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
