import {
  Button,
  Input,
  ScrollArea,
  TextInput,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconFlare, IconPlus, IconTrash } from "@tabler/icons-react";
import GoalItem from "../goal/goal-item";
const useStyles = createStyles((theme) => ({
  goal: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
  },
}));

const CreateForm = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const goals = [
    {
      id: 0,
      title: "First goal",
      description:
        "Invent an original and out-of-the-box recipie to suit a current event, such as Easter",
    },
    {
      id: 1,
      title: "Second goal",
      description: "Save the resulting recipie to file.",
    },
    {
      id: 2,
      title: "Third goal",
      description: "Shutdown upon achieving your goal.",
    },
  ];

  return (
    <form className="h-create-form p-0 flex flex-col">
      <div className="flex justify-between items-center h-inputs">
        <div className="w-1/2 mr-7">
          <TextInput
            color="indigo"
            placeholder="Chef-GPT"
            label="Name your AI"
            withAsterisk
            radius="md"
          />
        </div>
        <div className="w-1/2">
          <TextInput
            color="indigo"
            placeholder="An AI designed to autonomously develop and run businesses with the sole goal of
            increasing your net worth."
            label="Describe your AI’s role"
            withAsterisk
            radius="md"
          />
        </div>
      </div>
      <div
        className={`${classes.goal} w-full h-goal rounded-3xl py-4 text-white border border-neutral-700 flex flex-col`}
      >
        <p className="font-medium text-xl px-6">
          Enter up to 5 goals for your AI
        </p>
        <ScrollArea
          className="p-6 py-2"
          scrollbarSize={8}
          styles={(theme) => ({
            scrollbar: {
              '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                backgroundColor: theme.colors.violet[6],
              },
            },
          })}
        >
          {goals.map((goal) => {
            return <GoalItem key={goal.id} goal={goal} />;
          })}
        </ScrollArea>

        <div className="p-6 py-0 flex flex-col">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-neutral-800 flex justify-center items-center rounded-md text-xs">
              4
            </div>
            <p className="text-neutral-400 text-sm">First goal</p>
            <IconCheck size={20} className="text-neutral-400" />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-full mt-2 border-b border-neutral-700">
              <TextInput
                color="indigo"
                placeholder="Type here ..."
                radius="md"
                variant="unstyled"
              />
            </div>
            {/* <div className="w-8 h-8 bg-neutral-800 text-neutral-400 flex justify-center items-center rounded-md cursor-pointer hover:text-red-600">
              <IconTrash size={19} />
            </div> */}
          </div>
          <Button color="gray" className="w-full  mt-4 bg-neutral-800">
            <IconPlus size={22} className="mr-2" />
            Add new goal
          </Button>
        </div>
      </div>
      <div className="w-full h-generating-button  flex items-end">
        <Button
          color="indigo"
          className="w-full bg-gradient-to-r from-indigo-400 to-indigo-600"
        >
          <IconFlare size={22} className="mr-2" />
          Start generating magic
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
