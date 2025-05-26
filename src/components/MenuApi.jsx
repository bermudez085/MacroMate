import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../RestaurantDetails.css";
import cutlery from "../assets/cutlery.png";
import dietary from "../assets/apple.png";
import allergy from "../assets/allergy.png";
import oil from "../assets/oil.png";
//import { json } from "express";
import { Link } from "react-router-dom";
import NutritionCompare from "./Nutrition";
export async function getMenuDetails(searchTerm) {
  const query = {
    method: "foods.search",
    search_expression: searchTerm,
    format: "json",
    page_number: 1,
  };

  const token = import.meta.env.VITE_FATSECRET_TOKEN;

  const oendpoint = "https://platform.fatsecret.com/rest/server.api";

  // const headers = {
  //   Authorization: `Bearer Token ${token}`,
  //   "Access-Control-Allow-Origin": "*",
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
  // };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const params = new URLSearchParams(query).toString();
    const endpoint = `${oendpoint}?${params}`;
    const response = await fetch(endpoint, {
      headers,
    });

    const data = await response.json();
    console.log("API Response:", data);
    return data.foods || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getMenuImg(restaurantName, food_name) {
  const cx = import.meta.env.VITE_GOOGLE_CX;
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const query = `${restaurantName} ${food_name}`;

  const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&searchType=image&key=${apiKey}&cx=${cx}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      for (let item of data.items) {
        const imageUrl = item.link;

        if (imageUrl.match(/\.(jpg|jpeg|png)$/i)) {
          console.log(`Valid Image URL: ${imageUrl}`);
          return imageUrl;
        }
      }
      console.log("No valid images found. Returning null.");
      return null;
    } else {
      console.log("No images found in the search.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    return null;
  }
}

export const ImageApi = ({ restaurantName, food_name, setMenuImg }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenuImg(restaurantName, food_name);
      console.log("Testing data:", data);
      try {
        if (data) {
          setImageUrl(data);
          setMenuImg(data);
        } else {
          setImageUrl(null);
          setMenuImg(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantName, food_name, setMenuImg]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt={`${food_name} image`} className="food-photo" />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};
export async function getLogoDetails(restaurantName) {
  const encodedName = restaurantName.replace(/\s+/g, "");
  const logoEndpoint = `https://img.logo.dev/${encodedName}.com?token=pk_CSCVXP1ZT4CpSufqEa0muA`;

  try {
    const response = await fetch(logoEndpoint, {
      headers: {
        Accept: "image/*",
      },
    });

    if (!response.ok) {
      console.error("Logo API error:", response.status, response.statusText);
      return null;
    }
    const imageBlob = await response.blob();

    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl;
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
}

export const MenuApi = ({ setFoodData, restaurantName, setLogoUrl }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMenuDetails(restaurantName);
      console.log("API Response(res):", res);

      const logoRes = await getLogoDetails(restaurantName);

      try {
        if (res && Array.isArray(res.food)) {
          console.log("Setting foodData:", res.food);
          setFoodData(res.food);
          setLogoUrl(logoRes);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setFoodData, restaurantName, setLogoUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};

function RestaurantDetails() {
  //const { id } = useParams();
  const location = useLocation();
  const restaurant = location.state?.restaurant;
  const [foodData, setFoodData] = useState([]);
  console.log("foodData:", foodData);
  const [logoUrl, setLogoUrl] = useState("");
  const [menuImg, setMenuImg] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(() => {
    const saved = localStorage.getItem("selectedCheckbox");
    return saved ? JSON.parse(saved) : [];
  });

  function checkboxHandler(e) {
    let isSelected = e.target.checked;
    let value = e.target.value;

    if (isSelected) {
      if (selectedCheckbox.length < 3) {
        setSelectedCheckbox([...selectedCheckbox, value]);
      } else {
        e.preventDefault();
      }
    } else {
      setSelectedCheckbox((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }
  useEffect(() => {
    localStorage.setItem("selectedCheckbox", JSON.stringify(selectedCheckbox));
  }, [selectedCheckbox]);
  function handleReset() {
    localStorage.removeItem("selectedCheckbox");
    setSelectedCheckbox([]);
  }

  return (
    <>
      {/* Restaurant Logo */}
      {logoUrl && (
        <div className="text-center mt-3 mb-4">
          <img
            src={logoUrl}
            alt={`${restaurant.name} Logo`}
            className="img-fluid rounded"
            style={{ maxHeight: "120px", marginTop: "80px" }}
          />
        </div>
      )}

      {/* Restaurant Name */}
      <div className="text-center mb-4">
        <h3>{restaurant.name}</h3>
      </div>

      {/* Restaurant Details */}
      <div className="container mb-5">
        <h2 className="mb-4">Restaurant Details</h2>
        <div className="row g-4">
          <div className="col-6 col-md-3 d-flex align-items-center gap-2">
            <img
              src={cutlery}
              alt="Cuisine"
              className="img-fluid"
              style={{ height: "32px" }}
            />
            <p className="mb-0">{restaurant.cuisine}</p>
          </div>
          <div className="col-6 col-md-3 d-flex align-items-center gap-2">
            <img
              src={dietary}
              alt="Dietary"
              className="img-fluid"
              style={{ height: "32px" }}
            />
            <p className="mb-0">
              {restaurant.dietary?.length > 0
                ? restaurant.dietary.join(", ")
                : "None"}
            </p>
          </div>
          <div className="col-6 col-md-3 d-flex align-items-center gap-2">
            <img
              src={allergy}
              alt="Allergy"
              className="img-fluid"
              style={{ height: "32px" }}
            />
            <p className="mb-0">
              {restaurant.allergies?.length > 0
                ? restaurant.allergies.join(", ")
                : "None"}
            </p>
          </div>
          <div className="col-6 col-md-3 d-flex align-items-center gap-2">
            <img
              src={oil}
              alt="Oil"
              className="img-fluid"
              style={{ height: "32px" }}
            />
            <p className="mb-0">
              {restaurant.oils?.length > 0
                ? restaurant.oils.join(", ")
                : "None"}
            </p>
          </div>
        </div>
      </div>

      {/* Compare + Reset Buttons */}
      <div className="text-center mb-5">
        <Link to="/CompareMacros" state={{ selected: selectedCheckbox }}>
          <button
            className="btn btn-dark me-3"
            style={{
              visibility: selectedCheckbox.length >= 2 ? "visible" : "hidden",
            }}
          >
            Compare Nutrition
          </button>
        </Link>
        <button
          className="btn btn-outline-secondary"
          onClick={handleReset}
          style={{
            visibility: selectedCheckbox.length >= 2 ? "visible" : "hidden",
          }}
        >
          Reset Selection
        </button>
      </div>

      {/* Menu Section */}
      <div className="container mb-5">
        <MenuApi
          setFoodData={setFoodData}
          restaurantName={restaurant.name}
          setLogoUrl={setLogoUrl}
        />

        <div className="row g-4">
          {foodData.map((food, index) => (
            <div key={index} className="col-12 col-md-6">
              <Link
                to={`/nutrition/${food.food_id}`}
                state={food}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-sm p-3 card-hover">
                  <div className="row g-0 align-items-center">
                    <div className="col-4">
                      <div className="menu-img-wrapper">
                        <ImageApi
                          restaurantName={restaurant.name}
                          food_name={food.food_name}
                          setMenuImg={setMenuImg}
                        />
                      </div>
                    </div>
                    <div className="col-8 ps-3">
                      <h5 className="mb-1">{food.food_name}</h5>
                      <p className="text-muted small mb-2">
                        {food.food_description}
                      </p>
                      <label
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="d-flex align-items-center gap-2"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={food.food_id}
                          id={food.food_id}
                          onChange={checkboxHandler}
                          checked={selectedCheckbox.includes(food.food_id)}
                          name="Compare"
                        />
                        <span className="small">Select to compare</span>
                      </label>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RestaurantDetails;
