import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Nutrition.css";

async function fetchNutrition(foodID) {
  const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwOEFEREZGRjZBNDkxOUFBNDE4QkREQTYwMDcwQzE5NzNDRjMzMUUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJFSXJkX19ha2tacWtHTDNhWUFjTUdYUFBNeDQifQ.eyJuYmYiOjE3NDc4Njk2MTUsImV4cCI6MTc0Nzk1NjAxNSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiJjZTM0OWI4YTE1ZDE0NTFlOGQwMTIxMzdiZjUyOTg4ZiIsInNjb3BlIjpbImJhc2ljIl19.Ir348QQXDMqnq6Az-WEof815foOc5JQSoifjYEQGfFubMmy4D1Xv9yyMZI17fjdeEwYZwYJeacVaLK6YzimmGaV1dVOtbXl-0AhUTsOu7XnYebwKEwpZXORNVs_2H8TcObl1sLeUKirA2FQUXeAcYkdaMUZifF8895e49T63M-wDQyvmM1msMCaIsTZpEKi565TTe4qF8jO-agRma-plFLyK_kVNHHMsYEhV4efsVTDfktsZhP78u6BkeCMc8XxNu1xXZ7TIGcj3bataTdAauCrPfxFFTL4SNU5kzmyAFCIRQ4_NhdhSTvwaZD2DH1oB6IGOMkmqtpHm88ncdYXmZTBr0B4oOmB3l5rQ32sdnMLrKwR2avwKDrQwjKjnIAmq_7OZ4_zCCkqeyS-wvsVGL9_WY20LUbVoS9M989nKiw_h4-3WihoNpu1r74Uny9V2Gzw4dPAq769UWV6fN06Faeu9RMVWOc9Ux_aBnN4-3ShFzWVkfr6jN95v0w6KctCrLi4XPfYDUCTURPNRs0L-NNdo4o943Fc3KIeASy4lznj9jKEYak8bcisVdhRDhVXFy7jzExUTzD1WpZtPh3UOgqzWYNOAkUNrEEDHZMT-uyr02vJrZycrpx6ofd9ucVoTrxXer2zR5oPQENIm_CF37Zu6RCZ07eMO_je8bejM0nk";
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
