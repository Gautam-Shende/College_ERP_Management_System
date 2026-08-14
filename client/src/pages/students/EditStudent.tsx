import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import StudentForm from "../../components/students/StudentForm";

import { getStudentById, updateStudent } from "../../services/studentService";

import type { Student } from "../../types/student";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for fetched student data and loading indicators
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch student details by ID on component mount
  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await getStudentById(Number(id));
      setStudent(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Student not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  // Handle student update form submission
  const handleUpdate = async (data: Student) => {
    try {
      // Disable form during API request
      setSaving(true);

      const response = await updateStudent(Number(id), data);

      toast.success(response.message);

      // Redirect back to student directory
      navigate("/students");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      // Re-enable form controls
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!student) {
    return <h2 className="rounded-lg bg-rose-50 p-4 text-center text-rose-600">Student Not Found</h2>;
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 sm:p-8 shadow">
      <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-slate-800">Edit Student</h1>

      <StudentForm
        defaultValues={student}
        onSubmit={handleUpdate}
        loading={saving}
        buttonText="Update Student"
      />
    </div>
  );
}

export default EditStudent;
