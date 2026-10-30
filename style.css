:root {
    --bg-color: #f5f5f7;
    --container-bg: rgba(255, 255, 255, 0.7);
    --text-main: #1d1d1f;
    --text-muted: #86868b;
    --border-color: #d2d2d7;
    --accent: #0066cc;
    --accent-hover: #0077ed;
    --box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    --btn-bg: rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] {
    --bg-color: #000000;
    --container-bg: rgba(28, 28, 30, 0.7);
    --text-main: #f5f5f7;
    --text-muted: #86868b;
    --border-color: #38383a;
    --accent: #0a84ff;
    --accent-hover: #409cff;
    --box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    --btn-bg: rgba(255, 255, 255, 0.1);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

body {
    background-color: var(--bg-color);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    justify-content: center;
}

.app-wrapper {
    width: 100%;
    max-width: 1100px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

/* Header */
.top-nav { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; }
.logo { font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
.controls { display: flex; gap: 12px; }

.icon-btn {
    background: var(--container-bg);
    border: 1px solid var(--border-color);
    color: var(--text-main);
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 14px; font-weight: 600;
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
}
.icon-btn:hover { border-color: var(--accent); color: var(--accent); }

/* Main Container */
.container {
    background: var(--container-bg);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    border-radius: 20px; padding: 24px;
    box-shadow: var(--box-shadow);
}

.converter-header {
    display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 24px;
}
.lang-label { font-size: 16px; font-weight: 500; width: 120px; text-align: center; }
.swap-btn {
    background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 8px; border-radius: 50%;
}
.swap-btn:hover { color: var(--accent); background: var(--btn-bg); }

/* Textareas & New Features */
.textarea-group { display: flex; gap: 24px; flex-wrap: wrap; }
.box { flex: 1; min-width: 300px; display: flex; flex-direction: column; position: relative; }

textarea {
    width: 100%; height: 350px; padding: 20px; padding-bottom: 50px;
    background: transparent; border: 1px solid var(--border-color);
    border-radius: 16px 16px 0 0;
    font-size: 17px; line-height: 1.5; color: var(--text-main);
    resize: none; outline: none; border-bottom: none;
}
textarea:focus { border-color: var(--accent); box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
.output-box textarea { background: rgba(134, 134, 139, 0.05); }

/* Tools Footer */
.box-footer {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 20px; border: 1px solid var(--border-color);
    border-radius: 0 0 16px 16px; border-top: 1px solid var(--border-color);
    background: var(--container-bg);
}

.counter { font-size: 13px; color: var(--text-muted); }
.text-btn { 
    background: transparent; border: none; color: var(--text-muted); 
    font-size: 13px; font-weight: 500; cursor: pointer; padding: 6px 10px; border-radius: 8px;
}
.text-btn:hover { background: var(--btn-bg); color: var(--text-main); }

.clear-btn {
    position: absolute; top: 15px; right: 15px;
    background: var(--btn-bg); border: none; color: var(--text-muted);
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
}
.clear-btn:hover { background: #ff3b30; color: white; }

.copy-btn {
    background: var(--accent); color: white; border: none;
    padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;
    display: flex; align-items: center; gap: 8px; cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 102, 204, 0.3);
}
.copy-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

/* Modal (History) */
.modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(5px);
    display: flex; align-items: center; justify-content: center; z-index: 100;
}
.modal-content {
    background: var(--bg-color); width: 90%; max-width: 500px;
    border-radius: 20px; padding: 24px; box-shadow: var(--box-shadow);
    border: 1px solid var(--border-color);
}
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.history-list { display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto; }
.history-item {
    background: var(--container-bg); padding: 12px 16px; border-radius: 12px;
    border: 1px solid var(--border-color); cursor: pointer; font-size: 14px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.history-item:hover { border-color: var(--accent); }
.empty-history { text-align: center; color: var(--text-muted); font-size: 14px; }

.footer { text-align: center; color: var(--text-muted); font-size: 13px; }

@media (max-width: 768px) {
    .textarea-group { flex-direction: column; }
    textarea { height: 200px; }
}
