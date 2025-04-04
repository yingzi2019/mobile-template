import type { GitConfig } from './config';

import { join } from 'node:path';

import { consola, execa, fs } from '@vben/node-utils';

export async function gitInit(dir: string) {
  try {
    await execa('git', ['init'], { cwd: dir });
  } catch {
    consola.warn('Git 仓库已存在，跳过初始化');
  }
}

export async function gitSetRemote(dir: string, repository: string) {
  try {
    await execa('git', ['remote', 'add', 'origin', repository], { cwd: dir });
  } catch {
    // 如果远程仓库已存在，更新它
    await execa('git', ['remote', 'set-url', 'origin', repository], {
      cwd: dir,
    });
  }
}

export async function gitCheckoutBranch(dir: string, branch: string) {
  try {
    await execa('git', ['checkout', '-B', branch], { cwd: dir });
  } catch (error) {
    consola.error(`切换分支失败: ${error}`);
    throw error;
  }
}

export async function gitCommitAndPush(dir: string, config: GitConfig) {
  try {
    // 添加所有文件
    await execa('git', ['add', '.'], { cwd: dir });

    // 提交更改
    await execa('git', ['commit', '-m', config.commitMessage], { cwd: dir });

    // 推送到远程仓库
    await execa('git', ['push', '-u', 'origin', config.branch, '--force'], {
      cwd: dir,
    });

    consola.success(`成功推送到 ${config.repository} 的 ${config.branch} 分支`);
  } catch (error) {
    consola.error('Git 操作失败:', error);
    throw error;
  }
}

export async function setupGitConfig(dir: string, config: GitConfig) {
  try {
    // 从环境变量或 git 配置中获取 token
    const token = process.env.GITHUB_TOKEN || (await getGitCredentials());
    if (token) {
      // 使用 token 构建认证 URL
      const repoWithAuth = config.repository.replace(
        'https://',
        `https://x-access-token:${token}@`,
      );
      config = { ...config, repository: repoWithAuth };
    }

    await gitInit(dir);
    await gitSetRemote(dir, config.repository);
    await gitCheckoutBranch(dir, config.branch);

    consola.success('Git 配置完成');
  } catch (error) {
    consola.error('Git 配置失败:', error);
    throw error;
  }
}

async function getGitCredentials(): Promise<null | string | undefined> {
  try {
    // 尝试从 git 配置中读取凭证
    const { stdout } = await execa('git', [
      'config',
      '--get',
      'credential.helper',
    ]);
    if (stdout.includes('store')) {
      // 如果使用了 store，尝试读取保存的凭证
      const home = process.env.HOME ?? process.env.USERPROFILE ?? null;
      if (!home) return null;
      const credPath = join(home, '.git-credentials');
      try {
        await fs.access(credPath);
        const content = await fs.readFile(credPath, 'utf8');
        const match = content.match(/https:\/\/[^:]+:([^@]+)@github\.com/);
        return match ? match[1] : null;
      } catch {
        return null;
      }
    }
    return null;
  } catch {
    return null;
  }
}
