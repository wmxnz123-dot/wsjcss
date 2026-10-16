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

function openManagerPage(button){document.querySelectorAll('[data-page]').forEach(item=>item.classList.remove('active'));button.classList.add('active');const name=button.dataset.page;breadcrumb.textContent=name;dashboardView.hidden=true;socialView.hidden=true;publicView.hidden=true;publicCreateView.hidden=true;demandReviewView.hidden=true;qualityReviewView.hidden=true;toolReviewView.hidden=true;toolConfigView.hidden=true;placeholder.hidden=true;placeholderTitle.hidden=false;placeholderDescription.hidden=false;placeholder.querySelector('span').hidden=false;managerPlaceholderHint.hidden=true;demandListView.hidden=true;if(name==='仪表盘'){dashboardView.hidden=false;}else if(name==='社会数据目录'){managerPlaceholderHint.hidden=false;managerPlaceholderHint.textContent='同可信空间数据资源目录页面';}else if(name==='公共数据目录'){publicView.hidden=false;renderPublicData();}else if(name==='需求审核'){demandReviewView.hidden=false;renderReviewRecords();}else if(name==='高质量数据集审核'){qualityReviewView.hidden=false;renderQualityRecords();}else if(name==='工具使用审核'){toolReviewView.hidden=false;renderToolRecords();}else if(name==='工具配置'){toolConfigView.hidden=false;}else if(name==='需求清单'){demandListView.hidden=false;renderDemandList();}else if(name==='开放数据目录'){managerPlaceholderHint.hidden=false;managerPlaceholderHint.textContent='同公共数据目录页面一样';}else{placeholder.hidden=false;placeholderTitle.textContent=name;placeholderDescription.textContent=button.dataset.description||'该管理功能已预留，后续逐步完善。';}const group=button.closest('.manager-menu-group');if(group)document.querySelectorAll('.manager-menu-group').forEach(item=>setGroupState(item,item===group));sidebar.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>openManagerPage(button)));
document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>{breadcrumbWrap.hidden=button.dataset.page==='仪表盘';}));

const demandListBody=document.getElementById('demandListBody');
const demandListName=document.getElementById('demandListName');
const demandListForm=document.getElementById('demandListForm');
function renderDemandList(){const kw=demandListName.value.trim().toLowerCase(),form=demandListForm.value;let v=0;[...demandListBody.rows].forEach(row=>{const inKw=!kw||(row.dataset.name+' '+row.textContent).toLowerCase().includes(kw);const inForm=form==='all'||row.dataset.form===form;row.hidden=!(inKw&&inForm);if(!row.hidden)row.cells[0].textContent=++v;});document.getElementById('demandListCount').textContent=v;document.getElementById('demandListEmpty').hidden=v!==0;}
document.getElementById('queryDemandList').addEventListener('click',renderDemandList);
demandListName.addEventListener('input',renderDemandList);
demandListForm.addEventListener('change',renderDemandList);
document.getElementById('resetDemandList').addEventListener('click',()=>{demandListName.value='';demandListForm.value='all';renderDemandList();});
document.getElementById('refreshDemandList').addEventListener('click',()=>{demandListName.value='';demandListForm.value='all';renderDemandList();});

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

function matchingPublicRows(){const name=document.getElementById('publicResourceName').value.trim().toLowerCase(),type=document.getElementById('publicResourceType').value,holder=document.getElementById('publicHolder').value.trim().toLowerCase(),cycle=document.getElementById('publicCycle').value;return [...publicBody.querySelectorAll('[data-record]')].filter(row=>(!name||row.dataset.name.toLowerCase().includes(name))&&(type==='all'||row.dataset.type===type)&&(!holder||row.dataset.holder.toLowerCase().includes(holder))&&(cycle==='all'||row.dataset.cycle===cycle));}
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
document.querySelectorAll('input[name="serviceType"]').forEach(input=>input.addEventListener('change',()=>{
  const api=input.value==='api';
  document.getElementById('apiServiceFields').hidden=!api;
  document.getElementById('tableServiceFields').hidden=api;
  document.getElementById('apiServiceFields').querySelectorAll('input,select,textarea').forEach(field=>field.disabled=!api);
  document.getElementById('tableServiceFields').querySelectorAll('input,select,textarea').forEach(field=>field.disabled=api);
  document.getElementById('testNavLink').hidden=!api;
  document.getElementById('serviceTest').hidden=!api;
}));
document.querySelector('input[name="serviceType"][value="api"]').dispatchEvent(new Event('change'));
document.getElementById('publicDataCreateForm').addEventListener('submit',event=>{
  event.preventDefault();
  if(!event.currentTarget.reportValidity())return;
  const toast=document.getElementById('managerToast');toast.textContent='公共数据目录已提交，等待审核';toast.hidden=false;setTimeout(()=>{toast.hidden=true;showPublicList();},1800);
});
document.getElementById('runServiceTest').addEventListener('click',()=>{document.getElementById('serviceTestResult').value='请求已发送，等待服务返回...\n\n接口测试结果：200 OK\n返回示例：{ "code": 0, "message": "success" }';});

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
document.getElementById('reviewExpandFilters').addEventListener('click',()=>{const extra=document.getElementById('reviewExtraFilters');const opening=extra.hidden;extra.hidden=!opening;document.getElementById('reviewExpandFilters').textContent=opening?'收起 ▴':'展开 ▾';});

function setMdTab(tab){const approval=tab==='approval';document.getElementById('mdPaneInfo').hidden=approval;document.getElementById('mdPaneApproval').hidden=!approval;document.querySelectorAll('[data-md-tab]').forEach(b=>{const active=b.dataset.mdTab===tab;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});}
function closeReviewDrawer(){document.getElementById('reviewDrawerMask').hidden=true;}
function fillMdTimeline(baseTime){const stamp=(sec)=>{const d=new Date((baseTime?new Date(baseTime):new Date()).getTime()+sec*1000);const p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;};const t0=baseTime||stamp(0);const nodes=[{kind:'start',title:'开始'},{kind:'mid',title:'需求方发布需求',t:t0,who:'数据需求方',dept:'**人才科技有限公司',result:'通过',comment:'提交自动审核通过'},{kind:'mid',title:'平台运营方审核',t:stamp(17),who:'数据开发方',dept:'**信息技术有限公司',result:'通过',comment:'通过'},{kind:'end',title:'结束'}];document.getElementById('mdTimeline').innerHTML=nodes.map(n=>{if(n.kind==='mid')return `<li class="${n.kind}"><span class="mt-dot"></span><div class="mt-content"><div class="mt-title">${n.title}</div><div class="mt-meta">处理时间：<b>${n.t}</b><span>处理人：${n.who}</span><span>处理部门：${n.dept}</span></div><div><span class="mt-result">处理结果：${n.result}</span></div><div class="mt-comment">处理意见：${n.comment}</div></div></li>`;return `<li class="${n.kind}"><span class="mt-dot"></span><div class="mt-content"><div class="mt-title">${n.title}</div></div></li>`;}).join('');}
function openReviewDrawer(tr){const reviewed=!!tr.closest('#reviewedReviewBody');const cells=[...tr.children].map(c=>c.textContent.trim());document.getElementById('mdName').textContent=cells[2];document.getElementById('mdRequester').textContent=cells[7];document.getElementById('mdCreated').textContent=cells[8];document.getElementById('mdCode').textContent=cells[1];document.getElementById('mdName2').textContent=cells[2];document.getElementById('mdDeadline').textContent=cells[6];document.getElementById('mdDelivery').textContent=cells[3];document.getElementById('mdUrgency').textContent=cells[4];document.getElementById('mdScene').textContent=cells[5];document.getElementById('mdRequester2').textContent=cells[7];document.getElementById('mdDesc').textContent=tr.dataset.name||'—';const status=document.getElementById('mdStatus');status.textContent=reviewed?'已通过':'待审核';status.className='md-status '+(reviewed?'approved':'pending');document.getElementById('mdDrawerActions').hidden=reviewed;fillMdTimeline(cells[8]);setMdTab('info');document.getElementById('reviewDrawerMask').hidden=false;}
document.querySelectorAll('.detail-button').forEach(button=>button.addEventListener('click',()=>{const row=button.closest('tr[data-review-record]');if(row){openReviewDrawer(row);return;}const toast=document.getElementById('managerToast');toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2600);}));
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
function renderQualityRecords(){const body=document.getElementById(qualityReviewMode==='pending'?'qualityPendingBody':'qualityReviewedBody');const keyword=document.getElementById('qualityDatasetName').value.trim().toLowerCase();const domain=document.getElementById('qualityDomain').value;let count=0;body.querySelectorAll('[data-quality-record]').forEach(row=>{const show=(!keyword||row.children[1].textContent.toLowerCase().includes(keyword))&&(domain==='all'||row.dataset.domain===domain);row.hidden=!show;if(show)count++;});document.getElementById('qualityReviewCount').textContent=count;document.getElementById('qualityReviewEmpty').hidden=count!==0;}
function setQualityReviewMode(mode){qualityReviewMode=mode;const pending=mode==='pending';document.getElementById('qualityPendingBody').hidden=!pending;document.getElementById('qualityReviewedBody').hidden=pending;document.getElementById('qualityPendingTab').classList.toggle('active',pending);document.getElementById('qualityReviewedTab').classList.toggle('active',!pending);document.getElementById('qualityListTitle').textContent=pending?'高质量数据集待审核列表':'高质量数据集已审核列表';document.querySelectorAll('.quality-result-col').forEach(cell=>cell.hidden=pending);renderQualityRecords();}
function openQualityDrawer(row){const reviewed=qualityReviewMode==='reviewed';const cells=[...row.children];const name=cells[1].textContent,domain=cells[2].textContent,org=cells[4].textContent,time=cells[6].textContent;document.getElementById('qualityDetailName').textContent=name;document.getElementById('qualityDetailOrg').textContent=org;document.getElementById('qualityDetailTime').textContent=time;document.getElementById('qualityInfoName').textContent=name;document.getElementById('qualityInfoDomain').textContent=domain;document.getElementById('qualityInfoOrg').textContent=org;document.getElementById('qualityInfoTime').textContent=time;const status=document.getElementById('qualityDetailStatus');status.textContent=reviewed?cells[5].textContent:'待审核';status.className='md-status '+(reviewed&&cells[5].textContent.includes('驳回')?'rejected':'pending');document.getElementById('qualityDrawerActions').hidden=reviewed;document.getElementById('qualityDrawerMask').hidden=false;}
document.getElementById('qualityPendingTab').addEventListener('click',()=>setQualityReviewMode('pending'));document.getElementById('qualityReviewedTab').addEventListener('click',()=>setQualityReviewMode('reviewed'));document.getElementById('queryQualityFilters').addEventListener('click',renderQualityRecords);document.getElementById('resetQualityFilters').addEventListener('click',()=>{document.getElementById('qualityDatasetName').value='';document.getElementById('qualityDomain').value='all';renderQualityRecords();});document.getElementById('refreshQualityList').addEventListener('click',renderQualityRecords);document.querySelectorAll('.quality-review-action,.quality-view-action').forEach(button=>button.addEventListener('click',()=>openQualityDrawer(button.closest('tr'))));document.getElementById('closeQualityDrawer').addEventListener('click',()=>document.getElementById('qualityDrawerMask').hidden=true);document.getElementById('qualityDrawerMask').addEventListener('click',event=>{if(event.target===event.currentTarget)event.currentTarget.hidden=true;});
const qualityOpinionMask=document.getElementById('qualityOpinionMask');function closeQualityOpinion(){qualityOpinionMask.hidden=true;}function showQualityOpinion(result){document.getElementById('qualityOpinionTitle').textContent=result==='通过'?'通过审核':'驳回审核';document.getElementById('qualityOpinion').value=result;qualityOpinionMask.hidden=false;}document.getElementById('qualityApproveButton').addEventListener('click',()=>showQualityOpinion('通过'));document.getElementById('qualityRejectButton').addEventListener('click',()=>showQualityOpinion('驳回'));document.getElementById('closeQualityOpinion').addEventListener('click',closeQualityOpinion);document.getElementById('cancelQualityOpinion').addEventListener('click',closeQualityOpinion);document.getElementById('confirmQualityOpinion').addEventListener('click',()=>{if(!document.getElementById('qualityOpinion').value.trim())return;closeQualityOpinion();document.getElementById('qualityDrawerMask').hidden=true;const toast=document.getElementById('managerToast');toast.textContent='审核结果已提交';toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2600);});qualityOpinionMask.addEventListener('click',event=>{if(event.target===event.currentTarget)closeQualityOpinion();});
setQualityReviewMode('pending');
let toolReviewMode='pending';
function renderToolRecords(){const body=document.getElementById(toolReviewMode==='pending'?'toolPendingBody':'toolReviewedBody');const keyword=document.getElementById('toolNameFilter').value.trim().toLowerCase();let count=0;body.querySelectorAll('[data-tool-record]').forEach(row=>{const show=!keyword||row.children[1].textContent.toLowerCase().includes(keyword);row.hidden=!show;if(show)count++;});document.getElementById('toolReviewCount').textContent=count;document.getElementById('toolReviewEmpty').hidden=count!==0;}
function setToolReviewMode(mode){toolReviewMode=mode;const pending=mode==='pending';document.getElementById('toolPendingBody').hidden=!pending;document.getElementById('toolReviewedBody').hidden=pending;document.getElementById('toolPendingTab').classList.toggle('active',pending);document.getElementById('toolReviewedTab').classList.toggle('active',!pending);document.getElementById('toolListTitle').textContent=pending?'工具使用待审核列表':'工具使用已审核列表';document.querySelectorAll('.tool-result-col').forEach(cell=>cell.hidden=pending);renderToolRecords();}
function openToolDrawer(row){const reviewed=toolReviewMode==='reviewed';const cells=[...row.children];const name=cells[1].textContent,org=cells[2].textContent,time=cells[4].textContent;document.getElementById('toolDetailName').textContent=name;document.getElementById('toolDetailOrg').textContent=org;document.getElementById('toolDetailTime').textContent=time;document.getElementById('toolInfoName').textContent=name;document.getElementById('toolInfoOrg').textContent=org;document.getElementById('toolInfoTime').textContent=time;const status=document.getElementById('toolDetailStatus');status.textContent=reviewed?cells[3].textContent:'待审核';status.className='md-status '+(reviewed&&cells[3].textContent.includes('驳回')?'rejected':'pending');document.getElementById('toolDrawerActions').hidden=reviewed;document.getElementById('toolDrawerMask').hidden=false;}
document.getElementById('toolPendingTab').addEventListener('click',()=>setToolReviewMode('pending'));document.getElementById('toolReviewedTab').addEventListener('click',()=>setToolReviewMode('reviewed'));document.getElementById('queryToolFilters').addEventListener('click',renderToolRecords);document.getElementById('resetToolFilters').addEventListener('click',()=>{document.getElementById('toolNameFilter').value='';renderToolRecords();});document.getElementById('refreshToolList').addEventListener('click',renderToolRecords);document.querySelectorAll('.tool-review-action,.tool-view-action').forEach(button=>button.addEventListener('click',()=>openToolDrawer(button.closest('tr'))));document.getElementById('closeToolDrawer').addEventListener('click',()=>document.getElementById('toolDrawerMask').hidden=true);document.getElementById('toolDrawerMask').addEventListener('click',event=>{if(event.target===event.currentTarget)event.currentTarget.hidden=true;});
const toolOpinionMask=document.createElement('div');toolOpinionMask.className='approval-opinion-mask';toolOpinionMask.hidden=true;toolOpinionMask.innerHTML='<section class="approval-opinion-dialog" role="dialog" aria-modal="true"><header class="approval-opinion-head"><h2>审核意见</h2><button class="md-close tool-opinion-close" type="button">×</button></header><div class="approval-opinion-body"><label><span><i>*</i>意见或建议：</span><textarea rows="5" id="toolOpinion">通过</textarea></label></div><footer class="approval-opinion-foot"><button class="md-back-button tool-opinion-cancel" type="button">取消</button><button class="md-approve-button tool-opinion-confirm" type="button">确定</button></footer></section>';document.body.appendChild(toolOpinionMask);function closeToolOpinion(){toolOpinionMask.hidden=true;}function showToolOpinion(result){document.getElementById('toolOpinion').value=result;toolOpinionMask.hidden=false;}document.getElementById('toolApproveButton').addEventListener('click',()=>showToolOpinion('通过'));document.getElementById('toolRejectButton').addEventListener('click',()=>showToolOpinion('驳回'));toolOpinionMask.querySelector('.tool-opinion-close').addEventListener('click',closeToolOpinion);toolOpinionMask.querySelector('.tool-opinion-cancel').addEventListener('click',closeToolOpinion);toolOpinionMask.querySelector('.tool-opinion-confirm').addEventListener('click',()=>{closeToolOpinion();document.getElementById('toolDrawerMask').hidden=true;const toast=document.getElementById('managerToast');toast.textContent='审核结果已提交';toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2600);});
setToolReviewMode('pending');
const toolConfigMask=document.getElementById('toolConfigMask');function closeToolConfigForm(){toolConfigMask.hidden=true;}document.getElementById('openToolConfigForm').addEventListener('click',()=>{document.getElementById('toolConfigForm').reset();toolConfigMask.hidden=false;});document.getElementById('closeToolConfigForm').addEventListener('click',closeToolConfigForm);document.getElementById('cancelToolConfigForm').addEventListener('click',closeToolConfigForm);document.getElementById('toolConfigForm').addEventListener('submit',event=>{event.preventDefault();closeToolConfigForm();const toast=document.getElementById('managerToast');toast.textContent='工具配置已保存';toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2600);});toolConfigMask.addEventListener('click',event=>{if(event.target===event.currentTarget)closeToolConfigForm();});document.querySelectorAll('.status-switch').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('on');button.querySelector('span').textContent=button.classList.contains('on')?'已上架':'未上架';}));document.querySelectorAll('.config-action').forEach(button=>button.addEventListener('click',()=>{const toast=document.getElementById('managerToast');toast.textContent=button.textContent==='删除'?'删除操作已触发':`${button.textContent}工具配置`;toast.hidden=false;clearTimeout(window.managerToastTimer);window.managerToastTimer=setTimeout(()=>toast.hidden=true,2200);}));
