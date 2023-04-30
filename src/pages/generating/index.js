import Layout from "../../component/layout/layout";
import { Pencil, Trash } from "tabler-icons-react";
import {
  Button,
  Input,
  ScrollArea,
  TextInput,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import Thinking from "../../component/thinking/thinking";

const useStyles = createStyles((theme) => ({
  thinking: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
  },
}));

const Generating = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <div className="bg-dark-2 w-full h-layout rounded-3xl px-3 sm:px-6 py-4 text-white mt-2 flex flex-col justify-between">
        <div className="flex justify-between items-start w-full h-header">
          <div>
            <span className="text-xs sm:text-sm text-neutral-600">
              Agent name
            </span>
            <h1 className="font-medium text-white">Software Engineer</h1>
          </div>
          <div className="flex items-center space-x-6 mt-2">
            <div className="w-8 h-8 bg-neutral-800 border border-neutral-700 text-neutral-400 flex justify-center items-center rounded-md cursor-pointer hover:text-white">
              <Pencil size={19} />
            </div>
            <div className="w-8 h-8 bg-neutral-800 border border-neutral-700 text-neutral-400 flex justify-center items-center rounded-md cursor-pointer hover:text-red-600">
              <Trash size={19} />
            </div>
          </div>
        </div>
        <div
          className={`${classes.thinking} w-full h-description rounded-3xl py-4 px-4 text-white border border-neutral-700 flex flex-col my-5 md:my-0`}
        >
          <p className="font-medium text-white text-sm sm:text-base">
            Chef - GPT
          </p>
          <span className="text-xs sm:text-sm text-neutral-600">
            Chef GPT is AI designed to browse the web to discover the next
            upcoming evented invent a unique original recipie that would suite
            it
          </span>
        </div>
        <div
          className={`${classes.thinking} w-full h-thinking rounded-3xl py-4 px-3 text-white border border-neutral-700 flex flex-col `}
        >
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
            <Thinking />
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};
export default Generating;
