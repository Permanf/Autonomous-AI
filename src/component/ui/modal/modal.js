import { Modal, useMantineTheme, TextInput } from "@mantine/core";
import { Key } from "tabler-icons-react";

function ModalKey({ modal_opened, close }) {
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        size="lg"
        // className="bg-red-300"
        radius="lg"
        padding={25}
        centered
        opened={modal_opened}
        onClose={close}
        title="Settings"
        overlayProps={{
          background: "red",
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.8,
          //   blur: 3,
        }}
        styles={{
          title: { fontSize: "25px" },
          header: { paddingTop: "1.5rem", paddingBottom: "1.5rem" },
        }}
      >
        <p className="border-t border-neutral-700 py-4">
          Welcome to AgentGPT! We're receiving traffic far higher than our small
          team is able to provide for at the moment.
        </p>
        <p>
          Because of this, we momentarily ask that users utilize their own
          OpenAI API key for AgentGPT. This will only be used in the current
          browser session and not stored anywhere. If you elect not to, your
          agent will not be able to execute for very long. To do this, sign up
          for an OpenAI account and visit the following link.
        </p>
        <div className="w-full relative my-5">
          <TextInput
            color="indigo"
            placeholder="SK ..."
            withAsterisk
            radius="md"
            styles={{
              input: {
                paddingLeft: "80px",
              },
            }}
          />
          {/* <div className="bg-gray-200 absolute left-0 top-0 w-14">
            <Key size={22} />
          </div> */}
          <div className="flex space-x-1 bg-neutral-600 absolute left-1 top-1 text-sm text-white p-1 px-2 rounded-md">
            <Key size={18} /> <span>Key:</span>
          </div>
        </div>
        <p>
          NOTE: This must be a PAID OpenAI API account, not the free tier. This
          is different from a ChatGPT Plus subscription.
        </p>
      </Modal>
    </>
  );
}

export default ModalKey;
