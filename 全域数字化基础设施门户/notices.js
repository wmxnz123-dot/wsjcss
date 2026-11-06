(function () {
  const notices = [
    {
      id: 'access-check', category: '通知公告', date: '2026-11-04', day: '04', month: '2026-11',
      title: '关于开展平台业务系统接入信息核对工作的通知', publisher: '汶上县大数据中心', views: 126,
      summary: '为进一步完善全域数字化基础设施统一门户系统信息，现开展业务系统接入信息集中核对工作。',
      attachment: '业务系统接入信息核对表.xlsx',
      content: ['各有关单位：', '为进一步完善全域数字化基础设施统一门户系统信息，确保各业务系统入口、责任单位及服务状态准确有效，现组织开展业务系统接入信息集中核对工作。', '请各单位重点核对系统名称、访问地址、责任部门、联系人及系统运行状态等内容，并于2026年11月10日前完成信息确认。发现信息变更或系统入口异常的，请在核对表中注明具体情况。', '本次核对结果将作为后续门户系统目录更新和统一身份认证接入工作的基础，请各单位认真组织、按时反馈。']
    },
    {
      id: 'resource-update', category: '通知公告', date: '2026-11-02', day: '02', month: '2026-11',
      title: '全域数据资源目录更新公告', publisher: '汶上县大数据中心', views: 214,
      summary: '本次目录更新新增园林、环卫、市政公用等专题数据资源，并同步优化资源检索与分类展示。',
      attachment: '全域数据资源目录更新清单.pdf',
      content: ['为持续提升全县数据资源统一汇聚和共享服务能力，平台已完成2026年第四季度全域数据资源目录更新。', '本次更新新增智慧园林、智慧环卫、市政公用、停充一体化等专题数据资源共86项，调整资源责任单位信息12项，并优化资源分类标签和检索条件。', '各单位可通过门户“资源中心”查询更新后的资源目录。如对目录内容有疑问，请联系平台运营人员反馈。']
    },
    {
      id: 'maintenance', category: '通知公告', date: '2026-10-30', day: '30', month: '2026-10',
      title: '统一门户维护升级公告', publisher: '平台运行维护中心', views: 305,
      summary: '统一门户将于11月1日22:00至23:30进行例行维护，期间部分统一认证服务可能短时不可用。',
      attachment: '平台维护影响范围说明.pdf',
      content: ['为保障平台稳定运行，统一门户计划于2026年11月1日22:00至23:30进行例行维护升级。', '维护期间，门户首页可正常访问，统一身份认证、业务系统单点登录及部分统计数据更新服务可能出现短时中断。已登录的业务系统不受影响。', '请各单位提前安排相关工作。维护完成后各项服务将自动恢复，由此带来的不便敬请谅解。']
    },
    {
      id: 'iot-spec', category: '政策文件', date: '2026-10-28', day: '28', month: '2026-10',
      title: '物联感知设备接入规范（试行）发布通知', publisher: '汶上县大数据中心', views: 188,
      summary: '规范统一物联设备编码、数据格式、接口协议及安全要求，支撑全域感知设备标准化接入。',
      attachment: '物联感知设备接入规范（试行）.pdf',
      content: ['为规范全县物联感知设备接入和数据汇聚管理，提升设备统一纳管与协同应用能力，现发布《物联感知设备接入规范（试行）》。', '规范明确了设备编码、数据格式、接口协议、运行监测及安全管理等要求。新建项目应按照规范实施，已建项目可结合系统升级逐步完成适配。', '试行过程中如有意见建议，请及时反馈至县大数据中心。']
    },
    {
      id: 'scene-report', category: '通知公告', date: '2026-10-24', day: '24', month: '2026-10',
      title: '智慧场景应用专题数据报送通知', publisher: '平台运营管理组', views: 156,
      summary: '请智慧园林、智慧环卫、市政公用和停充一体化相关单位更新专题统计数据。',
      attachment: '智慧场景专题数据报送模板.xlsx',
      content: ['各相关单位：', '为做好智慧场景应用运行情况统计，请智慧园林、智慧环卫、市政公用和停充一体化相关责任单位更新专题指标数据。', '报送内容包括资源规模、业务任务、运行状态和异常事件等指标。各项数据统计口径应与平台统计中心保持一致，并确保数据真实、完整。', '请于2026年10月31日前将数据报送模板反馈至平台运营管理组。']
    },
    {
      id: 'sso-guide', category: '使用说明', date: '2026-10-20', day: '20', month: '2026-10',
      title: '统一身份认证系统使用说明', publisher: '平台运行维护中心', views: 472,
      summary: '介绍门户统一登录、业务系统跳转、账号安全及常见问题处理方式。',
      attachment: '统一身份认证系统使用手册.pdf',
      content: ['统一身份认证系统为门户纳管业务系统提供统一登录和单点访问服务。用户登录门户后，可在有权访问的系统卡片中直接进入相关业务系统。', '首次登录时请及时修改初始密码并完善个人信息。密码应包含字母、数字和特殊字符，且不得与近期使用过的密码重复。', '如遇账号锁定、系统无权限或单点登录失败，可联系本单位管理员或平台运行维护中心处理。']
    }
  ];

  const listView = document.getElementById('noticesListView');
  const detail = document.getElementById('noticeDetail');
  const list = document.getElementById('noticesList');
  const categoryWrap = document.getElementById('noticesCategories');
  const search = document.getElementById('noticesSearch');
  const count = document.getElementById('noticesCount');
  const pagination = document.getElementById('noticesPagination');
  if (!listView || !detail || !list || !categoryWrap || !search || !count || !pagination) return;

  let activeCategory = '全部';
  let currentPage = 1;
  const pageSize = 4;
  const categories = ['全部', '通知公告', '政策文件', '使用说明'];

  function renderCategories() {
    categoryWrap.innerHTML = categories.map(category =>
      `<button type="button" class="${category === activeCategory ? 'active' : ''}" data-category="${category}">${category}</button>`
    ).join('');
  }

  function renderList() {
    const keyword = search.value.trim().toLowerCase();
    const data = notices.filter(item => {
      const categoryMatched = activeCategory === '全部' || item.category === activeCategory;
      const keywordMatched = !keyword || `${item.title}${item.publisher}${item.summary}`.toLowerCase().includes(keyword);
      return categoryMatched && keywordMatched;
    });
    count.textContent = String(data.length);
    const pageCount = Math.max(1, Math.ceil(data.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const visibleData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    list.innerHTML = visibleData.length ? visibleData.map(item => `
      <button class="notice-row" type="button" data-notice-id="${item.id}">
        <time datetime="${item.date}"><b>${item.day}</b><span>${item.month}</span></time>
        <span class="notice-row-main">
          <span class="notice-category">${item.category}</span>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <small>发布单位：${item.publisher}　·　浏览 ${item.views} 次</small>
        </span>
        <i aria-hidden="true">→</i>
      </button>`).join('') : '<div class="notices-empty"><b>⌕</b>没有找到符合条件的内容</div>';
    pagination.innerHTML = data.length > pageSize ? `
      <span>第 ${currentPage} / ${pageCount} 页</span>
      <button type="button" data-notice-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="上一页">‹</button>
      ${Array.from({ length: pageCount }, (_, index) => `<button type="button" class="${currentPage === index + 1 ? 'active' : ''}" data-notice-page="${index + 1}">${index + 1}</button>`).join('')}
      <button type="button" data-notice-page="${currentPage + 1}" ${currentPage === pageCount ? 'disabled' : ''} aria-label="下一页">›</button>` : '';
  }

  function showList() {
    detail.hidden = true;
    listView.hidden = false;
  }

  function showDetail(id) {
    const item = notices.find(notice => notice.id === id);
    if (!item) return;
    document.getElementById('noticeDetailCategory').textContent = item.category;
    document.getElementById('noticeDetailTitle').textContent = item.title;
    document.getElementById('noticeDetailDate').textContent = `发布时间：${item.date}`;
    document.getElementById('noticeDetailPublisher').textContent = `发布单位：${item.publisher}`;
    document.getElementById('noticeDetailViews').textContent = `浏览 ${item.views} 次`;
    document.getElementById('noticeDetailBody').innerHTML = item.content.map(text => `<p>${text}</p>`).join('') + `<p class="notice-sign">${item.publisher}<br>${item.date}</p>`;
    const attachment = document.getElementById('noticeAttachment');
    attachment.textContent = `📎 ${item.attachment}`;
    attachment.dataset.filename = item.attachment;
    listView.hidden = true;
    detail.hidden = false;
    document.getElementById('page-notices').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function showToast(message) {
    document.querySelector('.notice-toast')?.remove();
    const toast = document.createElement('div');
    toast.className = 'notice-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 2200);
  }

  categoryWrap.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;
    currentPage = 1;
    renderCategories();
    renderList();
  });
  search.addEventListener('input', () => {
    currentPage = 1;
    renderList();
  });
  pagination.addEventListener('click', event => {
    const button = event.target.closest('[data-notice-page]');
    if (!button || button.disabled) return;
    currentPage = Number(button.dataset.noticePage);
    renderList();
    listView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  list.addEventListener('click', event => {
    const row = event.target.closest('[data-notice-id]');
    if (row) showDetail(row.dataset.noticeId);
  });
  document.getElementById('noticeBack').addEventListener('click', showList);
  document.getElementById('noticeAttachment').addEventListener('click', event => showToast(`“${event.currentTarget.dataset.filename}”为原型展示附件`));
  document.querySelectorAll('[data-page="notices"]').forEach(button => button.addEventListener('click', showList));

  renderCategories();
  renderList();
})();
