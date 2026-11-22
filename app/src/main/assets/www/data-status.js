const $ = (selector) => document.querySelector(selector);
const formatCount = (value) => Number(value || 0).toLocaleString("ko-KR");
const statusLabels = { ready: "정상", partial: "일부 정상", awaiting_credentials: "인증 준비 중", error: "오류", demo: "데모" };

function formatTimestamp(value) {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) return value;
  return new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", dateStyle: "medium", timeStyle: "medium" }).format(parsed);
}

async function loadStatus() {
  const notice = $("#notice");
  $("#reload").disabled = true;
  try {
    const response = await fetch(`data/notices.json?t=${Date.now()}`, { cache: "no-store", headers: { "Cache-Control": "no-cache" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const envelope = await response.json();
    const items = Array.isArray(envelope.notices) ? envelope.notices : [];
    const sources = Array.isArray(envelope.sources) ? envelope.sources : [];
    const counts = items.reduce((result, item) => {
      result[item.source] = (result[item.source] || 0) + 1;
      return result;
    }, {});
    $("#total").textContent = formatCount(items.length);
    $("#applyhome").textContent = formatCount(counts.applyhome);
    $("#lh").textContent = formatCount(counts.lh);
    $("#sh").textContent = formatCount(counts.sh);
    $("#generated").textContent = formatTimestamp(envelope.generatedAt);
    $("#overall-status").textContent = statusLabels[envelope.status] || envelope.status || "—";
    const published = items.map((item) => item.publishedAt).filter(Boolean).sort();
    $("#latest-notice").textContent = published.at(-1) || "—";
    const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
    const next = items.filter((item) => item.applyStart >= today).sort((a, b) => a.applyStart.localeCompare(b.applyStart))[0];
    $("#next-apply").textContent = next ? `${next.applyStart} · ${next.title}` : "예정 일정 없음";
    $("#sources").innerHTML = sources.map((source) => `<tr><td><b>${source.name}</b></td><td><span class="badge ${source.status === "error" ? "error" : ""}">${statusLabels[source.status] || source.status}</span></td><td>${formatCount(counts[source.id])}건</td><td>${source.message || "상태 확인 중"}</td><td><a href="${source.officialUrl}" target="_blank" rel="noopener">공식 출처 ↗</a></td></tr>`).join("");
    notice.className = `notice ${envelope.status === "ready" ? "ok" : envelope.status === "error" ? "error" : ""}`;
    notice.textContent = envelope.status === "ready"
      ? `공식 공고 ${formatCount(items.length)}건을 정상 제공하고 있습니다. 세 원천이 모두 정상입니다.`
      : `공식 공고 ${formatCount(items.length)}건을 제공 중입니다. 원천별 상태를 확인해 주세요.`;
  } catch (error) {
    notice.className = "notice error";
    notice.textContent = `데이터 현황을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요. (${error.message})`;
  } finally {
    $("#reload").disabled = false;
  }
}

$("#reload").addEventListener("click", loadStatus);
loadStatus();
