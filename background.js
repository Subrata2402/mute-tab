// Function to set the icon
function setIcon(iconPath, tabId) {
  if (chrome.action && typeof chrome.action.setIcon === 'function') {
    chrome.action.setIcon({ path: iconPath, tabId: tabId }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  } else {
    console.error('chrome.action or chrome.action.setIcon is undefined');
  }
}

// Set the icon when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, _) => {
  if (changeInfo.mutedInfo) {
    const iconPath = changeInfo.mutedInfo.muted ? '/images/mute_16.png' : '/images/unmute_16.png';
    setIcon(iconPath, tabId);
  }
});

chrome.action.onClicked.addListener((tab) => {
  const newMuteState = !tab.mutedInfo.muted;
  chrome.tabs.update(tab.id, { muted: newMuteState });
});