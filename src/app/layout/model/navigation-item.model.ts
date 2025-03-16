export interface NavigationItem {
  icon: string;
  label: string;
  children?: NavigationItem[];
  isOpen?: boolean;
  routerLink: string[];
}
