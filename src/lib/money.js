export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export function splitEqual(amount, ids) {
  const n = ids.length || 1;
  const totalCents = Math.round(Number(amount) * 100);
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  const shares = {};

  ids.forEach((id, index) => {
    const cents = base + (index < remainder ? 1 : 0);
    shares[id] = Number((cents / 100).toFixed(2));
  });

  return shares;
}

export function percentsSumTo100(percents) {
  const values = Object.values(percents).map(Number);
  return Math.abs(values.reduce((a, b) => a + b, 0) - 100) < 0.0001;
}

export function splitByPercent(amount, percents) {
  const entries = Object.entries(percents).map(([id, pct]) => ({
    id,
    pct: Number(pct),
  }));

  const totalPct = entries.reduce((sum, entry) => sum + entry.pct, 0);
  if (!entries.length || totalPct === 0) return {};

  const totalCents = Math.round(Number(amount) * 100);
  const shareCents = {};
  const remainders = [];
  let leftOver = totalCents;

  entries.forEach(({ id, pct }) => {
    const exactCents = (totalCents * pct) / totalPct;
    const wholeCents = Math.floor(exactCents);
    shareCents[id] = wholeCents;
    leftOver -= wholeCents;
    remainders.push({ id, remainder: exactCents - wholeCents });
  });

  remainders
    .sort((a, b) => b.remainder - a.remainder)
    .slice(0, leftOver)
    .forEach(({ id }) => {
      shareCents[id] += 1;
    });

  return Object.fromEntries(
    Object.entries(shareCents).map(([id, cents]) => [id, Number((cents / 100).toFixed(2))])
  );
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents);
  }
  return splitEqual(expense.amount, expense.splitWith);
}
