import { gql, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userSchema } from "../validations/user.validation";
interface ISignupInputs {
  name: string;
  email: string;
  password: string;
}

const theme = createTheme();

const SIGN_UP_USER = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;
export default function SignUp() {
  const [signupUser] = useMutation(SIGN_UP_USER);
  // const [signupUser, { data, loading }] = useMutation(SIGN_UP_USER);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupInputs>({
    resolver: yupResolver(userSchema),
  });
  const onsubmit: SubmitHandler<ISignupInputs> | undefined = async (
    data: ISignupInputs
  ) => {
    console.log(data);
    await signupUser({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })
      .then(() => {
        console.log(data);
        navigate("/signin");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit(onsubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="Username"
                    label="Username"
                    autoComplete="username"
                    {...register("name")}
                    {...(errors?.name && {
                      error: true,
                      helperText: errors?.name.message,
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    {...register("email")}
                    {...(errors?.email && {
                      error: true,
                      helperText: errors?.email.message,
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    {...register("password")}
                    {...(errors?.password && {
                      error: true,
                      helperText: errors?.password.message,
                    })}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/signin" style={{ color: "#1976d2" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
