import {
  Box,
  Button,
  defineStyle,
  Fieldset,
  Input,
  Field,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

// import { Field } from "@/components/ui/field";

export const LoginForm = () => {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");

  const floatingStyles = defineStyle({
    pos: "absolute",
    bg,
    px: "0.5",
    height: "15px",
    top: "-2",
    insetStart: "2",
    borderRadius: "20px",
    fontSize: "11px",
    color: textColor,
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
      color: textColor,
      top: "6",

      fontSize: "14px",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: textColor,
      top: "-2",
      fontSize: "11px",
      insetStart: "2",
    },
  });

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Fieldset.Content>
        <Field.Root>
          <Box pos="relative" w="full">
            <Input
              outline={"none"}
              paddingY={"30px"}
              paddingX={"10px"}
              borderRadius={"20px"}
              //   bg={inputBg}
              color={textColor}
              className="peer"
              placeholder=""
              name="work_email"
              border={"1px solid #007AFF"}
              _placeholder={{ fontSize: "14px" }}
            />
            <Field.Label css={floatingStyles}>Work Email</Field.Label>
          </Box>
        </Field.Root>
        <Field.Root>
          <Box pos="relative" w="full">
            <Input
              outline={"none"}
              paddingY={"30px"}
              paddingX={"10px"}
              //   bg={inputBg}
              color={textColor}
              borderRadius={"20px"}
              border={"1px solid #007AFF"}
              className="peer"
              placeholder=""
              name="password"
              _placeholder={{ fontSize: "14px" }}
            />
            <Field.Label css={floatingStyles}>Password</Field.Label>
          </Box>
        </Field.Root>
      </Fieldset.Content>

      <Button
        w={"100%"}
        marginTop={"30px"}
        borderRadius={"15px"}
        fontSize={"18px"}
        fontWeight={"semibold"}
        type="submit"
        alignSelf="flex-start"
        loading
        loadingText="Logging in ..."
      >
        Login
      </Button>
    </Fieldset.Root>
  );
};
