import React from "react";
import { Stack, IconButton, Text } from "@chakra-ui/react";
import BucketItem from "./BucketItem";

const BucketItems = ({ links, setLinks, selectedBucket }) => {
  return (
    <Stack mt={4} mx={2} maxHeight="400px" overflowY="scroll" pr={2}>
      {links.length === 0 && (
        <Text textAlign="center" color="blue.400">
          This bucket is empty, add a link to see it
        </Text>
      )}
      {links.map((item) => (
        <BucketItem item={item} setLinks={setLinks} selectedBucket={selectedBucket}/>
      ))}
    </Stack>
  );
};

export default BucketItems;
