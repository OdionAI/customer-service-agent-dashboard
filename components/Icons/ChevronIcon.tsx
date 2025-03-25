import { Icon } from "@chakra-ui/react";

export const ChevronIcon = () => {
  return (
    <Icon fontSize="40px" color="red.500">
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 1L4 4L1 1"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Icon>
  );
};
