const scanSamples = [false,true,true,true,true];
let scanIndex = 0;
const scanNext = byId('scan-next');
const scanResult = byId('scan-result');
scanNext.onclick = () => {
 const sample = scanSamples[scanIndex];
 const rising = sample && !scanSamples[scanIndex - 1];
 scanResult.textContent = (scanIndex * 5)+' 秒｜取樣 '+sample+'｜OnTrue '+(rising?'執行':'略過')+'｜WhileTrue '+(sample?'執行':'略過');
 scanIndex++;
 scanNext.disabled = scanIndex === scanSamples.length;
};
byId('scan-reset').onclick = () => {
 scanIndex = 0;
 scanNext.disabled = false;
 scanResult.textContent = '準備從 0 秒開始。';
 scanNext.focus();
};
for (const [week,topic,label] of [[4,'plc-course','Modbus 與 SuiteLink 實戰'],[5,'plc-course','InTouch 備援圖控實戰'],[6,'scan-course','腳本掃描與變數實戰']]) {
 const entry = document.createElement('p');
 const link = document.createElement('a');
 link.href = '#'+topic;
 link.textContent = label+' →';
 entry.append(link);
 byId('lesson-'+week).querySelector('summary').after(entry);
}
