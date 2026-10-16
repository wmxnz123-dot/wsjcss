document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.header-actions').forEach((actions,index)=>{
    actions.querySelectorAll('.login-btn,.workbench-btn').forEach(item=>item.remove());
    const menu=document.createElement('div');
    menu.className='account-menu';
    menu.innerHTML=`<button class="account-trigger" type="button" aria-expanded="false" aria-controls="accountPanel${index}"><span class="account-avatar">企</span><span class="account-name">自定义名称555</span><span class="account-caret">▼</span></button><section class="account-panel" id="accountPanel${index}" aria-label="用户账户菜单" hidden><div class="account-profile"><span class="account-company-logo">企</span><div><strong>自定义名称555</strong><span>山东天力能源股份有限公司</span><small>ID：91370100163079868P</small></div></div><div class="account-quick-grid"><button class="account-quick" type="button" data-account-action="认证详情"><b>企业身份认证</b><span>已认证</span></button><button class="account-quick" type="button" data-account-action="连接器申领"><b>连接器申领</b><span>查看详情</span></button></div><div class="account-entry-list"><button class="account-workbench" type="button" data-account-action="我的工作台"><span>进入我的工作台</span><i>→</i></button><button class="account-admin" type="button" data-account-action="管理方后台"><span>进入管理方后台</span><i>→</i></button></div><div class="account-footer"><button type="button" data-account-action="修改信息">⚙ 修改信息</button><button type="button" data-account-action="退出账号">⇥ 退出账号</button></div></section>`;
    const mobileButton=actions.querySelector('.menu-btn');
    actions.insertBefore(menu,mobileButton||null);
    const trigger=menu.querySelector('.account-trigger'),panel=menu.querySelector('.account-panel');
    const open=()=>{document.querySelectorAll('.account-panel').forEach(item=>item.hidden=true);document.querySelectorAll('.account-trigger').forEach(item=>item.setAttribute('aria-expanded','false'));panel.hidden=false;trigger.setAttribute('aria-expanded','true');};
    const close=()=>{panel.hidden=true;trigger.setAttribute('aria-expanded','false');};
    trigger.addEventListener('click',event=>{event.stopPropagation();const opening=panel.hidden;document.querySelectorAll('.account-panel').forEach(item=>item.hidden=true);document.querySelectorAll('.account-trigger').forEach(item=>item.setAttribute('aria-expanded','false'));panel.hidden=!opening;trigger.setAttribute('aria-expanded',String(opening));});
    let closeTimer=null;
    const keepOpen=()=>{if(closeTimer){clearTimeout(closeTimer);closeTimer=null;}};
    const scheduleClose=()=>{if(closeTimer)clearTimeout(closeTimer);closeTimer=setTimeout(close,180);};
    trigger.addEventListener('mouseenter',open);
    trigger.addEventListener('mouseleave',scheduleClose);
    panel.addEventListener('mouseenter',keepOpen);
    panel.addEventListener('mouseleave',scheduleClose);
    panel.addEventListener('click',event=>event.stopPropagation());
    menu.querySelectorAll('[data-account-action]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.accountAction==='我的工作台'){window.location.href='workbench.html';return;}if(button.dataset.accountAction==='管理方后台'){window.location.href='management.html';return;}const old=document.querySelector('.account-menu-toast');if(old)old.remove();const toast=document.createElement('div');toast.className='account-menu-toast';toast.textContent=`${button.dataset.accountAction}入口待接入`;document.body.appendChild(toast);setTimeout(()=>toast.remove(),1800);}));
    document.addEventListener('click',close);
    document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
  });
});
