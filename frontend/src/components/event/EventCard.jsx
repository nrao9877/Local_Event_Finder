// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../contexts/UserContext";
// import { MdDelete } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { FaShareNodes } from "react-icons/fa6";
// import { FaEye } from "react-icons/fa";

// const EventCard = ({ event, onDelete }) => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleEditEvent = () => {
//     navigate(`/editEvent/${event._id}`); // Navigate to edit page
//   };

//   const handleViewEvent = () => {
//     navigate(`/event/${event._id}`);
//   };

//   const handleShareEvent = (eventId) => {
//     const shareObject = {
//       title: "Check out this amazing event!",
//       shareUrl: `http://localhost:5173/event/${eventId}`,
//     };
//     navigate("/social-share", { state: { someObject: shareObject } });
//   };

//   return (
//     <div className="max-w-sm bg-orange-100 border border-pink-300 rounded-lg shadow overflow-hidden flex flex-col">
//       <div className="p-2">
//         <img
//           className="w-full h-52 rounded-lg shadow object-cover"
//           src={
//             event.imageUrl
//               ? event.imageUrl
//               : "https://via.placeholder.com/400x200"
//           }
//           alt="Event Image"
//         />
//       </div>

//       {/* Card Content */}
//       <div className="p-5 flex-grow overflow-hidden">
//         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
//           {event.title}
//         </h5>
//         <p className="mb-3 font-normal text-gray-800">
//           <strong>Category:</strong> {event.category}
//         </p>
//         <p className="mb-3 font-normal text-gray-800">
//           <strong>Description:</strong>{" "}
//           {event.description || "No description available"}
//         </p>
//         <p className="mb-3 font-normal text-gray-800">
//           <strong>Price:</strong> ${event.price}
//         </p>
//       </div>
//       <div>
//       </div>

//       {/* Admin Controls */}
//       {user && user.isAdmin ? (
//         <div className="flex justify-end gap-4 items-center p-2">
//           <FaRegEdit
//             className="text-5xl text-orange-500 p-2 cursor-pointer"
//             onClick={handleEditEvent}
//           />
//           <MdDelete
//             className="text-5xl text-red-700 p-2 cursor-pointer"
//             onClick={() => onDelete(event._id)} // Use the delete handler passed from EventScreen
//           />
//           <button
//             onClick={handleViewEvent}
//             className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
//           >
//             <FaEye className="text-4xl p-2" title="View Event"/>
//           </button>
//         </div>
//       ) : (
//         <div className="bottom-2 left-4 right-4 p-4 flex justify-end gap-4">
//           <button
//             onClick={handleViewEvent}
//             className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
//           >
//             <FaEye className="text-4xl p-2" title="View Event"/>
//           </button>

//           <button
//             onClick={() => handleShareEvent(event._id)}
//             className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
//           >
//             <FaShareNodes className="text-5xl p-2" title="Share Event"/>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventCard;


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const EventCard = ({ event, onDelete }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEditEvent = () => {
    navigate(`/editEvent/${event._id}`); // Navigate to edit page
  };

  const handleViewEvent = () => {
    navigate(`/event/${event._id}`);
  };

  const handleShareEvent = (eventId) => {
    const shareObject = {
      title: "Check out this amazing event!",
      shareUrl: `http://localhost:5173/event/${eventId}`,
    };
    navigate("/social-share", { state: { someObject: shareObject } });
  };

  return (
    <div className="max-w-sm bg-orange-100 border border-pink-300 rounded-lg shadow overflow-hidden flex flex-col">
      <div className="p-2">
        <img
          className="w-full h-52 rounded-lg shadow object-cover"
          src={
            event.imageUrl
              ? event.imageUrl
              : "https://via.placeholder.com/400x200"
          }
          alt="Event Image"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-grow overflow-hidden">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
          {event.title}
        </h5>
        <p className="mb-3 font-normal text-gray-800">
          <strong>Category:</strong> {event.category}
        </p>
        <p className="mb-3 font-normal text-gray-800">
          <strong>Description:</strong>{" "}
          {event.description || "No description available"}
        </p>
        <p className="mb-3 font-normal text-gray-800">
          <strong>Price:</strong> ${event.price}
        </p>
        <p className="mb-3 font-normal text-gray-800">
          <strong>Location:</strong> {event.location}
        </p>
      </div>
      <div>
      </div>

      {/* Admin Controls */}
      {user && user.isAdmin ? (
        <div className="flex justify-end gap-4 items-center p-2">
          <FaRegEdit
            className="text-5xl text-orange-500 p-2 cursor-pointer"
            onClick={handleEditEvent}
          />
          <MdDelete
            className="text-5xl text-red-700 p-2 cursor-pointer"
            onClick={() => onDelete(event._id)} // Use the delete handler passed from EventScreen
          />
          <button
            onClick={handleViewEvent}
            className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <FaEye className="text-4xl p-2" title="View Event"/>
          </button>
        </div>
      ) : (
        <div className="bottom-2 left-4 right-4 p-4 flex justify-end gap-4">
          <button
            onClick={handleViewEvent}
            className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <FaEye className="text-4xl p-2" title="View Event"/>
          </button>

          <button
            onClick={() => handleShareEvent(event._id)}
            className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            <FaShareNodes className="text-5xl p-2" title="Share Event"/>
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;