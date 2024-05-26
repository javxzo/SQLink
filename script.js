document.addEventListener('DOMContentLoaded', function () {
    const editorOptions = {
      lineNumbers: true,
      mode: "text/x-sql",
      theme: "default",
    };

    // Initialize CodeMirror for the first textarea
    const investigateTextarea = document.querySelector('.section:nth-of-type(1) .code-input');
    const investigateEditor = CodeMirror.fromTextArea(investigateTextarea, editorOptions);

    // Initialize CodeMirror for the third textarea
    const solveTextarea = document.querySelector('.section:nth-of-type(3) .code-input');
    const solveEditor = CodeMirror.fromTextArea(solveTextarea, editorOptions);
});