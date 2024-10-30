import { Auth } from 'aws-amplify';

export async function handleSignUp(
  username: string,
  password: string,
  given_name: string,
  family_name: string,
  company_name: string,
) {
  try {
    const data: any = await Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: username,
        given_name: given_name,
        family_name: family_name,
        'custom:companyName': company_name,
      },
    });

    return {
      data: {
        user: data,
      },
    };
  } catch (error) {
    return { error: error };
  }
}

export async function handleConfirmSignUp(username: string, confirmationCode: string) {
  try {
    if (username && confirmationCode) {
      const data = await Auth.confirmSignUp(username, confirmationCode);

      return {
        data: {
          user: data,
        },
      };
    }
  } catch (error) {
    return { error: error };
  }
}

export async function handleSignIn(username: string, password: string) {
  try {
    let signInCredentials = {
      username: username,
      password: password,
    };
    if (username && password) {
      const user = await Auth.signIn(signInCredentials);
      return { user };
    }
  } catch (error) {
    return { error: error };
  }
}

export async function handlePasswordReset(username: string) {
  try {
    if (username) {
      let data = await Auth.forgotPassword(username);
      return { data };
    }
  } catch (error) {
    return { error: error };
  }
}

export async function handleConfirmResetPassword(username: string, confirmationCode: string, newPassword: string) {
  try {
    if (username && confirmationCode && newPassword) {
      let data = await Auth.forgotPasswordSubmit(username, confirmationCode, newPassword);
      return { data };
    }
  } catch (error) {
    return { error: error };
  }
}

export async function handleChangePassword(user: any, oldPassword?: string, newPassword?: string) {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  try {
    if (oldPassword && newPassword) {
      let data = await Auth.changePassword(cognitoUser, oldPassword, newPassword);
      return { data };
    }
  } catch (error) {
    return { error: error };
  }
}
