import { useEffect, useState } from "react";
import {
  getOrganizationMembers,
  removeOrganizationMember,
  updateOrganizationMemberRole,
} from "../services/organization";
import type {
  OrganizationMemberRole,
  OrganizationMembership,
} from "../types/organization";

interface OrganizationMembersProps {
  organizationId: string;
}

export function OrganizationMembers({
  organizationId,
}: OrganizationMembersProps) {
  const [members, setMembers] = useState<OrganizationMembership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [removingUserId, setRemovingUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadMembers() {
      try {
        const response = await getOrganizationMembers(organizationId);
        setMembers(response);
      } finally {
        setIsLoading(false);
      }
    }

    loadMembers();
  }, [organizationId]);

  async function handleRoleChange(
    memberUserId: string,
    role: OrganizationMemberRole,
  ) {
    try {
      setUpdatingUserId(memberUserId);

      const updatedMember = await updateOrganizationMemberRole(
        organizationId,
        memberUserId,
        { role },
      );

      setMembers((currentMembers) =>
        currentMembers.map((member) =>
          member.userId === memberUserId ? updatedMember : member,
        ),
      );
    } finally {
      setUpdatingUserId(null);
    }
  }

  async function handleRemove(memberUserId: string) {
    try {
      setRemovingUserId(memberUserId);

      await removeOrganizationMember(
        organizationId,
        memberUserId,
      );

      setMembers((currentMembers) =>
        currentMembers.filter(
          (member) => member.userId !== memberUserId,
        ),
      );
    } finally {
      setRemovingUserId(null);
    }
  }

  if (isLoading) {
    return (
      <p className="text-sm light:text-neutral-500 dark:text-neutral-400">
        Loading members...
      </p>
    );
  }

  return (
    <section className="mt-8 border-t light:border-neutral-200 dark:border-neutral-800 pt-6">
      <div className="mb-5">
        <h2 className="font-medium light:text-neutral-900 dark:text-white">
          Members
        </h2>
        <p className="mt-1 text-sm light:text-neutral-500 dark:text-neutral-400">
          Manage organization members and their roles.
        </p>
      </div>

      {!members.length ? (
        <p className="text-sm light:text-neutral-500 dark:text-neutral-400">
          No members found.
        </p>
      ) : (
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border light:border-neutral-200 dark:border-neutral-800 p-4"
            >
              <div>
                <p className="text-sm font-medium light:text-neutral-900 dark:text-white">
                  {member.userId}
                </p>
                <p className="mt-1 text-xs light:text-neutral-500 dark:text-neutral-400">
                  {member.status}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={member.role}
                  disabled={updatingUserId === member.userId}
                  onChange={(event) =>
                    handleRoleChange(
                      member.userId,
                      event.target.value as OrganizationMemberRole,
                    )
                  }
                  className="rounded-lg border light:border-neutral-300 dark:border-neutral-700 light:bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
                >
                  <option value="student">Student</option>
                  <option value="researcher">Researcher</option>
                  <option value="faculty">Faculty</option>
                  <option value="university_admin">University Admin</option>
                  <option value="institutional_admin">Institutional Admin</option>

                  <option value="industry_member">Industry Member</option>
                  <option value="industry_mentor">Industry Mentor</option>
                  <option value="industry_admin">Industry Admin</option>

                  <option value="ngo_member">NGO Member</option>
                  <option value="ngo_admin">NGO Admin</option>

                  <option value="community_member">Community Member</option>
                  <option value="volunteer">Volunteer</option>

                  <option value="expert">Expert</option>
                  <option value="mentor">Mentor</option>
                  <option value="solution_reviewer">Solution Reviewer</option>
                  <option value="evaluator">Evaluator</option>

                  <option value="officer">Officer</option>
                  <option value="department_officer">Department Officer</option>
                  <option value="field_officer">Field Officer</option>
                  <option value="government_reviewer">Government Reviewer</option>

                  <option value="project_lead">Project Lead</option>
                  <option value="event_manager">Event Manager</option>

                  <option value="member">Member</option>
                </select>
                
                <button
                  type="button"
                  disabled={removingUserId === member.userId}
                  onClick={() => handleRemove(member.userId)}
                  className="text-sm font-medium text-red-600 disabled:opacity-50 dark:text-red-400"
                >
                  {removingUserId === member.userId
                    ? "Removing..."
                    : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}