type TogglWorkspace = {
  active: boolean;
  created_at: string;
  custom_colors: string;
  id: number;
  name: string;
  pricing_system: string;
  role: string;
  suspended_at: string | null;
  updated_at: string;
}

export type TogglProfileResponse = {
  color_id: number;
  created_at: string;
  email: string;
  email_verified_at: string;
  has_picture: boolean;
  id: number;
  initials: string;
  inivitations: any[];
  legal_consent_pending: boolean;
  manager: boolean;
  name: string;
  picture_url: string | null;
  preferences: any;
  updated_at: string;
  workspaces: TogglWorkspace[];
}
