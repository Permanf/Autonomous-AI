import { useState } from "react";
import { Switch, Group, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useViewportSize } from "@mantine/hooks";

function SwitchA() {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);
  const { width } = useViewportSize();

  return (
    <Group position="center">
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        // color={checked ? theme.colors.violet[8] : theme.colors.red[5]}
        color="violet"
        size={width > 640 ? "md" : "sm"}
        label={checked ? "Enable" : "Disable"}
        styles={{
          label: {
            fontSize: width > 640 ? "16px" : "14px",
            color: checked ? theme.colors.violet[7] : theme.colors.gray[7],
          },
        }}
        className="w-32"
        thumbIcon={
          checked ? (
            <IconCheck
              size="0.8rem"
              color={theme.colors.violet[theme.fn.primaryShade()]}
              stroke={3}
            />
          ) : (
            <IconX
              size="0.8rem"
              color={theme.colors.red[theme.fn.primaryShade()]}
              stroke={3}
            />
          )
        }
      />
    </Group>
  );
}
export default SwitchA;
