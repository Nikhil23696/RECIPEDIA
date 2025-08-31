import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dessert = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const recipes = [
    {
      id: 1,
      name: "Gulab Jamun",
      image: "/jamun.jpg",
      route: "/recipe/gulub-jamun",
    },
    {
      id: 2,
      name: "Rasgulla",
      image: "/rasgulla.jpg",
      route: "/recipe/rasgulla",
    },
    {
      id: 3,
      name: "Jalebi",
      image: "/jalebi.jpg",
      route: "/recipe/jalebi",
    },
    {
      id: 4,
      name: "Falooda",
      image: "/falooda.jpg",
      route: "/recipe/falooda",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white text-center mb-10">
        Dessert Recipes
      </h1>

      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search for dessert recipes..."
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
                  onError={(e) => {
                    e.target.src = "/default3.jpg";
                  }}
                  alt={recipe.name || "Dessert"}
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

export default Dessert;
