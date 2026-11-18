import type { Technology } from "@/lib/types";

export const technologies: Technology[] = [
  // Languages
  { id: "csharp", name: "C#", category: "languages", symbol: "Cs" },
  { id: "javascript", name: "JavaScript", category: "languages", symbol: "Js" },
  { id: "typescript", name: "TypeScript", category: "languages", symbol: "Ts" },
  { id: "java", name: "Java", category: "languages", source: "coursework" },
  { id: "kotlin", name: "Kotlin", category: "languages", symbol: "Kt" },
  { id: "sql", name: "SQL", category: "languages", symbol: "Sq" },
  { id: "html-css", name: "HTML / CSS", category: "languages" },

  // Frameworks
  { id: "aspnet-core", name: "ASP.NET Core", category: "frameworks", symbol: "An" },
  { id: "ef-core", name: "Entity Framework Core", category: "frameworks" },
  { id: "azure-functions", name: "Azure Functions", category: "frameworks", symbol: "Fn" },
  { id: "react", name: "React", category: "frameworks", symbol: "Rx" },
  { id: "react-native", name: "React Native", category: "frameworks", symbol: "Rn" },
  { id: "node-express", name: "Node / Express", category: "frameworks", symbol: "Nd" },
  { id: "android", name: "Android", category: "frameworks", symbol: "Ad" },
  { id: "winforms", name: "WinForms", category: "frameworks", symbol: "Wf" },
  { id: "wpf", name: "WPF", category: "frameworks", symbol: "Wp" },
  { id: "vite", name: "Vite", category: "frameworks" },
  { id: "zustand", name: "Zustand", category: "frameworks" },

  // Data
  { id: "sql-server", name: "SQL Server", category: "data" },
  { id: "azure-sql", name: "Azure SQL", category: "data" },
  { id: "mysql", name: "MySQL", category: "data" },
  { id: "mongodb", name: "MongoDB", category: "data", symbol: "Mg" },
  { id: "firebase", name: "Firebase", category: "data", symbol: "Fb" },
  { id: "sqlite", name: "SQLite / Room", category: "data" },
  { id: "indexeddb", name: "IndexedDB", category: "data", symbol: "Ix" },
  { id: "algorithms", name: "Graphs, trees & heaps", category: "data", symbol: "Ag" },

  // Cloud & DevOps
  { id: "azure", name: "Azure", category: "devops", symbol: "Az" },
  { id: "docker", name: "Docker / Compose", category: "devops", symbol: "Dk" },
  { id: "github-actions", name: "GitHub Actions", category: "devops", symbol: "Gh" },
  { id: "linux", name: "Linux (Ubuntu Server)", category: "devops", symbol: "Lx" },
  { id: "git", name: "Git / Gitflow", category: "devops", source: "every project; Gitflow in The Loop and CoffeeNChill" },

  // Security & quality
  { id: "jwt", name: "JWT", category: "quality", symbol: "Jw" },
  { id: "rbac", name: "Role-based access control", category: "quality" },
  { id: "bcrypt", name: "bcrypt", category: "quality" },
  { id: "rate-limiting", name: "Rate limiting", category: "quality" },
  { id: "input-validation", name: "Input validation", category: "quality" },
  { id: "sonarqube", name: "SonarQube Cloud", category: "quality", symbol: "Sn" },
  { id: "gitleaks", name: "Gitleaks", category: "quality" },
  { id: "xunit", name: "xUnit", category: "quality", symbol: "Xu" },
  { id: "vitest", name: "Vitest", category: "quality", symbol: "Vt" },
  { id: "rtl", name: "React Testing Library", category: "quality" },
  { id: "robolectric", name: "Robolectric", category: "quality" },
  { id: "postman", name: "Postman / Newman", category: "quality", symbol: "Pm" },

  // Infrastructure & networking
  { id: "windows-server", name: "Windows Server", category: "infrastructure", source: "MCSA certification" },
  { id: "active-directory", name: "Active Directory", category: "infrastructure", source: "MCSA certification" },
  { id: "tcp-ip", name: "TCP/IP", category: "infrastructure", source: "Telkom support role and Network+" },
  { id: "dns-dhcp", name: "DNS / DHCP", category: "infrastructure", source: "MCSA certification" },
  { id: "routers", name: "Router & Wi-Fi setup", category: "infrastructure", source: "Telkom support role" },
  { id: "fault-diagnosis", name: "Fault diagnosis", category: "infrastructure", source: "Telkom support role" },
];
