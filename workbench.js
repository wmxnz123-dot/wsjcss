const sidebar=document.getElementById('workbenchSidebar');
const sidebarToggle=document.getElementById('sidebarToggle');
const dashboardView=document.getElementById('dashboardView');
const datasetApplyView=document.getElementById('datasetApplyView');
const datasetManageView=document.getElementById('datasetManageView');
const resourceListView=document.getElementById('resourceListView');
const productListView=document.getElementById('productListView');
const resourceCreateView=document.getElementById('resourceCreateView');
const demandDeliveryView=document.getElementById('demandDeliveryView');
const demandPublishView=document.getElementById('demandPublishView');
const publishedDemandView=document.getElementById('publishedDemandView');
const toolOrderView=document.getElementById('toolOrderView');
const myToolsView=document.getElementById('myToolsView');
const placeholderView=document.getElementById('placeholderView');
const placeholderTitle=document.getElementById('placeholderTitle');
const placeholderDescription=document.getElementById('placeholderDescription');
const breadcrumbCurrent=document.getElementById('breadcrumbCurrent');
const breadcrumbRoot=document.getElementById('breadcrumbRoot');
const breadcrumb=document.getElementById('workbenchBreadcrumb');
const userButton=document.getElementById('workbenchUser');
const userMenu=document.getElementById('workbenchUserMenu');
const primaryButtons=[...document.querySelectorAll('[data-primary]')];
const primaryPanels=[...document.querySelectorAll('[data-primary-panel]')];

document.querySelectorAll('.nav-group-title').forEach(button=>button.addEventListener('click',()=>{const group=button.closest('.nav-group-block');group.classList.toggle('open');button.setAttribute('aria-expanded',String(group.classList.contains('open')));}));
function setSubgroupState(group,open){group.classList.toggle('open',open);const title=group.querySelector('.nav-subgroup-title');if(title)title.setAttribute('aria-expanded',String(open));}
document.querySelectorAll('.nav-subgroup-title').forEach(button=>button.addEventListener('click',()=>{const group=button.closest('.nav-subgroup'),panel=group.closest('.sidebar-panel'),willOpen=!group.classList.contains('open');panel.querySelectorAll('.nav-subgroup').forEach(item=>setSubgroupState(item,item===group&&willOpen));}));

function clearActive(){document.querySelectorAll('[data-page]').forEach(item=>item.classList.remove('active'));}
function showPrimary(primary){primaryButtons.forEach(button=>button.classList.toggle('active',button.dataset.primary===primary));primaryPanels.forEach(panel=>panel.hidden=panel.dataset.primaryPanel!==primary);const activePrimary=primaryButtons.find(button=>button.dataset.primary===primary);if(activePrimary)breadcrumbRoot.textContent=activePrimary.textContent.trim();}
function openPage(button){const name=button.dataset.page;clearActive();button.classList.add('active');const navMatch=[...document.querySelectorAll('.workbench-nav [data-page]')].find(item=>item.dataset.page===name);if(navMatch){navMatch.classList.add('active');const panel=navMatch.closest('[data-primary-panel]');if(panel){showPrimary(panel.dataset.primaryPanel);const activeGroup=navMatch.closest('.nav-subgroup');panel.querySelectorAll('.nav-subgroup').forEach(group=>setSubgroupState(group,group===activeGroup));}}breadcrumbCurrent.textContent=name==='工作台首页'?'首页':name;breadcrumb.hidden=(name==='工作台首页'||name==='需求交付'||name==='高质量数据集申报'||name==='需求发布'||name==='高质量数据集管理'||name==='已发布需求'||name==='工具申请工单'||name==='我申请的工具');dashboardView.hidden=true;datasetApplyView.hidden=true;datasetManageView.hidden=true;resourceListView.hidden=true;productListView.hidden=true;resourceCreateView.hidden=true;demandDeliveryView.hidden=true;demandPublishView.hidden=true;publishedDemandView.hidden=true;toolOrderView.hidden=true;myToolsView.hidden=true;placeholderView.hidden=true;if(name==='工作台首页'){dashboardView.hidden=false;}else if(name==='高质量数据集申报'){datasetApplyView.hidden=false;}else if(name==='高质量数据集管理'){datasetManageView.hidden=false;}else if(name==='数据资源登记'){resourceListView.hidden=false;}else if(name==='数据产品登记'){productListView.hidden=false;}else if(name==='需求交付'){demandDeliveryView.hidden=false;}else if(name==='需求发布'){demandPublishView.hidden=false;}else if(name==='已发布需求'){publishedDemandView.hidden=false;}else if(name==='工具申请工单'){toolOrderView.hidden=false;}else if(name==='我申请的工具'){myToolsView.hidden=false;}else{placeholderView.hidden=false;placeholderTitle.textContent=name;placeholderDescription.textContent=button.dataset.description||'页面功能将在后续逐步完善';}sidebar.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>openPage(button)));
primaryButtons.forEach(button=>button.addEventListener('click',()=>{const panel=document.querySelector(`[data-primary-panel="${button.dataset.primary}"]`);const target=panel&&[...panel.querySelectorAll('[data-page]')].find(item=>item.dataset.page===button.dataset.defaultPage);if(target)openPage(target);else showPrimary(button.dataset.primary);}));
document.getElementById('backDashboard').addEventListener('click',()=>openPage(document.querySelector('.nav-home')));
sidebarToggle.addEventListener('click',event=>{event.stopPropagation();sidebar.classList.toggle('open');});
sidebar.addEventListener('click',event=>event.stopPropagation());
userButton.addEventListener('click',event=>{event.stopPropagation();userMenu.hidden=!userMenu.hidden;});
userMenu.addEventListener('click',event=>event.stopPropagation());
document.addEventListener('click',()=>{userMenu.hidden=true;sidebar.classList.remove('open');});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){userMenu.hidden=true;sidebar.classList.remove('open');}});

const recordKeyword=document.getElementById('datasetRecordKeyword');
const recordDomain=document.getElementById('datasetRecordDomain');
const recordBody=document.getElementById('datasetRecordBody');
const recordCount=document.getElementById('datasetRecordCount');
const recordEmpty=document.getElementById('datasetRecordEmpty');
let recordStatusSelected=[];
function filterDatasetRecords(){const keyword=recordKeyword.value.trim().toLowerCase(),domain=recordDomain.value;let visible=0;[...recordBody.rows].forEach(row=>{const matchedKeyword=!keyword||(row.dataset.keywords+' '+row.textContent).toLowerCase().includes(keyword);const matchedDomain=domain==='all'||row.textContent.includes(domain);const st=row.dataset.status;const matchedStatus=recordStatusSelected.length===0||recordStatusSelected.includes(st);row.hidden=!(matchedKeyword&&matchedDomain&&matchedStatus);if(!row.hidden)visible++;});recordCount.textContent=visible;recordEmpty.hidden=visible!==0;}
const datasetRecordSearchBtn=document.getElementById('datasetRecordSearch');if(datasetRecordSearchBtn)datasetRecordSearchBtn.addEventListener('click',filterDatasetRecords);
recordKeyword.addEventListener('input',filterDatasetRecords);
recordDomain.addEventListener('change',filterDatasetRecords);
document.getElementById('queryDatasetFilter').addEventListener('click',filterDatasetRecords);
const recStTrigger=document.getElementById('datasetStatusTrigger'),recStDrop=document.getElementById('datasetStatusDrop');
function syncRecChecks(){recStDrop.querySelectorAll('input').forEach(c=>c.checked=recordStatusSelected.includes(c.value));}
recStTrigger.addEventListener('click',e=>{e.stopPropagation();const open=recStDrop.hidden;recStDrop.hidden=!open;recStTrigger.classList.toggle('on',!open);});
document.addEventListener('click',()=>{recStDrop.hidden=true;recStTrigger.classList.remove('on');});
recStDrop.addEventListener('click',e=>e.stopPropagation());
document.getElementById('datasetStatusOk').addEventListener('click',()=>{recordStatusSelected=[...recStDrop.querySelectorAll('input:checked')].map(c=>c.value);recStDrop.hidden=true;recStTrigger.classList.remove('on');filterDatasetRecords();});
document.getElementById('datasetStatusReset').addEventListener('click',()=>{recordStatusSelected=[];syncRecChecks();filterDatasetRecords();});
document.getElementById('resetDatasetFilter').addEventListener('click',()=>{recordDomain.value='all';recordStatusSelected=[];syncRecChecks();filterDatasetRecords();});

const manageKeyword=document.getElementById('datasetManageKeyword');
const manageBody=document.getElementById('datasetManageBody');
const manageCount=document.getElementById('datasetManageCount');
const manageEmpty=document.getElementById('datasetManageEmpty');
function filterDatasetManage(){const keyword=manageKeyword.value.trim().toLowerCase();let visible=0;[...manageBody.rows].forEach(row=>{const show=!keyword||(row.dataset.keywords+' '+row.textContent).toLowerCase().includes(keyword);row.hidden=!show;if(show)visible++;});manageCount.textContent=visible;manageEmpty.hidden=visible!==0;}
document.getElementById('datasetManageSearch').addEventListener('click',filterDatasetManage);
manageKeyword.addEventListener('input',filterDatasetManage);
let datasetRevertRow=null;
function openDatasetRevert(){document.getElementById('datasetRevertConfirmModal').hidden=false;document.body.classList.add('modal-open');}
function closeDatasetRevert(){document.getElementById('datasetRevertConfirmModal').hidden=true;document.body.classList.remove('modal-open');datasetRevertRow=null;}
function doDatasetRevert(){const row=datasetRevertRow;closeDatasetRevert();if(!row)return;row.dataset.status='已撤销';const tag=row.querySelector('.status-tag');if(tag){tag.className='status-tag returned';tag.textContent='已撤销';}const btn=row.querySelector('.table-link.danger');if(btn){btn.textContent='已撤销';btn.disabled=true;}}
manageBody.addEventListener('click',event=>{const btn=event.target.closest('.table-link');if(!btn||btn.textContent!=='撤销')return;const row=btn.closest('tr');if(!row||row.dataset.status==='已撤销')return;datasetRevertRow=row;openDatasetRevert();});
document.getElementById('confirmDatasetRevert').addEventListener('click',doDatasetRevert);
document.getElementById('cancelDatasetRevert').addEventListener('click',closeDatasetRevert);
document.getElementById('closeDatasetRevert').addEventListener('click',closeDatasetRevert);
document.getElementById('datasetRevertConfirmModal').addEventListener('click',event=>{if(event.target===event.currentTarget)closeDatasetRevert();});
document.getElementById('datasetManageRefresh').addEventListener('click',()=>{manageKeyword.value='';filterDatasetManage();});
document.getElementById('datasetManageReset').addEventListener('click',()=>{manageKeyword.value='';filterDatasetManage();});
filterDatasetManage();

const declareModal=document.getElementById('datasetDeclareModal');
const declareForm=document.getElementById('datasetDeclareForm');
const declareToast=document.getElementById('datasetDeclareToast');
function openDatasetDeclare(){declareModal.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>document.getElementById('wbDatasetName').focus(),0);}
function closeDatasetDeclare(){declareModal.hidden=true;document.body.classList.remove('modal-open');}
document.getElementById('openDatasetDeclare').addEventListener('click',openDatasetDeclare);
document.getElementById('closeDatasetDeclare').addEventListener('click',closeDatasetDeclare);
document.getElementById('cancelDatasetDeclare').addEventListener('click',closeDatasetDeclare);
declareModal.addEventListener('click',event=>{if(event.target===declareModal)closeDatasetDeclare();});

function appendDatasetRecord(){const row=document.createElement('tr');const name=document.getElementById('wbDatasetName').value.trim();const industry=document.getElementById('wbIndustry').value;row.dataset.keywords=[name,industry].join(' ');row.dataset.status='审核中';const detail={product:readField('wbClientProduct'),name:name,industry:industry,source:readField('wbDataSource'),modal:readChecked('wbModal'),scale:readField('wbScale'),coverTime:readField('wbCoverTime'),coverRegion:readField('wbCoverRegion'),updateMech:readChecked('wbUpdateMech'),period:readField('wbPeriod'),investment:readField('wbInvestment'),overview:readField('wbOverview'),honors:readField('wbHonors'),buildMode:readChecked('wbBuildMode'),orgName:readField('wbOrgName'),orgCode:readField('wbOrgCode'),orgContact:readField('wbOrgContact'),orgPhone:readField('wbOrgPhone'),orgEmail:readField('wbOrgEmail'),orgAddress:readField('wbOrgAddress'),orgApplicant:readField('wbOrgApplicant')};row.dataset.detail=JSON.stringify(detail);const now=new Date().toLocaleString('zh-CN',{hour12:false});const tdx=t=>{const c=document.createElement('td');c.textContent=t;return c;};row.append(tdx(recordBody.rows.length+1));const nameTd=tdx(name);nameTd.textContent='';const strong=document.createElement('strong');strong.textContent=name;nameTd.append(strong);row.append(nameTd);row.append(tdx(industry));const st=document.createElement('td');const tag=document.createElement('span');tag.className='status-tag pending';tag.textContent='审核中';st.append(tag);row.append(st);row.append(tdx(now));const btnTd=document.createElement('td');const btn=document.createElement('button');btn.className='table-link';btn.type='button';btn.textContent='查看';btnTd.append(btn);row.append(btnTd);recordBody.prepend(row);}
declareForm.addEventListener('submit',event=>{event.preventDefault();if(!declareForm.reportValidity())return;appendDatasetRecord();closeDatasetDeclare();declareForm.reset();recordKeyword.value='';recordDomain.value='all';recordStatusSelected=[];syncRecChecks();filterDatasetRecords();declareToast.hidden=false;setTimeout(()=>declareToast.hidden=true,3500);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!declareModal.hidden)closeDatasetDeclare();});

/* 高质量数据集申报 - 详情抽屉 */
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function readField(id){const el=document.getElementById(id);return el?""+el.value.trim():'';}
function readChecked(name){return [...document.querySelectorAll('input[name="'+name+'"]:checked')].map(c=>c.value).join('、');}
const datasetDrawerMask=document.getElementById('datasetDrawerMask');
const datasetDrawerTabs=[...document.querySelectorAll('[data-dataset-tab]')];
function setDatasetTab(tab){datasetDrawerTabs.forEach(b=>b.classList.toggle('active',b.dataset.datasetTab===tab));datasetDrawerMask.querySelectorAll('[data-dataset-pane]').forEach(p=>p.hidden=p.dataset.datasetPane!==tab);}
const datasetSeedDetails={
'园林植物病虫害图像识别数据集':{product:'城市园林管护产品',source:'采集自城市公园、绿地及行道树的病虫害样本，经人工标注形成图像样本集',modal:'图像',scale:'原始图像约10万张，标注样本3.6万张，约220GB',coverTime:'2018年—2026年',coverRegion:'汶上县城区及各乡镇园林绿化区域',updateMech:'按天更新',period:'2025年6月—2026年6月',investment:'420',overview:'面向城市园林病虫害智能识别，支持图像识别算法训练与园林养护决策。',honors:'—',buildMode:'自主建设',orgName:'山东天力能源股份有限公司',orgCode:'91370100163079868P',orgContact:'张鑫',orgPhone:'18615677828',orgEmail:'zhangxin@tianli.com',orgAddress:'山东省汶上县经济开发区',orgApplicant:'张鑫'},
'城市环卫设施识别数据集':{product:'环卫设施监管产品',source:'环卫车辆与设施点位采集图像，结合道路巡检上传数据整理',modal:'图像',scale:'设施点位图像约6万张，覆盖垃圾桶、转运站等，约90GB',coverTime:'2019年—2026年',coverRegion:'汶上县城区道路及社区',updateMech:'按天更新',period:'2025年3月—2025年12月',investment:'260',overview:'用于环卫设施位置与状态识别，支撑环卫精细化管理。',honors:'—',buildMode:'自主建设',orgName:'山东天力能源股份有限公司',orgCode:'91370100163079868P',orgContact:'李娜',orgPhone:'18615677829',orgEmail:'lina@tianli.com',orgAddress:'山东省汶上县经济开发区',orgApplicant:'李娜'},
'公共停车与充电设施时空数据集':{product:'停车充电运营产品',source:'停车场闸机、充电桩运营系统实时产生的设施状态与使用记录',modal:'文本',scale:'年累计记录超1200万条，约28GB',coverTime:'2020年—2026年',coverRegion:'汶上县城区公共停车及充电场站',updateMech:'实时更新',period:'2025年1月—2026年3月',investment:'860',overview:'面向停车与充电设施时空分布分析，支撑运营调度与规划。',honors:'2025年"数据要素×"大赛德州市选拔赛三等奖',buildMode:'产学研联合建设',orgName:'山东天力能源股份有限公司',orgCode:'91370100163079868P',orgContact:'王强',orgPhone:'18615677830',orgEmail:'wangqiang@tianli.com',orgAddress:'山东省汶上县经济开发区',orgApplicant:'王强'},
'作物墒情与长势预测数据集':{product:'作物墒情长势产品',source:'田间土壤墒情传感器、气象站及遥感影像采集数据',modal:'文本',scale:'逐日墒情与长势记录约450万条，约15GB',coverTime:'2017年—2026年',coverRegion:'汶上县主要粮食种植区',updateMech:'按天更新',period:'2025年2月—2026年4月',investment:'380',overview:'面向作物墒情与长势预测分析，支撑农业防灾与灌溉决策。',honors:'—',buildMode:'集成创新',orgName:'山东天力能源股份有限公司',orgCode:'91370100163079868P',orgContact:'赵敏',orgPhone:'18615677831',orgEmail:'zhaomin@tianli.com',orgAddress:'山东省汶上县经济开发区',orgApplicant:'赵敏'}
};
function seedDatasetDetail(name,industry){return datasetSeedDetails[name]||{product:'—',name:name,industry:industry||'—',source:'—',modal:'—',scale:'—',coverTime:'—',coverRegion:'—',updateMech:'—',period:'—',investment:'—',overview:'—',honors:'—',buildMode:'—',orgName:'—',orgCode:'—',orgContact:'—',orgPhone:'—',orgEmail:'—',orgAddress:'—',orgApplicant:'—'};}
function renderDatasetInfo(d){const m=(title,items)=>'<section class="drawer-card"><h4>'+esc(title)+'</h4><dl class="drawer-card-grid">'+items.map(i=>'<div'+(i.span?' class="span2"':'')+'><dt>'+esc(i.k)+'</dt><dd>'+(i.v||'—')+'</dd></div>').join('')+'</dl></section>';document.getElementById('datasetDrawerInfoPane').innerHTML=m('关联产品',[{k:'已发布产品',v:esc(d.product||'—')}])+m('基本信息',[{k:'高质量数据集名称',v:esc(d.name),span:true},{k:'建设重点领域',v:esc(d.industry||'—')},{k:'数据集主要数据来源',v:esc(d.source||'—'),span:true},{k:'模态类型',v:esc(d.modal||'—')},{k:'数据集规模',v:esc(d.scale||'—'),span:true},{k:'覆盖时间范围',v:esc(d.coverTime||'—')},{k:'覆盖地域范围',v:esc(d.coverRegion||'—')},{k:'更新机制',v:esc(d.updateMech||'—')},{k:'项目实施周期',v:esc(d.period||'—')},{k:'计划投资额（万元）',v:esc(d.investment||'—')},{k:'数据集概况',v:esc(d.overview||'—'),span:true},{k:'所获知识产权或荣誉情况',v:esc(d.honors||'—'),span:true},{k:'建设方式',v:esc(d.buildMode||'—')}])+m('申报单位信息',[{k:'申报单位名称',v:esc(d.orgName||'—'),span:true},{k:'统一社会信用代码',v:esc(d.orgCode||'—')},{k:'联系人',v:esc(d.orgContact||'—')},{k:'联系电话',v:esc(d.orgPhone||'—')},{k:'联系邮箱',v:esc(d.orgEmail||'—')},{k:'申报人',v:esc(d.orgApplicant||'—')},{k:'通讯地址',v:esc(d.orgAddress||'—'),span:true}]);}
function fillDatasetTimeline(d,status,time){const t=time||'—';const node=(title,mark,cls,meta,comment)=>'<li class="'+cls+'"><i class="tl-dot">'+mark+'</i><div><div class="tl-title">'+title+'</div>'+(meta?'<div class="tl-meta">'+meta+'</div>':'')+(comment?'<div class="tl-comment">'+comment+'</div>':'')+'</div></li>';let approve;if(status==='已通过'){approve=node('平台审核','✓','','<span>处理时间 <b>'+t+'</b></span><span>处理人 <b>平台审核员</b></span><span>处理部门 <b>数据资源运营中心</b></span><span>处理结果 <em class="tl-result">通过</em></span>','意见：申报通过，请按申报信息完成数据集发布');}else if(status==='已驳回'){approve=node('平台审核','✕','','<span>处理时间 <b>'+t+'</b></span><span>处理人 <b>平台审核员</b></span><span>处理部门 <b>数据资源运营中心</b></span><span>处理结果 <em class="tl-result">驳回</em></span>','意见：申报材料不完整，请补充后重新提交');}else{approve=node('平台审核','⏳','pending','<span>处理时间 <b>待处理</b></span><span>处理人 <b>平台审核员</b></span><span>处理部门 <b>数据资源运营中心</b></span><span>处理结果 <em class="tl-result">待审批</em></span>','意见：申报材料正在审核中');}document.getElementById('datasetDrawerTimeline').innerHTML=node('开始','▶','start','','')+node('提交申报','✓','','<span>处理时间 <b>'+t+'</b></span><span>处理人 <b>'+(d.orgContact||'申报人')+'</b></span><span>处理部门 <b>'+(d.orgName||'申报单位')+'</b></span><span>处理结果 <em class="tl-result">提交</em></span>','意见：高质量数据集申报材料已提交')+approve+node('结束','■','end','','');}
function openDatasetDrawer(row){const cells=[...row.children].map(c=>c.textContent.trim());const name=cells[1],industry=cells[2],status=cells[3],time=cells[4];let detail=null;try{detail=JSON.parse(row.dataset.detail||'null');}catch(e){detail=null;}if(!detail)detail=seedDatasetDetail(name,industry);const cls=status==='已通过'?'completed':(status==='已驳回'?'cancelled':'delivering');const stEl=document.getElementById('datasetDrawerStatus');stEl.textContent=status;stEl.className='drawer-status '+cls;document.getElementById('datasetDrawerName').textContent=detail.name||name;document.getElementById('datasetDrawerField').textContent=industry;document.getElementById('datasetDrawerTime').textContent=time;renderDatasetInfo(detail);fillDatasetTimeline(detail,status,time);setDatasetTab('info');datasetDrawerMask.hidden=false;document.body.style.overflow='hidden';}
function closeDatasetDrawer(){datasetDrawerMask.hidden=true;document.body.style.overflow='';}
document.getElementById('closeDatasetDrawer').addEventListener('click',closeDatasetDrawer);
document.getElementById('datasetDrawerCloseBtn').addEventListener('click',closeDatasetDrawer);
datasetDrawerMask.addEventListener('click',e=>{if(e.target===datasetDrawerMask)closeDatasetDrawer();});
datasetDrawerTabs.forEach(b=>b.addEventListener('click',()=>setDatasetTab(b.dataset.datasetTab)));
recordBody.addEventListener('click',event=>{const btn=event.target.closest('.table-link');if(btn)openDatasetDrawer(btn.closest('tr'));});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!datasetDrawerMask.hidden)closeDatasetDrawer();});

const resourceForm=document.getElementById('resourceCreateForm');
const resourceBody=document.getElementById('resourceRecordBody');
const resourceEmptyRow=document.getElementById('resourceEmptyRow');
const resourceFieldRows=document.getElementById('resourceFieldRows');
let resourceFieldIndex=0;
let resourcePage=1;

function showResourceList(){resourceCreateView.hidden=true;resourceListView.hidden=false;breadcrumbCurrent.textContent='数据资源登记';window.scrollTo({top:0,behavior:'smooth'});}
function showResourceCreate(){resourceListView.hidden=true;resourceCreateView.hidden=false;breadcrumbCurrent.textContent='新建数据资源登记';if(!resourceFieldRows.children.length)addResourceFieldRow();window.scrollTo({top:0,behavior:'smooth'});setTimeout(()=>document.getElementById('resourceName').focus(),0);}
function addResourceFieldRow(){resourceFieldIndex+=1;const row=document.createElement('div');row.className='resource-field-row';row.innerHTML=`<span>${resourceFieldIndex}</span><input aria-label="信息项名称" placeholder="如：patient_name"><input aria-label="信息项描述" placeholder="如：患者姓名"><select aria-label="数据类型"><option>String</option><option>Number</option><option>Date</option><option>Boolean</option><option>Object</option></select><div><button type="button" data-field-complete>完成</button><button type="button" data-field-delete>删除</button></div>`;row.querySelector('[data-field-complete]').addEventListener('click',()=>row.querySelectorAll('input,select').forEach(item=>item.blur()));row.querySelector('[data-field-delete]').addEventListener('click',()=>{row.remove();[...resourceFieldRows.children].forEach((item,index)=>item.firstElementChild.textContent=index+1);resourceFieldIndex=resourceFieldRows.children.length;});resourceFieldRows.append(row);}
function appendResourceRecord(status){const row=document.createElement('tr'),name=document.getElementById('resourceName').value.trim()||'未命名数据资源',holder=document.getElementById('resourceHolder').value,industry=document.getElementById('resourceIndustry').value||'未分类';row.dataset.resourceRecord='true';row.dataset.keywords=[name,holder,industry].join(' ').toLowerCase();const values=[resourceBody.querySelectorAll('[data-resource-record]').length+1,name,holder,industry,'一般',status,'无变更',new Date().toLocaleString('zh-CN',{hour12:false}),'查看'];values.forEach((value,index)=>{const cell=document.createElement('td');if(index===5){const tag=document.createElement('span');tag.className='status-tag '+(status==='草稿'?'draft':'pending');tag.textContent=value;cell.append(tag);}else if(index===8){const button=document.createElement('button');button.type='button';button.className='table-link';button.textContent=value;cell.append(button);}else{cell.textContent=value;}row.append(cell);});resourceBody.insertBefore(row,resourceEmptyRow);resourcePage=1;}
function resetResourceForm(){resourceForm.reset();document.getElementById('resourceHolder').value='山东天力能源股份有限公司';document.getElementById('resourceHolderCode').value='91370100163079868P';resourceFieldRows.innerHTML='';resourceFieldIndex=0;addResourceFieldRow();}

document.getElementById('backResourceList').addEventListener('click',showResourceList);
document.getElementById('cancelResourceCreate').addEventListener('click',showResourceList);
document.getElementById('addResourceField').addEventListener('click',addResourceFieldRow);
document.getElementById('saveResourceDraft').addEventListener('click',()=>{appendResourceRecord('草稿');resetResourceForm();showResourceList();});
resourceForm.addEventListener('submit',event=>{event.preventDefault();if(!resourceForm.reportValidity())return;appendResourceRecord('待审核');resetResourceForm();showResourceList();});
addResourceFieldRow();

function filterProductRows(){const keyword=document.getElementById('productKeyword').value.trim().toLowerCase();let visible=0;[...document.querySelectorAll('#productRecordBody [data-product-record]')].forEach(row=>{const matched=!keyword||row.dataset.keywords.toLowerCase().includes(keyword);row.hidden=!matched;if(matched)visible+=1;});const counter=document.getElementById('productCount');if(counter)counter.textContent=String(visible);}
document.getElementById('productSearchButton')&&document.getElementById('productSearchButton').addEventListener('click',filterProductRows);
document.getElementById('productKeyword')&&document.getElementById('productKeyword').addEventListener('input',filterProductRows);

const pendingDeliveryBody=document.getElementById('pendingDeliveryBody');
const completedDeliveryBody=document.getElementById('completedDeliveryBody');
let deliveryMode='pending';
function setDeliveryMode(mode){deliveryMode=mode;const pending=mode==='pending';pendingDeliveryBody.hidden=!pending;completedDeliveryBody.hidden=pending;document.getElementById('pendingDeliveryTab').classList.toggle('active',pending);document.getElementById('completedDeliveryTab').classList.toggle('active',!pending);document.getElementById('pendingDeliveryTab').setAttribute('aria-selected',String(pending));document.getElementById('completedDeliveryTab').setAttribute('aria-selected',String(!pending));document.getElementById('deliveryListTitle').textContent=pending?'需求待交付列表':'需求已交付列表';document.getElementById('deliveryTableHead').innerHTML=pending?'<tr><th>序号</th><th>需求编号</th><th>需求名称</th><th>交付形式</th><th>紧急程度</th><th>结束时间</th><th>数据需求方</th><th>应答时间</th><th>操作</th></tr>':'<tr><th>序号</th><th>需求编号</th><th>需求名称</th><th>交付形式</th><th>紧急程度</th><th>结束时间</th><th>数据需求方</th><th>交付状态</th><th>交付时间</th><th>操作</th></tr>';filterDeliveryRecords();}
function filterDeliveryRecords(){const body=deliveryMode==='pending'?pendingDeliveryBody:completedDeliveryBody,kw=document.getElementById('deliveryKeyword').value.trim().toLowerCase(),type=document.getElementById('deliveryType').value,urgency=document.getElementById('deliveryUrgency').value,scene=document.getElementById('deliveryScene').value,requester=document.getElementById('deliveryRequester').value.trim().toLowerCase();let visible=0;body.querySelectorAll('[data-delivery-record]').forEach(row=>{const rq=row.cells[6].textContent.toLowerCase(),ug=row.cells[4].textContent;const show=(!kw||row.dataset.keywords.toLowerCase().includes(kw))&&(type==='all'||row.dataset.delivery===type)&&(urgency==='all'||ug===urgency)&&(scene==='all'||row.dataset.scene===scene)&&(!requester||rq.includes(requester));row.hidden=!show;if(show)visible+=1;});document.getElementById('deliveryEmpty').hidden=visible!==0;document.getElementById('deliveryRecordCount').textContent=visible;}
function resetDeliveryFilters(){document.getElementById('deliveryKeyword').value='';document.getElementById('deliveryType').value='all';document.getElementById('deliveryUrgency').value='all';document.getElementById('deliveryScene').value='all';document.getElementById('deliveryRequester').value='';filterDeliveryRecords();}
document.getElementById('pendingDeliveryTab').addEventListener('click',()=>setDeliveryMode('pending'));
document.getElementById('completedDeliveryTab').addEventListener('click',()=>setDeliveryMode('completed'));
document.getElementById('deliveryUrgency').addEventListener('change',filterDeliveryRecords);
document.getElementById('deliveryScene').addEventListener('change',filterDeliveryRecords);
document.getElementById('deliveryRequester').addEventListener('input',filterDeliveryRecords);

/* 需求详情抽屉 */
const deliveryDrawerMask=document.getElementById('deliveryDrawerMask');
const deliveryDrawerTabs=[...document.querySelectorAll('[data-drawer-tab]')];
const $=id=>document.getElementById(id);
function openDeliveryDrawer(row){const completed=row.closest('#completedDeliveryBody');const cells=[...row.children].map(c=>c.textContent.trim());const name=cells[2],delivery=cells[3],urgency=cells[4],deadline=cells[5],requester=cells[6];const statusEl=$('deliveryDrawerStatus');if(completed){const stVal=cells[7];const statusText=stVal||'已交付';statusEl.textContent=statusText;statusEl.className='drawer-status '+(statusText==='已交付'?'completed':'cancelled');$('drawer-foot').hidden=true;}else{statusEl.textContent='交付中';statusEl.className='drawer-status delivering';$('drawer-foot').hidden=false;}const metaTime=completed?(cells[8]||''):(cells[7]||'');$('deliveryDrawerName').textContent=name;$('deliveryDrawerRequester').textContent=requester;$('deliveryDrawerCreated').textContent=metaTime;$('diNo').textContent=cells[1];$('diName').textContent=name;$('diDeadline').textContent=deadline;$('diDelivery').textContent=delivery;$('diUrgency').textContent=urgency;$('diScene').textContent=row.dataset.scene||'--';$('diRequester').textContent=requester;$('diContact').textContent='数据需求方';$('diPhone').textContent='18615677828';$('diDesc').textContent=row.dataset.keywords||name;$('matchOperator').textContent='**信息技术有限公司';$('matchContact').textContent='数据开发方';$('matchPhone').textContent='18615677829';$('matchTime').textContent=metaTime;if(completed){$('deliveryInfoCard').hidden=false;$('deliveryProductName').textContent=name;$('deliveryProductType').textContent=delivery;$('deliveryProductTime').textContent=cells[8]||'--';}else{$('deliveryInfoCard').hidden=true;}$('deliveryMatchTab').hidden=completed;$('deliveryApprovalTab').hidden=!completed;if(completed){fillApprovalTimeline(requester,metaTime||'');}setDrawerTab('info');deliveryDrawerMask.hidden=false;document.body.style.overflow='hidden';}
function setDrawerTab(tab){deliveryDrawerTabs.forEach(b=>b.classList.toggle('active',b.dataset.drawerTab===tab));$('drawerPaneInfo').hidden=tab!=='info';$('drawerPaneMatch').hidden=tab!=='match';$('drawerPaneApproval').hidden=tab!=='approval';}
function fillApprovalTimeline(requester,baseTime){const t=baseTime||'--';const node=(title,mark,cls,meta,comment)=>'<li class="'+cls+'"><i class="tl-dot">'+mark+'</i><div><div class="tl-title">'+title+'</div>'+(meta?'<div class="tl-meta">'+meta+'</div>':'')+(comment?'<div class="tl-comment">'+comment+'</div>':'')+'</div></li>';const t2=(t!=='--'&&t.length<=10)?t:t;$('deliveryApprovalTimeline').innerHTML=node('开始','▶','start','','')+node('需求方发布需求','✓','','<span>处理时间 <b>'+t2+'</b></span><span>处理人 <b>数据需求方</b></span><span>处理部门 <b>'+requester+'</b></span><span>处理结果 <em class="tl-result">通过</em></span>','意见：提交自动审核通过')+node('平台运营方审核','✓','','<span>处理时间 <b>'+t2+'</b></span><span>处理人 <b>数据开发方</b></span><span>处理部门 <b>**信息技术有限公司</b></span><span>处理结果 <em class="tl-result">通过</em></span>','意见：通过')+node('结束','■','end','','');}
function closeDeliveryDrawer(){deliveryDrawerMask.hidden=true;document.body.style.overflow='';}
$('closeDeliveryDrawer').addEventListener('click',closeDeliveryDrawer);
deliveryDrawerMask.addEventListener('click',e=>{if(e.target===deliveryDrawerMask)closeDeliveryDrawer();});
deliveryDrawerTabs.forEach(b=>b.addEventListener('click',()=>setDrawerTab(b.dataset.drawerTab)));
document.querySelectorAll('.delivery-table .table-link').forEach(btn=>btn.addEventListener('click',()=>openDeliveryDrawer(btn.closest('tr'))));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!deliveryDrawerMask.hidden)closeDeliveryDrawer();});
$('cancelResponseBtn').addEventListener('click',closeDeliveryDrawer);
$('confirmDeliveryBtn').addEventListener('click',closeDeliveryDrawer);
const queryDeliveryFilterBtn=document.getElementById('queryDeliveryFilter');if(queryDeliveryFilterBtn)queryDeliveryFilterBtn.addEventListener('click',filterDeliveryRecords);
document.getElementById('deliveryKeyword').addEventListener('input',filterDeliveryRecords);
document.getElementById('deliveryType').addEventListener('change',filterDeliveryRecords);
document.getElementById('resetDeliveryFilter').addEventListener('click',resetDeliveryFilters);
document.getElementById('queryDeliveryFilterExpanded').addEventListener('click',filterDeliveryRecords);
document.getElementById('refreshDeliveryList').addEventListener('click',resetDeliveryFilters);

const demandModal=document.getElementById('demandPublishModal');
const demandForm=document.getElementById('demandPublishForm');
const demandToast=document.getElementById('demandPublishToast');
const demandPublishBody=document.getElementById('demandPublishBody');
const managedDemandBody=document.getElementById('managedDemandBody');

function openDemandModal(){demandModal.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>document.getElementById('demandName').focus(),0);}
function closeDemandModal(){demandModal.hidden=true;document.body.classList.remove('modal-open');}
function resetSelectsAndInput(ids){ids.forEach(id=>{const element=document.getElementById(id);element.value=element.tagName==='SELECT'?'all':'';});}
let publishStatusSelected=[],publishSort=null,managedStatusSelected=[],managedSort=null;
function filterDemandRows(body,values,empty){let list=[...body.querySelectorAll('[data-demand-record]')].filter(row=>{const kw=!values.keyword||row.dataset.keywords.toLowerCase().includes(values.keyword);const dl=values.delivery==='all'||row.dataset.delivery===values.delivery;const ur=values.urgency==='all'||row.dataset.urgency===values.urgency;const sc=!values.scene||values.scene==='all'||row.dataset.scene===values.scene;const sts=!values.status||values.status.length===0||values.status.includes(row.cells[values.statusCol].textContent.trim());return kw&&dl&&ur&&sc&&sts;});if(values.sort){const dir=values.sort.dir,ci=values.sort.col;list=list.slice().sort((a,b)=>dir*(a.cells[ci].textContent.localeCompare(b.cells[ci].textContent)));}body.querySelectorAll('[data-demand-record]').forEach(r=>r.remove());const frag=document.createDocumentFragment();list.forEach((r,i)=>{r.cells[0].textContent=i+1;frag.appendChild(r);});body.appendChild(frag);empty.hidden=list.length!==0;}
function filterPublishDemands(){filterDemandRows(demandPublishBody,{keyword:document.getElementById('publishDemandKeyword').value.trim().toLowerCase(),delivery:document.getElementById('publishDemandDelivery').value,urgency:document.getElementById('publishDemandUrgency').value,status:publishStatusSelected,statusCol:6,sort:publishSort},document.getElementById('demandPublishEmpty'));}
function filterManagedDemands(){filterDemandRows(managedDemandBody,{keyword:document.getElementById('managedDemandKeyword').value.trim().toLowerCase(),delivery:document.getElementById('managedDemandDelivery').value,urgency:document.getElementById('managedDemandUrgency').value,scene:document.getElementById('managedDemandScene').value,status:managedStatusSelected,statusCol:7,sort:managedSort},document.getElementById('managedDemandEmpty'));}
function bindDemandStatus(trigger,drop,okBtn,resetBtn,getter,setter,apply){trigger.addEventListener('click',function(e){e.stopPropagation();const open=drop.hidden;drop.hidden=!open;trigger.classList.toggle('on',!open);});drop.addEventListener('click',function(e){e.stopPropagation();});okBtn.addEventListener('click',function(){setter([...drop.querySelectorAll('input:checked')].map(function(c){return c.value;}));drop.hidden=true;trigger.classList.remove('on');apply();});resetBtn.addEventListener('click',function(){setter([]);drop.querySelectorAll('input').forEach(function(c){c.checked=false;});apply();});}
(function(){const pt=document.getElementById('publishStatusTrigger'),pd=document.getElementById('publishStatusDrop'),mt=document.getElementById('managedStatusTrigger'),md=document.getElementById('managedStatusDrop');bindDemandStatus(pt,pd,document.getElementById('publishStatusOk'),document.getElementById('publishStatusReset'),null,function(v){publishStatusSelected=v;},filterPublishDemands);bindDemandStatus(mt,md,document.getElementById('managedStatusOk'),document.getElementById('managedStatusReset'),null,function(v){managedStatusSelected=v;},filterManagedDemands);function sortClick(body,get,set,apply){return function(e){const s=e.target.closest('.dsort');if(!s)return;const col=Number(s.dataset.col);if(get()&&get().col===col){const g=get();g.dir*=-1;}else{set({col:col,dir:1});}body.querySelectorAll('.dsort').forEach(a=>a.textContent='↕');s.textContent=get().dir===1?'↑':'↓';apply();};}demandPublishBody.addEventListener('click',sortClick(demandPublishBody,function(){return publishSort;},function(v){publishSort=v;},filterPublishDemands));managedDemandBody.addEventListener('click',sortClick(managedDemandBody,function(){return managedSort;},function(v){managedSort=v;},filterManagedDemands));document.addEventListener('click',function(){pd.hidden=true;md.hidden=true;pt.classList.remove('on');mt.classList.remove('on');});})();
function renumberDemandRows(body){[...body.querySelectorAll('[data-demand-record]')].forEach((row,index)=>row.cells[0].textContent=index+1);}
function appendDemandRecord(){const name=document.getElementById('demandName').value.trim(),delivery=demandForm.elements.demandDelivery.value,urgency=demandForm.elements.demandUrgency.value,deadline=document.getElementById('demandDeadline').value;const now=new Date(),number='XQ'+now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0');const row=document.createElement('tr');row.dataset.demandRecord='true';row.dataset.keywords=name;row.dataset.delivery=delivery;row.dataset.urgency=urgency;const values=['',number,name,delivery,urgency,deadline,'平台运营方审核',now.toLocaleString('zh-CN',{hour12:false}),'查看'];values.forEach((value,index)=>{const cell=document.createElement('td');if(index===4){const tag=document.createElement('span');tag.className='urgency-tag'+(urgency==='紧急'?' urgent':'');tag.textContent=value;cell.append(tag);}else if(index===6){const tag=document.createElement('span');tag.className='demand-status reviewing';tag.textContent=value;cell.append(tag);}else if(index===8){const button=document.createElement('button');button.type='button';button.className='table-link';button.textContent=value;cell.append(button);}else{cell.textContent=value;}row.append(cell);});demandPublishBody.prepend(row);renumberDemandRows(demandPublishBody);}
const rp=document.createElement('tr');rp.dataset.demandRecord='true';rp.dataset.keywords='12';rp.dataset.delivery='数据接口';rp.dataset.urgency='普通';['','XQ20261016001','12','数据接口','普通','2026-10-31','已退回','2026-10-16 16:48:03',''].forEach(function(v,i){const c=document.createElement('td');if(i===4){const t=document.createElement('span');t.className='urgency-tag';t.textContent=v;c.append(t);}else if(i===6){const t=document.createElement('span');t.className='demand-status returned';t.textContent=v;c.append(t);}else if(i===8){const w=document.createElement('span');w.className='table-actions';['查看','编辑','删除'].forEach(function(x){const b=document.createElement('button');b.type='button';b.className='table-link';b.textContent=x;w.append(b);});c.append(w);}else{c.textContent=v;}rp.append(c);});demandPublishBody.prepend(rp);renumberDemandRows(demandPublishBody);

document.getElementById('openDemandPublish').addEventListener('click',openDemandModal);
document.getElementById('closeDemandPublish').addEventListener('click',closeDemandModal);
document.getElementById('cancelDemandPublish').addEventListener('click',closeDemandModal);
demandModal.addEventListener('click',event=>{if(event.target===demandModal)closeDemandModal();});
const queryPublishDemandBtn=document.getElementById('queryPublishDemand');if(queryPublishDemandBtn)queryPublishDemandBtn.addEventListener('click',filterPublishDemands);
document.getElementById('queryPublishDemandExpanded').addEventListener('click',filterPublishDemands);
document.getElementById('publishDemandKeyword').addEventListener('input',filterPublishDemands);
document.getElementById('publishDemandDelivery').addEventListener('change',filterPublishDemands);
document.getElementById('publishDemandUrgency').addEventListener('change',filterPublishDemands);
document.getElementById('resetPublishDemand').addEventListener('click',()=>{resetSelectsAndInput(['publishDemandKeyword','publishDemandDelivery','publishDemandUrgency']);filterPublishDemands();});
document.getElementById('refreshPublishDemand').addEventListener('click',()=>{resetSelectsAndInput(['publishDemandKeyword','publishDemandDelivery','publishDemandUrgency']);filterPublishDemands();});
const queryManagedDemandBtn=document.getElementById('queryManagedDemand');if(queryManagedDemandBtn)queryManagedDemandBtn.addEventListener('click',filterManagedDemands);
document.getElementById('queryManagedDemandExpanded').addEventListener('click',filterManagedDemands);
document.getElementById('managedDemandKeyword').addEventListener('input',filterManagedDemands);
document.getElementById('managedDemandDelivery').addEventListener('change',filterManagedDemands);
document.getElementById('managedDemandUrgency').addEventListener('change',filterManagedDemands);
document.getElementById('managedDemandScene').addEventListener('change',filterManagedDemands);
document.getElementById('resetManagedDemand').addEventListener('click',()=>{resetSelectsAndInput(['managedDemandKeyword','managedDemandDelivery','managedDemandUrgency','managedDemandScene']);filterManagedDemands();});
document.getElementById('refreshManagedDemand').addEventListener('click',()=>{resetSelectsAndInput(['managedDemandKeyword','managedDemandDelivery','managedDemandUrgency','managedDemandScene']);filterManagedDemands();});
demandForm.addEventListener('submit',event=>{event.preventDefault();const attachment=document.getElementById('demandAttachment').files[0];if(attachment&&attachment.size>10*1024*1024){alert('附件不能超过10MB');return;}if(!demandForm.reportValidity())return;appendDemandRecord();closeDemandModal();demandForm.reset();document.getElementById('demandContact').value='数据开发方';document.getElementById('demandPhone').value='18615677829';resetSelectsAndInput(['publishDemandKeyword','publishDemandDelivery','publishDemandUrgency']);filterPublishDemands();demandToast.hidden=false;setTimeout(()=>demandToast.hidden=true,3500);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!demandModal.hidden)closeDemandModal();});

document.querySelectorAll('.filter-toggle').forEach(button=>{
  const panel=document.getElementById(button.getAttribute('aria-controls'));
  if(!panel)return;
  button.addEventListener('click',()=>{
    const opening=panel.hidden;
    panel.hidden=!opening;
    button.setAttribute('aria-expanded',String(opening));
    button.classList.toggle('active',opening);
  });
});

/* 工具中心 - 工具申请工单 */
const toolOrders=[
  {no:'GD20261012001',tool:'数据沙箱',cat:'数据分析',time:'2026-10-12 09:31',status:'已通过',scene:'城市治理数据探索与样本分析',applicant:'数据开发部',phone:'18615677829',remark:'面向城市治理相关数据集开展探索性分析与建模验证，申请通过后即可登录使用。'},
  {no:'GD20261011002',tool:'智能体开发平台',cat:'AI开发',time:'2026-10-11 14:20',status:'待审核',scene:'政务问答智能体开发',applicant:'数据开发部',phone:'18615677829',remark:'用于构建政务数据智能问答应用。'},
  {no:'GD20261009003',tool:'数据标注平台',cat:'AI数据',time:'2026-10-09 16:45',status:'已退回',scene:'训练样本标注',applicant:'数据开发部',phone:'18615677829',remark:'申请对图像样本进行标注服务。'},
  {no:'GD20261008004',tool:'数据资源治理平台',cat:'数据治理',time:'2026-10-08 11:02',status:'待审核',scene:'数据资源目录治理',applicant:'数据开发部',phone:'18615677829',remark:'用于本企业数据资源编目与质量治理。'},
  {no:'GD20260928005',tool:'视频融合与分析平台',cat:'视觉分析',time:'2026-09-28 10:18',status:'已通过',scene:'视频监控智能分析',applicant:'数据开发部',phone:'18615677829',remark:'对城市视频监控数据进行融合解析。'},
  {no:'GD20260925006',tool:'数据资产管理平台',cat:'资产管理',time:'2026-09-25 15:40',status:'已退回',scene:'数据资产盘点',applicant:'数据开发部',phone:'18615677829',remark:'用于企业数据资产台账管理。'},
  {no:'GD20260920007',tool:'物联网感知平台',cat:'物联感知',time:'2026-09-20 09:12',status:'已通过',scene:'物联设备监测',applicant:'数据开发部',phone:'18615677829',remark:'接入物联感知数据并支持实时监测。'},
  {no:'GD20260915008',tool:'区块链核验',cat:'区块链',time:'2026-09-15 17:36',status:'待审核',scene:'数据存证核验',applicant:'数据开发部',phone:'18615677829',remark:'用于关键数据的存证与哈希核验。'}
];
const toolOrderBody=document.getElementById('toolOrderBody');
function renderToolOrders(){let html='';toolOrders.forEach((o,i)=>{const cls=o.status==='已通过'?'approved':(o.status==='已退回'?'returned':'pending');html+='<tr data-toolorder data-status="'+o.status+'" data-keywords="'+(o.tool+' '+o.cat+' '+o.scene)+'"><td>'+(i+1)+'</td><td>'+o.no+'</td><td><strong>'+o.tool+'</strong></td><td>'+o.cat+'</td><td>'+o.time+'</td><td><span class="status-tag '+cls+'">'+o.status+'</span></td><td><button class="table-link" type="button">查看</button></td></tr>';});toolOrderBody.innerHTML=html;filterToolOrders();}
function filterToolOrders(){const keyword=document.getElementById('toolOrderKeyword').value.trim().toLowerCase(),status=document.getElementById('toolOrderStatus').value;let visible=0;toolOrderBody.querySelectorAll('[data-toolorder]').forEach(row=>{const show=(!keyword||row.dataset.keywords.toLowerCase().includes(keyword))&&(status==='all'||row.dataset.status===status);row.hidden=!show;if(show)visible++;});document.getElementById('toolOrderEmpty').hidden=visible!==0;document.getElementById('toolOrderCount').textContent=visible;}
const toolOrderMask=document.getElementById('toolOrderDrawerMask');
const toolOrderTabs=[...document.querySelectorAll('[data-toolorder-tab]')];
function setToolOrderTab(tab){toolOrderTabs.forEach(b=>b.classList.toggle('active',b.dataset.toolorderTab===tab));toolOrderMask.querySelectorAll('[data-toolorder-pane]').forEach(p=>p.hidden=p.dataset.toolorderPane!==tab);}
function openToolOrderDrawer(no){const o=toolOrders.find(x=>x.no===no);const cls=o.status==='已通过'?'completed':(o.status==='已退回'?'cancelled':'delivering');const st=o.status==='已通过'?'已通过':(o.status==='已退回'?'已退回':'审批中');const stEl=document.getElementById('toolOrderDrawerStatus');stEl.textContent=st;stEl.className='drawer-status '+cls;document.getElementById('toolOrderDrawerName').textContent=o.tool;document.getElementById('toolOrderDrawerNo').textContent=o.no;document.getElementById('toolOrderDrawerTime').textContent=o.time;document.getElementById('toNo').textContent=o.no;document.getElementById('toTool').textContent=o.tool;document.getElementById('toCat').textContent=o.cat;document.getElementById('toTime').textContent=o.time;document.getElementById('toStatus').textContent=st;document.getElementById('toScene').textContent=o.scene;document.getElementById('toApplicant').textContent=o.applicant;document.getElementById('toPhone').textContent=o.phone;document.getElementById('toRemark').textContent=o.remark||'--';fillToolOrderTimeline(o);setToolOrderTab('info');toolOrderMask.hidden=false;document.body.style.overflow='hidden';}
function fillToolOrderTimeline(o){const t=o.time;const node=(title,mark,cls,meta,comment)=>'<li class="'+cls+'"><i class="tl-dot">'+mark+'</i><div><div class="tl-title">'+title+'</div>'+(meta?'<div class="tl-meta">'+meta+'</div>':'')+(comment?'<div class="tl-comment">'+comment+'</div>':'')+'</div></li>';let approval;if(o.status==='待审核'){approval=node('平台审批','⏳','pending','<span>处理时间 <b>待处理</b></span><span>处理人 <b>工具运营方</b></span><span>处理部门 <b>汶上数据运营中心</b></span><span>处理结果 <em class="tl-result">待审核</em></span>','意见：申请正在审核中');}else{const pass=o.status==='已通过';approval=node('平台审批','✓','','<span>处理时间 <b>'+t+'</b></span><span>处理人 <b>工具运营方</b></span><span>处理部门 <b>汶上数据运营中心</b></span><span>处理结果 <em class="tl-result">'+(pass?'通过':'退回')+'</em></span>','意见：'+(pass?'申请通过，请前往使用':o.remark));}document.getElementById('toolOrderTimeline').innerHTML=node('开始','▶','start','','')+node('门户提交申请','✓','','<span>处理时间 <b>'+t+'</b></span><span>处理人 <b>'+o.applicant+'</b></span><span>处理部门 <b>'+o.applicant+'</b></span><span>处理结果 <em class="tl-result">提交</em></span>','意见：工具申请已提交')+approval+node('结束','■','end','','');}
function closeToolOrderDrawer(){toolOrderMask.hidden=true;document.body.style.overflow='';}
document.getElementById('closeToolOrderDrawer').addEventListener('click',closeToolOrderDrawer);
toolOrderMask.addEventListener('click',e=>{if(e.target===toolOrderMask)closeToolOrderDrawer();});
toolOrderTabs.forEach(b=>b.addEventListener('click',()=>setToolOrderTab(b.dataset.toolorderTab)));
document.getElementById('toolOrderRevertBtn').addEventListener('click',closeToolOrderDrawer);
toolOrderBody.addEventListener('click',e=>{const btn=e.target.closest('.table-link');if(btn)openToolOrderDrawer(btn.closest('tr').cells[1].textContent.trim());});
const queryToolOrderBtn=document.getElementById('queryToolOrder');if(queryToolOrderBtn)queryToolOrderBtn.addEventListener('click',filterToolOrders);
document.getElementById('queryToolOrderExpanded').addEventListener('click',filterToolOrders);
document.getElementById('toolOrderKeyword').addEventListener('input',filterToolOrders);
document.getElementById('toolOrderStatus').addEventListener('change',filterToolOrders);
document.getElementById('resetToolOrder').addEventListener('click',()=>{document.getElementById('toolOrderKeyword').value='';document.getElementById('toolOrderStatus').value='all';filterToolOrders();});
document.getElementById('refreshToolOrder').addEventListener('click',()=>{document.getElementById('toolOrderKeyword').value='';document.getElementById('toolOrderStatus').value='all';filterToolOrders();});

/* 工具中心 - 我申请的工具 */
const myTools=[
  {name:'数据沙箱',cat:'数据分析',scene:'数据分析与建模',status:'已开通',openTime:'2026-10-12',provider:'汶上数据运营中心',desc:'提供安全的云端分析环境，支持多类数据集的探索、抽样、可视化与机器学习建模，申请通过后可立即投入分析工作。'},
  {name:'视频融合与分析平台',cat:'视觉分析',scene:'视频智能分析',status:'已开通',openTime:'2026-09-28',provider:'汶上数据运营中心',desc:'支持多路视频接入、结构化解析与智能识别，提供算子编排与事件告警能力。'},
  {name:'物联网感知平台',cat:'物联感知',scene:'物联设备监测',status:'已开通',openTime:'2026-09-20',provider:'汶上数据运营中心',desc:'统一纳管各类型物联网感知设备，提供设备状态、数据订阅与实时监测能力。'},
  {name:'CIM城市信息模型平台',cat:'城市三维',scene:'城市三维建模',status:'待开通',openTime:'2026-10-15',provider:'汶上数据运营中心',desc:'面向城市级三维模型与信息模型构建，支撑数字孪生应用场景开发。'},
  {name:'数据服务平台',cat:'数据服务',scene:'数据接口服务',status:'待开通',openTime:'2026-10-14',provider:'汶上数据运营中心',desc:'提供统一的数据服务发布、调用与管理，支持接口鉴权与调用量度统计。'},
  {name:'数据标注平台',cat:'AI数据',scene:'训练样本标注',status:'待开通',openTime:'2026-10-13',provider:'汶上数据运营中心',desc:'提供图像、文本等多模态数据的标注工具与任务管理能力。'}
];
const myToolBody=document.getElementById('myToolBody');
function renderMyTools(){let html='';myTools.forEach((o,i)=>{const cls=o.status==='已开通'?'approved':'pending';html+='<tr data-mytool data-status="'+o.status+'" data-keywords="'+(o.name+' '+o.cat+' '+o.scene)+'"><td>'+(i+1)+'</td><td><strong>'+o.name+'</strong></td><td>'+o.cat+'</td><td>'+o.scene+'</td><td>'+o.openTime+'</td><td><span class="status-tag '+cls+'">'+o.status+'</span></td><td><button class="table-link" type="button">查看</button></td></tr>';});myToolBody.innerHTML=html;filterMyTools();}
function filterMyTools(){const keyword=document.getElementById('myToolKeyword').value.trim().toLowerCase(),status=document.getElementById('myToolStatus').value;let visible=0;myToolBody.querySelectorAll('[data-mytool]').forEach(row=>{const show=(!keyword||row.dataset.keywords.toLowerCase().includes(keyword))&&(status==='all'||row.dataset.status===status);row.hidden=!show;if(show)visible++;});document.getElementById('myToolEmpty').hidden=visible!==0;document.getElementById('myToolCount').textContent=visible;}
const myToolMask=document.getElementById('myToolDrawerMask');
const myToolTabs=[...document.querySelectorAll('[data-mytool-tab]')];
function setMyToolTab(tab){myToolTabs.forEach(b=>b.classList.toggle('active',b.dataset.mytoolTab===tab));myToolMask.querySelectorAll('[data-mytool-pane]').forEach(p=>p.hidden=p.dataset.mytoolPane!==tab);}
function openMyToolDrawer(name){const o=myTools.find(x=>x.name===name);const active=o.status==='已开通';const stEl=document.getElementById('myToolDrawerStatus');stEl.textContent=o.status;stEl.className='drawer-status '+(active?'completed':'delivering');document.getElementById('myToolDrawerName').textContent=o.name;document.getElementById('myToolDrawerCat').textContent=o.cat;document.getElementById('myToolDrawerScene').textContent=o.scene;document.getElementById('mtName').textContent=o.name;document.getElementById('mtCat').textContent=o.cat;document.getElementById('mtScene').textContent=o.scene;document.getElementById('mtStatus').textContent=o.status;document.getElementById('mtOpenTime').textContent=active?o.openTime:'尚未开通';document.getElementById('mtProvider').textContent=o.provider;document.getElementById('mtDesc').textContent=o.desc;document.getElementById('mtUsageCard').hidden=!active;if(active){document.getElementById('mtEntry').textContent='Web 控制台';document.getElementById('mtEntryUrl').textContent='http://tool.wenshang.gov/tool/'+encodeURIComponent(o.name);document.getElementById('mtEntryUrl').href=document.getElementById('mtEntryUrl').textContent;}document.getElementById('myToolUseBtn').disabled=!active;document.getElementById('myToolUseBtn').textContent=active?'去使用':'待开通';setMyToolTab('info');myToolMask.hidden=false;document.body.style.overflow='hidden';}
function closeMyToolDrawer(){myToolMask.hidden=true;document.body.style.overflow='';}
document.getElementById('closeMyToolDrawer').addEventListener('click',closeMyToolDrawer);
myToolMask.addEventListener('click',e=>{if(e.target===myToolMask)closeMyToolDrawer();});
myToolTabs.forEach(b=>b.addEventListener('click',()=>setMyToolTab(b.dataset.mytoolTab)));
document.getElementById('myToolCloseBtn').addEventListener('click',closeMyToolDrawer);
document.getElementById('myToolUseBtn').addEventListener('click',()=>{const name=document.getElementById('myToolDrawerName').textContent;const o=myTools.find(x=>x.name===name);if(o&&o.status==='已开通'&&o.name)window.open('http://tool.wenshang.gov/tool/'+encodeURIComponent(o.name),'_blank');});
myToolBody.addEventListener('click',e=>{const btn=e.target.closest('.table-link');if(btn)openMyToolDrawer(btn.closest('tr').cells[1].textContent.trim());});
const queryMyToolBtn=document.getElementById('queryMyTool');if(queryMyToolBtn)queryMyToolBtn.addEventListener('click',filterMyTools);
document.getElementById('queryMyToolExpanded').addEventListener('click',filterMyTools);
document.getElementById('myToolKeyword').addEventListener('input',filterMyTools);
document.getElementById('myToolStatus').addEventListener('change',filterMyTools);
document.getElementById('resetMyTool').addEventListener('click',()=>{document.getElementById('myToolKeyword').value='';document.getElementById('myToolStatus').value='all';filterMyTools();});
document.getElementById('refreshMyTool').addEventListener('click',()=>{document.getElementById('myToolKeyword').value='';document.getElementById('myToolStatus').value='all';filterMyTools();});

renderToolOrders();
renderMyTools();

const urlPage=new URLSearchParams(location.search).get('page');
if(urlPage){const navMatch=[...document.querySelectorAll('.workbench-nav [data-page]')].find(item=>item.dataset.page===urlPage);if(navMatch)openPage(navMatch);}
