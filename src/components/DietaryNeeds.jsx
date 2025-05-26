import React, { useState } from "react";
import "../DietaryNeeds.css";
import { Link } from "react-router-dom";
import fastfood from "../assets/fastfood.png";
import breakfast from "../assets/breakfast.png";
import healthy from "../assets/healthy.png";
import burger from "../assets/burger.png";
import pizza from "../assets/pizza.png";
import coffee from "../assets/coffee.png";
import icecream from "../assets/icecream.png";
import sandwich from "../assets/sandwich.png";
import chicken from "../assets/chicken.png";
import american from "../assets/american.png";
import mexican from "../assets/mexican.png";
import asian from "../assets/asian.png";
import seafood from "../assets/seafood.png";
import steak from "../assets/steak.png";
import burgerking from "../assets/burgerking.png";
import pandaexpress from "../assets/pandaexpress.png";
import olivegarden from "../assets/olivegarden.png";
import { useSearch } from "./SearchContext";

export const restaurants = [
  {
    id: 1,
    name: "Burger King",
    cuisine: "Fast Food",
    dietary: ["Gluten-Free"],
    allergies: ["Nut-Free"],
    oils: ["Peanut Oil"],
  },
  {
    id: 2,
    name: "Panda Express",
    cuisine: "Asian",
    dietary: ["Vegan"],
    allergies: ["Dairy-Free"],
    oils: ["Peanut Oil"],
  },
  {
    id: 3,
    name: "Olive Garden",
    cuisine: "American",
    dietary: ["Gluten-Free"],
    allergies: [],
    oils: ["Olive Oil"],
  },
];

function DietaryNeeds() {
  const [filters, setFilters] = useState({
    cuisine: [],
    dietary: [],
    allergies: [],
    oils: [],
  });

  const [openSections, setOpenSections] = useState({
    dietary: false,
    allergies: false,
    oils: false,
  });

  const { searchTerm } = useSearch();

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      dietary: section === "dietary" ? !prev.dietary : false,
      allergies: section === "allergies" ? !prev.allergies : false,
      oils: section === "oils" ? !prev.oils : false,
    }));
  };

  const resetFilters = () => {
    setFilters({
      cuisine: [],
      dietary: [],
      allergies: [],
      oils: [],
    });
    setOpenSections({
      dietary: false,
      allergies: false,
      oils: false,
    });
  };

  const filterRestaurants = () => {
    return restaurants.filter((restaurant) => {
      const matchesCuisine =
        filters.cuisine.length === 0 ||
        filters.cuisine.includes(restaurant.cuisine);
      const matchesDietary =
        filters.dietary.length === 0 ||
        filters.dietary.every((diet) => restaurant.dietary.includes(diet));
      const matchesAllergies =
        filters.allergies.length === 0 ||
        filters.allergies.every((allergy) =>
          restaurant.allergies.includes(allergy)
        );
      const matchesOils =
        filters.oils.length === 0 ||
        filters.oils.every((oil) => restaurant.oils.includes(oil));
      const matchesSearch =
        !searchTerm ||
        restaurant.name.toLowerCase().startsWith(searchTerm.toLowerCase());

      return (
        matchesCuisine &&
        matchesDietary &&
        matchesAllergies &&
        matchesOils &&
        matchesSearch
      );
    });
  };

  const filteredRestaurants = filterRestaurants();
  const toggleFilter = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category][0] === value ? [] : [value],
    }));
  };

  return (
    <div className="filter-section">
      <div className="start-header">
        <h3>Filter by Cuisine</h3>
      </div>
      <div className="diet-filter">
        <div className="first-filter-scroll-wrapper">
          <div className="first-filter-options">
            {[
              "Fast Food",
              "Breakfast",
              "Healthy",
              "Burgers",
              "Pizza",
              "Coffee",
              "Desserts",
              "Sandwiches",
              "Chicken",
              "American",
              "Mexican",
              "Asian",
              "Seafood",
              "Steak",
            ].map((cuisine) => (
              <button
                key={cuisine}
                className={
                  filters.cuisine.includes(cuisine)
                    ? "cuisine-button active"
                    : "cuisine-button"
                }
                onClick={() => toggleFilter("cuisine", cuisine)}
              >
                {cuisine === "Fast Food" && (
                  <div className="fastfood-img-wrapper">
                    <div className="fastfood-img-container">
                      <img
                        src={fastfood}
                        alt="Fastfood"
                        title="Fastfood"
                        className="fastfood-img"
                      />
                    </div>
                  </div>
                )}
                {cuisine === "Breakfast" && (
                  <div className="breakfast-img-container">
                    <img
                      src={breakfast}
                      alt="Breakfast"
                      title="Breakfast"
                      className="breakfast-img"
                    />
                  </div>
                )}
                {cuisine === "Healthy" && (
                  <div className="healthy-img-container">
                    <img
                      src={healthy}
                      alt="Healthy"
                      title="Healthy"
                      className="healthy-img"
                    />
                  </div>
                )}
                {cuisine === "Burgers" && (
                  <div className="burger-img-container">
                    <img
                      src={burger}
                      alt="Burger"
                      title="Burger"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "Pizza" && (
                  <div className="burger-img-container">
                    <img
                      src={pizza}
                      alt="Pizza"
                      title="Pizza"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "Coffee" && (
                  <div className="burger-img-container">
                    <img
                      src={coffee}
                      alt="Coffee"
                      title="Coffee"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "Desserts" && (
                  <div className="burger-img-container">
                    <img
                      src={icecream}
                      alt="Icecream"
                      title="Icecream"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "Sandwiches" && (
                  <div className="burger-img-container">
                    <img
                      src={sandwich}
                      alt="Sandwich"
                      title="Sandwich"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "Chicken" && (
                  <div className="burger-img-container">
                    <img
                      src={chicken}
                      alt="Chicken"
                      title="Chicken"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "American" && (
                  <div className="burger-img-container">
                    <img
                      src={american}
                      alt="American"
                      title="American"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "Mexican" && (
                  <div className="burger-img-container">
                    <img
                      src={mexican}
                      alt="Mexican"
                      title="Mexican"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "Asian" && (
                  <div className="burger-img-container">
                    <img
                      src={asian}
                      alt="Asain"
                      title="Asian"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "Seafood" && (
                  <div className="burger-img-container">
                    <img
                      src={seafood}
                      alt="Seafood"
                      title="Seafood"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine === "Steak" && (
                  <div className="burger-img-container">
                    <img
                      src={steak}
                      alt="Steak"
                      title="Steak"
                      className="burger-img"
                    />
                  </div>
                )}
                {cuisine}
              </button>
            ))}
          </div>
        </div>
        {/* Reset Filters Button */}
      </div>
      {/* Dietary Needs */}
      <div className="filters-wrapper">
        <div className="d-flex flex-wrap align-items-start gap-3 mb-4">
          {/* Dietary */}
          <div className="filter-group position-relative">
            <button
              className={`btn custom-grey-button ${
                openSections.dietary ? "active" : ""
              }`}
              onClick={() => toggleSection("dietary")}
            >
              Dietary {openSections.dietary ? "▴" : "▾"}
            </button>
            {openSections.dietary && (
              <div className="filter-popover">
                <h6 className="mb-2">Dietary</h6>
                <div className="d-flex flex-wrap gap-2">
                  {["Vegan", "Gluten-Free", "Keto", "Paleo"].map((diet) => (
                    <button
                      key={diet}
                      className={`btn custom-grey-button ${
                        filters.dietary.includes(diet) ? "active" : ""
                      }`}
                      onClick={() => toggleFilter("dietary", diet)}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Allergies */}
          <div className="filter-group position-relative">
            <button
              className={`btn custom-grey-button ${
                openSections.allergies ? "active" : ""
              }`}
              onClick={() => toggleSection("allergies")}
            >
              Allergies {openSections.allergies ? "▴" : "▾"}
            </button>
            {openSections.allergies && (
              <div className="filter-popover">
                <h6 className="mb-2">Allergies</h6>
                <div className="d-flex flex-wrap gap-2">
                  {["Nut-Free", "Dairy-Free", "Shellfish-Free"].map(
                    (allergy) => (
                      <button
                        key={allergy}
                        className={`btn custom-grey-button ${
                          filters.allergies.includes(allergy) ? "active" : ""
                        }`}
                        onClick={() => toggleFilter("allergies", allergy)}
                      >
                        {allergy}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Oils */}
          <div className="filter-group position-relative">
            <button
              className={`btn custom-grey-button ${
                openSections.oils ? "active" : ""
              }`}
              onClick={() => toggleSection("oils")}
            >
              Oils {openSections.oils ? "▴" : "▾"}
            </button>
            {openSections.oils && (
              <div className="filter-popover">
                <h6 className="mb-2">Oils</h6>
                <div className="d-flex flex-wrap gap-2">
                  {["Olive Oil", "Peanut Oil", "Avocado Oil"].map((oil) => (
                    <button
                      key={oil}
                      className={`btn custom-grey-button ${
                        filters.oils.includes(oil) ? "active" : ""
                      }`}
                      onClick={() => toggleFilter("oils", oil)}
                    >
                      {oil}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <div className="filter-group">
            <button className="btn custom-grey-button" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>
      {/* Filtered Restaurants */}
      <h3>Restaraunts</h3>
      <div className="row row-cols-5">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <Link
                to={`/restaurant/${restaurant.id}`}
                state={{ restaurant }}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 p-2 border-light">
                  <img
                    src={
                      restaurant.name === "Burger King"
                        ? burgerking
                        : restaurant.name === "Panda Express"
                        ? pandaexpress
                        : restaurant.name === "Olive Garden"
                        ? olivegarden
                        : ""
                    }
                    alt={restaurant.name}
                    className="card-img-top"
                    style={{
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div className="card-body p-2">
                    <h6
                      className="card-title mb-1"
                      style={{ fontSize: "1rem" }}
                    >
                      {restaurant.name}
                    </h6>
                    <small className="text-muted d-block mb-1">
                      {restaurant.cuisine}
                    </small>
                    <small className="d-block" style={{ fontSize: "0.8rem" }}>
                      Dietary: {restaurant.dietary.join(", ") || "None"}
                    </small>
                    <small className="d-block" style={{ fontSize: "0.8rem" }}>
                      Allergies: {restaurant.allergies.join(", ") || "None"}
                    </small>
                    <small className="d-block" style={{ fontSize: "0.8rem" }}>
                      Oils: {restaurant.oils.join(", ") || "None"}
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No restaurants match your filters.</p>
        )}
      </div>
    </div>
  );
}
export default DietaryNeeds;
