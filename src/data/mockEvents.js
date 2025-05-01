// src/data/mockEvents.js
export const mockEvents = [
    {
      id: 1,
      title: "Client Consultation - Smith Case",
      type: "consultation",
      start: new Date(2025, 3, 15, 14, 0), // April 15, 2025 2:00 PM
      end: new Date(2025, 3, 15, 15, 0),
      lawyer: "Atty. Juan Dela Cruz",
      client: "John Smith",
      caseNumber: "CV-2023-1234",
    },
    {
      id: 2,
      title: "Hearing - People vs. Reyes",
      type: "hearing",
      start: new Date(2025, 3, 16, 9, 30),
      end: new Date(2025, 3, 16, 11, 0),
      court: "Branch 45, RTC Manila",
      lawyer: "Atty. Maria Santos",
    },
    // Add more mock events...
  ];
  