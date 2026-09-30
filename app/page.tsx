import Link from "next/link";
import Header from "./components/Header";

const dataCards = [
  { icon: "资", title: "数据资源", desc: "汇聚政务、社会与行业数据，形成全域资源目录。", count: "1,286", unit: "项资源" },
  { icon: "品", title: "数据产品", desc: "面向业务需求，提供可调用、可交易的标准数据产品。", count: "368", unit: "个产品" },
  { icon: "集", title: "高质量数据集", desc: "聚焦重点领域，沉淀可信、可用、可追溯的主题数据。", count: "86", unit: "个数据集" },
];

const scenarios = [
  { num: "01", tag: "城市治理", title: "城市运行一网统管", desc: "融合城市部件、物联感知与视频数据，让城市运行态势可感、可视、可管。" },
  { num: "02", tag: "产业发展", title: "产业经济精准分析", desc: "围绕产业链、企业和项目数据，提供运行监测与决策研判支撑。" },
  { num: "03", tag: "民生服务", title: "民生服务一站通办", desc: "打通跨部门数据链路，以数据多跑路推动群众办事少跑腿。" },
];

export default function Home() {
  return <main>
    <Header />
    <section className="hero">
      <div className="hero-grid" /><div className="orbital" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="container hero-content">
        <div className="eyebrow"><span /> DATA ELEMENT INFRASTRUCTURE</div>
        <h1>汇聚数据动能<br /><em>赋能城市新未来</em></h1>
        <p>建设安全、可信、高效的数据要素流通基础设施<br />让每一份数据价值都被看见、被激活、被释放</p>
        <div className="hero-actions"><Link href="#数据中心" className="primary-btn">探索数据资源 <span>→</span></Link><Link href="/tools" className="ghost-btn">进入工具中心</Link></div>
        <div className="hero-stats"><div><strong>1,740<sup>+</sup></strong><span>已汇聚数据资源</span></div><div><strong>52<sup>个</sup></strong><span>覆盖委办局部门</span></div><div><strong>98.6<sup>%</sup></strong><span>数据质量达标率</span></div></div>
      </div>
      <div className="hero-side-label">汶上县数据要素基础设施 <span /></div><div className="scroll-cue"><i /> 向下滚动</div>
    </section>

    <section className="section data-section" id="数据中心"><div className="container">
      <div className="section-heading"><div><span className="section-kicker">DATA CENTER</span><h2>数据中心</h2><p>一站式发现、理解与使用城市数据</p></div><a href="#" className="text-link">查看全部 <span>↗</span></a></div>
      <div className="data-grid">{dataCards.map((card, i) => <article className="data-card" key={card.title}><div className={`data-icon tone-${i}`}><span>{card.icon}</span></div><div className="card-index">0{i + 1}</div><h3>{card.title}</h3><p>{card.desc}</p><div className="card-bottom"><b>{card.count}</b><span>{card.unit}</span><i>→</i></div></article>)}</div>
    </div></section>

    <section className="section scenes-section" id="场景中心"><div className="container">
      <div className="section-heading light"><div><span className="section-kicker">APPLICATION SCENARIOS</span><h2>重点应用场景</h2><p>以真实场景牵引数据价值释放</p></div><a href="#" className="text-link">全部场景 <span>↗</span></a></div>
      <div className="scene-grid">{scenarios.map((scene) => <article className="scene-card" key={scene.num}><span className="scene-num">{scene.num}</span><span className="scene-tag">{scene.tag}</span><h3>{scene.title}</h3><p>{scene.desc}</p><a href="#">了解详情 →</a></article>)}</div>
    </div></section>

    <section className="tool-cta"><div className="container tool-cta-inner"><div><span className="section-kicker">TOOLS & PLATFORMS</span><h2>一站集成，让数据能力触手可及</h2><p>从感知、治理、开发到应用，为数据全生命周期提供专业工具支撑。</p></div><Link href="/tools" className="dark-btn">进入工具中心 <span>→</span></Link></div></section>

    <footer><div className="container footer-inner"><div className="footer-brand"><span className="brand-mark small"><i /><i /><i /></span><div><b>数据要素基础设施门户</b><small>DATA ELEMENT INFRASTRUCTURE PORTAL</small></div></div><div className="footer-meta"><span>统一服务热线：0537-XXXXXXX</span><span>© 2026 汶上县大数据中心</span></div></div></footer>
  </main>;
}
