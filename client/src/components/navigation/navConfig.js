// client/src/components/navigation/navConfig.js
import {
  BookOpen,
  Briefcase,
  FileText,
  LayoutDashboard,
  Target,
  UserCircle,
} from "lucide-react";

/** @typedef {'link' | 'journal' | 'soon'} NavItemKind */

/**
 * Primary workspace navigation.
 * @type {Array<{
 *   id: string,
 *   label: string,
 *   icon: import('lucide-react').LucideIcon,
 *   kind: NavItemKind,
 *   to?: string,
 *   soon?: boolean
 * }>}
 */
export const PRIMARY_NAV = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    kind: "link",
    to: "/dashboard",
  },
  {
    id: "profile",
    label: "Profile / Core Context",
    icon: UserCircle,
    kind: "link",
    to: "/profile",
  },
  {
    id: "experiences",
    label: "Experiences",
    icon: Briefcase,
    kind: "link",
    to: "/experiences",
  },
  {
    id: "journal",
    label: "Journal",
    icon: BookOpen,
    kind: "journal",
    to: "/journal",
  },
  {
    id: "opportunities",
    label: "Opportunities",
    icon: Target,
    kind: "soon",
    to: "/opportunities",
    soon: true,
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    kind: "soon",
    to: "/documents",
    soon: true,
  },
];
