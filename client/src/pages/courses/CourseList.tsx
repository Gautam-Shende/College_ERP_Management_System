import { useState } from "react";
import { Plus, BookOpen, Edit2, Trash2 } from "lucide-react";
import useCourses from "../../hooks/useCourses";
import CourseModal from "../../components/courses/CourseModal";
import type { Course } from "../../types/course";
import { useAuth } from "../../context/AuthContext";

// Course management overview page
export default function CourseList() {
  const { courses, loading, error, addCourse, editCourse, removeCourse } = useCourses();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const { hasRole } = useAuth();
  const canModify = hasRole("principal");

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setModalOpen(true);
  };

  const handleSave = async (courseName: string, departmentId: number) => {
    if (editingCourse) {
      return await editCourse(editingCourse.id, courseName, departmentId);
    } else {
      return await addCourse(courseName, departmentId);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <h2 className="rounded-lg bg-rose-50 p-4 text-center text-rose-600">{error}</h2>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Academic Courses</h1>
          <p className="text-sm text-slate-500">Manage courses and their assigned departments</p>
        </div>

        {canModify && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            Add New Course
          </button>
        )}
      </div>

      {/* Grid of Courses */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <BookOpen size={24} />
              </div>
              {canModify && (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleOpenEdit(course)}
                    className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    title="Edit Course"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    title="Delete Course"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-slate-900">{course.course_name}</h3>
              <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                {course.department_name || `Dept ID: ${course.department_id}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Course Create/Edit Modal */}
      <CourseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingCourse}
      />
    </div>
  );
}
