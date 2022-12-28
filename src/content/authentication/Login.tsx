import React, { useState, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Link,
  Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from 'src/services/AuthService';
import { NavigateFunction, useNavigate } from 'react-router';
import * as yup from 'yup';
const theme = createTheme();
import { useFormik } from 'formik';
import LoginForm from 'src/components/LoginForm';
import { AppContext } from 'src/AppProvider';
import { USERS_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';
import useSWR, { useSWRConfig } from 'swr';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});
export interface IUser {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { state, addMessage } = useContext(AppContext);
  const { data: users } = useSWR<IUser[]>(USERS_URL, getData);
  let navigate: NavigateFunction = useNavigate();
  const [requesting, setRequesting] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setRequesting(true);

      try {
        const checkUser = users.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );
        // const response: { data; status } = await login(values);
        // localStorage.setItem(
        //   'accessToken',
        //   JSON.stringify(response.data.accessToken)
        // );
        // localStorage.setItem('userSession', JSON.stringify(response.data.user));
        if (checkUser) {
          navigate('/');
          resetForm();
          setRequesting(false);
        }
      } catch (error) {
        addMessage('sai', error);
        setRequesting(false);
      }
    }
  });

  if (!users) return <h1>loading...</h1>;
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <LoginForm requesting={requesting} formik={formik} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
