// // Update the import to match the correct exported member from mockData
// import { mockApps } from "@/data/mockData";
// import { Application } from "@/types/schema";
// import { useState } from "react";
// export function useApplications() {
//   const [applications, setApplications] = useState<Application[]>(mockApps);
//   const apply = (jobId: string, creatorId: string) => {
//     interface NewApplication {
//       id: string;
//       jobId: string;
//       creatorId: string;
//       status: "pending";
//       appliedAt: string;
//     }

//     const newApp: NewApplication = {
//       id: `app${applications.length + 1}`,
//       jobId,
//       creatorId,
//       status: "pending",
//       appliedAt: new Date().toISOString(),
//     };
//     setApplications((prev) => [newApp, ...prev]);
//   };
//   return { applications, apply };
// }
