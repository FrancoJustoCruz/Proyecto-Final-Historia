// Funciones puras de geometría y disposición (sin DOM).
export const NODE_R = 11;
export const LABEL_X = NODE_R + 22;

const COL_OF = { causa: "causa", evento: "evento", actor: "actor", politica: "consecuencia", economica: "consecuencia", social: "consecuencia" };
const COL_ORDER = ["causa", "evento", "actor", "consecuencia"];
const GROUP_ORDER = ["politica", "economica", "social"];

export function computeLayout(nodes, edges, opts = {}) {
  const { gapY = 52, groupGap = 34, colGap = 340, marginX = 110, marginY = 50, labelW = 250 } = opts;
  const ids = new Set(nodes.map((n) => n.id));
  const nbrs = new Map(nodes.map((n) => [n.id, []]));
  edges.forEach((e) => {
    if (ids.has(e.origen) && ids.has(e.destino)) {
      nbrs.get(e.origen).push(e.destino);
      nbrs.get(e.destino).push(e.origen);
    }
  });

  const cols = COL_ORDER.filter((c) => nodes.some((n) => COL_OF[n.tipo] === c));
  const byCol = new Map(cols.map((c) => [c, nodes.filter((n) => COL_OF[n.tipo] === c)]));
  const groupsOf = (list) => GROUP_ORDER.map((g) => list.filter((n) => n.tipo === g)).filter((a) => a.length);
  const need = (c) => {
    const list = byCol.get(c);
    if (c !== "consecuencia") return list.length * gapY;
    return list.length * gapY + (groupsOf(list).length - 1) * groupGap;
  };
  const H = Math.max(...cols.map(need));
  const pos = new Map();
  const colX = (c) => marginX + cols.indexOf(c) * colGap;

  const desired = (n) => {
    const ys = nbrs.get(n.id).filter((id) => pos.has(id)).map((id) => pos.get(id).y);
    return ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : null;
  };

  function placeList(list, top, bottom, x) {
    const count = list.length;
    const items = list.map((node, i) => ({
      node, i,
      d: desired(node) ?? top + ((i + 0.5) / count) * (bottom - top),
    })).sort((a, b) => a.d - b.d || a.i - b.i);
    const topB = top + gapY / 2, botB = bottom - gapY / 2;
    const y = items.map((it) => it.d);
    for (let i = 0; i < count; i++) y[i] = Math.max(y[i], i ? y[i - 1] + gapY : topB);
    y[count - 1] = Math.min(y[count - 1], botB);
    for (let i = count - 2; i >= 0; i--) y[i] = Math.min(y[i], y[i + 1] - gapY);
    for (let i = 0; i < count; i++) y[i] = Math.max(y[i], i ? y[i - 1] + gapY : topB);
    items.forEach((it, k) => pos.set(it.node.id, { x, y: y[k] }));
  }

  const top = marginY, bottom = marginY + H;
  if (byCol.has("evento")) {
    const list = byCol.get("evento");
    list.forEach((n, i) => pos.set(n.id, { x: colX("evento"), y: top + ((i + 0.5) / list.length) * H }));
  }
  ["causa", "actor"].forEach((c) => byCol.has(c) && placeList(byCol.get(c), top, bottom, colX(c)));

  if (byCol.has("consecuencia")) {
    const groups = groupsOf(byCol.get("consecuencia"));
    const extra = Math.max(0, H - need("consecuencia"));
    const gGap = groups.length > 1 ? groupGap + extra / (groups.length - 1) : 0;
    let cursor = top;
    groups.forEach((g) => {
      const h = g.length * gapY;
      placeList(g, cursor, cursor + h, colX("consecuencia"));
      cursor += h + gGap;
    });
  }

  return { pos, width: marginX * 2 + (cols.length - 1) * colGap + labelW, height: H + marginY * 2 };
}

export function edgePath(a, b, r = NODE_R, flecha = true) {
  const dx = b.x - a.x, dy = b.y - a.y;
  if (Math.abs(dx) < 40) {
    const sy = Math.sign(dy) || 1;
    const bulge = 55 + Math.min(40, Math.abs(dy) * 0.12);
    const x1 = a.x - r * 0.6, y1 = a.y + sy * r * 0.8;
    const x2 = b.x - r * 0.6, y2 = b.y - sy * (r * 0.8 + (flecha ? 4 : 0));
    return `M ${x1} ${y1} C ${x1 - bulge} ${y1}, ${x2 - bulge} ${y2}, ${x2} ${y2}`;
  }
  const dir = Math.sign(dx);
  const x1 = a.x + dir * r, x2 = b.x - dir * (r + (flecha ? 5 : 0));
  const half = Math.abs(x2 - x1) * 0.5;
  return `M ${x1} ${a.y} C ${x1 + dir * half} ${a.y}, ${x2 - dir * half} ${b.y}, ${x2} ${b.y}`;
}

const poly = (pts) => "M" + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L") + " Z";
const regular = (n, rad, rot = -Math.PI / 2) =>
  poly(Array.from({ length: n }, (_, i) => [rad * Math.cos(rot + (2 * Math.PI * i) / n), rad * Math.sin(rot + (2 * Math.PI * i) / n)]));

export function shapePath(forma, r = NODE_R) {
  switch (forma) {
    case "triangulo": return poly([[0, -r * 1.15], [r * 1.1, r * 0.85], [-r * 1.1, r * 0.85]]);
    case "cuadrado": return poly([[-r * 0.85, -r * 0.85], [r * 0.85, -r * 0.85], [r * 0.85, r * 0.85], [-r * 0.85, r * 0.85]]);
    case "rombo": return poly([[0, -r * 1.2], [r * 1.2, 0], [0, r * 1.2], [-r * 1.2, 0]]);
    case "hexagono": return regular(6, r * 1.05, 0);
    case "pentagono": return regular(5, r * 1.1);
    default: return `M ${-r} 0 a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
  }
}

export function wrapLabel(text, max = 28) {
  const lines = [];
  let line = "";
  text.split(" ").forEach((w) => {
    if (line && (line + " " + w).length > max) { lines.push(line); line = w; }
    else line = line ? line + " " + w : w;
  });
  if (line) lines.push(line);
  return lines;
}
