import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ListItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Flex
      background="gray.400"
      p="4px 10px"
      borderRadius="4px"
      cursor="pointer"
      _hover={{ background: "gray.800" }}
      flexDirection="column"
      onClick={() => {
        navigate("/buckets");
      }}
    >
      <Text color="white" fontWeight="bold">
        {item.title}
      </Text>
      <Text fontSize="12px" color="gray.600" fontWeight="medium">
        12 links
      </Text>
    </Flex>
  );
};

export default ListItem;
