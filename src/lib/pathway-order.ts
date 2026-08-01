// Canonical pathway ordering, matching the order pathways are listed
// throughout the app (the Pathways index page), used anywhere content
// needs to be grouped by pathway rather than left in whatever order it was
// fetched/registered.
export const pathwayOrder = [
  "daoist",
  "buddhist",
  "yogic",
  "tantric",
  "magick",
  "bhakti",
  "general",
];

export function groupByPathway<T extends { pathway: string }>(items: T[]): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const existing = groups.get(item.pathway);
    if (existing) existing.push(item);
    else groups.set(item.pathway, [item]);
  }
  const known = pathwayOrder.filter((p) => groups.has(p));
  const rest = [...groups.keys()].filter((p) => !pathwayOrder.includes(p));
  return [...known, ...rest].map((p) => [p, groups.get(p)!]);
}
