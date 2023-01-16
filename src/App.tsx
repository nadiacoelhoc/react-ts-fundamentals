import { Header } from './components/Header';
import { Post, PostProps } from './components/Post'
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';

import './global.css';

interface Post extends PostProps {
  id: number;
}

const posts: Post[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'http://github.com/nadiacoelhoc.png',
      name: 'Nádia Coelho',
      role: 'Front-end Developer',
    },
    content: [
      {type: 'paragraph', content:'Oi pessoal! 😍'},
      {type: 'paragraph', content:'Acabei de subir mais um projeto no meu github. É um projeto que fiz assistindo as aulas da trilha Ignite da Rocketseat. 😊'},
      {type: 'link', content:'https://github.com/nadiacoelhoc'},
    ],
    publishedAt: new Date('2023-01-12 14:26:35'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/gimelloc.png',
      name: 'Gislaine Mello Casa',
      role: 'Front-end Developer',
    },
    content: [
      {type: 'paragraph', content:'Oie 👋'},
      {type: 'paragraph', content:'Esse é o meu github, aqui você pode ver alguns projetos que já fiz!'},
      {type: 'link', content:'https://github.com/gimelloc'},
    ],
    publishedAt: new Date('2023-01-11 10:00:00'),
  },
];


export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>

        <Sidebar />

        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id} 
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
