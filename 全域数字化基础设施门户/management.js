const userButton=document.getElementById('managerUser');
const userMenu=document.getElementById('userMenu');
const sidebar=document.getElementById('managerSidebar');
const dashboard=document.getElementById('dashboardView');
const systemEntryView=document.getElementById('systemEntryView');
const placeholder=document.getElementById('placeholder');
const placeholderTitle=document.getElementById('placeholderTitle');

userButton.addEventListener('click',event=>{event.stopPropagation();userMenu.hidden=!userMenu.hidden});
userMenu.addEventListener('click',event=>event.stopPropagation());
document.addEventListener('click',()=>userMenu.hidden=true);
document.getElementById('mobileMenu').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.querySelectorAll('.group-title:not(:disabled)').forEach(button=>button.addEventListener('click',()=>{const group=button.closest('section'),open=!group.classList.contains('open');document.querySelectorAll('.manager-sidebar section').forEach(item=>item.classList.remove('open'));group.classList.toggle('open',open)}));

function setActiveView(button){document.querySelectorAll('[data-view]').forEach(item=>item.classList.remove('active'));button.classList.add('active');sidebar.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
function hideViews(){dashboard.hidden=true;systemEntryView.hidden=true;placeholder.hidden=true}
function showDashboard(){hideViews();dashboard.hidden=false;setActiveView(document.querySelector('[data-view="dashboard"]'))}
function showSystemEntry(button){hideViews();systemEntryView.hidden=false;setActiveView(button);renderSystems()}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.view==='dashboard'){showDashboard();return}if(button.dataset.view==='系统入口管理'){showSystemEntry(button);return}hideViews();placeholder.hidden=false;placeholderTitle.textContent=button.dataset.view;setActiveView(button)}));
document.getElementById('backDashboard').addEventListener('click',showDashboard);
document.querySelectorAll('[data-dashboard-view]').forEach(button=>button.addEventListener('click',()=>{const target=document.querySelector(`.submenu [data-view="${button.dataset.dashboardView}"]`);if(target)target.click()}));

const stageCategories={
  '数智基础设施':['主干','可信流通平台'],
  '业务赋能应用中心':['主干'],
  '智慧场景应用':['智慧园林','智慧环卫','市政公用','停充一体化']
};

let systems=[
  {name:'物联网感知平台',stage:'数智基础设施',category:'主干',status:'已上架',sort:1,date:'2026-10-18'},
  {name:'视频融合分析平台',stage:'数智基础设施',category:'主干',status:'已上架',sort:2,date:'2026-10-18'},
  {name:'CIM城市信息模型平台',stage:'数智基础设施',category:'主干',status:'已上架',sort:3,date:'2026-10-20'},
  {name:'数据流通服务平台',stage:'数智基础设施',category:'可信流通平台',status:'已上架',sort:4,date:'2026-10-22'},
  {name:'数据资产管理平台',stage:'数智基础设施',category:'可信流通平台',status:'未上架',sort:5,date:'—'},
  {name:'数据资源治理平台',stage:'数智基础设施',category:'可信流通平台',status:'已上架',sort:6,date:'2026-10-25'},
  {name:'数据协作开发平台',stage:'数智基础设施',category:'可信流通平台',status:'未上架',sort:7,date:'—'},
  {name:'融合应用开发平台',stage:'业务赋能应用中心',category:'主干',status:'已上架',sort:1,date:'2026-10-24'},
  {name:'BI可视化开发平台',stage:'业务赋能应用中心',category:'主干',status:'已上架',sort:2,date:'2026-10-24'},
  {name:'智能体开发应用平台',stage:'业务赋能应用中心',category:'主干',status:'未上架',sort:3,date:'—'},
  {name:'园林资产管理系统',stage:'智慧场景应用',category:'智慧园林',status:'已上架',sort:1,date:'2026-10-26'},
  {name:'垃圾收运监管系统',stage:'智慧场景应用',category:'智慧环卫',status:'已上架',sort:2,date:'2026-10-27'},
  {name:'市政综合管理平台',stage:'智慧场景应用',category:'市政公用',status:'已上架',sort:3,date:'2026-10-28'},
  {name:'联网服务中心',stage:'智慧场景应用',category:'停充一体化',status:'未上架',sort:4,date:'—'}
];

const stageTree=document.getElementById('stageTree');
const systemTableBody=document.getElementById('systemTableBody');
const systemCount=document.getElementById('systemCount');
const systemListTitle=document.getElementById('systemListTitle');
const systemSearch=document.getElementById('systemSearch');
const systemEmpty=document.getElementById('systemEmpty');
const systemPagination=document.getElementById('systemPagination');
let activeTree={stage:'全部',category:''};
let systemPage=1;
const systemPageSize=10;

function treeButtonClass(stage,category=''){return activeTree.stage===stage&&activeTree.category===category?'active':''}
function updateDashboardStats(){const count=document.getElementById('dashboardSystemCount');if(count)count.textContent=String(systems.length)}
function renderStageTree(){
  stageTree.innerHTML=`<button class="tree-root ${treeButtonClass('全部')}" type="button" data-stage="全部"><i>全</i><b>全部系统</b></button>`+
    Object.entries(stageCategories).map(([stage,categories],index)=>`<div class="tree-group"><button class="tree-stage ${treeButtonClass(stage)}" type="button" data-stage="${stage}"><i>${['基','赋','景'][index]}</i><b>${stage}</b><em>${systems.filter(item=>item.stage===stage).length}</em></button><div class="tree-children">${categories.map(category=>`<button class="tree-category ${treeButtonClass(stage,category)}" type="button" data-stage="${stage}" data-category="${category}">${category}<span>（${systems.filter(item=>item.stage===stage&&item.category===category).length}）</span></button>`).join('')}</div></div>`).join('');
}

function renderSystems(){
  const keyword=systemSearch.value.trim().toLowerCase();
  const filtered=systems.filter(item=>(activeTree.stage==='全部'||item.stage===activeTree.stage)&&(!activeTree.category||item.category===activeTree.category)&&(!keyword||item.name.toLowerCase().includes(keyword))).sort((a,b)=>a.sort-b.sort);
  const pageCount=Math.max(1,Math.ceil(filtered.length/systemPageSize));
  systemPage=Math.min(systemPage,pageCount);
  const pageData=filtered.slice((systemPage-1)*systemPageSize,systemPage*systemPageSize);
  systemCount.textContent=String(filtered.length);
  systemListTitle.textContent=activeTree.category||activeTree.stage;
  if(activeTree.stage==='全部')systemListTitle.textContent='全部系统';
  systemTableBody.innerHTML=pageData.map((item,index)=>`<tr><td>${(systemPage-1)*systemPageSize+index+1}</td><td><div class="system-name"><b title="${item.name}">${item.name}</b></div></td><td>${item.stage}</td><td>${item.category}</td><td><button class="status-switch ${item.status==='已上架'?'active':''}" type="button" role="switch" aria-checked="${item.status==='已上架'}" data-status-index="${systems.indexOf(item)}"><i></i><span>${item.status}</span></button></td><td>${item.sort}</td><td>${item.date}</td><td><div class="row-actions"><button type="button" data-view-index="${systems.indexOf(item)}">查看</button><button type="button" data-edit-index="${systems.indexOf(item)}">编辑</button><button type="button" data-delete-index="${systems.indexOf(item)}">删除</button></div></td></tr>`).join('');
  systemTableBody.closest('.system-table-wrap').hidden=!filtered.length;
  systemEmpty.hidden=Boolean(filtered.length);
  systemPagination.innerHTML=filtered.length>systemPageSize?`<span>共 ${filtered.length} 条，第 ${systemPage} / ${pageCount} 页</span><button type="button" data-system-page="${systemPage-1}" ${systemPage===1?'disabled':''} aria-label="上一页">‹</button>${Array.from({length:pageCount},(_,index)=>`<button type="button" class="${systemPage===index+1?'active':''}" data-system-page="${index+1}">${index+1}</button>`).join('')}<button type="button" data-system-page="${systemPage+1}" ${systemPage===pageCount?'disabled':''} aria-label="下一页">›</button>`:'';
  updateDashboardStats();
  renderStageTree();
}

stageTree.addEventListener('click',event=>{const button=event.target.closest('[data-stage]');if(!button)return;activeTree={stage:button.dataset.stage,category:button.dataset.category||''};systemPage=1;renderSystems()});
systemSearch.addEventListener('input',()=>{systemPage=1;renderSystems()});
systemPagination.addEventListener('click',event=>{const button=event.target.closest('[data-system-page]');if(!button||button.disabled)return;systemPage=Number(button.dataset.systemPage);renderSystems();document.querySelector('.entry-content').scrollIntoView({behavior:'smooth',block:'start'})});
systemTableBody.addEventListener('click',event=>{
  const statusButton=event.target.closest('[data-status-index]');
  if(statusButton){const item=systems[Number(statusButton.dataset.statusIndex)];item.status=item.status==='已上架'?'未上架':'已上架';item.date=item.status==='已上架'?'2026-11-04':'—';renderSystems();showToast(`发布状态已切换为${item.status}`);return}
  const viewButton=event.target.closest('[data-view-index]');
  if(viewButton){openSystemDrawer(Number(viewButton.dataset.viewIndex));return}
  const editButton=event.target.closest('[data-edit-index]');
  if(editButton){openSystemModal(Number(editButton.dataset.editIndex));return}
  const deleteButton=event.target.closest('[data-delete-index]');
  if(deleteButton)openDeleteConfirm(Number(deleteButton.dataset.deleteIndex));
});

const systemModal=document.getElementById('systemModal');
const systemForm=document.getElementById('systemForm');
const newSystemStage=document.getElementById('newSystemStage');
const newSystemCategory=document.getElementById('newSystemCategory');
newSystemStage.innerHTML=Object.keys(stageCategories).map(stage=>`<option value="${stage}">${stage}</option>`).join('');
function syncCategoryOptions(){newSystemCategory.innerHTML=stageCategories[newSystemStage.value].map(category=>`<option value="${category}">${category}</option>`).join('')}
newSystemStage.addEventListener('change',syncCategoryOptions);syncCategoryOptions();
let editingSystemIndex=null;
function openSystemModal(index=null){
  editingSystemIndex=index;
  systemForm.reset();
  const title=document.getElementById('systemModalTitle');
  const submitButton=document.getElementById('systemSubmitButton');
  if(index===null){title.textContent='新增系统';submitButton.textContent='确定新增';newSystemStage.value=Object.keys(stageCategories)[0];syncCategoryOptions()}
  else{const item=systems[index];title.textContent='编辑系统';submitButton.textContent='保存修改';document.getElementById('newSystemName').value=item.name;newSystemStage.value=item.stage;syncCategoryOptions();newSystemCategory.value=item.category;document.querySelector(`input[name="newSystemStatus"][value="${item.status==='已上架'?'是':'否'}"]`).checked=true;document.getElementById('newSystemSort').value=item.sort;document.getElementById('newSystemUrl').value=item.url||'';document.getElementById('newSystemDescription').value=item.description||''}
  systemModal.hidden=false;document.body.style.overflow='hidden';setTimeout(()=>document.getElementById('newSystemName').focus(),0)
}
function closeSystemModal(){systemModal.hidden=true;editingSystemIndex=null;document.body.style.overflow=''}
document.getElementById('addSystemButton').addEventListener('click',()=>openSystemModal());
document.querySelectorAll('[data-close-system-modal]').forEach(button=>button.addEventListener('click',closeSystemModal));
systemForm.addEventListener('submit',event=>{event.preventDefault();const wasEditing=editingSystemIndex!==null;const isOnline=document.querySelector('input[name="newSystemStatus"]:checked').value==='是';const item={name:document.getElementById('newSystemName').value.trim(),stage:newSystemStage.value,category:newSystemCategory.value,status:isOnline?'已上架':'未上架',sort:Number(document.getElementById('newSystemSort').value),date:isOnline?'2026-11-04':'—',url:document.getElementById('newSystemUrl').value.trim(),description:document.getElementById('newSystemDescription').value.trim()};if(wasEditing){Object.assign(systems[editingSystemIndex],item)}else{systems.push(item)}activeTree={stage:'全部',category:''};systemPage=1;systemSearch.value='';closeSystemModal();renderSystems();showToast(wasEditing?'系统信息已更新':'系统新增成功')});

const systemDrawerLayer=document.getElementById('systemDrawerLayer');
let drawerSystemIndex=null;
function openSystemDrawer(index){const item=systems[index];drawerSystemIndex=index;document.getElementById('drawerSystemName').textContent=item.name;document.getElementById('drawerSystemTitle').textContent=item.name;document.getElementById('drawerSystemIcon').textContent=item.name.slice(0,1);const status=document.getElementById('drawerSystemStatus');status.textContent=item.status;status.classList.toggle('draft',item.status!=='已上架');document.getElementById('drawerSystemStage').textContent=item.stage;document.getElementById('drawerSystemCategory').textContent=item.category;document.getElementById('drawerSystemSort').textContent=item.sort;document.getElementById('drawerSystemDate').textContent=item.date;document.getElementById('drawerSystemUrl').textContent=item.url||'暂未配置正式访问地址';document.getElementById('drawerSystemDescription').textContent=item.description||`面向${item.category}业务提供统一的数字化管理与服务能力，通过门户实现统一入口和快捷访问。`;systemDrawerLayer.hidden=false;document.body.style.overflow='hidden'}
function closeSystemDrawer(){systemDrawerLayer.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('[data-close-system-drawer]').forEach(button=>button.addEventListener('click',closeSystemDrawer));
document.getElementById('drawerEditButton').addEventListener('click',()=>{const index=drawerSystemIndex;closeSystemDrawer();openSystemModal(index)});

const deleteSystemModal=document.getElementById('deleteSystemModal');
let pendingDeleteIndex=null;
function openDeleteConfirm(index){pendingDeleteIndex=index;document.getElementById('deleteSystemName').textContent=systems[index].name;deleteSystemModal.hidden=false;document.body.style.overflow='hidden'}
function closeDeleteConfirm(){deleteSystemModal.hidden=true;pendingDeleteIndex=null;document.body.style.overflow=''}
document.querySelectorAll('[data-cancel-delete]').forEach(button=>button.addEventListener('click',closeDeleteConfirm));
document.getElementById('confirmDeleteSystem').addEventListener('click',()=>{if(pendingDeleteIndex===null)return;const name=systems[pendingDeleteIndex].name;systems.splice(pendingDeleteIndex,1);closeDeleteConfirm();renderSystems();showToast(`${name}已删除`)});
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(!systemModal.hidden)closeSystemModal();else if(!deleteSystemModal.hidden)closeDeleteConfirm();else if(!systemDrawerLayer.hidden)closeSystemDrawer()});
function showToast(message){const toast=document.getElementById('managerToast');toast.textContent=message;toast.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.hidden=true,2200)}

renderStageTree();
renderSystems();
if(location.hash==='#systems'){
  const systemButton=document.querySelector('[data-view="系统入口管理"]');
  systemButton.closest('section').classList.add('open');
  showSystemEntry(systemButton);
}
