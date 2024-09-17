"use client";
import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import axiosInstance from "@/app/api";

const TestPage = () => {
  const addUsers = async () => {
    await axiosInstance.post("/api/test", { name: "user add test" });
  };

  const getUsers = async () => {
    const res = await axiosInstance.get("/api/test");
    console.log(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
      <Typography>Test page</Typography>
      <Button variant="contained" onClick={addUsers}>
        Add user
      </Button>
    </Box>
  );
};

export default TestPage;
