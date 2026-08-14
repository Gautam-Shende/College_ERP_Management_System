import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import StudentForm from "../../components/students/StudentForm";

import { createStudent } from "../../services/studentService";

import type { Student } from "../../types/student";

function AddStudent() {
  const navigate = useNavigate();

  // Loading state to track form submission
  const [saving, setSaving] = useState(false);

  // Handle student creation form submission
  const handleCreate = async (data: Student) => {
    try {
      // Disable form inputs while sending request
      setSaving(true);

      const response = await createStudent(data);

      toast.success(response.message);

      // Navigate back to student list on success
      navigate("/students");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Create Failed");
    } finally {
      // Re-enable form inputs after request completes
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 sm:p-8 shadow">
      <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-slate-800">Add Student</h1>
      <StudentForm
        onSubmit={handleCreate}
        loading={saving}
        buttonText="Add Student"
      />
    </div>
  );
}

export default AddStudent;
