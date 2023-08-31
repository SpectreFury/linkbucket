import React from "react";
import { Stack, IconButton, Text } from "@chakra-ui/react";
import BucketItem from "./BucketItem";

const BucketItems = ({ links, setLinks, selectedBucket, user }) => {
  return (
    <Stack mt={4} mx={2} maxHeight="400px" overflowY="auto" pr={2}
      sx={{
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.800',
          borderRadius: '24px',
        },
      }}
    >
      {links.length === 0 && (
        <Text textAlign="center" color="blue.400">
          This bucket is empty, add a link to see it
        </Text>
      )}
      {links.map((item) => (
        <BucketItem item={item} setLinks={setLinks} selectedBucket={selectedBucket} user={user} />
      ))}
    </Stack>
  );
};

export default BucketItems;
