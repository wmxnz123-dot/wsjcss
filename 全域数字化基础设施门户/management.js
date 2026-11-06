const userButton=document.getElementById('managerUser');
const userMenu=document.getElementById('userMenu');
const sidebar=document.getElementById('managerSidebar');
const dashboard=document.getElementById('dashboardView');
const applicationManageView=document.getElementById('applicationManageView');
const systemEntryView=document.getElementById('systemEntryView');
const placeholder=document.getElementById('placeholder');
const placeholderTitle=document.getElementById('placeholderTitle');

userButton.addEventListener('click',event=>{event.stopPropagation();userMenu.hidden=!userMenu.hidden});
userMenu.addEventListener('click',event=>event.stopPropagation());
document.addEventListener('click',()=>userMenu.hidden=true);
document.getElementById('mobileMenu').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.querySelectorAll('.group-title:not(:disabled)').forEach(button=>button.addEventListener('click',()=>{const group=button.closest('section'),open=!group.classList.contains('open');document.querySelectorAll('.manager-sidebar section').forEach(item=>item.classList.remove('open'));group.classList.toggle('open',open)}));

function setActiveView(button){document.querySelectorAll('[data-view]').forEach(item=>item.classList.remove('active'));button.classList.add('active');sidebar.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
function hideViews(){dashboard.hidden=true;applicationManageView.hidden=true;systemEntryView.hidden=true;placeholder.hidden=true}
function showDashboard(){hideViews();dashboard.hidden=false;setActiveView(document.querySelector('[data-view="dashboard"]'))}
function showApplicationManagement(button){hideViews();applicationManageView.hidden=false;setActiveView(button);renderApplicationManagement()}
function showSystemEntry(button){hideViews();systemEntryView.hidden=false;setActiveView(button);renderSystems()}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.view==='dashboard'){showDashboard();return}if(button.dataset.view==='应用管理'){showSystemEntry(button);return}hideViews();placeholder.hidden=false;placeholderTitle.textContent=button.dataset.view;setActiveView(button)}));
document.getElementById('backDashboard').addEventListener('click',showDashboard);
document.querySelectorAll('[data-dashboard-view]').forEach(button=>button.addEventListener('click',()=>{const target=document.querySelector(`.submenu [data-view="${button.dataset.dashboardView}"]`);if(target)target.click()}));

const stageCategories={
  '数智基础设施':['数智基础设施','可信流通平台'],
  '业务赋能应用中心':['业务赋能应用中心'],
  '智慧场景应用':['智慧园林','智慧环卫','市政公用','停充一体化']
};

let systems=[
  {name:'物联网感知平台',stage:'数智基础设施',category:'数智基础设施',status:'已发布',sort:1,date:'2026-10-18 09:30:15'},
  {name:'视频融合分析平台',stage:'数智基础设施',category:'数智基础设施',status:'已发布',sort:2,date:'2026-10-18 14:22:08'},
  {name:'CIM城市信息模型平台',stage:'数智基础设施',category:'数智基础设施',status:'已发布',sort:3,date:'2026-10-20 10:15:36'},
  {name:'数据流通服务平台',stage:'数智基础设施',category:'可信流通平台',status:'已发布',sort:4,date:'2026-10-22 16:40:12'},
  {name:'数据资产管理平台',stage:'数智基础设施',category:'可信流通平台',status:'草稿',sort:5,date:'2026-10-23 11:08:27'},
  {name:'数据资源治理平台',stage:'数智基础设施',category:'可信流通平台',status:'已发布',sort:6,date:'2026-10-25 08:56:44'},
  {name:'数据协作开发平台',stage:'数智基础设施',category:'可信流通平台',status:'未发布',sort:7,date:'2026-10-25 17:20:05'},
  {name:'融合应用开发平台',stage:'业务赋能应用中心',category:'业务赋能应用中心',status:'已发布',sort:1,date:'2026-10-24 09:42:18'},
  {name:'BI可视化开发平台',stage:'业务赋能应用中心',category:'业务赋能应用中心',status:'已发布',sort:2,date:'2026-10-24 15:36:29'},
  {name:'智能体开发应用平台',stage:'业务赋能应用中心',category:'业务赋能应用中心',status:'草稿',sort:3,date:'2026-10-26 13:12:50'},
  {name:'园林资产管理系统',stage:'智慧场景应用',category:'智慧园林',status:'已发布',sort:1,date:'2026-10-26 16:05:11'},
  {name:'垃圾收运监管系统',stage:'智慧场景应用',category:'智慧环卫',status:'已发布',sort:2,date:'2026-10-27 10:28:33'},
  {name:'市政综合管理平台',stage:'智慧场景应用',category:'市政公用',status:'已发布',sort:3,date:'2026-10-28 14:50:46'},
  {name:'联网服务中心',stage:'智慧场景应用',category:'停充一体化',status:'未发布',sort:4,date:'2026-10-29 09:18:02'}
];

const systemIconPresets=[
  ['◉','#e5f4fb','#46afe5'],['▦','#e6eef6','#439fe5'],['◇','#eaf1e5','#72bf49'],
  ['▤','#f6efe3','#f2ae35'],['▰','#f5e9e1','#f38b2a']
];
function createAppId(index){return `117101609545737${String(index+1).padStart(4,'0')}`}
function createAppSecret(index){return `5193848d-${String(index+1).padStart(4,'0')}-479f-ba86-fe31a9b7${String(index+1).padStart(4,'0')}`}
systems.forEach((item,index)=>{const [glyph,bg,color]=systemIconPresets[index%systemIconPresets.length];item.icon=item.icon||glyph;item.iconBg=item.iconBg||bg;item.iconColor=item.iconColor||color;item.iconImage=item.iconImage||'';item.appId=item.appId||createAppId(index);item.appSecret=item.appSecret||createAppSecret(index)});

const allVisibilityRoles=['平台管理员','部门管理员','业务人员','数据运营人员','普通用户'];
const allVisibilityAccounts=['张明','李芳','王磊','陈晨','刘洋','赵敏'];

function currentTimestamp(){const now=new Date(),pad=value=>String(value).padStart(2,'0');return `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`}

const applicationManageBody=document.getElementById('applicationManageBody');
const applicationManageSearch=document.getElementById('applicationManageSearch');
const applicationStageFilter=document.getElementById('applicationStageFilter');
const applicationManageCount=document.getElementById('applicationManageCount');
const applicationManageEmpty=document.getElementById('applicationManageEmpty');
const applicationManagePagination=document.getElementById('applicationManagePagination');
let applicationManagePage=1;
const applicationManagePageSize=10;
const applicationProviders={
  '数智基础设施':'汶上县大数据中心',
  '业务赋能应用中心':'汶上县大数据中心',
  '智慧场景应用':'县级业务主管部门'
};

function applicationAccessState(item){return item.status==='已发布'?'已接入':'配置中'}
function renderApplicationManagement(){
  if(!applicationManageBody)return;
  const keyword=applicationManageSearch.value.trim().toLowerCase();
  const stage=applicationStageFilter.value;
  const filtered=systems.filter(item=>(stage==='全部'||item.stage===stage)&&(!keyword||item.name.toLowerCase().includes(keyword)));
  const pageCount=Math.max(1,Math.ceil(filtered.length/applicationManagePageSize));
  applicationManagePage=Math.min(applicationManagePage,pageCount);
  const pageData=filtered.slice((applicationManagePage-1)*applicationManagePageSize,applicationManagePage*applicationManagePageSize);
  applicationManageCount.textContent=String(filtered.length);
  document.getElementById('applicationTotalCount').textContent=String(systems.length);
  document.getElementById('applicationConnectedCount').textContent=String(systems.filter(item=>applicationAccessState(item)==='已接入').length);
  document.getElementById('applicationConfiguringCount').textContent=String(systems.filter(item=>applicationAccessState(item)==='配置中').length);
  applicationManageBody.innerHTML=pageData.map((item,index)=>{const itemIndex=systems.indexOf(item),state=applicationAccessState(item);return `<tr><td>${(applicationManagePage-1)*applicationManagePageSize+index+1}</td><td><b title="${item.name}">${item.name}</b></td><td>${item.stage}</td><td>${item.category}</td><td>${applicationProviders[item.stage]}</td><td>统一认证</td><td><span class="access-status ${state==='配置中'?'configuring':''}">${state}</span></td><td>${item.date}</td><td><div class="row-actions"><button type="button" data-app-view-index="${itemIndex}">查看</button><button type="button" data-app-edit-index="${itemIndex}">编辑</button><button type="button" data-app-delete-index="${itemIndex}">删除</button></div></td></tr>`}).join('');
  document.querySelector('.application-table-wrap').hidden=!filtered.length;
  applicationManageEmpty.hidden=Boolean(filtered.length);
  applicationManagePagination.innerHTML=filtered.length>applicationManagePageSize?`<span>共 ${filtered.length} 条，第 ${applicationManagePage} / ${pageCount} 页</span><button type="button" data-application-page="${applicationManagePage-1}" ${applicationManagePage===1?'disabled':''} aria-label="上一页">‹</button>${Array.from({length:pageCount},(_,index)=>`<button type="button" class="${applicationManagePage===index+1?'active':''}" data-application-page="${index+1}">${index+1}</button>`).join('')}<button type="button" data-application-page="${applicationManagePage+1}" ${applicationManagePage===pageCount?'disabled':''} aria-label="下一页">›</button>`:'';
}

applicationManageSearch.addEventListener('input',()=>{applicationManagePage=1;renderApplicationManagement()});
applicationStageFilter.addEventListener('change',()=>{applicationManagePage=1;renderApplicationManagement()});
applicationManagePagination.addEventListener('click',event=>{const button=event.target.closest('[data-application-page]');if(!button||button.disabled)return;applicationManagePage=Number(button.dataset.applicationPage);renderApplicationManagement();document.querySelector('.application-list-panel').scrollIntoView({behavior:'smooth',block:'start'})});
applicationManageBody.addEventListener('click',event=>{
  const viewButton=event.target.closest('[data-app-view-index]');
  if(viewButton){openSystemDrawer(Number(viewButton.dataset.appViewIndex));return}
  const editButton=event.target.closest('[data-app-edit-index]');
  if(editButton){openSystemModal(Number(editButton.dataset.appEditIndex));return}
  const deleteButton=event.target.closest('[data-app-delete-index]');
  if(deleteButton)openDeleteConfirm(Number(deleteButton.dataset.appDeleteIndex));
});

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
  stageTree.innerHTML=`<button class="tree-root ${treeButtonClass('全部')}" type="button" data-stage="全部"><i>全</i><b>全部应用</b></button>`+
    Object.entries(stageCategories).map(([stage,categories],index)=>`<div class="tree-group"><button class="tree-stage ${treeButtonClass(stage)}" type="button" data-stage="${stage}"><i>${['基','赋','景'][index]}</i><b>${stage}</b><em>${systems.filter(item=>item.stage===stage).length}</em></button><div class="tree-children">${categories.map(category=>`<button class="tree-category ${treeButtonClass(stage,category)}" type="button" data-stage="${stage}" data-category="${category}">${category}<span>（${systems.filter(item=>item.stage===stage&&item.category===category).length}）</span></button>`).join('')}</div></div>`).join('');
}

function renderSystems(){
  const keyword=systemSearch.value.trim().toLowerCase();
  const filtered=systems.filter(item=>(activeTree.stage==='全部'||item.stage===activeTree.stage)&&(!activeTree.category||item.category===activeTree.category)&&(!keyword||item.name.toLowerCase().includes(keyword))).sort((a,b)=>(Number(a.sort)||9999)-(Number(b.sort)||9999)||String(a.sort).localeCompare(String(b.sort),'zh-CN'));
  const pageCount=Math.max(1,Math.ceil(filtered.length/systemPageSize));
  systemPage=Math.min(systemPage,pageCount);
  const pageData=filtered.slice((systemPage-1)*systemPageSize,systemPage*systemPageSize);
  systemCount.textContent=String(filtered.length);
  systemListTitle.textContent=activeTree.category||activeTree.stage;
  if(activeTree.stage==='全部')systemListTitle.textContent='全部应用';
  systemTableBody.innerHTML=pageData.map((item,index)=>{const itemIndex=systems.indexOf(item);let actions='';if(item.status==='草稿')actions=`<button type="button" data-edit-index="${itemIndex}">编辑</button><button type="button" data-delete-index="${itemIndex}">删除</button>`;else if(item.status==='未发布')actions=`<button type="button" data-view-index="${itemIndex}">查看</button><button type="button" data-edit-index="${itemIndex}">编辑</button><button type="button" data-delete-index="${itemIndex}">删除</button>`;else actions=`<button type="button" data-view-index="${itemIndex}">查看</button><button type="button" data-visibility-index="${itemIndex}">可见用户</button>`;const statusControl=item.status==='草稿'?`<button class="status-switch draft-state" type="button" role="switch" aria-checked="false" disabled><i></i><span>草稿</span></button>`:`<button class="status-switch ${item.status==='已发布'?'active':''}" type="button" role="switch" aria-checked="${item.status==='已发布'}" aria-label="切换${item.name}发布状态" data-status-index="${itemIndex}"><i></i><span>${item.status}</span></button>`;return `<tr><td>${(systemPage-1)*systemPageSize+index+1}</td><td><div class="system-name"><b title="${item.name}">${item.name}</b></div></td><td>${item.category}</td><td>${statusControl}</td><td>${item.sort}</td><td>${item.date}</td><td><div class="row-actions">${actions}</div></td></tr>`}).join('');
  systemTableBody.closest('.system-table-wrap').hidden=!filtered.length;
  systemEmpty.hidden=Boolean(filtered.length);
  systemPagination.innerHTML=filtered.length>systemPageSize?`<span>共 ${filtered.length} 条，第 ${systemPage} / ${pageCount} 页</span><button type="button" data-system-page="${systemPage-1}" ${systemPage===1?'disabled':''} aria-label="上一页">‹</button>${Array.from({length:pageCount},(_,index)=>`<button type="button" class="${systemPage===index+1?'active':''}" data-system-page="${index+1}">${index+1}</button>`).join('')}<button type="button" data-system-page="${systemPage+1}" ${systemPage===pageCount?'disabled':''} aria-label="下一页">›</button>`:'';
  updateDashboardStats();
  renderStageTree();
  renderApplicationManagement();
}

stageTree.addEventListener('click',event=>{const button=event.target.closest('[data-stage]');if(!button)return;activeTree={stage:button.dataset.stage,category:button.dataset.category||''};systemPage=1;renderSystems()});
systemSearch.addEventListener('input',()=>{systemPage=1;renderSystems()});
systemPagination.addEventListener('click',event=>{const button=event.target.closest('[data-system-page]');if(!button||button.disabled)return;systemPage=Number(button.dataset.systemPage);renderSystems();document.querySelector('.entry-content').scrollIntoView({behavior:'smooth',block:'start'})});
systemTableBody.addEventListener('click',event=>{
  const statusButton=event.target.closest('[data-status-index]');
  if(statusButton){const item=systems[Number(statusButton.dataset.statusIndex)];item.status=item.status==='已发布'?'未发布':'已发布';item.date=currentTimestamp();renderSystems();showToast(item.status==='已发布'?`应用“${item.name}”已发布`:`应用“${item.name}”已撤销发布`);return}
  const viewButton=event.target.closest('[data-view-index]');
  if(viewButton){openSystemDrawer(Number(viewButton.dataset.viewIndex),true);return}
  const editButton=event.target.closest('[data-edit-index]');
  if(editButton){openSystemModal(Number(editButton.dataset.editIndex),{publishWizard:true});return}
  const deleteButton=event.target.closest('[data-delete-index]');
  if(deleteButton){openDeleteConfirm(Number(deleteButton.dataset.deleteIndex));return}
  const visibilityButton=event.target.closest('[data-visibility-index]');
  if(visibilityButton)openSystemModal(Number(visibilityButton.dataset.visibilityIndex),{publishWizard:true,initialStep:2,visibilityOnly:true});
});

const systemModal=document.getElementById('systemModal');
const systemForm=document.getElementById('systemForm');
const newAppCategory=document.getElementById('newAppCategory');
const appCategoryOptions=Object.entries(stageCategories).flatMap(([stage,categories])=>categories.map(category=>({stage,category,value:`${stage}::${category}`})));
newAppCategory.innerHTML='<option value="" disabled selected>请选择应用分类</option>'+appCategoryOptions.map(item=>`<option value="${item.value}">${item.category}</option>`).join('');
const appIconPreview=document.getElementById('appIconPreview');
let appIconState={glyph:'▰',bg:'#e5f4fb',color:'#46afe5',image:''};
function renderAppIcon(){appIconPreview.textContent=appIconState.image?'':appIconState.glyph;appIconPreview.style.backgroundColor=appIconState.bg;appIconPreview.style.color=appIconState.color;appIconPreview.style.backgroundImage=appIconState.image?`url(${appIconState.image})`:''}
function syncAppIconControls(){document.querySelectorAll('[data-app-bg]').forEach(button=>button.classList.toggle('active',button.dataset.appBg===appIconState.bg));document.querySelectorAll('[data-app-color]').forEach(button=>button.classList.toggle('active',button.dataset.appColor===appIconState.color));document.querySelectorAll('[data-app-glyph]').forEach(button=>button.classList.toggle('active',button.dataset.appGlyph===appIconState.glyph))}
function resetAppIcon(){appIconState={glyph:'▰',bg:'#e5f4fb',color:'#46afe5',image:''};document.querySelectorAll('[data-app-bg],[data-app-color],[data-app-glyph]').forEach(button=>button.classList.remove('active'));document.querySelector('[data-app-bg="#e5f4fb"]').classList.add('active');document.querySelector('[data-app-color="#46afe5"]').classList.add('active');document.querySelector('[data-app-glyph="▰"]').classList.add('active');renderAppIcon()}
document.querySelector('.app-bg-colors').addEventListener('click',event=>{const button=event.target.closest('[data-app-bg]');if(!button)return;document.querySelectorAll('[data-app-bg]').forEach(item=>item.classList.toggle('active',item===button));appIconState.bg=button.dataset.appBg;renderAppIcon()});
document.querySelector('.app-icon-colors').addEventListener('click',event=>{const button=event.target.closest('[data-app-color]');if(!button)return;document.querySelectorAll('[data-app-color]').forEach(item=>item.classList.toggle('active',item===button));appIconState.color=button.dataset.appColor;renderAppIcon()});
document.querySelector('.app-glyph-row').addEventListener('click',event=>{const button=event.target.closest('[data-app-glyph]');if(!button)return;document.querySelectorAll('[data-app-glyph]').forEach(item=>item.classList.toggle('active',item===button));appIconState.glyph=button.dataset.appGlyph;appIconState.image='';document.getElementById('appIconUpload').value='';renderAppIcon()});
document.getElementById('appIconUpload').addEventListener('change',event=>{const file=event.target.files[0];if(!file)return;if(!['image/jpeg','image/png'].includes(file.type)){showToast('请上传 jpg、jpeg 或 png 格式图标');event.target.value='';return}if(file.size>20*1024){showToast('图标文件请控制在20KB以内');event.target.value='';return}const reader=new FileReader();reader.onload=()=>{const image=new Image();image.onload=()=>{if(image.width>80||image.height>80){showToast('图标尺寸请控制在80px × 80px以内');event.target.value='';return}appIconState.image=reader.result;renderAppIcon()};image.src=reader.result};reader.readAsDataURL(file)});
const descriptionInput=document.getElementById('newSystemDescription');
descriptionInput.addEventListener('input',()=>document.getElementById('descriptionCount').textContent=String(descriptionInput.value.length));
const appFormSteps=document.getElementById('appFormSteps');
const appFormStepOne=document.getElementById('appFormStepOne');
const appFormStepTwo=document.getElementById('appFormStepTwo');
const appFormPrevious=document.getElementById('appFormPrevious');
const appFormNext=document.getElementById('appFormNext');
const partialVisibility=document.getElementById('partialVisibility');
const visibilityError=document.getElementById('visibilityError');
const systemModalSubtitle=document.getElementById('systemModalSubtitle');
const visibilityAccountSearch=document.getElementById('visibilityAccountSearch');
const visibilityAccountCount=document.getElementById('visibilityAccountCount');
const visibilityAccountEmpty=document.getElementById('visibilityAccountEmpty');
let editingSystemIndex=null;
let modalPublishWizard=false;
let modalCurrentStep=1;
let modalVisibilityOnly=false;
function selectedVisibilityValues(name){return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(input=>input.value)}
function filterVisibilityAccounts({clearMismatched=false}={}){const roles=selectedVisibilityValues('visibilityRole');const keyword=visibilityAccountSearch.value.trim().toLowerCase();let visibleCount=0;document.querySelectorAll('.account-options>label').forEach(label=>{const roleMatch=!roles.length||roles.includes(label.dataset.accountRole);const keywordMatch=!keyword||label.dataset.accountSearch.toLowerCase().includes(keyword);const visible=roleMatch&&keywordMatch;label.hidden=!visible;if(clearMismatched&&!roleMatch)label.querySelector('input').checked=false;if(visible)visibleCount+=1});visibilityAccountCount.textContent=String(visibleCount);visibilityAccountEmpty.hidden=visibleCount>0;const accountButton=document.querySelector('[data-select-all="visibilityAccount"]');if(accountButton){const visibleInputs=[...document.querySelectorAll('.account-options>label:not([hidden]) input')];accountButton.textContent=visibleInputs.length&&visibleInputs.every(input=>input.checked)?'取消全选':'全选'}}
function syncVisibilityPanel(){const partial=document.querySelector('input[name="applicationVisibility"]:checked').value==='partial';partialVisibility.hidden=!partial;visibilityError.hidden=true;if(partial)filterVisibilityAccounts()}
function setAppFormStep(step){
  modalCurrentStep=step;
  appFormStepOne.hidden=modalPublishWizard&&step===2;
  appFormStepTwo.hidden=!modalPublishWizard||step===1;
  appFormPrevious.hidden=!modalPublishWizard||step===1||modalVisibilityOnly;
  appFormNext.hidden=!modalPublishWizard||step===2;
  document.getElementById('systemSubmitButton').hidden=modalPublishWizard&&step===1;
  document.querySelectorAll('[data-form-step-indicator]').forEach(indicator=>{const number=Number(indicator.dataset.formStepIndicator);indicator.classList.toggle('active',number===step);indicator.classList.toggle('done',number<step)});
  const connector=appFormSteps.querySelector('em');if(connector)connector.classList.toggle('active',step===2);
  if(modalPublishWizard)systemModalSubtitle.textContent=step===1?'第一步：填写应用基本信息':'第二步：配置应用可见用户';
  systemModal.querySelector('.app-form-scroll').scrollTop=0;
}
function validateStepOne(){const invalid=[...appFormStepOne.querySelectorAll('input[required],select[required],textarea[required]')].find(field=>!field.checkValidity());if(!invalid)return true;invalid.reportValidity();invalid.focus();return false}
function validateVisibility(){if(document.querySelector('input[name="applicationVisibility"]:checked').value==='all')return true;const valid=selectedVisibilityValues('visibilityRole').length>0&&selectedVisibilityValues('visibilityAccount').length>0;visibilityError.hidden=valid;if(!valid)visibilityError.scrollIntoView({behavior:'smooth',block:'center'});return valid}
function openSystemModal(index=null,{publishWizard=false,initialStep=1,visibilityOnly=false}={}){
  editingSystemIndex=index;
  modalPublishWizard=publishWizard;
  modalVisibilityOnly=visibilityOnly;
  systemForm.noValidate=modalVisibilityOnly;
  systemForm.reset();
  resetAppIcon();
  document.getElementById('descriptionCount').textContent='0';
  const title=document.getElementById('systemModalTitle');
  const submitButton=document.getElementById('systemSubmitButton');
  appFormSteps.hidden=!modalPublishWizard;
  visibilityAccountSearch.value='';
  document.querySelectorAll('[data-select-all]').forEach(button=>button.textContent='全选');
  if(index===null){title.textContent='新增应用';submitButton.textContent=modalPublishWizard?'确定发布':'确定新增';systemModalSubtitle.textContent=modalPublishWizard?'第一步：填写应用基本信息':'配置应用展示与平台对接信息';newAppCategory.value=''}
  else{const item=systems[index];title.textContent=visibilityOnly?'配置可见用户':'编辑应用';submitButton.textContent='保存修改';document.getElementById('newSystemName').value=item.name;newAppCategory.value=`${item.stage}::${item.category}`;document.querySelector(`input[name="newSystemStatus"][value="${item.status}"]`).checked=true;document.getElementById('newSystemSort').value=item.sort;document.getElementById('newSystemUrl').value=item.url||'';document.getElementById('newSystemCallback').value=item.callback||'';descriptionInput.value=item.description||'';document.getElementById('descriptionCount').textContent=String(descriptionInput.value.length);appIconState={glyph:item.icon||'▰',bg:item.iconBg||'#e5f4fb',color:item.iconColor||'#46afe5',image:item.iconImage||''};document.querySelector(`input[name="applicationVisibility"][value="${item.visibility||'all'}"]`).checked=true;document.querySelectorAll('input[name="visibilityRole"]').forEach(input=>input.checked=(item.visibleRoles||[]).includes(input.value));document.querySelectorAll('input[name="visibilityAccount"]').forEach(input=>input.checked=(item.visibleAccounts||[]).includes(input.value));syncAppIconControls();renderAppIcon()}
  syncVisibilityPanel();
  if(index!==null)systemModalSubtitle.textContent='修改应用展示与平台对接信息';
  if(visibilityOnly)systemModalSubtitle.textContent='第二步：配置应用可见用户';
  setAppFormStep(initialStep);
  systemModal.hidden=false;document.body.style.overflow='hidden';setTimeout(()=>initialStep===1?document.getElementById('newSystemName').focus():visibilityAccountSearch.focus(),0)
}
function closeSystemModal(){systemModal.hidden=true;systemForm.noValidate=false;editingSystemIndex=null;modalPublishWizard=false;modalVisibilityOnly=false;modalCurrentStep=1;document.body.style.overflow=''}
document.querySelectorAll('input[name="applicationVisibility"]').forEach(input=>input.addEventListener('change',syncVisibilityPanel));
document.querySelectorAll('input[name="visibilityRole"]').forEach(input=>input.addEventListener('change',()=>{filterVisibilityAccounts({clearMismatched:true});visibilityError.hidden=true}));
visibilityAccountSearch.addEventListener('input',()=>filterVisibilityAccounts());
document.querySelectorAll('[data-select-all]').forEach(button=>button.addEventListener('click',()=>{const isAccount=button.dataset.selectAll==='visibilityAccount';const inputs=isAccount?[...document.querySelectorAll('.account-options>label:not([hidden]) input')]:[...document.querySelectorAll(`input[name="${button.dataset.selectAll}"]`)];const shouldCheck=inputs.some(input=>!input.checked);inputs.forEach(input=>input.checked=shouldCheck);button.textContent=shouldCheck?'取消全选':'全选';if(!isAccount)filterVisibilityAccounts({clearMismatched:true});visibilityError.hidden=true}));
appFormNext.addEventListener('click',()=>{if(validateStepOne())setAppFormStep(2)});
appFormPrevious.addEventListener('click',()=>setAppFormStep(1));
document.getElementById('addSystemButton').addEventListener('click',()=>openSystemModal(null,{publishWizard:true}));
document.getElementById('manageAddApplication').addEventListener('click',()=>openSystemModal());
document.querySelectorAll('[data-close-system-modal]').forEach(button=>button.addEventListener('click',closeSystemModal));
systemForm.addEventListener('submit',event=>{event.preventDefault();if(modalPublishWizard&&modalCurrentStep===1){if(validateStepOne())setAppFormStep(2);return}if(modalPublishWizard&&!validateVisibility()){showToast('请完成可见用户配置');return}const wasEditing=editingSystemIndex!==null;const wasVisibilityOnly=modalVisibilityOnly;const previous=wasEditing?systems[editingSystemIndex]:null;const publicationStatus=document.querySelector('input[name="newSystemStatus"]:checked').value;const selected=appCategoryOptions.find(option=>option.value===newAppCategory.value);const visibility=modalPublishWizard?document.querySelector('input[name="applicationVisibility"]:checked').value:(previous?.visibility||'all');const item={name:document.getElementById('newSystemName').value.trim(),stage:selected.stage,category:selected.category,status:publicationStatus,sort:document.getElementById('newSystemSort').value.trim(),date:currentTimestamp(),url:document.getElementById('newSystemUrl').value.trim(),callback:document.getElementById('newSystemCallback').value.trim(),description:descriptionInput.value.trim(),icon:appIconState.glyph,iconBg:appIconState.bg,iconColor:appIconState.color,iconImage:appIconState.image,appId:previous?.appId||createAppId(systems.length),appSecret:previous?.appSecret||createAppSecret(systems.length),visibility,visibleRoles:modalPublishWizard?selectedVisibilityValues('visibilityRole'):(previous?.visibleRoles||[]),visibleAccounts:modalPublishWizard?selectedVisibilityValues('visibilityAccount'):(previous?.visibleAccounts||[])};const wasPublishWizard=modalPublishWizard;if(wasEditing){Object.assign(systems[editingSystemIndex],item)}else{systems.push(item)}activeTree={stage:'全部',category:''};systemPage=1;systemSearch.value='';closeSystemModal();renderSystems();showToast(wasVisibilityOnly?'可见用户配置已更新':wasEditing?'应用信息已更新':(wasPublishWizard?'应用发布配置已保存':'应用新增成功'))});

const systemDrawerLayer=document.getElementById('systemDrawerLayer');
let drawerSystemIndex=null;
let drawerPublishContext=false;
function setDrawerTab(name){document.querySelectorAll('[data-drawer-tab]').forEach(button=>button.classList.toggle('active',button.dataset.drawerTab===name));document.querySelectorAll('[data-drawer-panel]').forEach(panel=>{const active=panel.dataset.drawerPanel===name;panel.classList.toggle('active',active);panel.hidden=!active})}
function openSystemDrawer(index,publishContext=false){
  const item=systems[index];
  drawerSystemIndex=index;
  drawerPublishContext=publishContext;
  document.getElementById('drawerSystemName').textContent=item.name;
  document.getElementById('drawerSystemBasicName').textContent=item.name;
  const icon=document.getElementById('drawerSystemIcon');
  icon.textContent=item.iconImage?'':(item.icon||item.name.slice(0,1));
  icon.style.backgroundColor=item.iconBg||'#deecff';
  icon.style.color=item.iconColor||'var(--blue)';
  icon.style.backgroundImage=item.iconImage?`url(${item.iconImage})`:'';
  const status=document.getElementById('drawerSystemStatus');
  status.textContent=item.status;
  status.className=item.status==='已发布'?'':item.status==='未发布'?'unpublished':'draft';
  document.getElementById('drawerSystemBasicStatus').textContent=item.status;
  document.getElementById('drawerSystemCategory').textContent=item.category;
  document.getElementById('drawerSummaryCategory').textContent=item.category;
  document.getElementById('drawerSystemSort').textContent=item.sort;
  document.getElementById('drawerSystemDate').textContent=item.date;
  document.getElementById('drawerSummaryDate').textContent=item.date;
  document.getElementById('drawerAppId').textContent=item.appId;
  document.getElementById('drawerAppSecret').textContent=item.appSecret;
  document.getElementById('drawerSystemUrl').textContent=item.url||'暂未配置正式访问地址';
  document.getElementById('drawerSystemCallback').textContent=item.callback||'暂未配置登录回调地址';
  document.getElementById('drawerSystemDescription').textContent=item.description||`面向${item.category}业务提供统一的数字化管理与服务能力，通过门户实现统一入口和快捷访问。`;
  const partial=item.visibility==='partial',roles=partial?(item.visibleRoles||[]):allVisibilityRoles,accounts=partial?(item.visibleAccounts||[]):allVisibilityAccounts;
  document.getElementById('drawerVisibilityScope').textContent=partial?'部分人员':'全部人员';
  document.getElementById('drawerVisibilityCount').textContent=`已配置 ${roles.length} 个角色，${accounts.length} 个账号`;
  document.getElementById('drawerVisibleRoles').innerHTML=roles.length?roles.map(role=>`<span>${role}</span>`).join(''):'<em>未指定角色</em>';
  document.getElementById('drawerVisibleAccounts').innerHTML=accounts.length?accounts.map(name=>`<span><i>${name.slice(0,1)}</i><b>${name}</b></span>`).join(''):'<em>未指定账号</em>';
  document.getElementById('drawerEditButton').hidden=publishContext&&item.status==='已发布';
  setDrawerTab('basic');
  systemDrawerLayer.hidden=false;
  document.body.style.overflow='hidden';
}
function closeSystemDrawer(){systemDrawerLayer.hidden=true;document.body.style.overflow=''}
document.querySelectorAll('[data-close-system-drawer]').forEach(button=>button.addEventListener('click',closeSystemDrawer));
document.querySelectorAll('[data-drawer-tab]').forEach(button=>button.addEventListener('click',()=>setDrawerTab(button.dataset.drawerTab)));
document.querySelectorAll('[data-copy-credential]').forEach(button=>button.addEventListener('click',async()=>{const value=document.getElementById(button.dataset.copyCredential).textContent;try{await navigator.clipboard.writeText(value);showToast('应用凭证已复制')}catch(error){const input=document.createElement('textarea');input.value=value;input.style.position='fixed';input.style.opacity='0';document.body.appendChild(input);input.select();document.execCommand('copy');input.remove();showToast('应用凭证已复制')}}));
document.getElementById('drawerEditButton').addEventListener('click',()=>{const index=drawerSystemIndex,publishContext=drawerPublishContext;closeSystemDrawer();openSystemModal(index,{publishWizard:publishContext})});

const deleteSystemModal=document.getElementById('deleteSystemModal');
let pendingDeleteIndex=null;
function openDeleteConfirm(index){pendingDeleteIndex=index;document.getElementById('deleteSystemName').textContent=systems[index].name;deleteSystemModal.hidden=false;document.body.style.overflow='hidden'}
function closeDeleteConfirm(){deleteSystemModal.hidden=true;pendingDeleteIndex=null;document.body.style.overflow=''}
document.querySelectorAll('[data-cancel-delete]').forEach(button=>button.addEventListener('click',closeDeleteConfirm));
document.getElementById('confirmDeleteSystem').addEventListener('click',()=>{if(pendingDeleteIndex===null)return;const name=systems[pendingDeleteIndex].name;systems.splice(pendingDeleteIndex,1);closeDeleteConfirm();renderSystems();showToast(`应用“${name}”已删除`)});
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(!systemModal.hidden)closeSystemModal();else if(!deleteSystemModal.hidden)closeDeleteConfirm();else if(!systemDrawerLayer.hidden)closeSystemDrawer()});
function showToast(message){const toast=document.getElementById('managerToast');toast.textContent=message;toast.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.hidden=true,2200)}

renderStageTree();
renderSystems();
if(location.hash==='#apps'||location.hash==='#systems'||location.hash==='#publish'){
  const systemButton=document.querySelector('[data-view="应用管理"]');
  systemButton.closest('section').classList.add('open');
  showSystemEntry(systemButton);
}
