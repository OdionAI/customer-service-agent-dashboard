import {
  Box,
  Fieldset,
  Input,
  Field,
  defineStyle,
  Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { useRouter } from "next/navigation";

export const Companyinfo = () => {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");
  const router = useRouter();

  // Floating label styles reused for consistency
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
    <Fieldset.Root size="lg" maxW="1000px">
      <Fieldset.Content>
        {/* Company Name Field */}
        <Field.Root>
          <Box pos="relative" w="full">
            <Input
              outline="none"
              py="30px"
              px="10px"
              borderRadius="20px"
              color={textColor}
              className="peer"
              placeholder=""
              name="company_name"
              border="1px solid #007AFF"
              _placeholder={{ fontSize: "14px" }}
            />
            <Field.Label css={floatingStyles}>Company Name</Field.Label>
          </Box>
        </Field.Root>

        {/* First Name Field */}
        <Field.Root mt={4}>
          <Box pos="relative" w="full">
            <Input
              outline="none"
              py="30px"
              px="10px"
              borderRadius="20px"
              color={textColor}
              className="peer"
              placeholder=""
              name="first_name"
              border="1px solid #007AFF"
              _placeholder={{ fontSize: "14px" }}
            />
            <Field.Label css={floatingStyles}>First Name</Field.Label>
          </Box>
        </Field.Root>

        {/* Last Name Field */}
        <Field.Root mt={4}>
          <Box pos="relative" w="full">
            <Input
              outline="none"
              py="30px"
              px="10px"
              borderRadius="20px"
              color={textColor}
              className="peer"
              placeholder=""
              name="last_name"
              border="1px solid #007AFF"
              _placeholder={{ fontSize: "14px" }}
            />
            <Field.Label css={floatingStyles}>Last Name</Field.Label>
          </Box>
        </Field.Root>

        {/* Role Field (Select) */}
        <Field.Root mt={4}>
          <Box pos="relative" w="full">
            <select
              style={{
                width: "100%",
                padding: "15px 10px",
                borderRadius: "20px",
                border: "1px solid #007AFF",
                outline: "none",
                color: textColor,
                backgroundColor: bg,
              }}
              className="peer"
            >
              <option value="">Select Role</option>
              <option value="exec">Exec</option>
              <option value="developer">Developer/Engineer</option>
              <option value="designer">Designer</option>
              <option value="other">Other</option>
            </select>
            <Field.Label css={floatingStyles}>Role</Field.Label>
          </Box>
        </Field.Root>
      </Fieldset.Content>
      <Button
        w="100%"
        mt="30px"
        borderRadius="15px"
        fontSize="18px"
        fontWeight="semibold"
        // type="submit"
        onClick={() => router.push("/")}
      >
        Create Account
      </Button>
    </Fieldset.Root>
  );
};
