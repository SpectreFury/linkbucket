import React from "react";
import { Stack } from "@chakra-ui/react";
import ListItem from "./ListItem";

const FilteredBucketList = ({ buckets, user, setBuckets }) => {
  if (!user) return;

  const filteredBuckets = buckets.filter(
    (bucket) => bucket.author === user.email
  );


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
      {filteredBuckets.map((item) => (
        <ListItem item={item} setBuckets={setBuckets} user={user} />
      ))}
    </Stack>
  );
};

export default FilteredBucketList;
