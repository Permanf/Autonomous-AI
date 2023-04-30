import { AppShell, Burger, ThemeIcon, useMantineTheme } from "@mantine/core";
import Sidebar from "../sidebar/sidebar";
import { useState } from "react";
import Link from "next/link";
import { Plus } from "tabler-icons-react";

export default function Layout({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const lang = "ru";
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Sidebar
          p="xs"
          hiddenBreakpoint="sm"
          lang={lang}
          opened={opened}
          setOpened={setOpened}
        />
      }
    >
      <div className="md:hidden flex justify-between items-center py-2 pb-4">
        <div className="bg-neutral-800 rounded-lg px-2 py-1">
          <Burger
            opened={opened}
            onClick={() => {
              setOpened((o) => !o);
            }}
            size="sm"
            color={theme.colors.gray[1]}
          />
        </div>
        <Link
          href="/"
          className="font-extrabold text-transparent text-lg sm:text-xl bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 first-letter:uppercase"
        >
          Autonomous AI
        </Link>
        <ThemeIcon
          // size={30}
          size="xl"
          variant="gradient"
          gradient={{ from: "indigo.2", to: "indigo.5", deg: 100 }}
          className="text-white font-bold text-2xl rounded-lg"
        >
          <Plus />
        </ThemeIcon>
      </div>
      <main>{children}</main>
    </AppShell>
  );
}
