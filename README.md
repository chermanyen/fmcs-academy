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

`index.html` 是入口，`styles.css` 是樣式；`app.js` 保留課程、測驗與字典，`visuals.js` 負責圖解與模擬。SVG 由程式建立，不下載外部資產。

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
git add index.html styles.css app.js visuals.js README.md package.json package-lock.json .gitignore tests/interaction.cjs
git commit -m "Enhance PLC Academy with visual lessons and interactive simulations"
git push origin main
```

GitHub Pages 使用 `main` 的 `/(root)`，不需額外部署指令。推送後至儲存庫 Actions 確認 Pages 部署完成，再開啟 <https://chermanyen.github.io/plc-academy/>。
