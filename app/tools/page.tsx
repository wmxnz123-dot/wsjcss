"use client";

import { useMemo, useState } from "react";
import Header from "../components/Header";

const tools = [
  { icon: "感", name: "物联网感知平台", category: "感知融合", desc: "设备统一接入、感知数据实时采集与运行监测。", color: "blue", status: "运行中" },
  { icon: "视", name: "视频融合与分析平台", category: "感知融合", desc: "汇聚视频资源，提供智能解析、告警与场景联动。", color: "cyan", status: "运行中" },
  { icon: "治", name: "数据资源治理平台", category: "数据治理", desc: "覆盖数据标准、质量、血缘、目录与主数据治理。", color: "indigo", status: "运行中" },
  { icon: "标", name: "数据标注平台", category: "AI 工具", desc: "支持图像、文本、音视频等多模态数据标注。", color: "violet", status: "运行中" },
  { icon: "城", name: "CIM 城市信息模型平台", category: "城市空间", desc: "汇聚城市时空数据，构建全域三维数字底座。", color: "sky", status: "运行中" },
  { icon: "应", name: "融合应用开发平台", category: "开发分析", desc: "低代码组装、统一能力编排，快速构建数字化应用。", color: "green", status: "运行中" },
  { icon: "BI", name: "EvayBI 平台", category: "开发分析", desc: "拖拽式数据分析与可视化大屏，让决策更直观。", color: "orange", status: "运行中" },
  { icon: "AI", name: "智能体开发平台", category: "AI 工具", desc: "集成大模型与算法服务，快速搭建业务智能体。", color: "purple", status: "试运行" },
  { icon: "服", name: "数据服务平台", category: "数据服务", desc: "数据 API 的统一发布、授权、调用与运营监测。", color: "teal", status: "运行中" },
  { icon: "产", name: "数据资产管理平台", category: "数据服务", desc: "提供数据资产盘点、登记、评价与运营全流程服务。", color: "blue", status: "运行中" },
  { icon: "链", name: "区块链核验", category: "安全可信", desc: "面向关键数据的存证、核验与全流程可追溯。", color: "navy", status: "运行中" },
];

const categories = ["全部", "感知融合", "数据治理", "城市空间", "开发分析", "AI 工具", "数据服务", "安全可信"];

export default function ToolsPage() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => tools.filter((tool) => (category === "全部" || tool.category === category) && (tool.name.toLowerCase().includes(query.toLowerCase()) || tool.desc.includes(query))), [category, query]);
  const enter = (name: string) => { setNotice(`正在进入「${name}」…`); window.setTimeout(() => setNotice(""), 2200); };

  return <main className="tools-page">
    <Header active="工具中心" />
    <section className="tools-hero"><div className="tools-grid" /><div className="container tools-hero-inner"><div><span className="section-kicker">TOOLS & PLATFORMS</span><h1>工具中心</h1><p>连接数据全生命周期的专业平台，一个入口，直达所需能力。</p></div><div className="tools-summary"><strong>11</strong><span>个专业平台<br />统一身份认证</span></div></div></section>
    <section className="tools-content"><div className="container">
      <div className="tools-toolbar"><div className="category-tabs" role="tablist" aria-label="工具分类">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="tool-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索平台名称或能力" aria-label="搜索工具" /></label></div>
      <div className="tool-result-line"><span>共 <b>{filtered.length}</b> 个可用工具</span><i><b /> 系统运行正常</i></div>
      <div className="tool-cards">{filtered.map((tool) => <article className="tool-card" key={tool.name}><div className={`tool-logo ${tool.color}`}>{tool.icon}</div><div className="tool-card-main"><span className="tool-category">{tool.category}</span><h2>{tool.name}</h2><p>{tool.desc}</p></div><div className="tool-card-foot"><span className={tool.status === "试运行" ? "trial" : ""}><i />{tool.status}</span><button onClick={() => enter(tool.name)}>立即进入 <b>→</b></button></div></article>)}</div>
      {filtered.length === 0 && <div className="empty-tools"><b>未找到相关工具</b><span>请尝试其他关键词或切换分类</span></div>}
    </div></section>
    <footer><div className="container footer-inner"><div className="footer-brand"><span className="brand-mark small"><i /><i /><i /></span><div><b>数据要素基础设施门户</b><small>DATA ELEMENT INFRASTRUCTURE PORTAL</small></div></div><div className="footer-meta"><span>统一服务热线：0537-XXXXXXX</span><span>© 2026 汶上县大数据中心</span></div></div></footer>
    {notice && <div className="entry-toast" role="status"><i />{notice}</div>}
  </main>;
}
