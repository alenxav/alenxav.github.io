const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.panel'));

function activateTab(tabId, moveFocus = false) {
  tabs.forEach((tab) => {
    const isTarget = tab.dataset.tab === tabId;
    tab.classList.toggle('is-active', isTarget);
    tab.setAttribute('aria-selected', String(isTarget));
    tab.setAttribute('tabindex', isTarget ? '0' : '-1');
    if (isTarget && moveFocus) {
      tab.focus();
    }
  });

  panels.forEach((panel) => {
    const isTarget = panel.id === `panel-${tabId}`;
    panel.classList.toggle('is-active', isTarget);
    panel.hidden = !isTarget;
  });

  if (window.location.hash !== `#${tabId}`) {
    history.replaceState(null, '', `#${tabId}`);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));

  tab.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(tab);
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = (current + 1) % tabs.length;
      activateTab(tabs[next].dataset.tab, true);
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = (current - 1 + tabs.length) % tabs.length;
      activateTab(tabs[prev].dataset.tab, true);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      activateTab(tabs[0].dataset.tab, true);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      activateTab(tabs[tabs.length - 1].dataset.tab, true);
    }
  });
});

const requestedTab = window.location.hash.replace('#', '').trim();
if (requestedTab && tabs.some((tab) => tab.dataset.tab === requestedTab)) {
  activateTab(requestedTab);
}
