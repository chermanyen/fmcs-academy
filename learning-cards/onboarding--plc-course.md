# 03｜從 Modbus PLC 模擬到 InTouch

進階 / onboarding

## 學習目標
- 能用自己的話說明「03｜從 Modbus PLC 模擬到 InTouch」的主要角色或資料關係。
- 能辨認本課常見誤解，並說明應查驗的資料或證據。

## 前置能力
先完成平台、圖控與 AHU 基礎，或回查本課前置觀念。

## 原教材重點
- 03｜從 Modbus PLC 模擬到 InTouch
- 依簡報的 2023 R2 SP1 P03 訓練案例整理。此路線用 MBTCP 與 SuiteLink，可與第 4 週的 OPC UA 路線對照。
- 模擬器Holding Register 400001 · 原始測試值 2048
- 通訊與物件OI MBTCP → SuiteLink Client → Temperature001.PV
- 執行畫面先在 Object Viewer 驗證，再綁定 InTouch
- 在獨立測試環境啟動 ModRSsim2 的 Modbus TCP，依案例核對埠號 502，將 Holding Register 400001 設為 2048。
- 在 OCMC 的 MBTCP 訓練執行個體建立 Device Group Topic2。將 Device Item Temperature001.PV 對到測試暫存器，核對驅動的位址表示方式。
- 在 IDE 用 $DDESuiteLinkClient 建立訓練 Client，填入對應 Server Node、Server Name 與 SuiteLink。Topic 名稱要與 Device Group 一致。
- 建立 Temperature001，新增 Float 型別的 PV，以唯讀方式映射模擬點位。在 IO Devices 指派後，先部署 Client，再部署資料物件。
- 在 Object Viewer 觀察 PV、Quality 和更新時間。改變模擬值，確認資料跟著動。2048 是原始暫存器測試值，工程單位與縮放需另行定義。
- B｜雙 Driver 備援與斷線演練
- 建立第二個訓練 Driver 執行個體，核對兩端都有同名 Topic 和 Item。分別設定 Primary 與 Backup Client，先確認兩路各自能讀值。

## 圖文對照
![相關圖解](../courses/mis/assets/hmi.png)
觀察設備、數值與狀態如何安排。圖為畫面概念示意，並非本課已部署的成果。

## 常見問題
### 這一課應先掌握什麼？
03｜從 Modbus PLC 模擬到 InTouch

### WindowMaker 與 WindowViewer 的分工為何？
前者編輯畫面，後者執行畫面。開發與執行環境不同，排錯需先確認正在使用哪個應用。

### Industrial Graphic 最主要的維護價值為何？
重用外觀與綁定規格。圖形可以重用，但設備參照與狀態意義仍需逐一確認。

## 記憶卡
- 問：數值綁定完成後，最可靠的核對方式為何？
  答：比對來源、Object Viewer 與執行畫面。跨層比對可揭露誤綁設備、單位或縮放問題。
- 問：運轉燈與資料品質為何要分開呈現？
  答：設備狀態與資料可信度是不同訊息。停止但資料有效，與失聯而狀態未知，應有不同呈現。
- 問：受管理與獨立式 InTouch 的設定可否直接混用？
  答：應先確認應用類型與資料參照路線。受管理應用與獨立標籤路線的維護入口及參照方式可能不同。

## 實作與學習紀錄
以本課原教材的案例，記錄一項正常情境與一項異常情境，分別寫下預期結果、實際證據及待確認事項。

- 我的說明：
- 預期與實際結果：
- 待確認問題：

## 課後五題測驗

1. 下列哪項符合本課的教材重點？
   A. 03｜從 Modbus PLC 模擬到 InTouch
   B. 前者保存 PLC 程式，後者備份 SQL
   C. 兩者都是歷史資料庫

2. 複習本課的操作與判讀原則，哪一項正確？
   A. 依簡報的 2023 R2 SP1 P03 訓練案例整理。此路線用 MBTCP 與 SuiteLink，可與第 4 週的 OPC UA 路線對照。
   B. 不需再核對設備來源
   C. 自動取代所有 PLC 控制

3. 數值綁定完成後，最可靠的核對方式為何？
   A. 比對來源、Object Viewer 與執行畫面
   B. 只檢查圖形是否居中
   C. 只看畫面已有一個數字

4. 運轉燈與資料品質為何要分開呈現？
   A. 綠色永遠表示全部正常
   B. 設備狀態與資料可信度是不同訊息
   C. 只顯示燈號可省去所有驗證

5. WindowMaker 與 WindowViewer 的分工為何？
   A. 兩者都是歷史資料庫
   B. 前者保存 PLC 程式，後者備份 SQL
   C. 前者編輯畫面，後者執行畫面

## 答案與解析
1. A：本課原教材重點：03｜從 Modbus PLC 模擬到 InTouch
2. A：本課原教材重點：依簡報的 2023 R2 SP1 P03 訓練案例整理。此路線用 MBTCP 與 SuiteLink，可與第 4 週的 OPC UA 路線對照。
3. A：跨層比對可揭露誤綁設備、單位或縮放問題。
4. B：停止但資料有效，與失聯而狀態未知，應有不同呈現。
5. C：開發與執行環境不同，排錯需先確認正在使用哪個應用。

## 原教材
https://chermanyen.github.io/fmcs-academy/courses/onboarding/index.html#plc-course
概念與練習沿用本站原教材；版本、來源圖及限制仍以原教材標示為準。
