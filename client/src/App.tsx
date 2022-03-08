import './App.css';
import Amplify, { Auth } from 'aws-amplify'
import { Authenticator, Heading, useTheme, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_WEB_CLIENT_ID
  },
})

const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

export default function App() {
  async function getToken() {
    const session = await Auth.currentSession()
    const accesstoken = session.getAccessToken().getJwtToken();
    const idtoken = session.getIdToken().getJwtToken();
    console.log('idtoken: ', idtoken)
    console.log('accesstoken: ', accesstoken)
  }
  return (
    <Authenticator loginMechanisms={['email']} components={components} hideSignUp={true}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={getToken}>getToken</button>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
