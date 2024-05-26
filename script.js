document.addEventListener("DOMContentLoaded", function () {
    const editorOptions = {
      lineNumbers: true,
      mode: "text/x-sql",
      theme: "default",
    };

    // CodeMirror for the first text area
    const investigateTextarea = document.querySelector(
      ".section:nth-of-type(1) .code-input"
    );
    const investigateEditor = CodeMirror.fromTextArea(
      investigateTextarea,
      editorOptions
    );

    //remove later - if solve not added back
    const solveTextarea = document.querySelector(
      ".section:nth-of-type(3) .code-input"
    );
    const solveEditor = CodeMirror.fromTextArea(
      solveTextarea,
      editorOptions
    );
  });