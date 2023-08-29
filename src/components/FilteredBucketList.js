import React, { useState, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import ListItem from "./ListItem";
import { firestore } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const FilteredBucketList = ({ buckets, user }) => {
  const filteredBuckets = buckets.filter(
    (bucket) => bucket.author === user.email
  );

  return (
    <Stack mt={4} mx={2}>
      {filteredBuckets.map((item) => (
        <ListItem item={item} />
      ))}
    </Stack>
  );
};

export default FilteredBucketList;
