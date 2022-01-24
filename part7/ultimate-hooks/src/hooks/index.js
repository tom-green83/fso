import { useState } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    console.log(response.data)
    setResources(resources.concat(response.data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource