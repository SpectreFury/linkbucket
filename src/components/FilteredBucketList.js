import React, { useState, useEffect } from "react";
import { Stack, Flex, Spinner } from "@chakra-ui/react";
import ListItem from "./ListItem";
import { firestore } from '../firebaseConfig';
import { getDocs, query, collection, orderBy, where } from 'firebase/firestore';

const FilteredBucketList = ({ user, filteredBuckets, setFilteredBuckets }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBuckets = async () => {
      if (!user) return;

      setLoading(true);
      const querySnapshot = await getDocs(query(collection(firestore, 'buckets'), where('author', '==', user.email), orderBy('favorites', 'desc')));
      querySnapshot.docs.map((doc) =>
        setFilteredBuckets((prev) => [...prev, doc.data()])
      );
      setLoading(false);
    };

    fetchBuckets();

    return () => {
      setFilteredBuckets([]);
    }
  }, []);

  if (!user) return;

  return (
    <React.Fragment>
      {loading ? <Flex justifyContent='center' mt={40}>
        <Spinner size='xl' color='blue.400' />
      </Flex> :
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
            <ListItem item={item} setBuckets={setFilteredBuckets} user={user} />
          ))}
        </Stack>
      }
    </React.Fragment>
  );
};

export default FilteredBucketList;
