import { GraduationCap, BookOpen, MapPin, Users } from "lucide-react";

import type { Summary } from "../../types/dashboard";

interface Props {
  summary: Summary;
}

function SummaryCards({ summary }: Props) {
  const cards = [
    {
      title: "Students",
      value: summary.totalStudents,
      subtitle: "Registered Students",
      icon: GraduationCap,
      color: "bg-blue-500",
    },
    {
      title: "Courses",
      value: summary.totalCourses,
      subtitle: "Available Courses",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Cities",
      value: summary.totalCities,
      subtitle: "Student Locations",
      icon: MapPin,
      color: "bg-orange-500",
    },
    {
      title: "Users",
      value: summary.totalUsers,
      subtitle: "System Employees",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="mt-1 text-xs text-gray-400">{card.subtitle}</p>
                <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
              </div>

              <div className={`${card.color} rounded-full p-3 text-white`}>
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;
