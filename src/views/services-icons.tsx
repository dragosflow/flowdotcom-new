// Product-type icons for the services grid — Lucide marks, `currentColor`.
import {
  AppWindow,
  LayoutTemplate,
  ShoppingBag,
  Cloud,
  Users,
  ChartColumn,
  House,
  Grid2x2,
  ListChecks,
  Store,
  Smartphone,
  Monitor,
  Palette,
  Activity,
  Box,
  type LucideIcon,
} from "lucide-react";

export type ServiceIconId =
  | "website"
  | "landing"
  | "eshop"
  | "saas"
  | "crm"
  | "dashboard"
  | "portal"
  | "systems"
  | "admin"
  | "marketplace"
  | "mobile"
  | "ios"
  | "android"
  | "desktop"
  | "design"
  | "animation"
  | "webgl";

const ICONS: Record<ServiceIconId, LucideIcon> = {
  website: AppWindow,
  landing: LayoutTemplate,
  eshop: ShoppingBag,
  saas: Cloud,
  crm: Users,
  dashboard: ChartColumn,
  portal: House,
  systems: Grid2x2,
  admin: ListChecks,
  marketplace: Store,
  mobile: Smartphone,
  ios: Smartphone,
  android: Smartphone,
  desktop: Monitor,
  design: Palette,
  animation: Activity,
  webgl: Box,
};

export interface ServiceIconProps {
  id: ServiceIconId;
  className?: string;
}

export const ServiceIcon = ({
  id,
  className = "h-6 w-6",
}: ServiceIconProps) => {
  const Icon = ICONS[id];
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
};
