/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from '../api'
import { IoCloseCircle } from "react-icons/io5";

// import { IoCloseCircleOutline } from "react-icons/io5";
const Notifications = ({ data, userType = null, eventHandler, eventCnt }) => {
  const { _id, token } = data;
  const [notifications, setNotifications] = useState([]);
  const [refreshNotifications, setRefreshNotifications] = useState(false);
  useEffect(() => {
    async function getNotifications() {
      const { data } = await api.post(
        `/${userType}/getAllNotifications/${_id}`,
        { token: token, id: _id }
      );
      console.log(data);
      setNotifications(data);
    }
    if (userType) getNotifications();
  }, [refreshNotifications]);

  const deleteNotification = async (notificationId) => {
    if (eventHandler !== null && eventCnt !== null) {
      eventHandler(eventCnt - 1);
    }
    // console.log(notificationId);
    const data = await api.post(
      `/${userType}/clearNotification/${_id}`,
      { token: token, id: _id, notifId: notificationId }
    );
    // console.log(data);
    setRefreshNotifications((prev) => !prev);
    // window.location.reload();
  };
  // console.log(notifications);
  return (
    <div
      className="absolute right-2 top-10 md:top-16 text-left mt-2 w-96 bg-white rounded-lg border overflow-auto no-scrollbar  shadow-custom"
      style={{
        maxHeight: "300px",
        boxShadow: "0 0px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div
        className="overflow-auto"
        style={{ maxHeight: "500px", minHeight: "100px" }}
      >
        <div
          className="px-3 py-2"
          style={{
            backgroundColor: "#f3f4f6",
            borderBottomColor: "#d1d5db",
            color: "#1f2937",
          }}
        >
          <h3 className="font-semibold" style={{ color: "#917A68" }}>
            Notifications
          </h3>
        </div>
        <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="px-3 py-2 border">
                <div className="flex justify-between items-center  ">
                  <p className="text-gray-500 dark:text-gray-400 flex-1">
                    {notification.notificationType === "Reply" &&
                      `${notification.userName} replied to your post (${notification.count})`}
                    {notification.notificationType === "Assignment Submit" &&
                      `${notification.userName} submitted the Assignment`}

                    {notification.notificationType === "Assignment" &&
                      `${notification.userName} posted the Assignment`}
                  </p>
                  <button
                    onClick={() => deleteNotification(notification.userId)}
                    className="text-red-600 cursor-pointer"
                  >
                    <IoCloseCircle className="text-2xl" />
                  </button>
                </div>
                <p>{notification.createdAt}</p>
              </div>
            ))
          ) : (
            <p className="px-3 py-2 text-gray-500 dark:text-gray-400">
              No notifications.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
