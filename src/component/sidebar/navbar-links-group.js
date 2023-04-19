import React, { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

function LinksGroup({ icon, label, link, initiallyOpened, links }) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? ChevronRight : ChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    // <Link to={`/${link.link}`} className="bg-red-300">
    <Text
      component="a"
      className={`${classes.link} bg-blue-50`}
      variant="link"
      href={link.link}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        console.log(link.link);
      }}
    >
      {link.label}
    </Text>
    // </Link>
  ));

  return (
    <Link href={link}>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0} className="px-3">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <ThemeIcon
              size={22}
              // size="lg"
              variant="outline"
               gradient={{ from: "cyan", to: "violet", deg: 100 }}
            > */}
            {icon}
            {/* </ThemeIcon> */}
            <Box className={`font-medium ml-2 text-white`}>{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </Link>
  );
}

export default LinksGroup;
