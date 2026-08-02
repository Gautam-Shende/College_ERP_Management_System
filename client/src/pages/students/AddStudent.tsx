import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import StudentForm from "../../components/students/StudentForm";

import { createStudent } from "../../services/studentService";

import type { Student } from "../../types/student";

function AddStudent() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const handleCreate = async (data: Student) => {
    try {
      setSaving(true);

      const response = await createStudent(data);

      toast.success(response.message);

      navigate("/students");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Create Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow">
      <h1 className="mb-8 text-4xl font-bold">Add Student</h1>
      <StudentForm
        onSubmit={handleCreate}
        loading={saving}
        buttonText="Add Student"
      />
    </div>
  );
}

export default AddStudent;
