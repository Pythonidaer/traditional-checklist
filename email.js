const emailLink = 'mailto:codefolio.work@gmail.com?subject=' + encodeURIComponent('re: Calling For Testcliff');
const recreationRules = [
  'Recreate the Hat Trick Hangman checklist as a responsive, buildless HTML page.',
  'Use a cream background (#f3f0e4), dark teal text and header (#002f35), muted teal rules (#53797a), yellow banner (#ffda73), and red accent (#cc3019).',
  'Place Hat Trick in Great Vibes cursive above HANGMAN in uppercase Arial on a yellow banner with thin inset cream lines. Place the puck logo at the right, overlapping the banner.',
  'Use the existing puck SVG from Pythonidaer/calling-for-testcliff, branch mobile/capacitor-ios-prep, in the index.html brand.',
  'Use Trebuchet MS with Arial and sans-serif fallbacks for the checklist. Keep two columns: Done and Task, square checkboxes, and ruled task fields.',
  'Start with six blank rows. Put the Material Design add icon below the last checkbox. Every click adds a row and focuses its task field.',
  'Checked tasks have strikethrough text; unchecking removes it. Restore the tasks and checked states from this email, including any added rows.',
  'Keep the layout responsive on mobile. Omit the three decorative notes from the original reference.',
  'Put an Email button at the bottom right. Copy styled HTML plus these recreation rules to the clipboard and open an email to codefolio.work@gmail.com with subject re: Calling For Testcliff. The user pastes into the body and sends. No PDF or download.',
  'Email content is a static snapshot. Browser checkboxes and the add button belong to the recreated website, not the email. Custom fonts may fall back in email clients.',
  'Make the puck a keyboard-accessible button with a hard bottom shadow and pointer cursor. It opens a small Notes dialog with a textarea and Save button. Show saved notes below the checklist and include them in email exports. Use a yellow Email button with teal text and border; omit the email status instructions.',
  'Current website: https://pythonidaer.github.io/traditional-checklist/'
];

function escapeEmailText(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function buildChecklistEmail() {
  const entries = Array.from(document.querySelectorAll('tbody tr'), row => ({
    done: row.querySelector('input[type="checkbox"]').checked,
    task: row.querySelector('input[type="text"]').value
  }));
  const notes = document.querySelector('#notes-content').textContent;
  const emailRows = entries.map(entry =>
    '<tr><td width="56" align="center" style="padding:12px 8px;font-size:20px;vertical-align:middle;">' +
    (entry.done ? '&#9745;' : '&#9744;') +
    '</td><td style="padding:12px 8px 5px;border-bottom:1px solid #53797a;font-size:17px;' +
    (entry.done ? 'text-decoration:line-through;' : '') +
    '">' + (escapeEmailText(entry.task) || '&nbsp;') + '</td></tr>'
  ).join('');
  const html = '<div style="max-width:700px;margin:0 auto;background:#f3f0e4;color:#002f35;font-family:Trebuchet MS,Arial,sans-serif;padding:24px;">' +
    '<p style="font-family:Great Vibes,Brush Script MT,Apple Chancery,cursive;font-size:54px;margin:0 0 8px;">Hat Trick</p>' +
    '<div style="background:#ffda73;border-top:1px solid #002f35;border-bottom:1px solid #002f35;padding:12px 16px;font-family:Arial,sans-serif;font-size:38px;">HANGMAN</div>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:30px;color:#002f35;"><thead><tr style="background:#002f35;color:#f3f0e4;"><th width="56" style="padding:6px;font-weight:normal;border-bottom:3px solid #cc3019;">Done</th><th style="padding:6px;font-weight:normal;border-bottom:3px solid #cc3019;">Task</th></tr></thead><tbody>' +
    emailRows + '</tbody></table>' +
    (notes ? '<h2 style="font-size:20px;margin:28px 0 12px;">Notes</h2><p style="white-space:pre-wrap;line-height:1.5;">' + escapeEmailText(notes).replace(/\n/g, '<br>') + '</p>' : '') +
    '<h2 style="font-size:20px;margin:36px 0 12px;">Recreation rules</h2><ol style="padding-left:24px;font-size:14px;line-height:1.6;">' +
    recreationRules.map(rule => '<li style="margin-bottom:8px;">' + escapeEmailText(rule) + '</li>').join('') +
    '</ol></div>';
  const plain = 'Hat Trick\nHANGMAN\n\n' + entries.map(entry => (entry.done ? '[x] ' : '[ ] ') + entry.task).join('\n') +
    (notes ? '\n\nNotes\n' + notes : '') + '\n\nRecreation rules\n' + recreationRules.map((rule, index) => (index + 1) + '. ' + rule).join('\n');
  return { html, plain };
}

document.querySelector('#email-checklist').addEventListener('click', async () => {
  const content = buildChecklistEmail();
  try {
    await navigator.clipboard.write([new ClipboardItem({
      'text/html': new Blob([content.html], { type: 'text/html' }),
      'text/plain': new Blob([content.plain], { type: 'text/plain' })
    })]);
    window.location.href = emailLink;
  } catch {
    document.querySelector('#email-preview').innerHTML = content.html;
    document.querySelector('#email-fallback').showModal();
  }
});
document.querySelector('#open-email').href = emailLink;
document.querySelector('#close-email-preview').addEventListener('click', () => {
  document.querySelector('#email-fallback').close();
});

const notesDialog = document.querySelector('#notes-dialog');
const notesInput = document.querySelector('#notes-input');
const notesContent = document.querySelector('#notes-content');
document.querySelector('.puck-button').addEventListener('click', () => {
  notesInput.value = notesContent.textContent;
  notesDialog.showModal();
});
document.querySelector('.close-notes').addEventListener('click', () => notesDialog.close());
document.querySelector('#notes-form').addEventListener('submit', event => {
  event.preventDefault();
  notesContent.textContent = notesInput.value;
  document.querySelector('#saved-notes').hidden = !notesInput.value.trim();
  notesDialog.close();
});
