import React from 'react'
import { useParams } from 'react-router-dom'

const Livro = () => {
  const params = useParams()
  return (
    <div>{params.book_name.replaceAll("_", ' ')}</div>
  )
}

export default Livro