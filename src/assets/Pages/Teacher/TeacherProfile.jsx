
import TeacherProfileCard from "./TeacherProfileCard";

const TeacherProfile = () => {
  const data = JSON.parse(localStorage.getItem("teacher"));

  return (
    <div className=" lg:mx-0 lg:grid lg:grid-cols-3 my-auto sm:mx-10 mb-10 lg:mb-0">
      <TeacherProfileCard className=" col-span-1" data={data} userType="teachers" setRefresh={null} />
      
    </div>
  );
};

export default TeacherProfile;
