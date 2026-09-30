import Link from "next/link";

export default function Header({ active = "首页" }: { active?: string }) {
  const nav = ["首页", "数据中心", "需求中心", "场景中心", "工具中心"];
  return <header className="site-header">
    <Link href="/" className="brand" aria-label="数据要素基础设施门户首页"><span className="brand-mark"><i /><i /><i /></span><span><b>数据要素</b><small>基础设施门户</small></span></Link>
    <nav className="main-nav" aria-label="主导航">{nav.map((item) => <Link key={item} className={active === item ? "active" : ""} href={item === "首页" ? "/" : item === "工具中心" ? "/tools" : `/#${item}`}>{item}{item === "数据中心" && <span className="chev">⌄</span>}</Link>)}</nav>
    <div className="header-actions"><button className="icon-btn" aria-label="搜索">⌕</button><button className="icon-btn" aria-label="消息">◌<span className="notice-dot" /></button><span className="divider" /><span className="avatar">汶</span><span className="user-name">管理用户</span></div>
  </header>;
}
