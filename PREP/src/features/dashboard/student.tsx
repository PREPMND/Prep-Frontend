{
  path: "/dashboard/super-admin",
  element: (
    <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
      <SuperAdminDashboard />
    </RoleGuard>
  ),
},
{
  path: "/dashboard/university",
  element: (
    <RoleGuard allowedRoles={["UNIVERSITY_ADMIN"]}>
      <UniversityAdminDashboard />
    </RoleGuard>
  ),
},
{
  path: "/dashboard/student",
  element: (
    <RoleGuard allowedRoles={["STUDENT"]}>
      <StudentDashboard />
    </RoleGuard>
  ),
},