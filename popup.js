let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

freeFormTool.addEventListener("click", async () => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["freeFormTool.js"],
  });
});

squareTool.addEventListener("click", async () => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["initCanvas.js", "squareTool.js"],
  });
});

roundTool.addEventListener("click", async () => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["initCanvas.js", "roundTool.js"],
  });
});
