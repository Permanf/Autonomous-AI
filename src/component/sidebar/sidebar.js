import React from "react";
import { memo } from "react";
import {
  Navbar,
  Group,
  Burger,
  ScrollArea,
  createStyles,
  ThemeIcon,
  MediaQuery,
  useMantineTheme,
  Button,
} from "@mantine/core";
import {
  useDisclosure,
  useViewportSize,
  useLocalStorage,
} from "@mantine/hooks";
import { BrandDiscord, BrandTwitter, Help, Settings } from "tabler-icons-react";
import Link from "next/link";
import { IconPlus, IconTrash } from "@tabler/icons-react";
// import LinksGroup from "./navbar-links-group";
import ModalKey from "../ui/modal/modal";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    paddingBottom: 0,
    border: "none",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  footer: {
    padding: theme.spacing.md,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },
}));
const Sidebar = ({
  opened,
  setOpenAIKey,
  openAIKey,
  setOpened,
  setGenerating,
  agents,
  agent,
  lang,
  setAgents,
  setAgentData,
  ...rest
}) => {
  const theme = useMantineTheme();
  const [modal_opened, { open, close }] = useDisclosure(true);
  const { width } = useViewportSize();
  const { classes } = useStyles();

  const links = agents?.map((item, index) => (
    <div key={index} className="flex flex-row justify-between items-start">
      <p
        onClick={() => {
          setAgentData(item);
          setGenerating(false);
          agent?.stopAgent();
        }}
        className="cursor-pointer"
      >
        {item.agent}
      </p>
      <div className="w-6 h-6 bg-neutral-800 text-neutral-400 flex justify-center items-center rounded-md cursor-pointer hover:text-red-600">
        <IconTrash
          onClick={() => {
            setAgents(agents.filter((item2, index2) => index2 !== index));
          }}
          size={16}
        />
      </div>
    </div>
  ));

  return (
    <Navbar
      {...rest}
      width={{ sm: 270 }}
      p="md"
      className={`${classes.navbar} ${
        opened ? "block transition-all" : "hidden transition-all"
      } md:block `}
    >
      <Navbar.Section
        className={`${classes.header} 
        hidden md:block
        `}
      >
        <Group mt={2}>
          <ThemeIcon
            // size={30}
            size="xl"
            variant="gradient"
            gradient={{ from: "indigo.2", to: "indigo.5", deg: 100 }}
            className="text-indigo-600 font-bold text-2xl"
          >
            A
          </ThemeIcon>
          <Link
            href="/"
            className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 first-letter:uppercase"
          >
            Autonomy GPT
          </Link>
          {/* <Code sx={{ fontWeight: 700 }}>v1.0.0</Code> */}
        </Group>
        <Button
          leftIcon={<IconPlus size="1rem" />}
          color="indigo"
          onClick={() => {
            setGenerating(false);
            setAgentData({});
          }}
          className="w-full mt-6 bg-gradient-to-r from-violet-400 to-violet-500"
        >
          Create new agent
        </Button>
      </Navbar.Section>
      <Group position="right" className="mt-14 sm:mt-0">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => {
              setOpened((o) => !o);
            }}
            size="sm"
            color={theme.colors.gray[1]}
          />
        </MediaQuery>
      </Group>
      <p className={`font-medium text-neutral-600 my-3 pt-4 md:pt-0`}>
        Recent projects
      </p>
      <Navbar.Section
        grow
        className={"pt-3 flex flex-col items-center justify-center"}
        component={ScrollArea}
        scrollbarSize={8}
        styles={(theme) => ({
          scrollbar: {
            '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
              backgroundColor: theme.colors.violet[6],
            },
          },
        })}
      >
        <div
          className={
            "w-full  border-neutral-800 px-3 flex flex-col space-y-4 text-white"
          }
        >
          {links}
        </div>
      </Navbar.Section>
      <Navbar.Section
        className={`${classes.footer} pt-3 flex flex-col items-center justify-center`}
      >
        <div className="w-full border-t border-neutral-800 pt-7 px-3 flex flex-col space-y-4 text-white">
          <div
            onClick={open}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Settings size={24} />
            <span className="text-sm font-medium">Settings</span>
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <Help size={24} />
            <span className="text-sm font-medium">Help</span>
          </Link>
          <Link href="/" className="flex items-center space-x-2">
            <BrandDiscord size={24} />
            <span className="text-sm font-medium">Discord</span>
          </Link>
          <Link href="/" className="flex items-center space-x-2">
            <BrandTwitter size={24} />
            <span className="text-sm font-medium">Twitter</span>
          </Link>
        </div>
        <ModalKey
          openAIKey={openAIKey}
          setOpenAIKey={(val) => setOpenAIKey(val)}
          modal_opened={modal_opened}
          close={close}
        />
      </Navbar.Section>
    </Navbar>
  );
};

export default memo(Sidebar);
