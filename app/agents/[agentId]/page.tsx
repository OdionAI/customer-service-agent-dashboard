"use client";

import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  Input,
  NativeSelect,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { IoClose } from "react-icons/io5";
// import { useColorModeValue } from "@/components/ui/color-mode";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { useFetchAgent, useUpdateAgent } from "@/hooks/useAgentMutations";
import { toaster } from "@/components/ui/toaster";

interface FormData {
  name: string;
  first_message: string;
  tone: string;
  // You can register other fields if needed.
}

function Dashboard() {
  // const bg = useColorModeValue("#FFFFFF", "#333333");
  // const textColor = useColorModeValue("#333333", "#FFFFFF");
  const params = useParams();
  const { user } = useUserContext();

  // Extract companyId from the user context.
  const companyId = user?.company?.id as string;
  // Extract agentId from the route parameters.
  const agentId = params.agentId as string;

  // Instantiate the update agent hook.
  const updateAgentMutation = useUpdateAgent();

  // Fetch the agent's current details.
  const {
    data: agent,
    isLoading: agentLoading,
    error: agentError,
  } = useFetchAgent(companyId, agentId);

  // react-hook-form setup.
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      first_message: "",
      tone: "",
    },
  });

  // State for managing multiple languages.
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  // Handler to update languages when the select value changes.
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (lang && !selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };
  // Handler to remove a language.
  const handleRemoveLanguage = (langToRemove: string) => {
    setSelectedLanguages((prev) =>
      prev.filter((lang) => lang !== langToRemove)
    );
  };

  // Once the agent data is fetched, prepopulate the form.
  useEffect(() => {
    if (agent) {
      reset({
        name: agent.name || "",
        first_message: agent.first_message || "",
        tone: agent.tone || "",
      });
      // For languages, if present, update state; else clear.
      if (agent.languages && Array.isArray(agent.languages)) {
        setSelectedLanguages(agent.languages);
      } else {
        setSelectedLanguages([]);
      }
    }
  }, [agent, reset]);

  // Submission handler.
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const updateData = {
      ...values,
      languages: selectedLanguages,
    };

    try {
      await updateAgentMutation.mutateAsync({
        company_id: companyId,
        agent_id: agentId,
        data: updateData,
      });
      // Optionally show a success message.
      toaster.create({
        description: "Agent updated successfully",
        duration: 5000,
      });
      // console.log("Agent updated successfully");
    } catch (err: unknown) {
      console.error("Failed to update agent", err);
    }
  };

  if (agentLoading) {
    return (
      <Box textAlign="center" py="20px">
        <Text>Loading agent details...</Text>
      </Box>
    );
  }
  if (agentError) {
    return (
      <Box textAlign="center" py="20px">
        <Text color="red.500">Error loading agent details.</Text>
      </Box>
    );
  }

  return (
    <Container ml="30px" mt="100px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack>
          <Image alt="settings icon" mr="5px" asChild>
            <NextImage
              width={25}
              height={25}
              src="/icons/settings_icon.svg"
              alt="settings icon"
            />
          </Image>
          <Text color="#000000" mr="40px" fontSize="32px">
            Customize your AI Agent
          </Text>
          <Button
            type="submit"
            bg="#007AFF"
            color="white"
            borderRadius="100px"
            paddingX="15px"
            w="110px"
            fontSize="13px"
            h="35px"
            mr="5px"
            loading={updateAgentMutation.isPending}
          >
            Save Changes
          </Button>
        </HStack>

        {/* Name Section */}
        <Box mt="30px">
          <Text mb="10px">Name</Text>
          <Text mb="20px" color="#808080" fontSize="14px">
            Your AI Agent&apos;s Name
          </Text>
          <Input
            border="1px solid #D9D9D9"
            p="10px"
            h="60px"
            w="400px"
            placeholder="Enter agent name"
            {...register("name", { required: "Name is required" })}
          />
        </Box>

        {/* First Message Section */}
        <Box mt="30px">
          <Text mb="10px">First Message</Text>
          <Text w="500px" mb="20px" color="#808080" fontSize="14px">
            The first message the agent will say. If empty, the agent will wait
            for the user to start the conversation.
          </Text>
          <Input
            p="10px"
            h="100px"
            w="500px"
            border="1px solid #D9D9D9"
            placeholder="Hi, my name is Eric. How can I help you today?"
            {...register("first_message")}
          />
        </Box>

        {/* Language Section (Multi-Select) */}
        <Box mt="30px">
          <Text mb="10px">Language</Text>
          <Text w="500px" mb="20px" color="#808080" fontSize="14px">
            Specify additional languages that the agent will support.
          </Text>
          <NativeSelect.Root w="500px">
            <NativeSelect.Field
              border="1px solid #D9D9D9"
              px="10px"
              onChange={handleLanguageChange}
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Pidgin">Pidgin</option>
              <option value="Yoruba">Yoruba</option>
              <option value="Igbo">Igbo</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator mr="10px" />
          </NativeSelect.Root>
          <HStack gap="10px" mt="10px">
            {selectedLanguages.length > 0 ? (
              selectedLanguages.map((lang, index) => (
                <Badge key={index} colorScheme="blue" px="10px" py="5px">
                  {lang}
                  <Box onClick={() => handleRemoveLanguage(lang)}>
                    <IoClose size={16} />
                  </Box>
                </Badge>
              ))
            ) : (
              <Text color="#808080" fontSize="14px">
                No languages selected
              </Text>
            )}
          </HStack>
        </Box>

        {/* Tone Section */}
        <Box mt="30px">
          <Text mb="10px">Tone</Text>
          <Text w="500px" mb="20px" color="#808080" fontSize="14px">
            Used to determine the persona of the agent while engaging in
            conversation.
          </Text>
          <NativeSelect.Root w="500px">
            <NativeSelect.Field
              border="1px solid #D9D9D9"
              px="10px"
              {...register("tone")}
            >
              <option value="">Select Tone</option>
              <option value="Professional">Professional</option>
              <option value="Very Kind">Very Kind</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator mr="10px" />
          </NativeSelect.Root>
        </Box>
      </form>
    </Container>
  );
}

export default Dashboard;
