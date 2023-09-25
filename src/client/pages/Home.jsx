import React from "react";
import { Link } from "react-router-dom"
import { useQuery } from "@wasp/queries"
import { useAction } from "@wasp/actions"
import getRobots from "@wasp/queries/getRobots"
import deleteRobot from "@wasp/actions/deleteRobot"
import { createRobotClient } from "@viamrobotics/sdk"
import { Canvas } from "@react-three/fiber"
import { Experience } from "../components/Experience/Experience"


export function Home() {

  const deleteRobotFn = useAction(deleteRobot);
  const { data: robots, isLoading, error } = useQuery(getRobots);

  const [robot, setRobot] = React.useState(null);
  const [connecting, setConnecting] = React.useState(false);

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  const handleDeleteRobot = (robotId, robotName) => {
    const isConfirm = window.confirm(
      `Are you sure you want to delete the connection to "${robotName}"?`
    );
    if (!isConfirm) return;
    deleteRobotFn({ robotId: robotId });
  };

  function handleDisconnect() {
    setRobot(null);
    setConnecting(false);
  }

  async function handleConnect(secret, hostname) {
    setConnecting(true);
    try {
      const robotResponse = await createRobotClient({
        authEntity: hostname,
        host: hostname,
        credential: {
          type: "robot-location-secret",
          payload: secret,
        },
        signalingAddress: "https://app.viam.com:443",
        iceServers: [{ urls: "stun:global.stun.twilio.com:3478" }],
      });
      setRobot(robotResponse);
    } catch (e) {
      alert(e);
      handleDisconnect();
    }
  }

  return !connecting && !robot ? (
    <div className="p-4">
    
      {robots.map((robot) => (
        <div
          key={robot.id}
          className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg"
        >
          <div>{robot.name}</div>
          <div className="flex flex-row items-center space-x-5">
            <div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleConnect(robot.secret, robot.url)}
              >
                Connect
              </button>
            </div>
            <div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleDeleteRobot(robot.id, robot.name);
                }}
              >
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
        Add robot connection
      </Link>
    </div>
  ) : !robot ? (
    <div className="flex items-center justify-between  bg-gray-100 p-4 mb-4 rounded-lg">
      Connecting...
      <button
        className="bg-red-500 hover:red-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDisconnect}
      >
        Cancel
      </button>
    </div>
  ) : (
    <>
      <div className="flex items-center justify-between  bg-gray-100 p-4 mb-4 rounded-lg">
        Connected
        <button
          className="bg-red-500 hover:red-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDisconnect}
        >
          Disconnect
        </button>
      </div>
  <div className="fixed top-1/6 left-0 w-full h-4/6 overflow-hidden" >
      <Canvas
        camera={{
          fov: 60,
          position: [-1, 1, 1],
        }}
      >
        <Experience />
      </Canvas>
      </div>
    </>
  );
}
