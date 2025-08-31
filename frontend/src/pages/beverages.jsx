import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Beverages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const recipes = [
    {
      id: 1,
      name: "Masala Chai",
      image: "/masala.jpg",
      route: "/recipe/masala-chai",
    },
    {
      id: 2,
      name: "Lassi (Sweet or Salty)",
      image: "/lassi.jpg",
      route: "/recipe/lassi",
    },
    {
      id: 3,
      name: "Filter Coffee",
      image: "/coffee.jpg",
      route: "/recipe/coffee",
    },
    {
      id: 4,
      name: "Thandai",
      image: "/thandai.jpg",
      route: "/recipe/thandai",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white text-center mb-10">
        Beverage Recipes
      </h1>

      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search for beverage recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-800 text-black dark:text-white"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes
          .filter((recipe) =>
            recipe.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
          )
          .map((recipe) => (
            <div
              key={recipe.id}
              role="button"
              aria-label={`View recipe: ${recipe.name}`}
              tabIndex={0}
              onClick={() => handleCardClick(recipe.route)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleCardClick(recipe.route)
              }
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition cursor-pointer"
            >
              <picture>
                <source srcSet={`/optimized/${recipe.image.split('.')[0]}.avif`} type="image/avif" />
                <source srcSet={`/optimized/${recipe.image.split('.')[0]}.webp`} type="image/webp" />
                <img
                  src={recipe.image}
                  alt={recipe.name || "Beverage Recipe"}
                  onError={(e) => {
                    e.target.src = "/default2.jpg";
                  }}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
              </picture>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white text-center">
                  {recipe.name}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Beverages;
