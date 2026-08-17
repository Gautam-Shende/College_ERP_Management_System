import { GraduationCap, BookOpen, Building2 } from "lucide-react";

import type { Summary } from "../../types/dashboard";

interface Props {
  summary?: Summary;
}

function SummaryCards({ summary }: Props) {
  const cards = [
    {
      title: "Total Students",
      value: summary?.total_students ?? 0,
      subtitle: "Registered Students",
      icon: GraduationCap,
      color: "bg-blue-500",
    },
    {
      title: "Total Courses",
      value: summary?.total_courses ?? 0,
      subtitle: "Available Courses",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Total Departments",
      value: summary?.total_departments ?? 0,
      subtitle: "Academic Departments",
      icon: Building2,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-3">
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
