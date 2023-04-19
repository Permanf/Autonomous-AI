import {
  AppShell,
  Header,
  Group,
  MediaQuery,
  Burger,
  useMantineTheme,
  Avatar,
  Menu,
  Badge,
  Button,
} from "@mantine/core";
// import {
//   Settings,
//   Logout,
//   ChevronDown,
//   Search,
//   Building,
//   Users,
// } from "tabler-icons-react";
import Sidebar from "../sidebar/sidebar";
import { useState } from "react";

export default function Layout({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  // const [extended, setExtended] = useLocalStorage({
  //   key: "sidebar-size",
  //   defaultValue: "true",
  // });
  // const dispatch = useDispatch();
  // const { lang, token } = useSelector((state) => state.auth);
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
      <main>{children}</main>
    </AppShell>
  );
}
