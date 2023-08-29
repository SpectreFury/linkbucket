import React from "react";
import { Stack } from "@chakra-ui/react";
import ListItem from "./ListItem";

const FilteredBucketList = ({ buckets, user }) => {
  const filteredBuckets = buckets.filter(
    (bucket) => bucket.author === user.email
  );

  return (
    <Stack mt={4} mx={2} maxHeight="400px" overflowY="scroll" pr={2}>
      {filteredBuckets.map((item) => (
        <ListItem item={item} />
      ))}
    </Stack>
  );
};

export default FilteredBucketList;
