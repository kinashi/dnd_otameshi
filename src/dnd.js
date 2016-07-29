(function () {
  let lists = document.getElementsByTagName('li');

  var clientRect = {};
  clientRect.threshold = 0;

  var targetEl = null;
  var targetNextEl = null;
  var droped = false;

  function onDragStart(e) {
    targetEl = e.currentTarget;
    targetNextEl = e.currentTarget.nextElementSibling;
    targetEl.style.opacity = .5;

    setTimeout(() => {
      targetEl.style.opacity = 0;
    } ,0);
  }
  function onDragOver(e) {
    e.preventDefault();
    if(e.currentTarget === targetEl) return;

    if(e.clientY < clientRect.threshold) {
      e.currentTarget.parentNode.insertBefore(targetEl, e.currentTarget);
    } else {
      e.currentTarget.parentNode.insertBefore(targetEl, e.currentTarget.nextElementSibling);
    }
  }
  function onDragEnter(e) {
    if(e.currentTarget === targetEl) {
      targetEl.style.border = '2px dashed #ccc';
      targetEl.style.opacity = .5;
    }
    clientRect = e.currentTarget.getBoundingClientRect();
    clientRect.threshold = clientRect.top + clientRect.height / 2;
  }
  function onDragLeave(e) {
    if(e.clientX < clientRect.left || e.clientX > clientRect.right) {
      targetEl.parentNode.insertBefore(targetEl, targetNextEl);
      targetEl.style.border = '';
      targetEl.style.opacity = 0;
    }
  }
  function onDrop(e) {
    if(e.currentTarget === targetEl) droped = true;
    e.preventDefault();
  }
   function onDragEnd(e) {
    if(!droped) targetEl.parentNode.insertBefore(targetEl, targetNextEl);
    droped = false;
    targetEl.style.opacity = '';
    targetEl.style.border = '';
  }

  Array.prototype.forEach.call(lists, (obj, idx, arr) => {
    obj.addEventListener('dragstart', onDragStart, false);
    obj.addEventListener('dragover', onDragOver, false);
    obj.addEventListener('dragleave', onDragLeave, false);
    obj.addEventListener('dragenter', onDragEnter, false);
    obj.addEventListener('drop', onDrop, false);
    obj.addEventListener('dragend', onDragEnd, false);
  });
})();