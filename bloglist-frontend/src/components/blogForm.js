import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  title,
  author,
  url,
  handleSubmit
}) => {
  return (
    <div>
      <h2>Lisää blogi</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input {...title} />
        </div>
        <div>
          Author
          <input {...author} />
        </div>
        <div>
          Url
          <input {...url} />
        </div>
        <button type="submit">lisää</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm