window.addEventListener('error',function(e){try{const t=document.getElementById('managerToast');if(t){t.textContent='脚本错误：'+(e.message||'未知');t.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(function(){t.hidden=true;},5000);}}catch(_){}});
const sidebar=document.getElementById('managerSidebar');
const socialView=document.getElementById('socialDataView');
const dashboardView=document.getElementById('dashboardView');
const publicView=document.getElementById('publicDataView');
const publicCreateView=document.getElementById('publicDataCreateView');
const demandReviewView=document.getElementById('demandReviewView');
const qualityReviewView=document.getElementById('qualityReviewView');
const toolReviewView=document.getElementById('toolReviewView');
const toolConfigView=document.getElementById('toolConfigView');
const placeholder=document.getElementById('managerPlaceholder');
const placeholderTitle=document.getElementById('placeholderManagerTitle');
const placeholderDescription=document.getElementById('placeholderManagerDescription');
const managerPlaceholderHint=document.getElementById('managerPlaceholderHint');
const demandListView=document.getElementById('demandListView');
const breadcrumb=document.getElementById('managerBreadcrumb');
const breadcrumbWrap=document.getElementById('managerBreadcrumbWrap');
const userButton=document.getElementById('managerUser');
const userMenu=document.getElementById('managerUserMenu');
const socialBody=document.getElementById('socialDataBody');
const publicBody=document.getElementById('publicDataBody');
let socialPage=1;
let publicPage=1;
let reviewMode='pending';

function setGroupState(group,open){group.classList.toggle('open',open);group.querySelector('.manager-group-title').setAttribute('aria-expanded',String(open));}
document.querySelectorAll('.manager-group-title').forEach(button=>button.addEventListener('click',()=>{const group=button.closest('.manager-menu-group'),willOpen=!group.classList.contains('open');document.querySelectorAll('.manager-menu-group').forEach(item=>setGroupState(item,item===group&&willOpen));}));

function openManagerPage(button){document.querySelectorAll('[data-page]').forEach(item=>item.classList.remove('active'));button.classList.add('active');const name=button.dataset.page;breadcrumb.textContent=name;dashboardView.hidden=true;socialView.hidden=true;publicView.hidden=true;publicCreateView.hidden=true;demandReviewView.hidden=true;qualityReviewView.hidden=true;toolReviewView.hidden=true;toolConfigView.hidden=true;placeholder.hidden=true;placeholderTitle.hidden=false;placeholderDescription.hidden=false;placeholder.querySelector('span').hidden=false;managerPlaceholderHint.hidden=true;demandListView.hidden=true;if(name==='仪表盘'){dashboardView.hidden=false;}else if(name==='社会数据目录'){managerPlaceholderHint.hidden=false;managerPlaceholderHint.textContent='同可信空间数据资源目录页面';}else if(name==='公共数据目录'){publicView.hidden=false;renderPublicData();}else if(name==='需求审核'){demandReviewView.hidden=false;renderReviewRecords();}else if(name==='高质量数据集审核'){qualityReviewView.hidden=false;renderQualityRecords();}else if(name==='工具使用审核'){toolReviewView.hidden=false;renderToolRecords();}else if(name==='工具配置'){toolConfigView.hidden=false;}else if(name==='需求清单'){demandListView.hidden=false;renderDemandList();}else if(name==='内容管理'){managerPlaceholderHint.hidden=false;managerPlaceholderHint.textContent='同授权运营内容管理页面';}else if(name==='开放数据目录'){managerPlaceholderHint.hidden=false;managerPlaceholderHint.textContent='同公共数据目录页面一样';}else{placeholder.hidden=false;placeholderTitle.textContent=name;placeholderDescription.textContent=button.dataset.description||'该管理功能已预留，后续逐步完善。';}const group=button.closest('.manager-menu-group');if(group)document.querySelectorAll('.manager-menu-group').forEach(item=>setGroupState(item,item===group));sidebar.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>openManagerPage(button)));
document.querySelectorAll('[data-goto]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const target=document.querySelector('[data-page="'+link.dataset.goto+'"]');if(target)openManagerPage(target);}));
const ddCrumbPages=['仪表盘','需求审核','高质量数据集审核','工具使用审核'];
document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>{breadcrumbWrap.hidden=ddCrumbPages.includes(button.dataset.page);}));

const demandListBody=document.getElementById('demandListBody');
const demandListName=document.getElementById('demandListName');
const demandListForm=document.getElementById('demandListForm');
let demandStatusSelected=[],demandSort=null;
function renderDemandList(){const all=[...demandListBody.rows],kw=demandListName.value.trim().toLowerCase(),form=demandListForm.value;let list=all.filter(r=>{const inKw=!kw||(r.dataset.name+' '+r.textContent).toLowerCase().includes(kw);const inForm=form==='all'||r.dataset.form===form;const st=r.cells[8].textContent.trim();const inStatus=demandStatusSelected.length===0||demandStatusSelected.includes(st);return inKw&&inForm&&inStatus;});if(demandSort){const dir=demandSort.dir,ci=demandSort.col;list=list.slice().sort((a,b)=>dir*(a.cells[ci].textContent.localeCompare(b.cells[ci].textContent)));}all.forEach(r=>r.remove());const frag=document.createDocumentFragment();list.forEach((r,i)=>{r.cells[0].textContent=i+1;frag.appendChild(r);});demandListBody.appendChild(frag);document.getElementById('demandListCount').textContent=list.length;document.getElementById('demandListEmpty').hidden=list.length!==0;}
const ddStTrigger=document.getElementById('demandStatusTrigger'),ddStDrop=document.getElementById('demandStatusDrop');
ddStTrigger.addEventListener('click',function(e){e.stopPropagation();const open=ddStDrop.hidden;ddStDrop.hidden=!open;ddStTrigger.classList.toggle('on',!open);});
ddStDrop.addEventListener('click',function(e){e.stopPropagation();});
function syncDdChecks(){ddStDrop.querySelectorAll('input').forEach(function(c){c.checked=demandStatusSelected.includes(c.value);});}
document.getElementById('demandStatusOk').addEventListener('click',function(){demandStatusSelected=[...ddStDrop.querySelectorAll('input:checked')].map(function(c){return c.value;});ddStDrop.hidden=true;ddStTrigger.classList.remove('on');renderDemandList();});
document.getElementById('demandStatusReset').addEventListener('click',function(){demandStatusSelected=[];syncDdChecks();renderDemandList();});
demandListBody.addEventListener('click',function(e){const s=e.target.closest('.dsort');if(s){const col=s.dataset.sort==='end'?7:9;if(demandSort&&demandSort.col===col){demandSort.dir*=(-1);}else{demandSort={col:col,dir:1};}const arrows=document.querySelectorAll('.demand-table .dsort');arrows.forEach(a=>a.textContent='↕');s.textContent=demandSort.dir===1?'↑':'↓';renderDemandList();}else if(e.target.closest('.demand-view-link')){openDemandDrawer(e.target.closest('.demand-view-link'));}});
const demandDrawer=document.createElement('div');demandDrawer.className='manage-drawer-mask';demandDrawer.id='demandDrawer';demandDrawer.hidden=true;
demandDrawer.innerHTML='<aside class="manage-drawer"><div class="md-head"><h2>需求详情</h2><button class="md-close" type="button" data-close="1">×</button></div><div class="md-summary"><span class="md-summary-icon">需</span><div class="md-summary-main"><h3 id="dd_name"></h3><div class="md-summary-meta"><span id="dd_holder"></span><i></i><span id="dd_time"></span><i></i><span class="md-status approved" id="dd_status"></span></div></div></div><div class="md-tabs"><button class="active" data-tab="info" type="button">需求信息</button><button data-tab="match" type="button">匹配信息</button></div><div class="md-body"><div data-pane="info"><dl class="pd-grid"><div><dt>需求编号</dt><dd id="dd_i_no"></dd></div><div><dt>需求名称</dt><dd id="dd_i_name"></dd></div><div><dt>结束时间</dt><dd id="dd_i_end"></dd></div><div><dt>产品形态</dt><dd id="dd_i_form"></dd></div><div><dt>紧急程度</dt><dd id="dd_i_urg"></dd></div><div><dt>适用场景</dt><dd id="dd_i_scene"></dd></div><div><dt>数据需求方</dt><dd id="dd_i_holder"></dd></div><div><dt>联系人</dt><dd>数据需求方</dd></div><div><dt>联系方式</dt><dd>--</dd></div><div><dt>附件</dt><dd>--</dd></div></dl><h3 class="md-section-title">需求描述</h3><p style="margin:0;font-size:13px;color:#455b73;line-height:1.8;padding:0 2px" id="dd_i_desc"></p><h3 class="md-section-title">备注</h3><p style="margin:0;font-size:13px;color:#455b73;padding:0 2px">--</p></div><div data-pane="match" hidden><h3 class="md-section-title">应答信息</h3><dl class="pd-grid"><div><dt>数据运营商</dt><dd>**信息技术有限公司</dd></div><div><dt>联系人</dt><dd>数据开发方</dd></div><div><dt>联系方式</dt><dd>--</dd></div><div><dt>应答时间</dt><dd>--</dd></div></dl><h3 class="md-section-title">交付信息</h3><dl class="pd-grid"><div><dt>产品名称</dt><dd style="color:#1d6fe8;cursor:pointer" id="dd_m_prod">--</dd></div><div><dt>产品形态</dt><dd id="dd_m_form"></dd></div><div><dt>交付时间</dt><dd>--</dd></div></dl></div></div></aside>';
document.body.appendChild(demandDrawer);
function ddStatusCls(s){return s==='已匹配'||s==='已完成'?'approved':'rejected';}
function openDemandDrawer(btn){const row=btn.closest('tr');document.getElementById('dd_name').textContent=row.cells[2].textContent;document.getElementById('dd_holder').textContent='数据需求方：'+row.cells[3].textContent;document.getElementById('dd_time').textContent='创建时间：'+row.cells[9].textContent;const st=document.getElementById('dd_status');st.className='md-status '+ddStatusCls(row.cells[8].textContent.trim());st.textContent=row.cells[8].textContent.trim();document.getElementById('dd_i_no').textContent=row.cells[1].textContent;document.getElementById('dd_i_name').textContent=row.cells[2].textContent;document.getElementById('dd_i_end').textContent=row.cells[7].textContent;document.getElementById('dd_i_form').textContent=row.cells[4].textContent;document.getElementById('dd_i_urg').textContent=row.cells[5].textContent;document.getElementById('dd_i_scene').textContent=row.cells[6].textContent;document.getElementById('dd_i_holder').textContent=row.cells[3].textContent;document.getElementById('dd_i_desc').textContent='需求描述：'+row.cells[2].textContent+'数据需求说明。';document.getElementById('dd_m_prod').textContent=row.cells[2].textContent+'核验接口';document.getElementById('dd_m_form').textContent=row.cells[4].textContent;dDActiveTab('info');demandDrawer.hidden=false;}
function dDActiveTab(k){demandDrawer.querySelectorAll('.md-tabs [data-tab]').forEach(function(b){b.classList.toggle('active',b.dataset.tab===k);});demandDrawer.querySelectorAll('[data-pane]').forEach(function(p){p.hidden=p.dataset.pane!==k;});}
demandDrawer.querySelector('.md-tabs').addEventListener('click',function(e){const c=e.target.closest('[data-tab]');if(c)dDActiveTab(c.dataset.tab);});
demandDrawer.addEventListener('click',function(e){if(e.target.closest('[data-close]')||e.target===demandDrawer){demandDrawer.hidden=true;}});
document.addEventListener('click',function(){ddStDrop.hidden=true;ddStTrigger.classList.remove('on');});

function matchingSocialRows(){const name=document.getElementById('socialResourceName').value.trim().toLowerCase(),holder=document.getElementById('socialResourceHolder').value.trim().toLowerCase(),level=document.getElementById('socialResourceLevel').value;return [...socialBody.querySelectorAll('[data-record]')].filter(row=>(!name||row.dataset.name.toLowerCase().includes(name))&&(!holder||row.dataset.holder.toLowerCase().includes(holder))&&(level==='all'||row.dataset.level===level));}
function renderSocialData(){const all=[...socialBody.querySelectorAll('[data-record]')],matched=matchingSocialRows(),pageSize=Number(document.getElementById('socialPageSize').value),pages=Math.max(1,Math.ceil(matched.length/pageSize));socialPage=Math.min(socialPage,pages);all.forEach(row=>row.hidden=true);matched.slice((socialPage-1)*pageSize,socialPage*pageSize).forEach((row,index)=>{row.hidden=false;row.cells[0].textContent=(socialPage-1)*pageSize+index+1;});document.getElementById('socialDataEmpty').hidden=matched.length!==0;document.getElementById('socialDataCount').textContent=matched.length;document.getElementById('socialTopCount').textContent=matched.length;document.getElementById('socialPageLabel').textContent=`${socialPage} / ${pages}`;document.getElementById('socialPrevPage').disabled=socialPage<=1;document.getElementById('socialNextPage').disabled=socialPage>=pages;}
function resetSocialFilters(){document.getElementById('socialResourceName').value='';document.getElementById('socialResourceHolder').value='';document.getElementById('socialResourceLevel').value='all';socialPage=1;renderSocialData();}
document.getElementById('querySocialData').addEventListener('click',()=>{socialPage=1;renderSocialData();});
document.getElementById('resetSocialData').addEventListener('click',resetSocialFilters);
document.getElementById('refreshSocialData').addEventListener('click',resetSocialFilters);
document.getElementById('socialResourceName').addEventListener('input',()=>{socialPage=1;renderSocialData();});
document.getElementById('socialResourceHolder').addEventListener('input',()=>{socialPage=1;renderSocialData();});
document.getElementById('socialResourceLevel').addEventListener('change',()=>{socialPage=1;renderSocialData();});
document.getElementById('socialPageSize').addEventListener('change',()=>{socialPage=1;renderSocialData();});
document.getElementById('socialPrevPage').addEventListener('click',()=>{if(socialPage>1){socialPage-=1;renderSocialData();}});
document.getElementById('socialNextPage').addEventListener('click',()=>{socialPage+=1;renderSocialData();});

function matchingPublicRows(){const name=document.getElementById('publicResourceName').value.trim().toLowerCase(),type=document.getElementById('publicResourceType').value,holder=document.getElementById('publicHolder').value.trim().toLowerCase(),cycle=document.getElementById('publicCycle').value;return [...publicBody.querySelectorAll('[data-record]')].filter(row=>(!name||row.dataset.name.toLowerCase().includes(name))&&(type==='all'||row.dataset.type===type)&&(!holder||row.dataset.holder.toLowerCase().includes(holder))&&(cycle==='all'||row.dataset.cycle===cycle)&&(publicStatusSelected.length===0||publicStatusSelected.includes(row.dataset.status)));}
let publicStatusSelected=[];
const pubStTrigger=document.getElementById('publicStatusTrigger'),pubStDrop=document.getElementById('publicStatusDrop');
function pubStatusCls(s){return s==='草稿'?'draft':s==='已发布'?'published':'offline';}
function pubStatusLabel(s){return s==='草稿'?'pending':s==='已发布'?'approved':'rejected';}
publicBody.querySelectorAll('[data-record]').forEach(function(row){const s=row.dataset.status,td=document.createElement('td');td.innerHTML='<span class="pub-status '+pubStatusCls(s)+'"><i></i>'+s+'</span>';row.insertBefore(td,row.cells[5]);
  const ops={published:['查看','编辑','下线'],draft:['查看','编辑','删除'],offline:['查看']}[s]||['查看'];
  const opClasses={查看:'view',编辑:'edit',下线:'line',删除:'del'};
  row.cells[7].className='pub-ops';
  row.cells[7].innerHTML=ops.map(function(t){return '<button class="detail-button op-'+opClasses[t]+'" type="button">'+t+'</button>';}).join('<i class="op-sep"></i>');
});
pubStTrigger.addEventListener('click',function(e){e.stopPropagation();const open=pubStDrop.hidden;pubStDrop.hidden=!open;pubStTrigger.classList.toggle('on',!open);});
document.addEventListener('click',function(){pubStDrop.hidden=true;pubStTrigger.classList.remove('on');});
pubStDrop.addEventListener('click',function(e){e.stopPropagation();});
function syncPubChecks(){pubStDrop.querySelectorAll('input').forEach(function(c){c.checked=publicStatusSelected.includes(c.value);});}
document.getElementById('publicStatusOk').addEventListener('click',function(){publicStatusSelected=[...pubStDrop.querySelectorAll('input:checked')].map(function(c){return c.value;});pubStDrop.hidden=true;pubStTrigger.classList.remove('on');publicPage=1;renderPublicData();});
document.getElementById('publicStatusReset').addEventListener('click',function(){publicStatusSelected=[];syncPubChecks();publicPage=1;renderPublicData();});
document.getElementById('refreshPublicData').addEventListener('click',function(){publicStatusSelected=[];syncPubChecks();resetPublicFilters();});
const pubDrawer=document.createElement('div');pubDrawer.className='manage-drawer-mask';pubDrawer.id='publicDrawer';pubDrawer.hidden=true;
pubDrawer.innerHTML='<aside class="manage-drawer"><div class="md-head"><h2>目录详情</h2><button class="md-close" type="button" data-close="1">×</button></div><div class="md-summary"><span class="md-summary-icon">目</span><div class="md-summary-main"><h3 id="pdName"></h3><div class="md-summary-meta"><span id="pdHolder"></span><i></i><span id="pdTime"></span><i></i><span class="md-status" id="pdStatus"></span></div></div></div><div class="md-body"><div data-pane="basic"><h3 class="md-section-title">基本信息</h3><dl class="pd-grid"><div><dt>目录名称</dt><dd id="pd_b_name"></dd></div><div><dt>目录分类</dt><dd id="pd_b_cat"></dd></div><div><dt>数据更新周期</dt><dd id="pd_b_cycle"></dd></div><div><dt>目录摘要</dt><dd id="pd_b_sum"></dd></div><div class="span2"><dt>数据持有方</dt><dd id="pd_b_holder"></dd></div></dl><h3 class="md-section-title">信息项信息</h3><table class="pd-table"><thead><tr><th>序号</th><th>信息项名称</th><th>信息项类型</th><th>数据长度</th><th>敏感级别</th></tr></thead><tbody id="pd_b_items"></tbody></table></div></div></aside>';
document.body.appendChild(pubDrawer);
function pubActiveTab(k){pubDrawer.querySelectorAll('.md-tabs [data-tab]').forEach(function(b){b.classList.toggle('active',b.dataset.tab===k);});pubDrawer.querySelectorAll('[data-pane]').forEach(function(p){p.hidden=p.dataset.pane!==k;});}
function openPublicDrawer(btn){const row=btn.closest('tr'),s=row.dataset.status,name=row.dataset.name,type=row.dataset.type,cycle=row.dataset.cycle,holder=row.dataset.holder,time=row.cells[6].textContent;document.getElementById('pdName').textContent=name;document.getElementById('pdHolder').textContent='数据持有方：'+holder;document.getElementById('pdTime').textContent='更新时间：'+time;const st=document.getElementById('pdStatus');st.className='md-status '+pubStatusLabel(s);st.textContent=s;document.getElementById('pd_b_name').textContent=name;document.getElementById('pd_b_cat').textContent='公共数据';document.getElementById('pd_b_cycle').textContent=cycle;document.getElementById('pd_b_sum').textContent=name+'数据目录摘要，用于统一编目与对外提供服务。';document.getElementById('pd_b_holder').textContent=holder;document.getElementById('pd_b_items').innerHTML='<tr><td>1</td><td>信息项一</td><td>文本型</td><td>64</td><td>2级：低敏感</td></tr>';pubActiveTab('basic');pubDrawer.hidden=false;}
publicBody.addEventListener('click',function(e){const btn=e.target.closest('.detail-button');if(btn&&btn.textContent.trim()==='查看'){openPublicDrawer(btn);}});
pubDrawer.addEventListener('click',function(e){if(e.target.closest('[data-close]')||e.target===pubDrawer){pubDrawer.hidden=true;}});
function renderPublicData(){const all=[...publicBody.querySelectorAll('[data-record]')],matched=matchingPublicRows(),pageSize=Number(document.getElementById('publicPageSize').value),pages=Math.max(1,Math.ceil(matched.length/pageSize));publicPage=Math.min(publicPage,pages);all.forEach(row=>row.hidden=true);matched.slice((publicPage-1)*pageSize,publicPage*pageSize).forEach((row,index)=>{row.hidden=false;row.cells[0].textContent=(publicPage-1)*pageSize+index+1;});document.getElementById('publicDataEmpty').hidden=matched.length!==0;document.getElementById('publicDataCount').textContent=matched.length;document.getElementById('publicPageLabel').textContent=`${publicPage} / ${pages}`;document.getElementById('publicPrevPage').disabled=publicPage<=1;document.getElementById('publicNextPage').disabled=publicPage>=pages;}
function resetPublicFilters(){document.getElementById('publicResourceName').value='';document.getElementById('publicResourceType').value='all';document.getElementById('publicHolder').value='';document.getElementById('publicCycle').value='all';publicPage=1;renderPublicData();}
document.getElementById('queryPublicData').addEventListener('click',()=>{publicPage=1;renderPublicData();});
document.getElementById('resetPublicData').addEventListener('click',resetPublicFilters);
document.getElementById('refreshPublicData').addEventListener('click',resetPublicFilters);
document.getElementById('publicResourceName').addEventListener('input',()=>{publicPage=1;renderPublicData();});
document.getElementById('publicResourceType').addEventListener('change',()=>{publicPage=1;renderPublicData();});
document.getElementById('publicHolder').addEventListener('input',()=>{publicPage=1;renderPublicData();});
document.getElementById('publicCycle').addEventListener('change',()=>{publicPage=1;renderPublicData();});
document.getElementById('publicPageSize').addEventListener('change',()=>{publicPage=1;renderPublicData();});
document.getElementById('publicPrevPage').addEventListener('click',()=>{if(publicPage>1){publicPage-=1;renderPublicData();}});
document.getElementById('publicNextPage').addEventListener('click',()=>{publicPage+=1;renderPublicData();});
const publicExpand=document.getElementById('publicExpandFilter');
publicExpand.addEventListener('click',()=>{const extra=document.getElementById('publicExtraFilters');const opening=extra.hidden;extra.hidden=!opening;publicExpand.textContent=opening?'收起 ▴':'展开 ▾';});

function showPublicCreate(){publicView.hidden=true;publicCreateView.hidden=false;breadcrumbWrap.hidden=true;window.scrollTo({top:0,behavior:'smooth'});}
function showPublicList(){publicCreateView.hidden=true;publicView.hidden=false;breadcrumbWrap.hidden=false;breadcrumb.textContent='公共数据目录';window.scrollTo({top:0,behavior:'smooth'});}
document.getElementById('openPublicCreate').addEventListener('click',showPublicCreate);
document.getElementById('backPublicList').addEventListener('click',showPublicList);
document.getElementById('cancelPublicCreate').addEventListener('click',showPublicList);
const publicDataCreateForm=document.getElementById('publicDataCreateForm');
if(publicDataCreateForm)publicDataCreateForm.addEventListener('submit',event=>{
  event.preventDefault();
  if(!event.currentTarget.reportValidity())return;
  const toast=document.getElementById('managerToast');toast.textContent='公共数据目录已提交，等待审核';toast.hidden=false;setTimeout(()=>{toast.hidden=true;showPublicList();},1800);
});

const publicAnchorNav=document.querySelector('.form-anchor-nav');
if(publicAnchorNav){
  const publicAnchorLinks=[...publicAnchorNav.querySelectorAll('a')];
  const publicAnchorSections=publicAnchorLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const setPublicAnchor=id=>publicAnchorLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+id));
  publicAnchorLinks.forEach(link=>link.addEventListener('click',event=>{
    const section=document.querySelector(link.getAttribute('href'));
    if(!section)return;
    event.preventDefault();
    setPublicAnchor(section.id);
    section.scrollIntoView({behavior:'smooth',block:'start'});
  }));
  const publicAnchorObserver=new IntersectionObserver(entries=>{
    const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible)setPublicAnchor(visible.target.id);
  },{root:null,rootMargin:'-90px 0px -55% 0px',threshold:[0,.2,.5]});
  publicAnchorSections.forEach(section=>publicAnchorObserver.observe(section));
}

function activeReviewBody(){return document.getElementById(reviewMode==='pending'?'pendingReviewBody':'reviewedReviewBody');}
function renderReviewRecords(){const body=activeReviewBody(),name=document.getElementById('reviewDemandName').value.trim().toLowerCase(),delivery=document.getElementById('reviewDeliveryType').value,urgency=document.getElementById('reviewUrgency').value,scene=document.getElementById('reviewScene').value;let visible=0;body.querySelectorAll('[data-review-record]').forEach(row=>{const show=(!name||row.dataset.name.toLowerCase().includes(name))&&(delivery==='all'||row.dataset.delivery===delivery)&&(urgency==='all'||row.dataset.urgency===urgency)&&(scene==='all'||row.dataset.scene===scene);row.hidden=!show;if(show)visible+=1;});document.getElementById('reviewEmpty').hidden=visible!==0;document.getElementById('reviewCount').textContent=visible;}
function setReviewMode(mode){reviewMode=mode;const pending=mode==='pending';document.getElementById('pendingReviewBody').hidden=!pending;document.getElementById('reviewedReviewBody').hidden=pending;document.getElementById('pendingReviewTab').classList.toggle('active',pending);document.getElementById('reviewedReviewTab').classList.toggle('active',!pending);document.getElementById('pendingReviewTab').setAttribute('aria-selected',String(pending));document.getElementById('reviewedReviewTab').setAttribute('aria-selected',String(!pending));document.getElementById('reviewListTitle').textContent=pending?'需求发布待审核列表':'需求发布已审核列表';renderReviewRecords();}
function resetReviewFilters(){document.getElementById('reviewDemandName').value='';document.getElementById('reviewDeliveryType').value='all';document.getElementById('reviewUrgency').value='all';document.getElementById('reviewScene').value='all';renderReviewRecords();}
document.getElementById('pendingReviewTab').addEventListener('click',()=>setReviewMode('pending'));
document.getElementById('reviewedReviewTab').addEventListener('click',()=>setReviewMode('reviewed'));
document.getElementById('queryReviewFilters').addEventListener('click',renderReviewRecords);
document.getElementById('resetReviewFilters').addEventListener('click',resetReviewFilters);
document.getElementById('refreshReviewList').addEventListener('click',resetReviewFilters);
document.getElementById('reviewDemandName').addEventListener('input',renderReviewRecords);
document.getElementById('reviewDeliveryType').addEventListener('change',renderReviewRecords);
document.getElementById('reviewUrgency').addEventListener('change',renderReviewRecords);
document.getElementById('reviewScene').addEventListener('change',renderReviewRecords);

function setMdTab(tab){const approval=tab==='approval';document.getElementById('mdPaneInfo').hidden=approval;document.getElementById('mdPaneApproval').hidden=!approval;document.querySelectorAll('[data-md-tab]').forEach(b=>{const active=b.dataset.mdTab===tab;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});}
function closeReviewDrawer(){document.getElementById('reviewDrawerMask').hidden=true;}
function fillMdTimeline(baseTime){const stamp=(sec)=>{const d=new Date((baseTime?new Date(baseTime):new Date()).getTime()+sec*1000);const p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;};const t0=baseTime||stamp(0);const nodes=[{kind:'start',title:'开始'},{kind:'mid',title:'需求方发布需求',t:t0,who:'数据需求方',dept:'**人才科技有限公司',result:'通过',comment:'提交自动审核通过'},{kind:'mid',title:'平台运营方审核',t:stamp(17),who:'数据开发方',dept:'**信息技术有限公司',result:'通过',comment:'通过'},{kind:'end',title:'结束'}];document.getElementById('mdTimeline').innerHTML=nodes.map(n=>{if(n.kind==='mid')return `<li class="${n.kind}"><span class="mt-dot"></span><div class="mt-content"><div class="mt-title">${n.title}</div><div class="mt-meta">处理时间：<b>${n.t}</b><span>处理人：${n.who}</span><span>处理部门：${n.dept}</span></div><div><span class="mt-result">处理结果：${n.result}</span></div><div class="mt-comment">处理意见：${n.comment}</div></div></li>`;return `<li class="${n.kind}"><span class="mt-dot"></span><div class="mt-content"><div class="mt-title">${n.title}</div></div></li>`;}).join('');}
function openReviewDrawer(tr){const reviewed=!!tr.closest('#reviewedReviewBody');const cells=[...tr.children].map(c=>c.textContent.trim());document.getElementById('mdName').textContent=cells[2];document.getElementById('mdRequester').textContent=cells[7];document.getElementById('mdCreated').textContent=cells[8];document.getElementById('mdCode').textContent=cells[1];document.getElementById('mdName2').textContent=cells[2];document.getElementById('mdDeadline').textContent=cells[6];document.getElementById('mdDelivery').textContent=cells[3];document.getElementById('mdUrgency').textContent=cells[4];document.getElementById('mdScene').textContent=cells[5];document.getElementById('mdRequester2').textContent=cells[7];document.getElementById('mdDesc').textContent=tr.dataset.name||'—';const status=document.getElementById('mdStatus');status.textContent=reviewed?'已通过':'待审核';status.className='md-status '+(reviewed?'approved':'pending');document.getElementById('mdDrawerActions').hidden=reviewed;fillMdTimeline(cells[8]);setMdTab('info');document.getElementById('reviewDrawerMask').hidden=false;}
document.querySelectorAll('.detail-button').forEach(button=>{if(button.classList.contains('tool-review-action')||button.classList.contains('tool-view-action'))return;if(button.closest('#publicDataView'))return;button.addEventListener('click',()=>{const row=button.closest('tr[data-review-record]');if(row){openReviewDrawer(row);return;}const toast=document.getElementById('managerToast');toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2600);});});
document.getElementById('closeReviewDrawer').addEventListener('click',closeReviewDrawer);
document.getElementById('reviewDrawerMask').addEventListener('click',event=>{if(event.target===event.currentTarget)closeReviewDrawer();});
document.querySelectorAll('[data-md-tab]').forEach(b=>b.addEventListener('click',()=>setMdTab(b.dataset.mdTab)));
const approvalOpinionMask=document.getElementById('approvalOpinionMask');
function closeApprovalOpinion(){approvalOpinionMask.hidden=true;}
document.getElementById('mdApproveButton').addEventListener('click',()=>{document.getElementById('approvalOpinion').value='通过';approvalOpinionMask.hidden=false;});
document.getElementById('closeApprovalOpinion').addEventListener('click',closeApprovalOpinion);
document.getElementById('cancelApprovalOpinion').addEventListener('click',closeApprovalOpinion);
document.getElementById('confirmApprovalOpinion').addEventListener('click',()=>{if(!document.getElementById('approvalOpinion').value.trim())return;closeApprovalOpinion();closeReviewDrawer();const toast=document.getElementById('managerToast');toast.textContent='审核已通过';toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2600);});
approvalOpinionMask.addEventListener('click',event=>{if(event.target===event.currentTarget)closeApprovalOpinion();});
document.getElementById('managerMenuButton').addEventListener('click',event=>{event.stopPropagation();sidebar.classList.toggle('open');});
sidebar.addEventListener('click',event=>event.stopPropagation());
userButton.addEventListener('click',event=>{event.stopPropagation();userMenu.hidden=!userMenu.hidden;});
userMenu.addEventListener('click',event=>event.stopPropagation());
document.addEventListener('click',()=>{userMenu.hidden=true;sidebar.classList.remove('open');});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){userMenu.hidden=true;sidebar.classList.remove('open');document.getElementById('reviewDrawerMask').hidden=true;}});
renderSocialData();
renderPublicData();
let qualityReviewMode='pending';
function renderQualityRecords(){const body=document.getElementById(qualityReviewMode==='pending'?'qualityPendingBody':'qualityReviewedBody');const keyword=document.getElementById('qualityDatasetName').value.trim().toLowerCase();const domain=document.getElementById('qualityDomain').value;const org=document.getElementById('qualityOrg').value.trim().toLowerCase();let count=0;body.querySelectorAll('[data-quality-record]').forEach(row=>{const show=(!keyword||row.children[1].textContent.toLowerCase().includes(keyword))&&(domain==='all'||row.dataset.domain===domain)&&(!org||row.children[3].textContent.toLowerCase().includes(org));row.hidden=!show;if(show)count++;});document.getElementById('qualityReviewCount').textContent=count;document.getElementById('qualityReviewEmpty').hidden=count!==0;}
let qualitySort=null;
function renderQualitySortMarks(){document.querySelectorAll('.quality-review-table .qsort').forEach(s=>{s.textContent=qualitySort&&qualitySort.dir===1?'↑':(qualitySort&&qualitySort.dir===-1?'↓':'⇅');s.classList.toggle('on',!!qualitySort);});}
function sortQualityRows(){if(!qualitySort)return;const body=document.getElementById(qualityReviewMode==='pending'?'qualityPendingBody':'qualityReviewedBody');const rows=[...body.querySelectorAll('[data-quality-record]')].sort((a,b)=>{const ta=a.cells[5].textContent.trim(),tb=b.cells[5].textContent.trim();return qualitySort.dir*(ta.localeCompare(tb));});rows.forEach((row,i)=>{row.cells[0].textContent=i+1;body.appendChild(row);});}
document.querySelectorAll('.quality-review-table .qsort').forEach(s=>s.addEventListener('click',()=>{const col=Number(s.dataset.col);if(qualitySort&&qualitySort.col===col){qualitySort.dir*=-1;}else{qualitySort={col:col,dir:1};}renderQualitySortMarks();sortQualityRows();}));
function setQualityReviewMode(mode){qualityReviewMode=mode;const pending=mode==='pending';document.getElementById('qualityPendingBody').hidden=!pending;document.getElementById('qualityReviewedBody').hidden=pending;document.getElementById('qualityPendingTab').classList.toggle('active',pending);document.getElementById('qualityReviewedTab').classList.toggle('active',!pending);document.getElementById('qualityListTitle').textContent=pending?'高质量数据集待审核列表':'高质量数据集已审核列表';document.querySelectorAll('.quality-result-col').forEach(cell=>cell.hidden=pending);renderQualityRecords();sortQualityRows();renderQualitySortMarks();}
const qualitySeedDetails={
'园林病虫害训练样本数据集':{source:'采集自城市公园、绿地及行道树的病虫害样本，经人工标注形成图像样本集',modal:'图像',scale:'原始图像约10万张，标注样本3.6万张，约220GB',coverTime:'2018年—2026年',coverRegion:'汶上县城区及各乡镇园林绿化区域',updateMech:'按天更新',period:'2025年6月—2026年6月',investment:'420',overview:'面向城市园林病虫害智能识别，支持图像识别算法训练与园林养护决策。',honors:'—',buildMode:'自主建设',orgContact:'张鑫',orgPhone:'18615677828'},
'医疗临床研究高质量数据集':{source:'人民医院临床诊疗系统脱敏后的病例诊断、检查检验与用药记录',modal:'文本',scale:'脱敏病历约35万份，涵盖220个病种，约60GB',coverTime:'2020年—2026年',coverRegion:'汶上县人民医院及其医联体成员单位',updateMech:'按月更新',period:'2025年4月—2026年9月',investment:'560',overview:'面向临床科研与辅助诊断模型训练，支撑医疗健康数据应用。',honors:'入选省卫生健康数据应用试点项目',buildMode:'产学研联合建设',orgContact:'刘慧敏',orgPhone:'18615677835'},
'市民出行通勤数据集':{source:'公交刷卡、共享单车骑行及主要路口卡口过车记录聚合数据',modal:'文本',scale:'日均出行记录约80万条，年累计约2.9亿条，约45GB',coverTime:'2022年—2026年',coverRegion:'汶上县城区及城乡公交线路覆盖区域',updateMech:'实时更新',period:'2025年8月—2026年10月',investment:'300',overview:'面向市民通勤规律分析，支撑智慧交通调度与城市规划决策。',honors:'—',buildMode:'自主建设',orgContact:'马建国',orgPhone:'18615677840'},
'企业纳税信用高质量数据集':{source:'税务征管系统企业纳税申报、缴款与信用评价记录',modal:'文本',scale:'企业纳税信用记录约12万条，覆盖3.8万家企业',coverTime:'2021年—2026年',coverRegion:'汶上县行政区域范围内注册企业',updateMech:'按季度更新',period:'2025年5月—2026年8月',investment:'180',overview:'面向企业纳税信用评价与金融信贷风控场景，支撑普惠金融服务。',honors:'—',buildMode:'自主建设',orgContact:'王守业',orgPhone:'18615677845'},
'医疗影像辅助诊断数据集':{source:'中医院放射科、超声科脱敏医学影像及标注结果',modal:'图像',scale:'脱敏影像约8.5万例，标注病灶区域12万个，约1.2TB',coverTime:'2019年—2026年',coverRegion:'汶上县中医院及县域医共体单位',updateMech:'按月更新',period:'2025年7月—2026年12月',investment:'680',overview:'面向医学影像辅助诊断模型训练，提升基层影像诊断能力。',honors:'获省医学人工智能创新应用竞赛二等奖',buildMode:'产学研联合建设',orgContact:'孙志强',orgPhone:'18615677850'},
'企业信用评价高质量数据集':{source:'整合市场监管、税务、司法及第三方信用服务机构的企业信用记录',modal:'文本',scale:'企业信用档案约4.2万份，信用记录约210万条',coverTime:'2020年—2026年',coverRegion:'汶上县行政区域范围内注册企业',updateMech:'按月更新',period:'2025年3月—2026年6月',investment:'260',overview:'面向企业综合信用评价，支撑信用监管与金融风控应用。',honors:'—',buildMode:'集成创新',orgContact:'周文静',orgPhone:'18615677855'},
'城市公共设施运行数据集':{source:'路灯、井盖、消防栓等城市部件物联网感知与巡查数据',modal:'文本',scale:'设施台账约9.6万条，运行状态记录日均15万条',coverTime:'2021年—2026年',coverRegion:'汶上县城区市政道路及公共区域',updateMech:'实时更新',period:'2025年6月—2026年11月',investment:'340',overview:'面向城市公共设施运行监测与养护决策，支撑城市治理精细化。',honors:'—',buildMode:'自主建设',orgContact:'吴建军',orgPhone:'18615677860'}};
function setQualityDrawerTab(tab){document.querySelectorAll('[data-quality-tab]').forEach(button=>{const active=button.dataset.qualityTab===tab;button.classList.toggle('active',active);button.setAttribute('aria-selected',active?'true':'false');});document.getElementById('qualityPaneInfo').hidden=tab!=='info';document.getElementById('qualityPaneApproval').hidden=tab!=='approval';}
function fillQualityTimeline(name,org,contact,time,statusText){
  const timeline=document.getElementById('qualityTimeline');
  const dot=cls=>'<span class="mt-dot"></span>';
  const item=(cls,title,icon,items)=>'<li class="'+cls+'"><span class="mt-dot">'+(icon||'')+'</span><div class="mt-content"><h4>'+title+'</h4><div class="mt-info">'+items.map(it=>'<div><b>'+it[0]+'</b>'+it[1]+'</div>').join('')+'</div></div></li>';
  const meta=[['处理时间',time],['处理人',contact],['处理部门',org],['结果','提交'],['意见','高质量数据集申报材料已提交']];
  let review='';
  if(statusText==='待审核'){review=item('current','平台运营方审核','⏳',[['处理人','数据资源运营团队'],['结果','待审核'],['意见','等待平台运营方审核处理']]);}
  else if(statusText==='已通过'){review=item('current','平台运营方审核','✓',[['处理时间',time],['处理部门','数据资源运营团队'],['结果','通过'],['意见','申报材料齐全，数据集质量符合高质量数据集要求，审核通过']]);}
  else{review=item('current','平台运营方审核','✕',[['处理时间',time],['处理部门','数据资源运营团队'],['结果','驳回'],['意见','申报材料不完整，请补充完善后重新申报']]);}
  timeline.innerHTML=item('start','开始','●',[])+item('','提交申报','●',meta)+review+item('end','结束','●',[]);
}
function openQualityDrawer(row){
  try{
    const reviewed=qualityReviewMode==='reviewed';const cells=[...row.children];const name=cells[1].textContent,domain=cells[2].textContent,org=cells[3].textContent,time=cells[5].textContent;const seed=qualitySeedDetails[name]||{};const val=k=>seed[k]||'—';
    tSet('qualityDetailName',name);tSet('qualityDetailOrg',org);tSet('qualityDetailTime',time);
    tSet('qualityInfoName',name);tSet('qualityInfoDomain',domain);
    tSet('qualityInfoModal',val('modal'));tSet('qualityInfoSource',val('source'));tSet('qualityInfoScale',val('scale'));
    tSet('qualityInfoCoverTime',val('coverTime'));tSet('qualityInfoCoverRegion',val('coverRegion'));tSet('qualityInfoUpdateMech',val('updateMech'));
    tSet('qualityInfoPeriod',val('period'));tSet('qualityInfoInvestment',val('investment'));tSet('qualityInfoBuildMode',val('buildMode'));
    tSet('qualityInfoOverview',val('overview'));tSet('qualityInfoHonors',val('honors'));
    tSet('qualityInfoOrg',org);tSet('qualityInfoContact',val('orgContact'));tSet('qualityInfoPhone',val('orgPhone'));tSet('qualityInfoTime',time);
    const statusText=reviewed?cells[5].textContent:'待审核';
    const status=document.getElementById('qualityDetailStatus');
    if(status){status.textContent=statusText;status.className='md-status '+(reviewed&&statusText.includes('驳回')?'rejected':'pending');}
    fillQualityTimeline(name,org,val('orgContact'),time,statusText);
    setQualityDrawerTab('info');
    const actions=document.getElementById('qualityDrawerActions');if(actions)actions.hidden=reviewed;
    const mask=document.getElementById('qualityDrawerMask');
    if(mask){mask.hidden=false;}else{console.error('qualityDrawerMask 元素不存在');}
  }catch(err){
    console.error('打开高质量数据集详情失败：',err);
    const toast=document.getElementById('managerToast');
    if(toast){toast.textContent='打开详情失败：'+err.message;toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,4000);}
  }
}
document.getElementById('qualityPendingTab').addEventListener('click',()=>setQualityReviewMode('pending'));document.getElementById('qualityReviewedTab').addEventListener('click',()=>setQualityReviewMode('reviewed'));document.getElementById('queryQualityFilters').addEventListener('click',renderQualityRecords);document.getElementById('resetQualityFilters').addEventListener('click',()=>{document.getElementById('qualityDatasetName').value='';document.getElementById('qualityDomain').value='all';document.getElementById('qualityOrg').value='';renderQualityRecords();});
document.querySelectorAll('[data-quality-tab]').forEach(button=>button.addEventListener('click',()=>setQualityDrawerTab(button.dataset.qualityTab)));document.getElementById('refreshQualityList').addEventListener('click',renderQualityRecords);document.querySelectorAll('.quality-review-action,.quality-view-action').forEach(button=>button.addEventListener('click',()=>openQualityDrawer(button.closest('tr'))));document.getElementById('closeQualityDrawer').addEventListener('click',()=>document.getElementById('qualityDrawerMask').hidden=true);document.getElementById('qualityDrawerMask').addEventListener('click',event=>{if(event.target===event.currentTarget)event.currentTarget.hidden=true;});
const qualityOpinionMask=document.getElementById('qualityOpinionMask');function closeQualityOpinion(){qualityOpinionMask.hidden=true;}function showQualityOpinion(result){document.getElementById('qualityOpinionTitle').textContent=result==='通过'?'通过审核':'驳回审核';document.getElementById('qualityOpinion').value=result;qualityOpinionMask.hidden=false;}document.getElementById('qualityApproveButton').addEventListener('click',()=>showQualityOpinion('通过'));document.getElementById('qualityRejectButton').addEventListener('click',()=>showQualityOpinion('驳回'));document.getElementById('closeQualityOpinion').addEventListener('click',closeQualityOpinion);document.getElementById('cancelQualityOpinion').addEventListener('click',closeQualityOpinion);document.getElementById('confirmQualityOpinion').addEventListener('click',()=>{if(!document.getElementById('qualityOpinion').value.trim())return;closeQualityOpinion();document.getElementById('qualityDrawerMask').hidden=true;const toast=document.getElementById('managerToast');toast.textContent='审核结果已提交';toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2600);});qualityOpinionMask.addEventListener('click',event=>{if(event.target===event.currentTarget)closeQualityOpinion();});
setQualityReviewMode('pending');
let toolReviewMode='pending';
function renderToolRecords(){const body=document.getElementById(toolReviewMode==='pending'?'toolPendingBody':'toolReviewedBody');const keyword=document.getElementById('toolNameFilter').value.trim().toLowerCase();const org=document.getElementById('toolOrgFilter').value.trim().toLowerCase();let count=0;body.querySelectorAll('[data-tool-record]').forEach(row=>{const show=(!keyword||row.children[2].textContent.toLowerCase().includes(keyword))&&(!org||row.children[3].textContent.toLowerCase().includes(org));row.hidden=!show;if(show)count++;});document.getElementById('toolReviewCount').textContent=count;document.getElementById('toolReviewEmpty').hidden=count!==0;}
function setToolReviewMode(mode){toolReviewMode=mode;const pending=mode==='pending';document.getElementById('toolPendingBody').hidden=!pending;document.getElementById('toolReviewedBody').hidden=pending;document.getElementById('toolPendingTab').classList.toggle('active',pending);document.getElementById('toolReviewedTab').classList.toggle('active',!pending);document.getElementById('toolListTitle').textContent=pending?'工具使用待审核列表':'工具使用已审核列表';document.querySelectorAll('.tool-result-col').forEach(cell=>cell.hidden=pending);renderToolRecords();}
function tSet(id,val){const el=document.getElementById(id);if(el)el.textContent=val;}
function openToolDrawer(row){
  try{
    const reviewed=toolReviewMode==='reviewed';const cells=[...row.children];const no=cells[1].textContent,name=cells[2].textContent,org=cells[3].textContent,deadline=cells[4].textContent,time=cells[6].textContent;
    tSet('toolDetailName',name);tSet('toolDetailOrg',org);tSet('toolDetailTime',time);
    tSet('toolInfoNo',no);tSet('toolInfoName',name);tSet('toolInfoOrg',org);
    tSet('toolInfoApplicant',row.dataset.applicant||'—');tSet('toolInfoPhone',row.dataset.phone||'—');
    tSet('toolInfoTime',time);tSet('toolInfoDeadline',deadline);
    tSet('toolInfoScene',row.dataset.scene||'—');tSet('toolInfoMemo',row.dataset.memo||'—');tSet('toolInfoFile',row.dataset.file||'—');
    const status=document.getElementById('toolDetailStatus');
    if(status){status.textContent=reviewed?cells[5].textContent:'待审核';status.className='md-status '+(reviewed&&cells[5].textContent.includes('驳回')?'rejected':'pending');}
    const actions=document.getElementById('toolDrawerActions');if(actions)actions.hidden=reviewed;
    const mask=document.getElementById('toolDrawerMask');
    if(mask){mask.hidden=false;}else{console.error('toolDrawerMask 元素不存在');}
  }catch(err){
    console.error('打开工具详情失败：',err);
    const toast=document.getElementById('managerToast');
    if(toast){toast.textContent='打开详情失败：'+err.message;toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,4000);}
  }
}
document.getElementById('toolPendingTab').addEventListener('click',()=>setToolReviewMode('pending'));document.getElementById('toolReviewedTab').addEventListener('click',()=>setToolReviewMode('reviewed'));document.getElementById('queryToolFilters').addEventListener('click',renderToolRecords);document.getElementById('resetToolFilters').addEventListener('click',()=>{document.getElementById('toolNameFilter').value='';document.getElementById('toolOrgFilter').value='';renderToolRecords();});document.getElementById('refreshToolList').addEventListener('click',renderToolRecords);document.querySelectorAll('.tool-review-action,.tool-view-action').forEach(button=>button.addEventListener('click',()=>openToolDrawer(button.closest('tr'))));document.getElementById('closeToolDrawer').addEventListener('click',()=>document.getElementById('toolDrawerMask').hidden=true);document.getElementById('toolDrawerMask').addEventListener('click',event=>{if(event.target===event.currentTarget)event.currentTarget.hidden=true;});
const toolOpinionMask=document.createElement('div');toolOpinionMask.className='approval-opinion-mask';toolOpinionMask.hidden=true;toolOpinionMask.innerHTML='<section class="approval-opinion-dialog" role="dialog" aria-modal="true"><header class="approval-opinion-head"><h2>审核意见</h2><button class="md-close tool-opinion-close" type="button">×</button></header><div class="approval-opinion-body"><label><span><i>*</i>意见或建议：</span><textarea rows="5" id="toolOpinion">通过</textarea></label></div><footer class="approval-opinion-foot"><button class="md-back-button tool-opinion-cancel" type="button">取消</button><button class="md-approve-button tool-opinion-confirm" type="button">确定</button></footer></section>';document.body.appendChild(toolOpinionMask);function closeToolOpinion(){toolOpinionMask.hidden=true;}function showToolOpinion(result){document.getElementById('toolOpinion').value=result;toolOpinionMask.hidden=false;}document.getElementById('toolApproveButton').addEventListener('click',()=>showToolOpinion('通过'));document.getElementById('toolRejectButton').addEventListener('click',()=>showToolOpinion('驳回'));toolOpinionMask.querySelector('.tool-opinion-close').addEventListener('click',closeToolOpinion);toolOpinionMask.querySelector('.tool-opinion-cancel').addEventListener('click',closeToolOpinion);toolOpinionMask.querySelector('.tool-opinion-confirm').addEventListener('click',()=>{closeToolOpinion();document.getElementById('toolDrawerMask').hidden=true;const toast=document.getElementById('managerToast');toast.textContent='审核结果已提交';toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2600);});
setToolReviewMode('pending');
const toolConfigMask=document.getElementById('toolConfigMask');function closeToolConfigForm(){toolConfigMask.hidden=true;}document.getElementById('openToolConfigForm').addEventListener('click',()=>{document.getElementById('toolConfigForm').reset();toolConfigMask.hidden=false;});document.getElementById('closeToolConfigForm').addEventListener('click',closeToolConfigForm);document.getElementById('cancelToolConfigForm').addEventListener('click',closeToolConfigForm);document.getElementById('toolConfigForm').addEventListener('submit',event=>{event.preventDefault();closeToolConfigForm();const toast=document.getElementById('managerToast');toast.textContent='工具配置已保存';toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2600);});toolConfigMask.addEventListener('click',event=>{if(event.target===event.currentTarget)closeToolConfigForm();});document.querySelectorAll('.status-switch').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('on');button.querySelector('span').textContent=button.classList.contains('on')?'已上架':'未上架';}));document.querySelectorAll('.config-action').forEach(button=>button.addEventListener('click',()=>{if(button.textContent==='查看')return;const toast=document.getElementById('managerToast');toast.textContent=button.textContent==='删除'?'删除操作已触发':`${button.textContent}工具配置`;toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2200);}));
const toolDetailMask=document.getElementById('toolDetailMask');
function closeToolDetail(){toolDetailMask.hidden=true;}
document.getElementById('closeToolDetail').addEventListener('click',closeToolDetail);
toolDetailMask.addEventListener('click',event=>{if(event.target===event.currentTarget)closeToolDetail();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!toolDetailMask.hidden)closeToolDetail();});
document.querySelectorAll('#toolConfigBody tr').forEach(row=>{
  const viewButton=row.querySelector('.config-action');
  if(!viewButton)return;
  viewButton.addEventListener('click',()=>{
    const cells=row.children,on=row.querySelector('.status-switch').classList.contains('on');
    const name=cells[0].textContent,time=cells[3].textContent,statusText=on?'已上架':'未上架';
    document.getElementById('cfgToolName').textContent=name;
    document.getElementById('cfgInfoName').textContent=name;
    document.getElementById('cfgInfoStage').textContent=cells[1].textContent;
    document.getElementById('cfgToolStatus').textContent=statusText;
    document.getElementById('cfgToolStatus').className='md-status '+(on?'approved':'pending');
    document.getElementById('cfgInfoPublish').textContent=statusText;
    document.getElementById('cfgToolTime').textContent=time;
    document.getElementById('cfgInfoTime').textContent=time;
    document.getElementById('cfgInfoDesc').textContent=row.dataset.desc||'暂无描述';
    toolDetailMask.hidden=false;
  });
});
