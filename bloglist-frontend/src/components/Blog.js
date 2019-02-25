import React, { useState } from 'react'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}



const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const showDelete = { display: deleteVisible ? '' : 'none' }

  if (deleteVisible === false && user.name === blog.user.name) {
    setDeleteVisible(true)
  }


  return (
    <div style={blogStyle}>
      <div onClick={() => setBlogVisible(!blogVisible)} style={hideWhenVisible}>
        <p>{blog.title}</p>
        <p> {blog.author} </p>
      </div>

      <div style={showWhenVisible}>
        <div onClick={() => setBlogVisible(!blogVisible)} >
          <p>{blog.title} </p>
          <p> {blog.author}</p> </div>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={() => addLike(blog)}>Tykkää</button> </p>
        <p>{blog.user.name}</p>
        <button style={showDelete} onClick={() => deleteBlog(blog)}> poista </button>
        <p></p>
      </div>
    </div>
  )
}

export default Blog