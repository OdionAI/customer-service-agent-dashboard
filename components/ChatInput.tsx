import React from "react";
import {
  HStack,
  Grid,
  Flex,
  Textarea,
  IconButton,
  createListCollection,
  Box,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useColorModeValue } from "@/components/ui/color-mode";
import { AIIcon } from "./Icons/AIIcon";
import { AttachmentIcon } from "./Icons/AttachmentIcon";
import { SendIcon } from "./Icons/SendIcon";
import { SendIconWhite } from "./Icons/SendIconWhite";
import { AttachmentIconWhite } from "./Icons/AttachmentIconWhite";
import { AIIconWhite } from "./Icons/AIIconWhite";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import SamplePrompt from "./SamplePrompt";

function ChatInput() {
  const textColor = useColorModeValue("#333333", "#FFFFFF");
  const bgColor = useColorModeValue("#F9F9FA", "#333333");
  const send_Icon = useColorModeValue(<SendIcon />, <SendIconWhite />);
  const attachment_Icon = useColorModeValue(
    <AttachmentIcon />,
    <AttachmentIconWhite />
  );
  const ai_Icon = useColorModeValue(<AIIcon />, <AIIconWhite />);
  const hover_color = useColorModeValue("gray.200", "gray.700");

  const frameworks = createListCollection({
    items: [
      { label: "Internal Docs", value: "react" },
      { label: "Web", value: "vue" },
      { label: "Landing page", value: "angular" },
      { label: "All", value: "svelte" },
    ],
  });
  return (
    <>
      <Flex
        flexDir={"column"}
        borderRadius={"16px"}
        paddingY={"15px"}
        paddingX={"10px"}
        bg={bgColor}
        // border={"1px solid #E0E0E1"}
      >
        <Field label="">
          <Textarea
            autoresize
            padding={"10px"}
            color={textColor}
            placeholder="What can I help with?"
            variant="subtle"
            bg={bgColor}
            outline={"none"}
            border={"none"}
          />
        </Field>
        <Flex justifyContent={"space-between"}>
          <HStack gap={"3px"}>
            <IconButton
              _hover={{ bg: hover_color }}
              variant={"plain"}
              size={"md"}
            >
              {ai_Icon}
            </IconButton>
            <IconButton
              size={"md"}
              _hover={{ bg: hover_color }}
              variant={"plain"}
            >
              {attachment_Icon}
            </IconButton>

            <SelectRoot collection={frameworks} size="xs" width="90px">
              <SelectTrigger cursor={"pointer"} bg={"#ffffff"} border={"none"}>
                <SelectValueText
                  borderRadius={"5px"}
                  paddingX={"5px"}
                  fontSize={"8px"}
                  placeholder="Select Source"
                  color={textColor}
                />
              </SelectTrigger>
              <SelectContent w={"200px"} padding={"10px"} color={textColor}>
                {frameworks.items.map((movie) => (
                  <SelectItem
                    padding={"10px"}
                    // w={"300px"}
                    item={movie}
                    key={movie.value}
                  >
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </HStack>
          <IconButton _hover={{ bg: hover_color }} variant={"plain"}>
            {send_Icon}
          </IconButton>
        </Flex>
      </Flex>
      <Flex pt={"20px"} w="100%" overflow={"scroll"} gap={"10px"}>
        <SamplePrompt />
        <SamplePrompt />
        <SamplePrompt />
        <SamplePrompt />
        <SamplePrompt />
        <SamplePrompt />
      </Flex>
    </>
  );
}

export default ChatInput;
