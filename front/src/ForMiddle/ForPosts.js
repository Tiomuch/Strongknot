import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { useState } from 'react'

const queryClient = new QueryClient()

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

const FetchPosts = async () => {
  const res = await fetch('http://localhost:3000/api/posts/all-posts')
  return res.json()
}

function Example () {
  const { isLoading, error, data } = useQuery('posts', FetchPosts)
  const [visible, setVisible] = useState(5)

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 5)
    if (visible >= data.length) {
      alert('No more items')
    }
  }

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  if (!data.length || data.length === 0) {
    return <h1>No posts</h1>
  } else {
    return (
      <ul className="content">
        {data.slice(0, visible).map(post => <li key={post.id}>
          <div className="post-top">{post.title}</div>
          <div className="post-down">{post.description}</div>
        </li>)}
        <button className="sign" onClick={showMoreItems}>Load more</button>
      </ul>
    )
  }
}
