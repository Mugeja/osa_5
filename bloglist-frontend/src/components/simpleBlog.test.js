import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent} from 'react-testing-library'
import Blog from './simpleBlog'

test('renders content', () => {
    const blog = {
        title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
        author: "arde",
        likes: 0
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Komponenttitestaus tapahtuu react-testing-library:llä'
    )
    expect(component.container).toHaveTextContent(
        'arde'
    )
    expect(component.container).toHaveTextContent(
        '0'
    )


})
it('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
        author: "arde",
        likes: 0
    }
  
    const mockHandler = jest.fn()
  
    const { getByText } = render(
      <Blog blog={blog} onClick={mockHandler} />
    )
    
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
