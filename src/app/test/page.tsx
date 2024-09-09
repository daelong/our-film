"use client";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const TestPage = () => {
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/test");
      const data = await res.json();
      console.log(data);
    }
    try {
      fetchUsers();
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  return (
    <Box>
      <Typography>Test page</Typography>
    </Box>
  );
};

export default TestPage;
