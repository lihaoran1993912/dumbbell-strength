import test from 'node:test';
import assert from 'node:assert/strict';
import { isDate, fmtDate } from '../src/dates.js';
import { createStore } from '../src/store.js';

test('isDate 只认真实存在的 YYYY-MM-DD', () => {
  assert.equal(isDate('2026-10-12'), true);
  assert.equal(isDate('2028-02-29'), true);
  assert.equal(isDate('2026-02-30'), false);
  assert.equal(isDate('2026-1-5'), false);
  assert.equal(isDate(''), false);
  assert.equal(isDate(null), false);
});

test('fmtDate 显示年月日 + 星期', () => {
  assert.equal(fmtDate('2026-10-12'), '2026年10月12日 周一');
  assert.equal(fmtDate('2026-10-18'), '2026年10月18日 周日');
  assert.equal(fmtDate('坏数据'), '坏数据');
});

function fakeStorage() {
  const map = new Map();
  return { getItem: (k) => (map.has(k) ? map.get(k) : null), setItem: (k, v) => map.set(k, String(v)), removeItem: (k) => map.delete(k) };
}

test('setDate 改某次训练的日期，刷新后还在；非法日期不改', () => {
  const storage = fakeStorage();
  const s = createStore(storage);
  s.finish({ seq: 1, at: '2026-10-12', items: {} });
  s.setDate(0, '2026-10-11');
  assert.equal(createStore(storage).get().logs[0].at, '2026-10-11');
  s.setDate(0, '2026-13-01');
  assert.equal(createStore(storage).get().logs[0].at, '2026-10-11');
  s.setDate(5, '2026-10-01'); // 不存在的记录：不报错
});
