/**
 * app.js — handles sidebar toggle behavior for mobile screens.
 *
 * The sidebar is always visible on desktop (≥768 px).
 * On mobile it starts hidden (translated off-screen) and can be
 * opened/closed via the hamburger button in the top navigation bar.
 * Closing can also be triggered by clicking the semi-transparent overlay
 * that appears behind the sidebar when it is open.
 */

(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 768; // px — must match the CSS media query

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const menuBtn = document.getElementById('menu-btn');

  if (!sidebar || !overlay || !menuBtn) return;

  /** Open the sidebar and show the overlay. */
  function openSidebar() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    menuBtn.setAttribute('aria-expanded', 'true');
    // Trap focus later if needed; for now just set a label
    menuBtn.setAttribute('aria-label', 'Close navigation menu');
  }

  /** Close the sidebar and hide the overlay. */
  function closeSidebar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open navigation menu');
  }

  /** Toggle the sidebar open/closed (mobile only). */
  function toggleSidebar() {
    if (sidebar.classList.contains('is-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  // Hamburger button click
  menuBtn.addEventListener('click', toggleSidebar);

  // Clicking the overlay closes the sidebar
  overlay.addEventListener('click', closeSidebar);

  // Close sidebar on Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeSidebar();
      menuBtn.focus();
    }
  });

  // When the viewport grows to desktop width, remove mobile state so
  // the sidebar is always shown without the overlay.
  const mq = window.matchMedia('(min-width: ' + MOBILE_BREAKPOINT + 'px)');

  function handleBreakpointChange(e) {
    if (e.matches) {
      // Desktop — remove any mobile-specific state
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open navigation menu');
    }
  }

  // Modern browsers use addEventListener; older ones use addListener
  if (mq.addEventListener) {
    mq.addEventListener('change', handleBreakpointChange);
  } else {
    mq.addListener(handleBreakpointChange);
  }
}());
