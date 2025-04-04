import { join } from 'node:path';

export const deployConfig = {
  'hnsaas-central': {
    git: {
      branch: 'deploy-hnsaas-central',
      commitMessage: 'chore: update hnsaas-central deployment files',
      enabled: true,
      repository: 'https://github.com/inppro/hnsaas-ui.git',
    },
    sourceDir: join(process.cwd(), 'apps/hnsaas-central/dist'),
    targetDir: join(process.cwd(), 'deploy/hnsaas-central'),
  },
  'hnsaas-tenant': {
    git: {
      branch: 'deploy-hnsaas-tenant',
      commitMessage: 'chore: update hnsaas-tenant deployment files',
      enabled: true,
      repository: 'https://github.com/inppro/hnsaas-ui.git',
    },
    sourceDir: join(process.cwd(), 'apps/hnsaas-tenant/dist'),
    targetDir: join(process.cwd(), 'deploy/hnsaas-tenant'),
  },
};

export type DeployProject = keyof typeof deployConfig;

export interface GitConfig {
  branch: string;
  commitMessage: string;
  enabled: boolean;
  repository: string;
}
