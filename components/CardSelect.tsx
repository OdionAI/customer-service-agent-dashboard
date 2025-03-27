"use client";

import React, { useState, useEffect } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";

export interface Option {
  label: string;
  value: string;
  icon: StaticImageData;
}

interface CardSelectProps {
  options: Option[];
  value?: string;
  setSelectedAgent: (value: string) => void;
  onChange?: (value: string) => void;
  // Optionally, add a className to style the container externally.
  className?: string;
}

export const CardSelect: React.FC<CardSelectProps> = ({
  options,
  value,
  setSelectedAgent,
  onChange,
  className = "",
}) => {
  // Keep internal state if the value is uncontrolled.
  const [selected, setSelected] = useState<string>(value || "");

  // Sync with value if it is controlled.
  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleClick = (optionValue: string) => {
    setSelected(optionValue);
    setSelectedAgent(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <Box w={"100%"} className={`card-select-container ${className}`}>
      <Grid templateColumns="repeat(2, 1fr)" gap="4">
        {options.map((option) => (
          <Flex
            key={option.value}
            flexDir={"column"}
            onClick={() => handleClick(option.value)}
            // justifyContent={"center"}
            // alignItems={"center"}
            padding={"10px"}
            className={`card ${selected === option.value ? "selected" : ""}`}
            style={{
              cursor: "pointer",
              border:
                selected === option.value
                  ? "2px solid #0070f3"
                  : "1px solid #ccc",
              borderRadius: "8px",
              // padding: "16px",
              //   margin: "8px",
              transition: "border-color 0.2s ease",
            }}
          >
            <Flex alignItems={"center"} gap={"6px"}>
              <Image alt="settings icon" mr={"5px"} asChild>
                <NextImage
                  width={20}
                  height={20}
                  src={option.icon}
                  alt={`settings icon`}
                />
              </Image>

              <Text>{option.label}</Text>
            </Flex>
            <Text mt={"5px"} color={"#808080"} fontSize={"14px"}>
              Create a dedicated support agent who is always ready to resolve
              any Issues.
            </Text>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};
