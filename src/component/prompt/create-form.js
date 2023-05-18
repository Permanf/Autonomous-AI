import { Button, ScrollArea, TextInput, createStyles } from "@mantine/core";
import { IconCheck, IconFlare, IconPlus } from "@tabler/icons-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import AutonomousAgent, { testConnection } from "../../utils/AutonomousAgent";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  goal: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
  },
}));

const CreateForm = ({
  setGenerating,
  openAIKey,
  setMessages,
  cancel,
  setCancel,
  continousMode,
  setAgent,
  agentData,
  setAgents,
  setAgentData,
  agents,
  setAgentData2,
  agent,
}) => {
  const { classes } = useStyles();

  const schema = Yup.object().shape({
    agent: Yup.string("String required").min(3).required(),
    role: Yup.string("String required").min(3).required(),
    goals: Yup.array()
      .of(
        Yup.object({
          goal: Yup.string("String required")
            .min(3, "Minimum 3 letter")
            .required(),
        })
      )
      .min(1),
  });
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
      agent: "",
      goals: [{ goal: "" }],
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    // console.log(agentData)
    if (agentData?.agent) {
      setValue("agent", agentData?.agent);
      setValue("role", agentData?.role);
      setValue("goals", agentData?.goals);
      // onSubmit(agentData)
    } else {
      setValue("agent", "");
      setValue("role", "");
      setValue("goals", [{ goal: "" }]);
    }
  }, [agentData]);
  const [loading, setLoading] = useState(false);
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "goals",
    key: "id",
  });

  const titles = {
    1: "First Goal",
    2: "Second Goal",
    3: "Third Goal",
    4: "Fourth Goal",
    5: "Fifth Goal",
  };
  // console.log(errors)
  // const [generating, setGenerating] = useState(true)
  const onSubmit = (data) => {
    setLoading(true);
    setCancel(false);
    testConnection(openAIKey)
      .then(() => {
        setLoading(false);
        // localStorage.setItem("agents",JSON.stringify(agents?.length ? agents.concat(data) : [data]))
        if (!agentData?.agent)
          setAgents(agents?.length ? agents.concat(data) : [data]);
        setGenerating(true);
        setAgentData2(data);
        setMessages([]);
        const agent = new AutonomousAgent(
          data.goals?.map((item) => item?.goal).join("\n"),
          data.agent.trim(),
          data.role.trim(),
          (value) =>
            setMessages((prev) => (prev?.length ? [...prev, value] : [value])),
          openAIKey,
          cancel,
          setCancel,
          continousMode
        );
        setAgent(agent);
        agent.run().then(console.log).catch(console.error);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        notifications.show({
          color: "red",
          title: "OpenAI secret key",
          message: "Not valid OpenAI secret key",
        });
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-create-form p-0 flex flex-col"
    >
      <div className="flex flex-col md:flex-row justify-between items-center h-inputs my-5 md:my-0">
        <div className="w-full md:w-1/2 mr-0 md:mr-7 mb-5 md:mb-0">
          <Controller
            control={control}
            name={"agent"}
            render={({ field: { onChange, value } }) => (
              <TextInput
                color="indigo"
                onChange={onChange}
                value={value}
                placeholder="Chef-GPT"
                label="Name your AI"
                error={errors?.agent?.message}
                withAsterisk
                radius="md"
              />
            )}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Controller
            name={"role"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                color="indigo"
                placeholder="An AI designed to autonomously develop and run businesses with the sole goal of
                increasing your net worth."
                label="Describe your AI’s role"
                withAsterisk
                error={errors?.role?.message}
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
          {fields.map((item, index) => (
            <div className="pt-2 flex flex-col" key={item.id}>
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-neutral-800 flex justify-center items-center rounded-md text-xs">
                  {index + 1}
                </div>
                <p className="text-neutral-400 text-sm">{titles[index + 1]}</p>
                <IconCheck size={20} className="text-neutral-400" />
              </div>
              <div className="flex justify-between items-center">
                <div className="w-full mt-2 border-b border-neutral-700">
                  <Controller
                    name={`goals.${index}.goal`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        color="indigo"
                        placeholder="Type here ..."
                        radius="md"
                        error={
                          errors?.goals?.length
                            ? errors?.goals[index]?.goal?.message
                            : ""
                        }
                        variant="unstyled"
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </div>
                <div className="w-8 h-8 bg-neutral-800 text-neutral-400 flex justify-center items-center rounded-md cursor-pointer hover:text-red-600">
                  <IconTrash
                    onClick={() => {
                      if (fields.length !== 1) {
                        console.log(index);
                        remove(index);
                      }
                    }}
                    size={19}
                  />
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="px-3 sm:px-6 flex flex-col">
          <Button
            disabled={fields.length >= 5}
            onClick={() => {
              append({ goal: "" });
            }}
            size="xs"
            color="gray"
            className="w-full mt-4 bg-neutral-800"
          >
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
          loading={loading}
          className="w-full bg-gradient-to-r from-violet-400 to-violet-500"
        >
          <IconFlare size={22} className="mr-2" />
          Start
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
