import type { RouteLocationNormalized } from 'vue-router';

export type EnhancedRouteLocation = RouteLocationNormalized & {
  meta: {
    keepAlive?: boolean;
    level?: number | unknown;
    name?: string;
  };
};
