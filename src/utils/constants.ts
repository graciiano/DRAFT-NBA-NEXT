// Position constants
export const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'] as const;

export const POSITION_NAMES: Record<string, string> = {
  PG: 'Point Guard',
  SG: 'Shooting Guard',
  SF: 'Small Forward',
  PF: 'Power Forward',
  C: 'Center',
};

// Platform constants
export const PLATFORMS = ['PS5', 'XBOX', 'PC'] as const;

export const PLATFORM_NAMES: Record<string, string> = {
  PS5: 'PlayStation 5',
  XBOX: 'Xbox Series X/S',
  PC: 'PC',
};

// Status constants
export const DRAFT_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
} as const;

export const WAITLIST_STATUS = {
  WAITLIST: 'WAITLIST',
  APPROVED: 'APPROVED',
} as const;

// Roles
export const ROLES = {
  USER: 'ROLE_USER',
  ADMIN: 'ROLE_ADMIN',
  ORGANIZER: 'ROLE_ORGANIZER',
} as const;
