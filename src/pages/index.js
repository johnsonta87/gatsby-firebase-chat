import React from "react"
import Conversation from "../components/Chat/Conversation"

import Layout from "../components/Layouts/layout"
import Auth from "../components/UserAuth/Auth"

export default function IndexPage() {

  return (
    <Layout>
      <Auth />
      <Conversation />
    </Layout>
  )
}
