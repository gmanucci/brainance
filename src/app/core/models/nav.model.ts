export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  featureKey: string; // matches route segment
  items: NavItem[];
}
