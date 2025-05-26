import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Nutrition.css";

async function fetchNutrition(foodID) {
    const token = import.meta.env.VITE_FATSECRET_TOKEN;
  try {
    const response = await fetch(
      `https://platform.fatsecret.com/rest/server.api?method=food.get.v4&format=json&food_id=${foodID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    const foodData = data.food;
    if (!foodData || !foodData.servings)
      throw new Error("Missing food or servings");

    const serving = Array.isArray(foodData.servings.serving)
      ? foodData.servings.serving[0]
      : foodData.servings.serving;

    return {
      food_name: foodData.food_name,
      brand_name: foodData.brand_name,
      food_description: foodData.food_description || "",
      serving,
    };
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    return null;
  }
}

export default function Nutrition() {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchNutrition(foodId);
      if (res) setFood(res);
    };
    getData();
  }, [foodId]);

  if (!food) return <p>Loading...</p>;

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4 compare-card">
            <h4 className="card-title text-center">{food.food_name}</h4>
            <p className="text-muted text-center mb-4">by {food.brand_name}</p>

            <div className="compare-details">
              <p>
                <strong>Description:</strong> {food.food_description}
              </p>
              <p>
                <strong>Serving:</strong> {food.serving.serving_description}
              </p>
              <p>
                <strong>Calories:</strong> {food.serving.calories}
              </p>
              <p>
                <strong>Total Fat:</strong> {food.serving.fat}g
              </p>
              <p>
                <strong>Saturated Fat:</strong> {food.serving.saturated_fat}g
              </p>
              <p>
                <strong>Trans Fat:</strong> {food.serving.trans_fat}g
              </p>
              <p>
                <strong>Cholesterol:</strong> {food.serving.cholesterol}mg
              </p>
              <p>
                <strong>Sodium:</strong> {food.serving.sodium}mg
              </p>
              <p>
                <strong>Total Carbohydrate:</strong> {food.serving.carbohydrate}
                g
              </p>
              <p>
                <strong>Dietary Fiber:</strong> {food.serving.fiber}g
              </p>
              <p>
                <strong>Sugars:</strong> {food.serving.sugar}g
              </p>
              <p>
                <strong>Protein:</strong> {food.serving.protein}g
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
