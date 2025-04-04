// 通用API响应类型
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 分页请求参数
export interface PaginationParams {
  [key: string]: any;
  page: number;
  pageSize: number;
}

// 分页响应数据
export interface PaginationData<T> {
  list: T[];
  page: number;
  pageSize: number;
  total: number;
}

// 用户信息类型
export interface UserInfo {
  avatar?: string;
  id: number;
  nickname: string;
  permissions: string[];
  roles: string[];
  username: string;
}

// 菜单项类型
export interface MenuItem {
  children?: MenuItem[];
  component?: string;
  icon?: string;
  id: number;
  name: string;
  parentId: number;
  path: string;
  sort: number;
}
