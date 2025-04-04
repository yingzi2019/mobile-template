import request from '@/utils/request';

export async function queryProse(): Promise<any> {
  return request('/prose');
}

export * from './auth';
export * from './user';
