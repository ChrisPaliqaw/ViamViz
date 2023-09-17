import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@wasp/queries";
import getRobots from "@wasp/queries/getRobots";

export function Home() {
  const { data: robots, isLoading, error } = useQuery(getRobots);

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  return (
    <div className="p-4">
      {robots.map((robot) => (
        <div
          key={robot.id}
          className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg"
        >
          <div>{robot.name}</div>
          <div>{robot.secret}</div>
          <div>{robot.url}</div>
          <div className="flex flex-row items-center space-x-5">
            
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Connect
              </button>
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </div>
            <div>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <Link
        to="/add-robot"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add robot
      </Link>
    </div>
  );
}
