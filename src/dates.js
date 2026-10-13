// 训练日期：存成 'YYYY-MM-DD' 字符串，显示时加上星期。
const WEEK = ['日', '一', '二', '三', '四', '五', '六'];

// 只认真实存在的日期（2026-02-30 这种不算）。
export function isDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
}

// '2026-10-12' → '2026年10月12日 周一'；不认识的原样返回。
export function fmtDate(s) {
  if (!isDate(s)) return String(s);
  const [y, m, d] = s.split('-').map(Number);
  return `${y}年${m}月${d}日 周${WEEK[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]}`;
}
