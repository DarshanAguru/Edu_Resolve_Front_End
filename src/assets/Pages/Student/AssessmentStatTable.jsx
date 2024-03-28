import React from "react";
import ViewQuestions from "./ViewQuestions.jsx";
const AssessmentStatTable = ({ view, setView }) => {
  return (
    <>
      {view ? (
        <div>
          <p className=" drop-shadow-2xl font-bold text-center tracking-wide font-Montserrat">
            Assessment Stat Table
          </p>
          <section className="container mx-auto p-6 ">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 font-Montserrat">
                      <th className="px-4 py-3">s.no</th>
                      <th className="px-4 py-3">Assessment name</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Marks</th>
                      <th className="px-4 py-3">view assignment</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          {/* <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div> */}
                          <div>
                            <td className="px-4 py-3 text-sm ">1</td>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-ms font-semibold border">
                        <p className="font-semibold text-black">
                          Maths Assessment
                        </p>
                        <p className="text-xs text-gray-600">given at:</p>
                        <p className="text-xs text-gray-600">deadline:</p>
                      </td>
                      <td className="px-4 py-3 text-xs border">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                          {" "}
                          Submitted{" "}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm border">2/2</td>
                      <td className="px-4 py-3 text-md font-semibold border">
                        <button
                          className=" text-blue-800 hover:text-blue-400 underline underline-offset-2"
                          onClick={() => setView((prev) => !prev)}
                        >
                          view
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setView((prev) => !prev)}
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded flex items-center gap-2 mb-5 ml-5 hover:bg-gray-300 mr-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 11H7.414l5.293-5.293-1.414-1.414L3.586 12l7.707 7.707 1.414-1.414L7.414 13H19v-2z" />
            </svg>

            <span>Back to Assessements</span>
          </button>
          <ViewQuestions />
        </div>
      )}
    </>
  );
};

export default AssessmentStatTable;
