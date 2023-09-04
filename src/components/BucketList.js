import React, { useState, useEffect } from "react";
import { Stack, Flex, Spinner } from "@chakra-ui/react";
import ListItem from "./ListItem";
import { firestore } from '../firebaseConfig';
import { getDocs, query, collection, orderBy, where } from 'firebase/firestore';

const BucketList = ({ user, buckets, setBuckets }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBuckets = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(query(collection(firestore, 'buckets'), where('visibility', '==', 'public'), orderBy('favorites', 'desc')));
      querySnapshot.docs.map((doc) =>
        setBuckets((prev) => [...prev, doc.data()])
      );
      setLoading(false);
    };

    fetchBuckets();

    return () => {
      setBuckets([]);
    }
  }, []);

  return (
    <React.Fragment>
      {loading ? <Flex justifyContent='center' mt={40}><Spinner size='xl' color='blue.400' /></Flex> :
        <Flex>
          <Stack mt={4} mx={2} maxHeight="400px" overflowY="auto" pr={2} width='100%'
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
      }
    </React.Fragment>
  );
};

export default BucketList;
