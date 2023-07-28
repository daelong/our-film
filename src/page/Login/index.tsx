import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import type { ChangeEvent } from "react";
import BackgroundImage from "../../assets/bg.jpeg";
import BackgroundImage2 from "../../assets/test.png";

const Wrapper = styled("div")({
  border: "2px solid #0984e3",
  borderRadius: "8px",
  padding: "40px",
  zIndex: "100",
  backgroundColor: "white",
});

const LoginLetter = styled(Typography)({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "19px",
  color: "#1C1E21",
  letterSpacing: "-0.02em",
  marginBottom: "20px",
});

const ColumnTitle = styled(Typography)({
  height: "10px",

  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "10px",
  lineHeight: "100%",
  /* identical to box height, or 10px */

  /* font/tertiary */

  color: "#9CA1AA",

  /* Inside auto layout */

  flex: "none",
  order: "0",
  flexGrow: "0",
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [registerVisible, setRegisterVisible] = useState<boolean>(false);

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const validateEmail = () => {
    const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    setEmailValidation(regex.test(email));
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const checkKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const onSubmit = (e: React.SyntheticEvent): void => {
    console.log(e);
    const users = localStorage.getItem("users")
      ? (JSON.parse(localStorage.getItem("users") as string) as any[])
      : [];

    const loginUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (loginUser) {
      localStorage.setItem("loginUser", "");
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
    } else {
      alert("이메일에 맞는 유저가 존재하지 않습니다.");
      e.preventDefault();
    }
  };

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
          zIndex: "-100",
        }}
      ></Box>

      <Wrapper>
        <LoginLetter variant="h4">로그인</LoginLetter>
        <form onSubmit={(e) => onSubmit(e)} onKeyDown={(e) => checkKeyDown(e)}>
          <Grid
            container
            direction="column"
            alignContent="flex-start"
            sx={{ mb: 3 }}
          >
            <Grid item>
              <ColumnTitle sx={{ textAlign: "start", mb: 1 }}>
                이메일
              </ColumnTitle>
            </Grid>
            <Grid item sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 432,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  // error
                  fullWidth
                  value={email}
                  placeholder="welcome@our-film.com"
                  onChange={(e) => changeEmail(e)}
                  onBlur={() => validateEmail()}
                  error={!emailValidation}
                />
              </Box>
            </Grid>
            <Grid item>
              <ColumnTitle sx={{ textAlign: "start", mb: 1 }}>
                비밀번호
              </ColumnTitle>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => changePassword(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setPasswordVisible((prev) => !prev)}
                        edge="end"
                      >
                        {passwordVisible ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around">
            <Grid item>
              <Button
                type="submit"
                sx={{ width: "196px" }}
                variant="outlined"
                onClick={() => {
                  setRegisterVisible(true);
                }}
              >
                회원가입
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" sx={{ width: "196px" }} variant="contained">
                로그인
              </Button>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
    </Box>
  );
};

export default LoginPage;
