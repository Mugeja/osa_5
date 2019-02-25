import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'
import Togglable from './components/togglable'
import { useField } from './hooks/index'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const loginForm = () => {

    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setErrorMessage('Kirjauduit sisään onnistuneesti')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addLike = (blog) => {
    const blogObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    return blogService.update(blog.id, blogObject)
      .then(allBlogs => {
        setBlogs(blogs.map(b => b.id === blog.id ? allBlogs : b))
      })
  }

  const deleteBlog = (blog) => {
    if (window.confirm("Haluatko poistaa blogin?")) {
      return blogService.remove(blog.id)
        .then(setBlogs(
          blogs.filter(b => b.id !== blog.id))
        )
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
      user: user,
    }
    setErrorMessage('Blogi lisätty onnistuneesti')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    blogService
      .create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })

      title.props.reset()
      author.props.reset()
      url.props.reset()
 }

  const blogForm = () => {

    return (
      <Togglable buttonLabel='Lisää blogi'>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleSubmit={addBlog}
        />
      </Togglable>
    )
  }

  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })

  return (

    <div>

      <Notification message={errorMessage}
      />
      {user === null ?
        loginForm() :
        <div >

          <h1>Blogs</h1>
          <button onClick={() => handleLogout()}>
            logout
          </button>

          {blogForm()}
          <p>{user.name} has logged in</p>
        </div>
      }


      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user} />
      )}

    </div>
  )
}

export default App