import React from "react";
import { Stack, IconButton, Text } from "@chakra-ui/react";
import BucketItem from "./BucketItem";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const BucketItems = ({ links }) => {

  return (
    <Stack mt={4} mx={2}>
      {links.length === 0 && (
        <Text textAlign="center" color="blue.400">
          This bucket is empty, add a link to see it
        </Text>
      )}
      {links.map((item) => (
        <BucketItem item={item} />
      ))}
    </Stack>
  );
};

export default BucketItems;
