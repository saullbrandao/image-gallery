import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";


const App = () => {
  const fetchImages = async () => {
    const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    return response.json()
  }
  const { isLoading, error, data, refetch } = useQuery('images', fetchImages)

  const [term, setTerm] = useState('')
  useEffect(() => {
    refetch()
  }, [term])


  if (isLoading) return <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
  if (error) return <h1 className="text-6xl text-center mx-auto mt-32">{'An error has occurred: ' + error.message}</h1>

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && data.hits.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">No Images Found</h1>}
      <div className="grid grid-cols-3 gap-4">
        {data.hits.map(image => image && <ImageCard key={image.id} image={image} />)}
      </div>

    </div>
  );
}

export default App;
