import React, { useState } from "react";
import {
  Box,
  //   FormControl,
  //   FormLabel,
  Text,
  Select,
  HStack,
  Tag,
  TagLabel,
  //   TagCloseButton,
  Separator,
  SelectItem,
  SelectRoot,
  Card,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { NativeSelectRoot, NativeSelectField } from "./ui/native-select";
import CancelIcon from "./Icons/CancelIcon";

const predefinedLanguages = ["English", "Pidgin", "Yoruba", "Igbo", "Hausa"];

function LanguageSelector({ selectedLanguages, setSelectedLanguages }) {
  // const [selectedLanguages, setSelectedLanguages] = useState([
  //   "English",
  //   "Pidgin",
  //   "Yoruba",
  //   "Igbo",
  //   "Hausa",
  // ]); // Default languages

  const handleAddLanguage = (event) => {
    const newLanguage = event.target.value;
    if (newLanguage && !selectedLanguages.includes(newLanguage)) {
      setSelectedLanguages([...selectedLanguages, newLanguage]);
    }
    event.target.value = ""; // Reset select dropdown
  };

  const handleRemoveLanguage = (language) => {
    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
  };

  return (
    <Card.Root w={"100%"} bg={"#F0F0F0"} p="4" borderRadius="lg">
      <Flex gap={"5"} alignItems={"center"}>
        <Box flex={"3"}>
          <Text color={"black"}>Agent’s Languages</Text>
          <Text fontSize={"12px"} marginBottom={"15px"} color={"#787878"}>
            Set the languages you would like the agent to be able to speak or
            respond to
          </Text>
          <NativeSelectRoot>
            <NativeSelectField
              border={"1px solid black"}
              color={"black"}
              borderRadius={"10px"}
              bg={"#fff"}
              onChange={handleAddLanguage}
              paddingLeft={"10px"}
              placeholder="Select languages"
              w={"100%"}
            >
              {predefinedLanguages.map((lang) => (
                <option border={"1px solid red"} key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>
        <Separator bg={"#787878"} orientation="vertical" height="20" />

        <HStack flex={"2"} mt="2">
          <HStack spacing={3} wrap="wrap">
            {selectedLanguages.map((language) => (
              <Tag.Root
                key={language}
                size="lg"
                w={"90px"}
                borderRadius={"5px"}
                color={"black"}
                paddingY={"2px"}
                paddingX={"10px"}
                border={"1px solid black"}
                variant="outline"
                bg={"#fff"}
                colorScheme="blackAlpha"
              >
                <Tag.Label marginRight={"auto"}>{language}</Tag.Label>
                <Box
                  cursor={"pointer"}
                  onClick={() => handleRemoveLanguage(language)}
                >
                  <CancelIcon />
                </Box>
              </Tag.Root>
            ))}
          </HStack>
        </HStack>
      </Flex>
    </Card.Root>
  );
}

export default LanguageSelector;
