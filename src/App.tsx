import './App.css'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react'
import { fetchAuthSession, type AuthUser } from "aws-amplify/auth"
import { type UseAuthenticator } from "@aws-amplify/ui-react-core"
import '@aws-amplify/ui-react/styles.css'
import { DriverType } from './types/DriverType'
import { useEffect, useState } from 'react'

type AppProps = {
  signOut?: UseAuthenticator["signOut"]
  user?: AuthUser
};

function App({ signOut, user }: AppProps) {
  const [drivers, setDrivers] = useState<DriverType[]>([])

  useEffect(() => {
    fetchDrivers()
  }, [user])

  const fetchDrivers = async () => {
    const { tokens } = await fetchAuthSession()
    const idToken = tokens?.idToken

    if (idToken) {
      const response = await fetch('https://gkupwyoi70.execute-api.us-west-2.amazonaws.com/dev/drivers', {
        method: "GET",
        headers: {
          "Authorization": idToken.toString()
        }
      })
      const fetchedDrivers = await response.json()
      setDrivers(fetchedDrivers);
    }
  }

  return (
    <div>
      <Heading level={1}>Hello {user?.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <h2>Drivers</h2>
      <div>
        {JSON.stringify(drivers)}
      </div>
    </div>
  )
}

export default withAuthenticator(App)
