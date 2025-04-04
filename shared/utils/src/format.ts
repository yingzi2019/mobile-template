/**
 * 金额格式化工具
 */
export const MoneyFormatter = {
  /**
   * 分转元，保留两位小数
   * @param cents 分
   * @returns 元
   */
  centsToYuan(cents: number): string {
    return (cents / 100).toFixed(2);
  },

  /**
   * 格式化金额，添加千分位
   * @param amount 金额
   * @param decimals 小数位数
   * @returns 格式化后的金额
   */
  formatAmount(amount: number, decimals: number = 2): string {
    return amount.toLocaleString('zh-CN', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    });
  },

  /**
   * 格式化金额，添加千分位和货币符号
   * @param amount 金额
   * @param symbol 货币符号
   * @param decimals 小数位数
   * @returns 格式化后的金额
   */
  formatCurrency(
    amount: number,
    symbol: string = '¥',
    decimals: number = 2,
  ): string {
    return `${symbol}${this.formatAmount(amount, decimals)}`;
  },

  /**
   * 元转分
   * @param yuan 元
   * @returns 分
   */
  yuanToCents(yuan: number): number {
    return Math.round(yuan * 100);
  },
};

/**
 * 时间格式化工具
 */
export const TimeFormatter = {
  /**
   * 时间戳转日期字符串
   * @param timestamp 时间戳（毫秒）
   * @param format 格式化模板
   * @returns 格式化后的日期字符串
   */
  formatDate(
    timestamp: number,
    format: string = 'YYYY-MM-DD HH:mm:ss',
  ): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  },

  /**
   * 获取相对时间
   * @param timestamp 时间戳（毫秒）
   * @returns 相对时间字符串
   */
  getRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    // 小于1分钟
    if (diff < 60_000) {
      return '刚刚';
    }
    // 小于1小时
    if (diff < 3_600_000) {
      return `${Math.floor(diff / 60_000)}分钟前`;
    }
    // 小于24小时
    if (diff < 86_400_000) {
      return `${Math.floor(diff / 3_600_000)}小时前`;
    }
    // 小于30天
    if (diff < 2_592_000_000) {
      return `${Math.floor(diff / 86_400_000)}天前`;
    }
    // 小于12个月
    if (diff < 31_536_000_000) {
      return `${Math.floor(diff / 2_592_000_000)}个月前`;
    }
    // 大于12个月
    return `${Math.floor(diff / 31_536_000_000)}年前`;
  },

  /**
   * 本地时间转UTC时间
   * @param localString 本地时间字符串
   * @returns UTC时间字符串
   */
  localToUtc(localString: string): string {
    const date = new Date(localString);
    return date.toISOString();
  },

  /**
   * UTC时间转本地时间
   * @param utcString UTC时间字符串
   * @returns 本地时间字符串
   */
  utcToLocal(utcString: string): string {
    const date = new Date(utcString);
    return date.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
    });
  },
};

/**
 * 数字格式化工具
 */
export const NumberFormatter = {
  /**
   * 格式化数字，添加千分位
   * @param num 数字
   * @returns 格式化后的数字
   */
  formatNumber(num: number): string {
    return num.toLocaleString('zh-CN');
  },

  /**
   * 格式化百分比
   * @param num 数字
   * @param decimals 小数位数
   * @returns 格式化后的百分比
   */
  formatPercent(num: number, decimals: number = 2): string {
    return `${(num * 100).toFixed(decimals)}%`;
  },

  /**
   * 格式化科学计数法
   * @param num 数字
   * @param decimals 小数位数
   * @returns 格式化后的数字
   */
  formatScientific(num: number, decimals: number = 2): string {
    return num.toExponential(decimals);
  },
};
