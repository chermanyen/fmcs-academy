# PLC Academy

繁體中文、手機友善的 PLC 零基礎學習網站。使用原生 HTML / CSS / JavaScript，直接由 GitHub Pages 發布，不需建置、後端、外部字型、圖片服務或付費依賴。

## 教學內容

- 保留 12 週課程、六題即時測驗、25 個術語及官方資源。
- 可點選的電源 / DI / CPU / DO 圖解、SVG 感測器與負載示意。
- 每週專屬圖解、時間軸或資料流程；完成勾選不會收起目前課程。
- 梯形圖接點、線圈、燈號同步切換。
- 輸送帶 Start 保持、Stop 停止、到位清除保持；解除感測器後需再次 Start。
- 水箱遲滯控制：低於 30% 啟動、達 80% 停止；自動演示、暫停、重設、≥95% 超高警報。
- 掃描循環逐步 / 自動播放，區分現場訊號、輸入映像、邏輯結果與輸出。
- FMCS 模擬連動水箱，失聯時保留最後值並明確標記過期，恢復後更新。
- 支援鍵盤、焦點提示、狀態文字及減少動態效果偏好。離開分頁會暫停自動演示。

## 檔案與進度相容

採用原生 JavaScript MVC，沒有框架、建置程序或伺服器需求。SVG 由 View 建立，不下載外部資產。

```text
index.html                         頁面骨架與腳本載入順序
styles.css                         現有版型、手機樣式及動畫
js/
├─ main.js                          建立 Model / View / Controller 並啟動
├─ data/course-data.js              課程、測驗、術語與設備說明
├─ models/
│  ├─ learning-model.js             進度讀寫、答案評分與術語查詢
│  └─ simulation-model.js           水箱、輸送帶、掃描與監控狀態規則
├─ views/
│  ├─ learning-view.js              課程、測驗、字典的畫面
│  └─ simulation-view.js            SVG 圖解與模擬狀態顯示
└─ controllers/
   ├─ learning-controller.js        學習操作事件與畫面更新
   └─ simulation-controller.js      模擬操作、播放計時與分頁暫停
tests/
├─ models.cjs                       不依賴 DOM 的控制規則測試
└─ interaction.cjs                  實際頁面互動回歸測試
```

### 維護方式

- 改課程、測驗、術語：先看 `js/data/course-data.js`。
- 改幫浦啟停、保持或掃描規則：改 `js/models/simulation-model.js`，執行 Model 測試。
- 改文字、HTML、SVG 或狀態顯示：改對應 View；純樣式改 `styles.css`。
- 改事件或自動播放頻率：改對應 Controller。Model 不操作 DOM 或計時器；View 不讀寫儲存、不綁定事件；Controller 協調兩者。
- `js/main.js` 只做初始化。所有檔案使用同一個 `window.PLCAcademy` 命名空間，以函式作用域隔離區域變數。`index.html` 的 `defer` 腳本依列出的順序執行，無須套件載入器。MVC 入口使用新檔名，避免舊版 `app.js` 的瀏覽器快取混用。
- 儲存與時鐘透過參數傳入，控制規則可獨立測試。Model 回傳狀態副本，View 不直接更動內部狀態。

進度沿用 `localStorage.plcWeeks`（0–11 的週次陣列）。同一個瀏覽器、同一個網站來源的舊進度可繼續使用。資料只留在本機；無痕視窗、清除網站資料或更換瀏覽器不會同步。資料損壞或儲存遭封鎖時仍可閱讀與操作，頁面會提示無法保留進度。

本教學是簡化模型，位址命名、I/O 更新時機與實體接線須以設備手冊為準；不可作為實體安全控制。

## 本機預覽與測試（PowerShell）

```powershell
python -m http.server 8765 --bind 127.0.0.1
# 瀏覽 http://localhost:8765；Ctrl+C 停止
```

測試套件只供開發，不會在網站執行或上線時下載：

```powershell
npm ci
npm test
git diff --check
```

互動測試涵蓋舊進度、重載、非法進度與儲存封鎖、12 週圖解、梯形圖、輸送帶禁止意外重啟、水箱邊界與遲滯、自動演示與重設、超高警報、FMCS 失聯與恢復、掃描映像、測驗、字典與頁內連結。

## 提交與發布（PowerShell）

在本專案資料夾執行，先確認差異僅包含預期修改：

```powershell
npm test
git diff --check
git diff
git add -u
git add index.html js/ README.md package.json tests/
git commit -m "Organize PLC Academy into native JavaScript MVC"
git push origin main
```

GitHub Pages 使用 `main` 的 `/(root)`，不需額外部署指令。推送後至儲存庫 Actions 確認 Pages 部署完成，再開啟 <https://chermanyen.github.io/plc-academy/>。
