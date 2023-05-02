//styles
import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'



function App() {
  const colors = useRef(['pink', '#D35E0A', '#934107', '#0a7fd3', '#f1ceb5', '#d3c30a'])
  const [quote, setQuote] = useState(null)
  const [author, setAuthor] = useState('waiting for author')
  const [color, setColor] = useState(colors[0])

  const handleClick = useCallback(() => {
    //change the color
    if (colors.current.indexOf(color) === colors.current.length - 1) {
      setColor(colors.current[0])
    } else {setColor(colors.current[colors.current.indexOf(color) + 1])}
    //fetch the quote
    try {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(json => {
        setQuote(json.content)
        setAuthor(json.author)
      })
    } catch(err) {
      setQuote('err.message')
    }
  }, [color, colors])

  useEffect(() => {
    handleClick()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (quote) {return (
    
    <div id='colorful-background' style={{backgroundColor: color}}>
    <div id="quote-box">
      <div id="quote-place">
      <FontAwesomeIcon icon={faQuoteLeft} style={{color: color, fontSize: 30, marginRight: 10}} />
        <span id="text" style={{color: color}}>  {quote}</span>
      </div>
      <div id="author" style={{color: color}}>{author}</div>
      <div id="buttons">
        <button style={{backgroundColor: color}}><a id="tweet-quote" href='https://twitter.com/intent/tweet'><FontAwesomeIcon icon={faTwitter} /></a></button>
      
        <button id="new-quote" 
        onClick={handleClick}
        style={{backgroundColor: color}}>
          New quote
        </button>
      </div>
    </div>
    <h4>by katerina.shche</h4>
    </div>
    
  )
  }
}

export default App;

