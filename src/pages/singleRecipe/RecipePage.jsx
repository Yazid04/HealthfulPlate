import React from 'react'
import { useParams } from 'react-router-dom'

const RecipePage = () => {
 const {id} = useParams();
  return (
    <h1>recipe id: {id}</h1>
  )
}

export default RecipePage