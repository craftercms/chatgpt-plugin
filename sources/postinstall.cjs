const fs = require('fs-extra');
fs.copySync('node_modules/tinymce', 'public/tinymce');
console.log('Tinymce files copied successfully.');
