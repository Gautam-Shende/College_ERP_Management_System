import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import StudentForm from "../../components/students/StudentFrom";

import { getStudentById, updateStudent } from "../../services/studentService";

import type { Student } from "../../types/student";

function EditStudent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState<Student | null>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const fetchStudent = async () => {
    try {
      const response = await getStudentById(Number(id));

      setStudent(response.data);

      // Agar backend array bhej raha ho:
      // setStudent(response.data[0]);
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

  const handleUpdate = async (data: Student) => {
    try {
      setSaving(true);

      const response = await updateStudent(Number(id), data);

      toast.success(response.message);

      navigate("/students");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
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
    return <h2 className="text-red-500">Student Not Found</h2>;
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow">
      <h1 className="mb-8 text-4xl font-bold">Edit Student</h1>

      <StudentForm
        defaultValues={student}
        onSubmit={handleUpdate}
        loading={saving}
      />
    </div>
  );
}

export default EditStudent;
