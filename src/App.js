import React from 'react';
import { useQuery } from 'react-query';

const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  return response.json()
};

function App() {
  const { status, data, isFetching, error } = useQuery('posts', getPosts);

  if (status === 'loading') {
    return <div>loading...</div> // loading state
  }

  if (status === 'error') {
    return <div>{error.message}</div> // error state
  }

  return (
    <div>
      { data && <ul>{
        data
          .slice(0,10) // only take frist 10 for now
          // render list of titles
          .map(d => <li key={`post-${d.id}`}>{d.title}</li>)
      }</ul> }
      { isFetching && <p>updating...</p> }
    </div>
  )
}

export default App;
