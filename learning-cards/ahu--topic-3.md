# 現場到畫面的資料路徑

基礎 / ahu

## 學習目標
- 能用自己的話說明「現場到畫面的資料路徑」的主要角色或資料關係。
- 能辨認本課常見誤解，並說明應查驗的資料或證據。

## 前置能力
先理解 FMCS 的資料流與監控分工。

## 原教材重點
- 本例採 PLC、OI Server、SuiteLink 與 DDESuiteLinkClient 連接路徑。
- OI Server 依 PLC 型號使用適用驅動
- AppEngine 更新 AHU_001 的 Attribute

## 圖文對照
![相關圖解](../courses/mis/assets/hmi.png)
觀察設備、數值與狀態如何安排。圖為畫面概念示意，並非本課已部署的成果。

## 常見問題
### 這一課應先掌握什麼？
本例採 PLC、OI Server、SuiteLink 與 DDESuiteLinkClient 連接路徑。

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
   A. 前者保存 PLC 程式，後者備份 SQL
   B. 兩者都是歷史資料庫
   C. 本例採 PLC、OI Server、SuiteLink 與 DDESuiteLinkClient 連接路徑。

2. 複習本課的操作與判讀原則，哪一項正確？
   A. OI Server 依 PLC 型號使用適用驅動
   B. 自動取代所有 PLC 控制
   C. 不需再核對設備來源

3. WindowMaker 與 WindowViewer 的分工為何？
   A. 前者編輯畫面，後者執行畫面
   B. 兩者都是歷史資料庫
   C. 前者保存 PLC 程式，後者備份 SQL

4. Industrial Graphic 最主要的維護價值為何？
   A. 不需再核對設備來源
   B. 自動取代所有 PLC 控制
   C. 重用外觀與綁定規格

5. 數值綁定完成後，最可靠的核對方式為何？
   A. 比對來源、Object Viewer 與執行畫面
   B. 只看畫面已有一個數字
   C. 只檢查圖形是否居中

## 答案與解析
1. C：本課原教材重點：本例採 PLC、OI Server、SuiteLink 與 DDESuiteLinkClient 連接路徑。
2. A：本課原教材重點：OI Server 依 PLC 型號使用適用驅動
3. A：開發與執行環境不同，排錯需先確認正在使用哪個應用。
4. C：圖形可以重用，但設備參照與狀態意義仍需逐一確認。
5. A：跨層比對可揭露誤綁設備、單位或縮放問題。

## 原教材
https://chermanyen.github.io/fmcs-academy/courses/ahu/index.html#topic-3
概念與練習沿用本站原教材；版本、來源圖及限制仍以原教材標示為準。
