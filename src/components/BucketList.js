import React, { useState, useEffect } from "react";
import { Stack, Flex } from "@chakra-ui/react";
import ListItem from "./ListItem";

const BucketList = ({ buckets, setBuckets, user }) => {
  return (
    <Flex>
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
        {
          buckets.map((item) => (
            <ListItem item={item} setBuckets={setBuckets} user={user} />
          ))
        }
      </Stack >

    </Flex>
  );
};

export default BucketList;
