"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { getProviders, signIn } from "next-auth/react";

const SignInPage = () => {
  const callbackUrl = process.env.NEXT_PUBLIC_HOMEPAGE_URL as string;
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    async function loadProviders() {
      const res = await getProviders();
      setProviders(res);
    }
    loadProviders();
  }, []);

  return (
    <Box>
      <Typography>로그인 page</Typography>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <Button
            variant="contained"
            onClick={() => signIn(provider.id, { callbackUrl })}
          >
            {provider.name} 로그인
          </Button>
        </div>
      ))}
    </Box>
  );
};

export default SignInPage;
