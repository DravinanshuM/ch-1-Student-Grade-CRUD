import { useState } from "react";

function StudentGrade() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      console.log("yes we have", editIndex);
      const updatedStudents = [...students];
      updatedStudents[editIndex] = { name, grade };
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      if (students) {
        setStudents([...students, { name, grade }]);
        console.log([...students, { name, grade }]);
      }
    }

    // when we submit the form blank the name and grade.
    setName("");
    setGrade("");
  };

  // for delete.
  const handleDelete = (index) => {
    // console.log("outer :: ", index);

    const deleteIndex = students.filter((student, idx) => idx !== index);

    // console.log("delete :: ", deleteIndex);
    setStudents(deleteIndex);
  };

  // for edit.
  const handleEdit = (index) => {
    setEditIndex(index);
    console.log("edit index :: ", index);
    setName(students[index].name);
    setGrade(students[index].grade);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Student Grade</h1>
      <form onSubmit={handleFormSubmit} method="post" className="space-y-4">
        <div className="flex justify-center space-x-4">
          <input
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="text"
            placeholder="Enter Student Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700"
          >
            {editIndex !== null ? "Update" : "add"}
          </button>
        </div>
      </form>
      <table className="table-auto mt-4 mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Grade</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="border">
          {students.map((student, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b-2">{student.name}</td>
              <td className="px-4 py-2 border-b-2">{student.grade}</td>
              <td className="border-b-2 px-4 py-2">
                <button
                  className="px-4 py-2 border"
                  type="button"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                &nbsp; &nbsp;
                <button
                  className="px-4 py-2 border"
                  type="button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentGrade;
