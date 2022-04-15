const wrongCodeTextarea = document.getElementById("wrong-code");
const fixedCodeTextarea = document.getElementById("fixed-code");
const fixCodeButton = document.getElementById("fix-code-button");
const langSelect = document.getElementById("lang");

const wrongCodeTextareaCodeMirror = CodeMirror.fromTextArea(wrongCodeTextarea, {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
});

wrongCodeTextareaCodeMirror.on("change", function () {
    fixCodeButton.classList.remove("invisible");
});

fixCodeButton.addEventListener("click", function () {
    chrome.storage.sync.get(["openaiapikey", "openaitemperature", "openaimaxtokens", "openaitopp", "openaifrequencypenality", "openaipresencepenality"], function (data) {
        const openaiApiKey = data.openaiapikey;
        const openaiTemperature = data.openaitemperature;
        const openaiMaxTokens = data.openaimaxtokens;
        const openaiTopP = data.openaitopp;
        const openaiFrequencyPenality = data.openaifrequencypenality;
        const openaiPresencePenality = data.openaipresencepenality;
        const lang = langSelect.value;
        
        const fixedCodeTextareaCodeMirror = CodeMirror.fromTextArea(fixedCodeTextarea, {
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            readOnly: 'nocursor',
        });
        // should be replaced with code-davinci-002
        const url = "https://api.openai.com/v1/engines/text-davinci-002/completions"
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("post", url, false);
        xmlHttpRequest.setRequestHeader('Authorization', `Bearer ${openaiApiKey}`);
        xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
        const prompt = wrongCodeTextareaCodeMirror.getValue();
        data = {
            "prompt": `##### Fix bugs in the below function\n \n### Buggy ${lang}\n${prompt}### Fixed ${lang}`,
            "temperature": parseInt(openaiTemperature),
            "max_tokens": parseInt(openaiMaxTokens),
            "top_p": parseInt(openaiTopP),
            //"frequency_penality": parseInt(openaiFrequencyPenality),
            //"presence_penality": parseInt(openaiPresencePenality),
            "stop": ["###"]
        };
        xmlHttpRequest.onload  = function() {
            let jsonResponse = JSON.parse(this.response);
            let text = jsonResponse.choices[0].text;
            fixedCodeTextareaCodeMirror.getDoc().setValue(text);
         };
        xmlHttpRequest.send(JSON.stringify(data));
    });
});


