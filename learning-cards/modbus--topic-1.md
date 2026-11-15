# Modbus TCP 接 PLC，SuiteLink 接 AVEVA。

進階 / modbus

## 學習目標
- 能用自己的話說明「Modbus TCP 接 PLC，SuiteLink 接 AVEVA。」的主要角色或資料關係。
- 能辨認本課常見誤解，並說明應查驗的資料或證據。

## 前置能力
先完成平台、圖控與 AHU 基礎，或回查本課前置觀念。

## 原教材重點
- Modbus TCP Server，TCP Port 502；教學 IP，不是現場設定。
- 192.168.10.21 的 MBTCP 驅動讀取 PLC，再由 DI_Primary 透過 SuiteLink 取得資料。
- 192.168.10.22 使用相同點位映射，由 DI_Backup 透過 SuiteLink 取得資料。
- 設定主要／備用 DI 與共同 Scan Group；依來源狀態提供資料給 AHU_001。
- 整理溫度、狀態、縮放與警報。PLC 控制連鎖仍在現場。
- 畫面監看與歷史收集。Galaxy SQL 另保存專案設定。

## 圖文對照
![相關圖解](../courses/modbus/assets/plc-ip.png)
原教材相關畫面，介面與物件名稱依安裝版本及專案不同。

## 常見問題
### 這一課應先掌握什麼？
Modbus TCP Server，TCP Port 502；教學 IP，不是現場設定。

### DDESuiteLinkClient 的 Server node 在本路線指向哪裡？
執行 I/O Server 的電腦。OI 到平台與 PLC 到 OI 是不同區段，應分別設定。

### SuiteLink Topic 通常要與什麼對照？
OI 對外的 Device Group。Topic 與來源群組不一致，可能無法取得預期項目。

## 記憶卡
- 問：設定 Server node 後，PLC 連線設定會自動正確嗎？
  答：仍需在 OI 驅動核對 PLC 參數。平台到 OI 的設定不能取代 OI 到 PLC 的配置。
- 問：主要與備用 DI 來源應如何驗證？
  答：先各自單獨讀值成功，再驗證共同入口。單路基線有助於判斷備援問題來自哪一段。
- 問：Topic 名稱可以只看教材後直接照抄嗎？
  答：需與實際 OI 群組名稱及專案規劃一致。來源與用戶端需使用一致且已驗證的命名。

## 實作與學習紀錄
以本課原教材的案例，記錄一項正常情境與一項異常情境，分別寫下預期結果、實際證據及待確認事項。

- 我的說明：
- 預期與實際結果：
- 待確認問題：

## 課後五題測驗

1. 下列哪項符合本課的教材重點？
   A. 一律填 PLC 位址
   B. 一律填歷史資料庫名稱
   C. Modbus TCP Server，TCP Port 502；教學 IP，不是現場設定。

2. 複習本課的操作與判讀原則，哪一項正確？
   A. 視窗標題字型
   B. 192.168.10.21 的 MBTCP 驅動讀取 PLC，再由 DI_Primary 透過 SuiteLink 取得資料。
   C. Windows 使用者桌布

3. 設定 Server node 後，PLC 連線設定會自動正確嗎？
   A. 仍需在 OI 驅動核對 PLC 參數
   B. 會自動猜出所有 PLC 位址
   C. 可省略點位表

4. DDESuiteLinkClient 的 Server node 在本路線指向哪裡？
   A. 執行 I/O Server 的電腦
   B. 一律填 PLC 位址
   C. 一律填歷史資料庫名稱

5. SuiteLink Topic 通常要與什麼對照？
   A. Windows 使用者桌布
   B. 視窗標題字型
   C. OI 對外的 Device Group

## 答案與解析
1. C：本課原教材重點：Modbus TCP Server，TCP Port 502；教學 IP，不是現場設定。
2. B：本課原教材重點：192.168.10.21 的 MBTCP 驅動讀取 PLC，再由 DI_Primary 透過 SuiteLink 取得資料。
3. A：平台到 OI 的設定不能取代 OI 到 PLC 的配置。
4. A：OI 到平台與 PLC 到 OI 是不同區段，應分別設定。
5. C：Topic 與來源群組不一致，可能無法取得預期項目。

## 原教材
https://chermanyen.github.io/fmcs-academy/courses/modbus/index.html#topic-1
概念與練習沿用本站原教材；版本、來源圖及限制仍以原教材標示為準。
