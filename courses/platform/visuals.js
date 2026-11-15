export const visuals = {
  "start": {
    "title": "FMCS 是怎麼工作的？",
    "desc": "現場設備經通訊及 Galaxy 處理後提供圖控與歷史；IT 依值、品質及日誌排錯。"
  },
  "galaxy": {
    "title": "Galaxy、IDE、執行環境：三件不同的事",
    "desc": "IDE 編輯 Galaxy；Galaxy 設定部署到 WinPlatform 與 AppEngine，AppEngine 執行 AHU 實例。Area 是邏輯分組。"
  },
  "template": {
    "title": "一份模板，建立多台 AHU 實例",
    "desc": "共用模板建立 AHU_001、AHU_002，各有自己的屬性值。"
  },
  "plc": {
    "title": "追蹤一筆 PLC 資料：400001 → PV",
    "desc": "Modbus 模擬器經 OI MBTCP Driver、SuiteLink Client 傳入 Temperature001.PV。"
  },
  "redundancy": {
    "title": "雙 Driver 備援：兩條路徑，一個 Active",
    "desc": "Primary 與 Backup Client 接至 RedundantDIObject，由其選擇 Active 來源。此同機測試不是主機級備援。"
  },
  "script": {
    "title": "重連腳本：先判斷，再嘗試，再驗證",
    "desc": "連線正常時監看；斷線依觸發週期提出重連，恢復後驗證品質與更新。"
  },
  "intouch": {
    "title": "畫面上兩種不同資訊，不要混在一起",
    "desc": "Active 狀態決定選用來源；ConnectionStatus 與 PV 品質表示通訊與資料有效性。"
  },
  "alarm": {
    "title": "同一個 PV，三種不同用途",
    "desc": "即時值顯示、超限告警與歷史記錄是不同功能；Ack 不代表數值恢復。"
  },
  "trouble": {
    "title": "用資料流定位故障：從哪裡開始不更新？",
    "desc": "比較模擬器、Object Viewer 與圖控畫面，定位第一個不更新的節點。"
  }
};
export function lessonVisuals(id) {
 const v=visuals[id];
 return `<section class="visual-section" id="flow"><div class="visual-heading"><div><span class="eyebrow">先看圖，再看操作</span><h2>${v.title}</h2></div><span class="diagram-badge">本課專用圖解</span></div><figure><div class="figure-scroll"><img src="assets/${id}-diagram.svg" alt="${v.desc}" loading="lazy" width="1000" height="680"></div><figcaption>${v.desc}</figcaption><button type="button" class="zoom-figure" data-figure="assets/${id}-diagram.svg" data-title="${v.title}">＋ 放大流程圖</button></figure><p class="figure-help">手機可左右滑動看完整圖，或點「放大」檢視。圖中文字另有下方說明可閱讀。</p><h3>操作畫面，先找這兩個位置</h3><figure><div class="figure-scroll"><img src="assets/${id}-screen.svg" alt="${v.title}操作定位示意：左側找到物件，右側核對設定欄位。非真實軟體截圖。" loading="lazy" width="1000" height="620"></div><figcaption>① 左側：找到物件或視圖。② 右側：核對設定。這是教學畫面示意，實際介面依安裝版本為準。</figcaption><button type="button" class="zoom-figure" data-figure="assets/${id}-screen.svg" data-title="操作定位示意">＋ 放大操作示意</button></figure></section>`;
}
