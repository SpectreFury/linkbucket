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
        navigate("/buckets", { state: { id: item.id, email: item.author } });
      }}
    >
      <Text color="white" fontWeight="bold">
        {item.title}
      </Text>
      <Text fontSize="12px" color="gray.600" fontWeight="medium">
        {item.bucket.length} links
      </Text>
      <Text fontSize="10px">{item.author}</Text>
    </Flex>
  );
};

export default ListItem;
