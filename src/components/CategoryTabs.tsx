import React from "react";
import { TrendingUp, Star, Trophy, Calendar } from "lucide-react";

export type CategoryType = "trending" | "popular" | "top_rated" | "upcoming";

interface CategoryTabsProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  trendingTimeWindow: "day" | "week";
  onTrendingTimeWindowChange: (timeWindow: "day" | "week") => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
  trendingTimeWindow,
  onTrendingTimeWindowChange,
}) => {
  const categories = [
    { id: "trending" as CategoryType, label: "Trending", icon: TrendingUp },
    { id: "popular" as CategoryType, label: "Popular", icon: Star },
    { id: "top_rated" as CategoryType, label: "Top Rated", icon: Trophy },
    { id: "upcoming" as CategoryType, label: "Upcoming", icon: Calendar },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="tabs tabs-boxed justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className={`tab gap-2 ${
                activeCategory === category.id ? "tab-active" : ""
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{category.label}</span>
            </button>
          );
        })}
      </div>

      {activeCategory === "trending" && (
        <div className="flex justify-end gap-x-1">
          {/* <div className="btn-group"></div> */}
          <button
            className={`btn btn-sm ${
              trendingTimeWindow === "day" ? "btn-active" : "btn-outline"
            }`}
            onClick={() => onTrendingTimeWindowChange("day")}
          >
            Today
          </button>
          <button
            className={`btn btn-sm ${
              trendingTimeWindow === "week" ? "btn-active" : "btn-outline"
            }`}
            onClick={() => onTrendingTimeWindowChange("week")}
          >
            This Week
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;
