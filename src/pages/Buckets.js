/*global chrome*/

import React, { useState, useEffect } from "react";
import BucketItems from "../components/BucketItems";
import { useLocation } from "react-router-dom";
import { firestore } from "../firebaseConfig";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Flex, Button, Text } from "@chakra-ui/react";

const Buckets = ({ user }) => {
  const location = useLocation();
  const [links, setLinks] = useState([
    {
      title: "Introduction to linear algebra",
      link: "https://github.com/ViridescentYT",
    },
  ]);
  const [tab, setTab] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(location.state);

  const handleAddCurrent = async () => {
    setLoading(true);
    try {
      const data = {
        title: tab.title,
        link: tab.url,
      };

      await updateDoc(doc(firestore, "buckets", location.state.id), {
        bucket: arrayUnion(data),
      });
      setLinks((prev) => [...prev, data]);
    } catch (error) {
      console.log("handleAddCurrent error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      console.log(tabs);
      const url = tabs[0].url;
      console.log(url);
      if (tabs.length > 0) {
        setTab(tabs[0]);
      }
    });

    const fetchLinks = async () => {
      const docSnap = await getDoc(doc(firestore, "buckets", location.state.id));

      const data = docSnap.data();
      if (data.bucket.length > 0) {
        setLinks(data.bucket);
      }
    };
    fetchLinks();
  }, []);

  return (
    <React.Fragment>
      <BucketItems links={links} />
      {user && (
        <React.Fragment>
          {user.email === location.state.email && (
            <Flex justifyContent="center">
              <Button mt={2} onClick={handleAddCurrent} isLoading={loading}>
                Add Current
              </Button>
            </Flex>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Buckets;
