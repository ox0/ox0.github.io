const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const outline = document.getElementById("outline");

//////////////////////////////////////////////////
// MARKDOWN + SYNTAX HIGHLIGHT
//////////////////////////////////////////////////
marked.setOptions({
    breaks: true,
    gfm: true,
    langPrefix: 'language-' // 👈 IMPORTANT for Prism
});

function updatePreview() {
    preview.innerHTML = marked.parse(editor.value);

    // Add line numbers
    preview.querySelectorAll("pre").forEach(pre => {
        pre.classList.add("line-numbers");
    });

    Prism.highlightAll();   // 👈 THIS is the real highlighter

    enhanceCodeBlocks();    // copy button + badge
    generateOutline();
}

function enhanceCodeBlocks() {
    preview.querySelectorAll("pre").forEach(pre => {
        // avoid duplicating toolbar
        if (pre.parentElement.classList.contains("code-wrapper")) return;

        const code = pre.querySelector("code");
        if (!code) return;

        // detect language
        const langClass = [...code.classList].find(c => c.startsWith("language-"));
        const lang = langClass ? langClass.replace("language-", "") : "text";

        // wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "code-wrapper";

        // toolbar
        const toolbar = document.createElement("div");
        toolbar.className = "code-toolbar";

        // language badge
        const badge = document.createElement("span");
        badge.className = "code-lang";
        badge.textContent = lang.toUpperCase();

        // copy button
        const button = document.createElement("button");
        button.className = "copy-btn";
        button.textContent = "Copy";

        button.onclick = () => {
            navigator.clipboard.writeText(code.innerText);
            button.textContent = "Copied!";
            setTimeout(() => button.textContent = "Copy", 1500);
        };

        toolbar.appendChild(badge);
        toolbar.appendChild(button);

        // wrap elements
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(toolbar);
        wrapper.appendChild(pre);
    });
}

editor.addEventListener("input", updatePreview);

//////////////////////////////////////////////////
// OUTLINE (headings navigation)
//////////////////////////////////////////////////
function generateOutline() {
    outline.innerHTML = "";
    const headings = preview.querySelectorAll("h1, h2, h3");

    headings.forEach(h => {
        const div = document.createElement("div");
        div.textContent = h.textContent;
        div.style.marginLeft = (parseInt(h.tagName[1]) - 1) * 10 + "px";

        div.onclick = () => h.scrollIntoView({ behavior: "smooth" });

        outline.appendChild(div);
    });
}



document.addEventListener("dragover", function (e) {
    e.preventDefault();
});

document.addEventListener("drop", function (e) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        editor.value = event.target.result;
        updatePreview(); // replace with your actual preview update function
    };
    reader.readAsText(file);
});




//////////////////////////////////////////////////
// THEME
//////////////////////////////////////////////////
document.getElementById("toggleTheme").onclick = () => {
    document.body.classList.toggle("light");
};

//////////////////////////////////////////////////
// FILE OPEN/SAVE
//////////////////////////////////////////////////
document.getElementById("openFile").onclick = () => fileInput.click();

let currentFileName = "doc.md";

fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        editor.value = e.target.result;
        currentFileName = file.name || "doc.md";
        updatePreview();
    };
    reader.readAsText(file);
};

document.getElementById("saveFile").onclick = () => {
    let fileName = prompt("Enter file name:", currentFileName);

    if (fileName === null) return; // user clicked Cancel

    fileName = fileName.trim();

    if (!fileName) {
        fileName = currentFileName || "doc.md";
    }

    if (!fileName.toLowerCase().endsWith(".md")) {
        fileName += ".md";
    }

    currentFileName = fileName;

    const blob = new Blob([editor.value], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(a.href);
};

//////////////////////////////////////////////////
// EXPORT HTML
//////////////////////////////////////////////////
document.getElementById("exportHTML").onclick = () => {
    const html = preview.innerHTML;
    const blob = new Blob([html], { type: "text/html" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "doc.html";
    a.click();
};

//////////////////////////////////////////////////
// SEARCH + REPLACE
//////////////////////////////////////////////////
const panel = document.getElementById("searchPanel");

document.getElementById("toggleSearch").onclick = () => {
    panel.classList.toggle("hidden");
};

function findNext() {
    const text = editor.value;
    const search = searchInput.value;
    const start = editor.selectionEnd;

    const index = text.indexOf(search, start);
    if (index !== -1) {
        editor.focus();
        editor.setSelectionRange(index, index + search.length);
    }
}

document.getElementById("findNext").onclick = findNext;

document.getElementById("replaceOne").onclick = () => {
    const sel = editor.value.substring(editor.selectionStart, editor.selectionEnd);
    if (sel === replaceInput.value) return;

    document.execCommand("insertText", false, replaceInput.value);
};

document.getElementById("replaceAll").onclick = () => {
    editor.value = editor.value.split(searchInput.value).join(replaceInput.value);
    updatePreview();
};

//////////////////////////////////////////////////
// RESIZE
//////////////////////////////////////////////////
let dragging = false;

divider.onmousedown = () => dragging = true;
document.onmouseup = () => dragging = false;

document.onmousemove = e => {
    if (!dragging) return;

    const percent = e.clientX / window.innerWidth * 100;
    editor.style.width = percent + "%";
    preview.style.width = (100 - percent) + "%";
};

//////////////////////////////////////////////////
// SHORTCUTS
//////////////////////////////////////////////////
editor.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        panel.classList.remove("hidden");
    }

    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        document.getElementById("saveFile").click();
    }
});


document.addEventListener("DOMContentLoaded", () => {
//////////////////////////////////////////////////
// DEFAULT CONTENT
//////////////////////////////////////////////////
editor.value =
`# 🚀 Markdown Pro+ Demo

This demo showcases:

- Syntax highlighting
- Line numbers
- Copy button
- Language badge
- Tables
- Task lists

---

## ✅ Task List
- [x] Markdown parsing
- [x] Syntax highlighting
- [x] Line numbers
- [x] Copy button
- [ ] Become a full IDE 😄

---

## 📊 Table

| Feature        | Supported |
|----------------|----------|
| Tables         | Yes      |
| Task Lists     | Yes      |
| Code Highlight | Yes      |

---

## 💻 JavaScript Example

\`\`\`js
function greet(name) {
    console.log("Hello " + name);
}

greet("World");
\`\`\`

---

## 🌐 HTML Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Demo</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
\`\`\`

---

## 🎨 CSS Example

\`\`\`css
body {
    background: #111;
    color: #eee;
    font-family: Arial;
}
\`\`\`

---

## 🐍 Python Example

\`\`\`python
def hello():
    print("Hello from Python")

hello()
\`\`\`

---

## 📜 Long Code (scroll test)

\`\`\`js
for (let i = 1; i <= 20; i++) {
    console.log("Line number:", i);
}
\`\`\`

---

## 🔍 Inline Code

Use \`console.log()\` for debugging.

---

## 🧠 How It Works

- Markdown is parsed by Marked.js
- Prism handles syntax highlighting
- Line numbers plugin adds numbering
- Custom JS adds copy button + language badge

---

🎉 Try:
- Clicking "Copy"
- Resizing panels
- Switching theme
- Searching (Ctrl + F)

---

## 🧪 Highlight Test

### JavaScript
\`\`\`js
const x = 10;
function test() {
    console.log("Hello world");
}
\`\`\`

### HTML
\`\`\`html
<div class="box">Hello</div>
\`\`\`

### CSS
\`\`\`css
body {
    background: black;
}
\`\`\`
`;

    updatePreview(); // 👈 ALWAYS called LAST

});
