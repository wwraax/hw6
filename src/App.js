import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchByBody, setSearchByBody] = useState(false);

  const myFunc = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      myFunc();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const filterPosts = () => {
    return posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (searchByBody && post.body.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <div class="search-container">
    <h1 class="search-title">Поиск постов</h1>
    <input
      type="text"
      placeholder="Введите запрос..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      class="search-input"
    />
    <label class="search-checkbox">
      <input
        type="checkbox"
        checked={searchByBody}
        onChange={(e) => setSearchByBody(e.target.checked)}
      />
      Искать по body
    </label>
    <div class="post-list">
      {filterPosts().map((post) => (
        <div key={post.id} class="post-item">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-body">{post.body}</p>
        </div>
      ))}
    </div>
  </div>
  );
}

export default App;




