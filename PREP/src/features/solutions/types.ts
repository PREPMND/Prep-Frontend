export interface Solution {
  id: string;
  challengeId: string;
  title: string;
  description: string;
  ownerId: string;
  ownerType: string;
  organizationId: string | null;
  mediaIds: string[];
  status: string;
  createdAt: string;
}

export interface CreateSolutionPayload {
  challengeId: string;
  title: string;
  description: string;
  ownerType: string;
  mediaIds?: string[];
  organizationId?: string | null;
}