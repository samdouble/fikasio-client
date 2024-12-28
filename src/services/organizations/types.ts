export interface OrganizationMember {
  id: string;
}

export interface Organization {
  id: string;
  members: any[];
  name: string;
}
