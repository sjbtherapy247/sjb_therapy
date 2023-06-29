import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function AuthResetPasswordForm() {
  const router = useRouter();

  const {
    dispatch,
    state: { alert, modal },
    // clients,
  } = useSettingsContext();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });
  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    dispatch({ type: 'START_LOADING' });
    try {
      const user = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserEmail: data.email,
          // newUserEmail: data.email,
          mode: 'isClient',
          // test: 'true',
        }),
      }).then((res) => res.json());
      // if the account does not existing throw a wobbler - client will see same message on screen for security
      if (!user.uid) throw new Error('Error - It appears there is no account on our system with that email address.');
      // if the user exists send the email
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserEmail: data.email,
          mode: 'resetPassword',
        }),
      });
      const resJson = await response.json();
      console.log(resJson);
      router.push('/');

      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: `An account password reset email has been sent to ${data.email}. To complete the account recovery process please follow the instructions in your email.`,
          duration: 12000,
        },
      });

      dispatch({ type: 'END_LOADING' });
    } catch (error) {
      console.error(error);
      router.push('/');
      dispatch({ type: 'END_LOADING' });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: `An account password reset email has been sent to ${data.email}. To complete the account recovery process please follow the instructions in your email.`,
          duration: 12000,
        },
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" hiddenLabel placeholder="Email address" />

      <LoadingButton fullWidth size="large" color="primary" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 2.5 }}>
        Reset Password
      </LoadingButton>
    </FormProvider>
  );
}
