import React, { useState } from "react";

const StudentMarks = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // handleFormSubmit.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        // Update existing student
        // const updatedResult = [...students];
        // updatedResult[editIndex] = { name, grade };
        // setStudents(updatedResult);
        setStudents(
          students.map((student, index) =>
            editIndex === index ? { ...students, name, grade } : student
          )
        );
        setEditIndex(null);
        // console.log("updated...", updatedResult);
        console.log("updated..");
      } else {
        // Add new student
        // Validation check
        if (name === "" || grade === "") {
          alert("Please enter the name and grade");
          return;
        }
        setStudents([...students, { name, grade }]);
        console.log([...students, { name, grade }]);
      }

      // Clear the input form after submission
      setName("");
      setGrade("");
    } catch (error) {
      console.log("Error for Submitting the form time :: ", error);
    }
  };

  // handleDelete
  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, ind) => index !== ind);
    console.log("Deleted index :: ", updatedStudents);
    setStudents(updatedStudents);
  };

  // handleEdit
  const handleEdit = (index) => {
    setEditIndex(index);
    const selectedName = students[index].name;
    const selectedGrade = students[index].grade;
    setName(selectedName);
    setGrade(selectedGrade);
  };

  return (
    <div className="bg-slate-800 h-screen">
      <div className="flex flex-col lg:flex-row justify-between p-8 lg:p-12">
        <div className="lg:w-1/3 w-full mb-6 lg:mb-0 bg-slate-500 p-7 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center lg:text-left text-white">
            Student Marks
          </h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Grade"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
            <div className="text-center lg:text-left">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
        <div className="lg:w-2/3 w-full overflow-x-auto lg:ml-8 bg-white rounded-lg shadow-lg p-4">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal text-center">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Grade</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{student.name}</td>
                    <td className="py-3 px-6 text-left">{student.grade}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-3 px-6 text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentMarks;
