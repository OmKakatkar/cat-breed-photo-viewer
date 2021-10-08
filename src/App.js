import React, { useEffect, useState } from "react";
import "./styles.css";

const breedsUrl = "https://api.thecatapi.com/v1/breeds";

export default function App() {
  const [catImage, setCatImage] = useState(""); //url
  const [breedImages, setBreedImages] = useState([]);

  // To fetch the cat breeds for generating a drop down menu
  useEffect(() => {
    fetch(breedsUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        let arr = jsonData.filter((item) => "image" in item);
        setBreedImages(arr);
      })
      .catch(errorHandler);
    // console.log("Fetched");
  }, []);

  function errorHandler(error) {
    console.log("Some Error occured" + error);
  }

  // Change cat image as per the selected breed
  function changeHandler(e) {
    // console.log("Changed");
    setCatImage(e.target.value);
  }

  return (
    <div className="App">
      <h1>Cat Breeds</h1>
      <select onChange={(e) => changeHandler(e)}>
        <option>Choose a breed</option>
        {breedImages.map((breedImage) => (
          <option key={breedImage.id} value={breedImage.image.url}>
            {breedImage.name}
          </option>
        ))}
      </select>
      <div
        style={{
          background: `url("${catImage}") center/contain no-repeat fixed`
        }}
        className="image-container"
      ></div>
    </div>
  );
}
