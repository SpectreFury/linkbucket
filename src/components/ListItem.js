import React from "react";
import { Flex, Text, Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ListItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Flex
      background="gray.400"
      p="4px 10px"
      borderRadius="4px"
      cursor="pointer"
      _hover={{ background: "gray.800", color: "#D8D9DA" }}
      onClick={() => {
        navigate("/buckets", { state: { id: item.id, email: item.author } });
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex flexDirection="column">
        <Text color="white" fontWeight="bold">
          {item.title}
        </Text>
        <Text fontSize="12px" fontWeight="semibold">
          {item.author.split("@")[0]}
        </Text>
      </Flex>
      <Flex>
        <Tag size="sm" colorScheme="teal">
          {item.bucket.length} links
        </Tag>
      </Flex>
    </Flex>
  );
};

export default ListItem;
