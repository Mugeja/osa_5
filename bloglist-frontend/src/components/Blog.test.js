import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent} from 'react-testing-library'
import Blog from './Blog'

test('renders content', () => {

    const user = {
        username: "kakkatesti",
        password: "testikakka"
    }

    const blog = {
        title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
        author: "arde",
        likes: 0,
        user: user
        
    }

    const component = render(
        <Blog blog={blog} user={user}/>
    )

    expect(component.container).toHaveTextContent(
        'Komponenttitestaus tapahtuu react-testing-library:llä'
    )
    expect(component.container).toHaveTextContent(
        'arde'
    )
    


})
it('clicking the button calls event handler once', async () => {
    const user = {
        username: "kakkatesti",
        password: "testikakka"
    }

    const blog = {
        title: 'Komponenttitestaus',
        author: "mariiiiiiaaaaa",
        url: "helsinki.fi",
        likes: 0,
        user: user
    }
  
    const { getByText, container } = render(
      <Blog blog={blog} user={user}  />
    )
    
    const blogName = getByText('Komponenttitestaus')
    fireEvent.click(blogName)
  
    
    expect(container).toHaveTextContent(
        'Komponenttitestaus'
    )
    expect(container).toHaveTextContent(
        'mariiiiiiaaaaa'
    )
    
    expect(container).toHaveTextContent(
        'helsinki.fi'
    )
    expect(container).toHaveTextContent(
        '0 likes'
    )
  })
