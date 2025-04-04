import type { DeployProject } from './config';

import { join } from 'node:path';

import { consola, fs } from '@vben/node-utils';

import { deployConfig } from './config';
import { gitCommitAndPush, setupGitConfig } from './git-utils';

export async function deployProject(project: DeployProject) {
  const config = deployConfig[project];
  if (!config) {
    consola.error(`未找到项目配置: ${project}`);
    process.exit(1);
  }

  const { git, sourceDir, targetDir } = config;

  if (!git.enabled) {
    consola.info(`项目: ${project}`);
    consola.info(`源目录: ${sourceDir}`);
    return;
  }

  try {
    // 检查源目录是否存在
    try {
      await fs.access(sourceDir);
    } catch {
      consola.error(`源目录不存在: ${sourceDir}`);
      consola.info(`请先执行构建命令: pnpm run build:${project}`);
      process.exit(1);
    }

    // 确保目标目录存在
    await fs.mkdir(targetDir, { recursive: true });

    // 清理目标目录
    try {
      await fs.rm(targetDir, { force: true, recursive: true });
    } catch {
      // 忽略错误，目录可能不存在
    }
    await fs.mkdir(targetDir, { recursive: true });

    // 复制文件
    await fs.cp(sourceDir, targetDir, { recursive: true });

    // 复制 edgeone.json 文件（如果存在）
    const edgeoneJsonPath = 'edgeone.json';
    try {
      await fs.access(edgeoneJsonPath);
      consola.info('复制 edgeone.json 文件...');
      await fs.copyFile(edgeoneJsonPath, join(targetDir, 'edgeone.json'));
    } catch {
      // 文件不存在，忽略
    }

    // Git 部署
    consola.info('开始 Git 部署...');

    // 设置 Git 配置
    await setupGitConfig(targetDir, git);

    // 提交并推送
    await gitCommitAndPush(targetDir, git);

    consola.success(`部署成功！`);
    consola.info(`项目: ${project}`);
    consola.info(`源目录: ${sourceDir}`);
    consola.info(`目标目录: ${targetDir}`);
  } catch (error) {
    consola.error(`部署失败 [${project}]:`, error);
    process.exit(1);
  }
}
