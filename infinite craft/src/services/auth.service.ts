import { IUserProps } from "@/interface/auth";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";

export const handleGoogleSignIn = async () => {
  try {
    const data: any = await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });

    if (data && data.signInUserSession) {
      // TODO For Future use
      // const accessToken = data.signInUserSession.getAccessToken().getJwtToken();
      // const idToken = data.signInUserSession.getIdToken().getJwtToken();
      // const refreshToken = data.signInUserSession.getRefreshToken().getToken();
      // const userAttributes = data.attributes;
    } else {
      console.error("Federated sign-in failed:", data);
    }

    return data;
  } catch (error) {
    console.error("Error during federated sign-in:", error);
    throw error;
  }
};

export const SignUp = async (userProperties: IUserProps): Promise<any> => {
  try {
    const data = await Auth.signUp(userProperties);

    return {
      userConfirmed: data.userConfirmed,
      data: {
        user: data.user,
        userConfirmed: data.userConfirmed,
        userSub: data.userSub,
      },
      userSub: data.userSub,
    };
  } catch (error) {
    const _error = error;
    return { error: _error };
  }
};

export const SignIn = async (
  username: string,
  password: string,
): Promise<any> => {
  try {
    const data = await Auth.signIn(username, password);

    return { data };
  } catch (error) {
    const _error = error;
    return { error: _error };
  }
};

export const ChangePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(user, oldPassword, newPassword);
    return { data: true };
  } catch (error) {
    const _error = error;
    return { error: _error };
  }
};
