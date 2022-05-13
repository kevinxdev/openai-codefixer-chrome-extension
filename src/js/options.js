const openaiApiKey = document.getElementById("openai-api-key");

const openaitemperature = document.getElementById("openai-temperature");
const openaiMaxTokens = document.getElementById("openai-max-tokens");
const openaiTopP = document.getElementById("openai-top-p");
const openaifrequencyPenality = document.getElementById("openai-frequency-penality");
const openaiPresencePenality = document.getElementById("openai-presence-penality");

chrome.storage.sync.get(["openaitemperature", "openaimaxtokens", "openaitopp", "openaifrequencypenality", "openaipresencepenality"], function (data) {
    if (!data.openaitemperature) {
        chrome.storage.sync.set({"openaitemperature": 0});
    }
    openaitemperature.value = data.openaitemperature;
    if (!data.openaimaxtokens) {
        chrome.storage.sync.set({"openaimaxtokens": 182});
    }
    openaiMaxTokens.value = data.openaimaxtokens;
    if (!data.openaitopp) {
        chrome.storage.sync.set({"openaitopp": 1.0});
    }
    openaiTopP.value = data.openaitopp;
    if (!data.openaifrequencypenality) {
        chrome.storage.sync.set({"openaifrequencypenality": 0.0});
    }
    openaifrequencyPenality.value = data.openaifrequencypenality;
    if (!data.openaipresencepenality) {
        chrome.storage.sync.set({"openaipresencepenality": 0.0});
    }
    openaiPresencePenality.value = data.openaipresencepenality;
});

chrome.storage.sync.get("openaiapikey", function (data) {
    if (data.openaiapikey) {
        openaiApiKey.value = data.openaiapikey;
    }
});

openaiApiKey.addEventListener("input", function () {
    chrome.storage.sync.set({"openaiapikey": this.value});
});

openaitemperature.addEventListener("input", function () {
    chrome.storage.sync.set({"openaitemperature": this.value});
});
openaiMaxTokens.addEventListener("input", function () {
    chrome.storage.sync.set({"openaimaxtokens": this.value});
});
openaiTopP.addEventListener("input", function () {
    chrome.storage.sync.set({"openaitopp": this.value});
});
openaifrequencyPenality.addEventListener("input", function () {
    chrome.storage.sync.set({"openaifrequencypenality": this.value});
});
openaiPresencePenality.addEventListener("input", function () {
    chrome.storage.sync.set({"openaipresencepenality": this.value});
});