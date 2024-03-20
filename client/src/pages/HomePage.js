import React from 'react'
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
function HomePage() {
  const [auth, setAuth] = useAuth();
  return (
    <div>
        <Layout title={"this is homepage"}>
        <h1>HomePage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    </div>
  )
}

export default HomePage;